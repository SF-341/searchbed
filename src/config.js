import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAyXO08zGzzsfnRMHJIvnHJZ4On_Dj8R7U",
    authDomain: "searchbed-d2c6b.firebaseapp.com",
    projectId: "searchbed-d2c6b",
    storageBucket: "searchbed-d2c6b.appspot.com",
    messagingSenderId: "748247253136",
    appId: "1:748247253136:web:3d50ee30934b8a88125815",
    measurementId: "G-E60MXB6VDP"
});


export default firebaseConfig;