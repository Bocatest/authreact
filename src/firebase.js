import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyA_Ae3brZ3e5SSyogN3zULT0E27CqWlbEY",

  authDomain: "vhiti-80fb1.firebaseapp.com",

  databaseURL: "https://vhiti-80fb1-default-rtdb.firebaseio.com",

  projectId: "vhiti-80fb1",

  storageBucket: "vhiti-80fb1.appspot.com",

  messagingSenderId: "737380106115",

  appId: "1:737380106115:web:5309a92baad9bc927040b6",

  measurementId: "G-7EJH19PR99"

};

const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


export const db = getFirestore(app);

