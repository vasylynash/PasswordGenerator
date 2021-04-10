// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

//Fill arrays with code vaclues
let arrayofValues = (start, end) => {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
};

//Create arrays with codes for different options
const UPPERCASE = arrayofValues(65, 90);
const LOWERCASE = arrayofValues(97, 122);
const NUMBERS = arrayofValues(48, 57);
const SYMBOLS = arrayofValues(33, 47)
  .concat(arrayofValues(58, 64))
  .concat(arrayofValues(91, 96))
  .concat(arrayofValues(123, 126));

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  let password = generatePassword();
  if (password === null) {
    return;
  }
  passwordText.value = password;
}

//TODO: user cancels
function getLength() {
  var length = prompt("Please enter the length of the password (8 - 128 characters):");
  if (length === null) {
    return null;
  }
  if (length < 8 || length > 128) {
    alert("Please enter a number between 8 and 128");
    return getLength();
  }
  return length;
}

//Get options for the password generation
function getOptions() {
  let options = {};
  options.lowercase = confirm("Would you like to include lowercase letters?");
  options.uppercase = confirm("Would you like to include uppercase letters?");
  options.numbers = confirm("Would you like to include numbers?");
  options.symbols = confirm("Would you like to include special characters?");
  if (!options.lowercase && !options.uppercase && !options.numbers && !options.symbols) {
    alert("You must choose at least one option");
    return getOptions();
  }
  return options;
}

//Generate password
function generatePassword() {
  let length = getLength();
  if (length === null) {
    return null;
  }
  let options = getOptions();
  let charCodes = [];

  if (options.lowercase) {
    charCodes = charCodes.concat(LOWERCASE);
  }

  if (options.uppercase) {
    charCodes = charCodes.concat(UPPERCASE);
  }

  if (options.numbers) {
    charCodes = charCodes.concat(NUMBERS);
  }

  if (options.symbols) {
    charCodes = charCodes.concat(SYMBOLS);
  }

  let passwordCharacters = [];

  for (let i = 0; i < length; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join('');
}