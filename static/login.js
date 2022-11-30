function setFormMessage(formElement, type, message){
    const messageElement = formElement.querySelector(".formMessage");
    messageElement.textContent = message;
    messageElement.classList.remove("formMessage--success", "formMessage--error");
    messageElement.classList.add('formMessage--${type}');
}

function inputError(inputElement, message){
    inputElement.classList.add("formInputError");
    inputElement.parentElement.querySelector(".formInputErrorMessage").textContent = message;
}
function clearInputError(inputElement){
    inputElement.classList.remove("formInputError");
    inputElement.parentElement.querySelector(".formInputErrorMessage").textContent = "";
}

// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.querySelector("#login");
//     const createAccountForm= document.querySelector("#createAccount");
//     // document.querySelector("#createAccountLink").addEventListener("click", e => {
//     //     e.preventDefault();
//     //     loginForm.classList.add("hideForm");
//     //     createAccountForm.classList.remove("hideForm");
//     // });
//     // document.querySelector("#loginLink").addEventListener("click", e => {
//     //     e.preventDefault();
//     //     createAccountForm.classList.add("hideForm");
//     //     loginForm.classList.remove("hideForm");
//     // });
//     loginForm.addEventListener("submit", e =>{
//         e.preventDefault();

//         setFormMessage(loginForm, "error", "Invalid username or password combination")
//     });
    
// })
async function login(){
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const body = JSON.stringify({username, password})
    const headers = {'content-Type': 'application/json'}
    const response = await fetch('/login', {method: 'POST', body, headers})
    const data = await response.json();
}
async function register(){
    const registerUsername = document.getElementById("registerUsername").value;
    const registerEmail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const body = JSON.stringify({registerUsername, registerPassword,registerEmail})
    const headers = {'content-Type': 'application/json'}
    const response = await fetch('/register', {method: 'POST', body, headers})
    const data = await response.json();
}
