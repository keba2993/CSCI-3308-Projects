import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCYOGRe8ddWM3WeOTBhG2w-gH0XE9XjmNw",
    authDomain: "tris-aaa12.firebaseapp.com",
    databaseURL: "https://tris-aaa12-default-rtdb.firebaseio.com",
    projectId: "tris-aaa12",
    storageBucket: "tris-aaa12.appspot.com",
    messagingSenderId: "528072067339",
    appId: "1:528072067339:web:827244dc7a02dabf893a0e",
    measurementId: "G-WMFCC6MCYN"
});

export function getFirebaseConfig() {
    return firebaseApp;
}