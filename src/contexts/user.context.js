import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

export const UserContext = createContext({
    currentUser: '',
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        signOutUser();

        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
            console.log('Sign In..' + user);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
};