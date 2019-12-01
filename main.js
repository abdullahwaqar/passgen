//* DOM elements
const result = document.getElementById('result');
const passwordLength = document.getElementById('passwordLength');
const lengthIndicator = document.getElementById('lengthIndicator');
const regenBtn = document.getElementById('regen');
const copyItBtn = document.getElementById('copyIt');
const notification = document.getElementById('notification');

//* Event listeners
document.addEventListener('DOMContentLoaded', function() {
    passwordLength.value = 8;
    notification.style.display = 'none';
});

passwordLength.addEventListener('input', function() {
    lengthIndicator.innerText = passwordLength.value;

    setResult(generatePassword(passwordLength.value));
});

regenBtn.addEventListener('click', function() {
    setResult(generatePassword(passwordLength.value));
});

copyItBtn.addEventListener('click', function() {
    const textarea = document.createElement('textarea');
    const password = result.value;
    if (!password) return;
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    //* Dispatch notification
    notification.style.display = 'block';
    setInterval(() => {
        notification.style.display = 'none';
    }, 2000);
});

const randomFunction = [getRandomLower, getRandomUpper, getRandomNumber, getRandomSymbol];

//* Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = `!@#$%^&*~<>?`;
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(passwordLength) {
    let generatedPassword = [];
    for (let i = 0; i < passwordLength; ++i) {
        generatedPassword.push(randomFunction[Math.floor(Math.random() * randomFunction.length)]());
    }
    return generatedPassword.join('');
}

function setResult(password) {
    result.value = null; //* reset
    result.value = password;
}
//* for inital render
setResult(generatePassword(8));
