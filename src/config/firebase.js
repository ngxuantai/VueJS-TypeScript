import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWP3ix9LgKU7FYsyOLuqqdoFyErEDf4vY",
  authDomain: "vue-ts-27806.firebaseapp.com",
  projectId: "vue-ts-27806",
  storageBucket: "vue-ts-27806.appspot.com",
  messagingSenderId: "964243766593",
  appId: "1:964243766593:web:5c36f2a11b4863cff335c0",
};

const app = initializeApp(firebaseConfig);

const projectAuth = getAuth(app);
const projectFirestore = getFirestore(app);

const timestamp = serverTimestamp();

export { projectAuth, projectFirestore, timestamp };
