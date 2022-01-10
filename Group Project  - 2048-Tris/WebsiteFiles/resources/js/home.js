import { changeName } from './database.js';
import { isUserLogged, logIn, createUser, logOut } from './login.js';

var loginButton = document.getElementById("my_submit_button2")
var signupButton = document.getElementById("my_submit_button")

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  var email = document.getElementById("email2").value;
  var password = document.getElementById("psw2").value;
  logIn(email, password);
  //check if login worked
  //if worked then hide login and sign up show username drop down
  $('#myModal2').modal('hide');
})

signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("psw").value;
  var uName = document.getElementById("username").value;

  createUser(email, password);
  changeName(uName);
  
  //if it worked then close modal otherwise send error
  $('#myModal').modal('hide');
})

function openModal() {
  var myInput = document.getElementById("psw");
  var confirmMyInput = document.getElementById("cpsw");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  var match = document.getElementById("match");

  // When the user starts to type something inside the password field
  myInput.onkeyup = function () {
    var lowerCaseLetters = /[a-z]+/g; 
    var upperCaseLetters = /[A-Z]+/g; 
    var numbers = /[0-9]+/g; 
    var minLength = 6; 

    // Validate lowercase letters
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= minLength) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };

  confirmMyInput.onkeyup = function () {
    // Validate password and confirmPassword
    var passEqualsConfPass = confirmMyInput.value === myInput.value;
    if (passEqualsConfPass) {
      match.classList.remove("invalid");
      match.classList.add("valid");
    } else {
      match.classList.remove("valid");
      match.classList.add("invalid");
    }

    // Disable or Enable the button based on the elements in classList
    enableButton(letter, capital, number, length, match);
  };
}

function openModalLogin() {

}

function enableButton(letter, capital, number, length, match) {
  var button = document.getElementById("my_submit_button");
  var condition = letter.classList.contains("valid") && 
                  capital.classList.contains("valid") && 
                  number.classList.contains("valid") && 
                  length.classList.contains("valid") && 
                  match.classList.contains("valid");
  if (condition) {
    button.disabled = false;
  }
}
