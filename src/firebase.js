import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.REACT_APP_FIREBASE_ADD_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

const app = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

export const auth = app.auth()
export const prov = provider
export default app