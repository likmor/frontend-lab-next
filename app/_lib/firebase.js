// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2BcTH1Vqiew81qlJf83lMkqD71TDxon8",
  authDomain: "frontend-lab-next.firebaseapp.com",
  projectId: "frontend-lab-next",
  storageBucket: "frontend-lab-next.firebasestorage.app",
  messagingSenderId: "444133666138",
  appId: "1:444133666138:web:892d2da829472e5c691763"
};
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();