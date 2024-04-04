import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAnKnScjDc7ovrLA-0onOHhJBX8o8IxLBY",
    authDomain: "ddrela-filfor-rodrig-yujingzh.firebaseapp.com",
    projectId: "ddrela-filfor-rodrig-yujingzh",
    storageBucket: "ddrela-filfor-rodrig-yujingzh.appspot.com",
    messagingSenderId: "379588591673",
    appId: "1:379588591673:web:d82589a970f78108954de8",
    measurementId: "G-2TZ06LVBJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};