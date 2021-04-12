// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

//Fill arrays with code values
let arrayOfValues = (start, end) => {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
};

//Create arrays with codes for different options
const UPPERCASE = arrayOfValues(65, 90);
const LOWERCASE = arrayOfValues(97, 122);
const NUMBERS = arrayOfValues(48, 57);
const SYMBOLS = arrayOfValues(33, 47)
  .concat(arrayOfValues(58, 64))
  .concat(arrayOfValues(91, 96))
  .concat(arrayOfValues(123, 126));

// Add event listener to generate button
generateBtn.addEventListener("click", onGeneratePasswordButtonClick);

// Write password to the #password input
function onGeneratePasswordButtonClick() {
  let passwordOptions = {};

  while (true) {
    getLength(passwordOptions);
    if (!passwordOptions.length) {
      return;
    }
    if (validateLength(passwordOptions)) {
      break;
    }
    alert("Please enter a number between 8 and 128");
  }

  while (true) {
    getOptions(passwordOptions);
    if (validateOptions(passwordOptions)) {
      break;
    }
    alert("You must choose at least one option");
  }

  let password = generatePassword(passwordOptions);
  passwordText.value = password;
}

// Validate options
function validateOptions(passwordOptions) {
  return passwordOptions.lowercase || passwordOptions.uppercase || passwordOptions.numbers || passwordOptions.symbols;
}

// Validate the length of the password
function validateLength(passwordOptions) {
  return passwordOptions.length >= 8 && passwordOptions.length <= 128;
}

// Get length from user input
function getLength(passwordOptions) {
  passwordOptions.length = prompt("Please enter the length of the password (8 - 128 characters):");
}

// Get options for the password generation
function getOptions(passwordOptions) {
  passwordOptions.lowercase = confirm("Would you like to include lowercase letters?");
  passwordOptions.uppercase = confirm("Would you like to include uppercase letters?");
  passwordOptions.numbers = confirm("Would you like to include numbers?");
  passwordOptions.symbols = confirm("Would you like to include special characters?");
}

// Generate password
function generatePassword(passwordOptions) {
  let charCodes = [];

  if (passwordOptions.lowercase) {
    charCodes = charCodes.concat(LOWERCASE);
  }

  if (passwordOptions.uppercase) {
    charCodes = charCodes.concat(UPPERCASE);
  }

  if (passwordOptions.numbers) {
    charCodes = charCodes.concat(NUMBERS);
  }

  if (passwordOptions.symbols) {
    charCodes = charCodes.concat(SYMBOLS);
  }

  let passwordCharacters = [];

  for (let i = 0; i < passwordOptions.length; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join('');
}