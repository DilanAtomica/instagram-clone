import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC2IuKWIAOeWZgsYGPp2HQcmKD6jyiljdc",
    authDomain: "instagram-clone2-739df.firebaseapp.com",
    projectId: "instagram-clone2-739df",
    storageBucket: "instagram-clone2-739df.appspot.com",
    messagingSenderId: "684234141078",
    appId: "1:684234141078:web:2507167db5da119bebc1b7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

export {auth, db, storage};