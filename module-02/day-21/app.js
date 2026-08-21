// DOM Elements
const form = document.getElementById('form');
const phoneInput = document.getElementById('phone');
const nameInput = document.getElementById('name');

const phoneError = document.getElementById('phone-error');
const nameError = document.getElementById('name-error');
const successMsg = document.getElementById('form-success');
const signupCountMsg = document.getElementById('signup-count');

const formhandler = (event) => { 
    event.preventDefault(); 
    
    let phone = phoneInput.value; 
    let name = nameInput.value; 
    let phone_validate = /^(?:\+251|0)(?:9|7)\d{8}$/; 
    let name_validator = /^[a-zA-Z\s -]+$/; 

    // Reset previous errors and success messages
    phoneError.textContent = '';
    nameError.textContent = '';
    successMsg.textContent = '';

    let hasError = false;

    // Check Phone Validation
    if (!phone_validate.test(phone)){ 
        phoneError.textContent = 'phone number is not correct'; 
        hasError = true;
    }

    // Check Name Validation
    if (!name_validator.test(name)){ 
        nameError.textContent = 'name format is not correct'; 
        hasError = true;
    } 

    // Stop if there is any error
    if (hasError) return;
    
    // Save to LocalStorage if valid
    let signups = JSON.parse(localStorage.getItem('signups')) || []; 
    signups.push({ phone, name }); 
    localStorage.setItem('signups', JSON.stringify(signups)); 
    
    successMsg.textContent = 'name and phone number have been stored in local storage'; 
    form.reset(); 

    // Update signup count
    signupCountMsg.textContent = `${signups.length} people have signed up.`;
}; 

form.addEventListener('submit', formhandler); 

window.addEventListener('load', () => { 
    let signups = JSON.parse(localStorage.getItem('signups')) || []; 
    signupCountMsg.textContent = `${signups.length} people have signed up.`; 
});