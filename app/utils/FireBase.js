import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAbHE-TKzwdRhEkSKL3gDuAZFEff7Rlt-w",
    authDomain: "cucharas-doradas.firebaseapp.com",
    databaseURL: "https://cucharas-doradas.firebaseio.com",
    projectId: "cucharas-doradas",
    storageBucket: "cucharas-doradas.appspot.com",
    messagingSenderId: "233195791124",
    appId: "1:233195791124:web:4d46e592c0360970ded801"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
