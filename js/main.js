const form = document.forms.signUp;
const firstNameInput = form.elements.firstName;
const lastNameInput = form.elements.lastName;
const emailInput = form.elements.emailAddress;
const passwordInput = form.elements.password;
const inputErrMsg = document.querySelectorAll('.componentSignup_inputErrMsg');
const btn = form.elements.submit;

btn.addEventListener('click', function() {
    validation();
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
});

form.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        validate(e.target);
    }
});

form.addEventListener('change', function(e) {
    validate(e.target);
});

form.addEventListener('input', function(e) {
    if (isEmpty(e.target)) {
        e.target.classList.remove('error');
        e.target.classList.remove('correct');
        Array.from(inputErrMsg).forEach(ele => {
            ele.innerHTML = '';
        });
    }
});

function validation() {
    nameValidation(firstNameInput);
    nameValidation(lastNameInput);
    emailValidation(emailInput);
    passwordValidation(passwordInput);
}

function validate(input) {
    switch (input.type) {
        case 'text': 
            nameValidation(input);
            break;
        case 'email':
            emailValidation(input);
            break;
        case 'password':
            passwordValidation(input);
            break;
        default:
            break;
    }
}

function nameValidation(name) {
    if (isEmpty(name)) {
        noInputHandler(name);
        return;
    }
    if (!isNameCorrect(name.value)) {
        formatErrorHandler(name);
        return;
    }
    formateCorrectHandler(name);
}

function emailValidation(email) {
    if (isEmpty(email)) {
        noInputHandler(email);
        return;
    }
    if (!isEmailCorrect(email.value)) {
        formatErrorHandler(email);
        return;
    }
    formateCorrectHandler(email);
}

function passwordValidation(password) {
    if (isEmpty(password)) {
        noInputHandler(password);
        return;
    }
    if (!isPasswordCorrect(password.value)) {
        formatErrorHandler(password);
        return;
    }
    formateCorrectHandler(password);
}

function noInputHandler(input) {
    let str = ' cannot be empty';
    input.classList.remove('correct');
    input.classList.add('error');
    switch (input.name) {
        case 'firstName':
            inputErrMsg[0].innerHTML = 'First Name' + str;
            break;
        case 'lastName':
            inputErrMsg[1].innerHTML = 'Last Name' + str;
            break;
        case 'emailAddress':
            inputErrMsg[2].innerHTML = 'Email Address' + str;
            break;
        case 'password':
            inputErrMsg[3].innerHTML = 'Password' + str;
            break;
        default:
            break;
    }
}

function formatErrorHandler(input) {
    let str = 'Looks like that this is not ';
    input.classList.remove('correct');
    input.classList.add('error');
    switch (input.name) {
        case 'firstName':
            inputErrMsg[0].innerHTML = str + 'a first name';
            break;
        case 'lastName':
            inputErrMsg[1].innerHTML = str + 'a last name';
            break;
        case 'emailAddress':
            inputErrMsg[2].innerHTML = str + 'an email';
            break;
        case 'password':
            inputErrMsg[3].innerHTML = str + 'a password';
            break;
        default:
            break;
    }
}

function formateCorrectHandler(input) {
    input.classList.remove('error');
    input.classList.add('correct');
    Array.from(inputErrMsg).forEach(ele => {
        ele.innerHTML = '';
    });
}

function isNameCorrect(name) {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(name);
}

function isEmailCorrect(email) {
    const pattern = /^[\w\-\.]+@[a-zA-Z0-9\-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/;
    return pattern.test(email);
}

function isPasswordCorrect(password) {
    const pattern = /^\w{6,12}$/;
    return pattern.test(password);
}

function isEmpty(input) {
    return input.value === '' ? true : false;
}