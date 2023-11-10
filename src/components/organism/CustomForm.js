export {CustomForm, TypeForm};


function CustomForm(props){
    return(
        <div id="contentOfRoot" className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={props.formHandler} id="divForm" className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">{props.typeForm.title}</h1>
                    {props.typeForm.content}
                </form>
                <div className="mt-6">
                    {props.typeForm.bottomMessage}
                    <button className="text-blue-700" onClick={[props.typeForm.fctRender]}>{props.typeForm.messageLinkBottom}</button>
                </div>
            </div>
        </div>
    );
}


class TypeForm{
    constructor(title, content, bottomMessage, messageLinkBottom, fctRender) {
        this.title = title;
        this.content = content;
        this.bottomMessage = bottomMessage;
        this.messageLinkBottom = messageLinkBottom;
        this.fctRender = fctRender;
    }
}