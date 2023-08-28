import { signInGoogleWPopUp, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";

const SignIn = () => {
    const signInGoogle = async () => {
        const response = await signInGoogleWPopUp();
        console.log(response);

        createUserDocumentFromAuth(response.user);
    };

    return (
        <button onClick={signInGoogle}>Sign In</button>
    );
};

export default SignIn;