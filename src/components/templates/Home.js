
import React from "react";


    const Home = ({ alertMessage, accueil, vacance, agenda, contact, navbar , footer  }) => (
    <div className="page-template">
        <header>{navbar}</header>
        <main>
            <div>{alertMessage}</div>
            <div id = "accueil" className="bg-gray-200 mt-6 p-10 ">
                {accueil}
            </div>
            <div id = "vacances">
                {vacance}
            </div>
            <div id = "agenda">
                {agenda}
            </div>
            <div id = "contact">
                {contact}
            </div>
        </main>
        <footer>{footer}</footer>
    </div>
);

export default Home;