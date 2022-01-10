import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateEmail, updatePassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirebaseConfig } from './firebase-conf.js';

const auth = getAuth(getFirebaseConfig());

export function isUserLogged(){
    auth.onAuthStateChanged(user => {
        if (user){
            console.log( "user logged in:", user.email);
        } else {
            console.log( "user not logged in");
        }
    });
}

//logIn('abc@abc.com', 'abc123');
export function logIn (email, passwrd) {
    signInWithEmailAndPassword(auth, email, passwrd)
        .then((userCrential) => {
            const user = userCrential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function createUser (email, passwrd) {
    createUserWithEmailAndPassword(auth, email, passwrd)
        .then((userCredential) => {
            const user = userCredential.user;
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
    });
}

export function logOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("signout");
      }).catch((error) => {
        // An error happened.
        console.log("error singing out")
      });
      isUserLogged();
}

export function changeEmail(new_email){
    auth.onAuthStateChanged( user => {
        updateEmail(user, new_email).then(() => {
            console.log("email changed");
            console.log(user.email);
        }).catch((error) => {
            console.log("error changing email");
            console.log(user.email);
        })
    });
}

export function changePass(new_pass){
    auth.onAuthStateChanged( user => {
        updatePassword(user, new_pass).then(() => {
            console.log('password canged for '+ user.email +'!');
        }).catch((error) => {
            console.log("ERROR: User isn't logged in or new password is invalid!");
        })
    });
}

isUserLogged();