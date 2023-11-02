import Signup from "../templates/SignUp";
import Header from "../molecule/HeaderForm";
import NavBar from "../organism/NavBar";

export default function SignUpPage() {
    return (
        <>
            <NavBar/>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Inscrivez vous creer un compte"
                        paragraph="Vous avez déjà un compte? "
                        linkName="Connectez-vous"
                        linkUrl="/login"
                    />
                    <Signup/>
                </div>
            </div>
        </>
    )
}