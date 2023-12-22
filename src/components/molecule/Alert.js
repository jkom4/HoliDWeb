import {useEffect, useState} from "react";

const Alert = ({color, message}) => {
    const [closeButton, setClosebutton] = useState(false)
    const [progress, setProgress] = useState(10);
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress > 0  ? prevProgress - 1 : prevProgress));
        }, 1000);

        const timer = setTimeout(() => {
            clearInterval(interval);
            setClosebutton(true);
        }, 10000);

        // Cleanup intervals and timers on component unmount or when isOpen changes
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [closeButton ]);

    return (
        <>
            {!closeButton &&
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                    <div
                        className={`font-regular relative block w-full rounded-lg bg-gradient-to-tr from-red-600 to-red-400 px-4 py-4 text-base text-white`}
                        data-dismissible="alert"
                    >
                    <div className="absolute top-4 left-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <div id="alertmsg" className="ml-8 mr-12">{message}</div>
                    <div
                        className="absolute top-3 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
                        data-dismissible-target="alert"
                    >
                        <div role="button" className="w-max">
                            <button onClick={() => setClosebutton(true)}
                                    className="select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white transition-all hover:bg-white/10 active:bg-white/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-ripple-dark="true"
                            >
                                Close ({progress})
                            </button>
                        </div>
                    </div>
                </div>
                    </div>
                </div>

            }

        </>
    )
}


export default Alert;