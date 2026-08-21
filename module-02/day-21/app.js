// DOM Elements
const form = document.getElementById('form');
const phoneInput = document.getElementById('phone');
const nameInput = document.getElementById('name');
const errorMsg = document.getElementById('form-error');
const successMsg = document.getElementById('form-success');
const signupCountMsg = document.getElementById('signup-count');

const formhandler = (event) => { 
    event.preventDefault(); 
    
    let phone = phoneInput.value; 
    let name = nameInput.value; 
    let phone_validate = /^(?:\+251|0)(?:9|7)\d{8}$/; 
    let name_validator = /^[a-zA-Z\s -]+$/; 

    // Reset old messages
    errorMsg.textContent = '';
    successMsg.textContent = '';

    if (!phone_validate.test(phone)){ 
        errorMsg.textContent = 'phone number is not correct'; 
        return; 
    }

    if (!name_validator.test(name)){ 
        errorMsg.textContent = 'name format is not correct'; 
        return; 
    } 
    
    // If valid
    let signups = JSON.parse(localStorage.getItem('signups')) || []; 
    signups.push({ phone, name }); 
    localStorage.setItem('signups', JSON.stringify(signups)); 
    
    successMsg.textContent = 'name and phone number have been stored in local storage'; 
    form.reset(); 

    // Update the signup count text dynamically
    signupCountMsg.textContent = `${signups.length} people have signed up.`;
}; 

form.addEventListener('submit', formhandler); 

window.addEventListener('load', () => { 
    let signups = JSON.parse(localStorage.getItem('signups')) || []; 
    signupCountMsg.textContent = `${signups.length} people have signed up.`; 
});