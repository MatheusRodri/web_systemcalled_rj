import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAw_TzOfRsdPVM5KNIrXY878dorPLyOTCM",
    authDomain: "web-systemcalled-rj.firebaseapp.com",
    projectId: "web-systemcalled-rj",
    storageBucket: "web-systemcalled-rj.appspot.com",
    messagingSenderId: "786758247858",
    appId: "1:786758247858:web:fd39c0598fb613a53c70ab",
    measurementId: "G-HEQPQN0QKQ"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};