import UserInscrit from "../organism/UserInscrit";
import ContactAdmin from "./ContactAdmin";
import Header from "../molecule/HeaderForm";

export default function Home(){
    return(
        <>
            <div className="bg-gray-200 mt-6 p-10">
                <Header heading="Rechercher" paragraph="Nombre d' utilisateur inscrit et le nombre de personne en vacance pendant une date donnée"></Header>
                <UserInscrit/>
            </div>
            <ContactAdmin/>
        </>
    )

}