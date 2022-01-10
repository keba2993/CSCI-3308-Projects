import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirebaseConfig } from './firebase-conf.js';
import { changeName } from './database.js';
import { changeEmail, changePass, isUserLogged } from './login.js';

const auth = getAuth(getFirebaseConfig());

auth.onAuthStateChanged(user => {
    if (user){
        console.log(user);        
    } else {
        document.getElementById('settingDisplay').style.visibility = "hidden";
        alert("No user is logged in!!");
    }
})

document.getElementById("changeE").addEventListener("click", () => {
    var new_email = document.getElementById('emailField').value;
    console.log(new_email);
    changeEmail(new_email);
    alert("New email applied");

}); 

document.getElementById("changeU").addEventListener("click", () => {
    auth.onAuthStateChanged(user => {
        if (user){
            //display username password and email
            console.log(user);
            var new_userName = document.getElementById('userField').value;
            changeName(new_userName);
            alert("New username applied");

        } else {
            document.getElementById('settingDisplay').style.visibility = "hidden";
            alert("No user is logged in!!");
        }
    })
}); 

document.getElementById("changeP").addEventListener("click", () => {
    var new_password = document.getElementById('passwordField').value;
    console.log(new_password);
    changePass(new_password);
    alert("New password applied");

}); 