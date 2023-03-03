// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB1JPrxI2aOoKpjFNjb_2rwCjUONV4-T60",
    authDomain: "srxvideo-f6c0b.firebaseapp.com",
    projectId: "srxvideo-f6c0b",
    storageBucket: "srxvideo-f6c0b.appspot.com",
    messagingSenderId: "22130892497",
    appId: "1:22130892497:web:64fe05a904653f4b286ff0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;