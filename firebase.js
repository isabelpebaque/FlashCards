// Firebase config
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA2HapSEU3VTzrsdQ64M-1R9n5tUU1Yl6c",
    authDomain: "flashcards-2ae4f.firebaseapp.com",
    databaseURL: "https://flashcards-2ae4f.firebaseio.com",
    projectId: "flashcards-2ae4f",
    storageBucket: "flashcards-2ae4f.appspot.com",
    messagingSenderId: "1037710979114",
    appId: "1:1037710979114:web:86dd0eec311ea1e60c1353",
    measurementId: "G-2P4VT4K0YM"
}
// Initialize firbase connection
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;