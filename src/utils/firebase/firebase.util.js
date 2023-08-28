import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAp3n2ZghJp77kVr5Azo5U_3NDxpqG97zc",
  authDomain: "crwn-clothing-db-14367.firebaseapp.com",
  projectId: "crwn-clothing-db-14367",
  storageBucket: "crwn-clothing-db-14367.appspot.com",
  messagingSenderId: "439753726958",
  appId: "1:439753726958:web:c0af669fd7298225fc4cff"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const signInGoogleWPopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (err) {
      console.log('Create User Firestore Fail.');
    }
  }

  return userDocRef;
};