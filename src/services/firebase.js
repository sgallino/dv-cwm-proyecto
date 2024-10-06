// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFRDPCxZfOT7hKgYHX_Xf2vfABW_3rgBk",
  authDomain: "dv-app-ejemplo-206d3.firebaseapp.com",
  projectId: "dv-app-ejemplo-206d3",
  storageBucket: "dv-app-ejemplo-206d3.appspot.com",
  messagingSenderId: "1080684436796",
  appId: "1:1080684436796:web:3495ed5515c022b6f1d239"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();

export const storage = getStorage();