import Header from "../molecule/HeaderForm";
import Login from "../templates/Login";
import NavBar from "../organism/NavBar";


export default function LoginPage() {
    return (
        <>
            <NavBar/>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Connectez vous"
                        paragraph="Vous n'avez pas encore de compte ? "
                        linkName="Inscrivez-vous"
                        linkUrl="/signup"
                    />
                    <Login/>
                </div>
            </div>
        </>
    )
}