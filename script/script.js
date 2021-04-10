// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

let arrayofValues = (start, end) => {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
};

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
  let length = getLength();
  if (length === null) {
    return;
  }
  let includeLowercase = confirm("Would you like to include lowercase letters?");;
  let includeUpperCase = confirm("Would you like to include uppercase letters?");;
  let includeNumbers = confirm("Would you like to include numbers?");
  let includeSymbols = confirm("Would you like to include special characters?");
  if (!includeLowercase && !includeUpperCase && !includeNumbers && !includeSymbols) {
    alert("You must choose at least one option");
    writePassword();
  }
  let password = generatePassword(length, includeLowercase, includeUpperCase, includeNumbers, includeSymbols);
  passwordText.value = password;
}



//todo: user cancels
function getLength() {
  var length = prompt("Please enter the length of the password (8 - 128 characters):");
  if (length === null) {
    return;
  }
  if (length < 8 || length > 128) {
    alert("Please enter a number between 8 and 128");
    getLength();
  }
  return length;
}

function generatePassword(length, lowercase, uppercase, numbers, symbols) {
  let charCodes = [];
  if (lowercase) {
    charCodes = charCodes.concat(LOWERCASE);
  }

  if (uppercase) {
    charCodes = charCodes.concat(UPPERCASE);
  }

  if (numbers) {
    charCodes = charCodes.concat(NUMBERS);
  }

  if (symbols) {
    charCodes = charCodes.concat(SYMBOLS);
  }

  const passwordCharacters = [];
  for (let i = 0; i < length; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join('');
}