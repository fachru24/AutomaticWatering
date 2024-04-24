import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5netsTczbrRwXoVZKmHNad0zC4UoRQ8I",
    authDomain: "apw-test-v00.firebaseapp.com",
    databaseURL: "https://apw-test-v00-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "apw-test-v00",
    storageBucket: "apw-test-v00.appspot.com",
    messagingSenderId: "716241446243",
    appId: "1:716241446243:web:2157eb03b27ee30729df56"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set, update, app };