import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirebaseConfig } from './firebase-conf.js';
import { getName } from './database.js';

import { isUserLogged, logOut } from './login.js';

const auth = getAuth(getFirebaseConfig());

auth.onAuthStateChanged(user => {
    if (user){
        document.getElementById('signModal').hidden = true;
        document.getElementById('loginModal').hidden = true;
        document.getElementById('loggedIn').classList.add("visible");
        document.getElementById('loggedIn').classList.remove("invisible");
        getName();
    } else {
        document.getElementById('signModal').hidden = false;
        document.getElementById('loginModal').hidden = false;
        document.getElementById('loggedIn').classList.add("invisible");
        document.getElementById('loggedIn').classList.remove("visible");
    }
})

document.getElementById("logout").addEventListener("click", () => {
  logOut();
}); 
