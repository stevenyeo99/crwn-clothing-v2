import { useEffect, useContext } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { UserContext } from '../../contexts/user.context';

import { signInGoogleWPopUp, signInGoogleWRedirect, createUserDocumentFromAuth, auth, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.util";

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
    const { setCurrentUser } = useContext(UserContext);

    useEffect(async () => {
        const response = await getRedirectResult(auth);

        if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);

    const signInGooglePopUp = async () => {
        const response = await signInGoogleWPopUp();
        setCurrentUser(response.user);
        const userDocRef = await createUserDocumentFromAuth(response.user);
    };

    const signInEmailAndPassword = async (email, password) => {
        const {user} = await signInUserWithEmailAndPassword(email, password);
        setCurrentUser(user);
    };

    return (
        <div className='authentication-container'>
            {/* <button onClick={signInGooglePopUp}>Sign In Pop Up</button>
            <button onClick={signInGoogleWRedirect}>Sign In Redirect</button> */}
            <SignInForm signInGooglePopUp={signInGooglePopUp} signInEmailAndPassword={signInEmailAndPassword} />
            <SignUpForm />
        </div>
    );
};

export default Authentication;