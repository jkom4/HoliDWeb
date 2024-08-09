import API from "../../services/API";
import {useEffect, useRef, useState} from 'react';
import {selectCurrentUser} from "../../features/AuthSlice";
import {useSelector} from "react-redux";


export default function ChatBox({item}){
    const userId = useSelector(selectCurrentUser).id;
    const [messagesObj, setMessagesObj] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messagesObj]);
    const initMessages = async () => {
        try {
            const vacanceWith100Msg = await API.getMessage(item.id);
            setMessagesObj(vacanceWith100Msg.messages);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        initMessages()
    }, []);
    useEffect(() => {
        const intervalId = setInterval(async () => {
            await initMessages()
        }, 20000); // 20sec

        return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage du composant
    }, [item.id]);
    const handleChangeInputMsg = (event) => {
        setMessageInput(event.target.value);
    };
    const handleSendMessage = async (event) => {
        event.preventDefault();
        if(messageInput.length > 0 && messageInput.length < 800){
            try {
                const vacanceRecieved = await API.SendMessage(item.id, messageInput);
                setMessagesObj(vacanceRecieved.messages);
                setMessageInput('');
            } catch (err) {
                handleError(err);
            }
        }else{
            setErrMsg("La longueur du message doit être entre 1 et 800")
        }
    }
    const handleError = (err) => {
        if (err.response === 400) {
            setErrMsg('Bad request');
        } else if (err.response === 401) {
            setErrMsg('Unauthorized');
        } else if (err.response === 403) {
            setErrMsg('JWT expired');
        }
        else {
            console.log('Add Failed ' + err)
            setErrMsg('Add Failed ' + err);
        }
    }
    const convertToDateAndTimeMsg = (OffsetDateTime) =>{
        const dateTime = new Date(OffsetDateTime).toLocaleString();
        return `${dateTime}`;
    }

    const messageRecievedOrSendedHtml = (message, recieved = true) => {
        const styleDiv1 = recieved ? "flex justify-start mb-2" : "flex justify-end mb-2"
        const styleDiv2 = recieved ? "bg-gray-500 text-white rounded-lg p-4 max-w-xs" : "bg-blue-600 text-white rounded-lg p-4 max-w-xs"
        return <div key={message.id} className={styleDiv1}>
            <div className={styleDiv2}>
                <p className="text-base mb-2">{message.content}</p>
                <div className="inline-flex justify-between items-center">
                    <p className="text-xs mr-5">{message.sender.prenom} {message.sender.nom}</p>
                    <p className="text-xs ml-5 text-gray-300">{convertToDateAndTimeMsg(message.sendingDate)}</p>
                </div>
            </div>
        </div>
    }
    const makeListChat = (messages) => {
        return messages.map((message) => {
            const isSentByCurrentUser = message.sender.id === userId;
            return messageRecievedOrSendedHtml(message, !isSentByCurrentUser);
        });
    }

    return <div className="flex flex-col h-96 border rounded-lg p-4">
        <div className="flex-1 overflow-y-auto" ref={scrollRef} style={{ scrollBehavior: 'smooth' }}>
            {makeListChat(messagesObj).reverse()}
        </div>
        <p className={errMsg ? "errmsg text-red-500" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSendMessage} className="flex mt-4">
            <input
                type="text"
                placeholder="Votre message..."
                value={messageInput}
                onChange={handleChangeInputMsg}
                className="flex-1 border rounded-l-md p-2 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-blue-700 text-white rounded-r-md px-4 py-2 ml-2 hover:bg-blue-800  mx-10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Envoyer
            </button>
        </form>
    </div>
}