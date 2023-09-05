import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
  query
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAp3n2ZghJp77kVr5Azo5U_3NDxpqG97zc",
  authDomain: "crwn-clothing-db-14367.firebaseapp.com",
  projectId: "crwn-clothing-db-14367",
  storageBucket: "crwn-clothing-db-14367.appspot.com",
  messagingSenderId: "439753726958",
  appId: "1:439753726958:web:c0af669fd7298225fc4cff"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInGoogleWPopUp = () => signInWithPopup(auth, googleProvider);
export const signInGoogleWRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = await collection(db, collectionKey);

  const batch = writeBatch(db);
  objectToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = await collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, doc) => {
    const {title, items} = doc.data();
    accumulator[title.toLowerCase()] = items;

    return accumulator;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async(userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    try {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (err) {
      console.log('Create User Firestore Fail.');
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);