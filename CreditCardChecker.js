// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
// Function to check if Credit Card number is valid based on Luhn algorithm
const validateCred = array => {
  let finalSum =0;
  for (let i = array.length -1 ; i>=0 ; i--) {
    if ((array.length - 1 - i) % 2 === 1) {
      if (array[i]*2 > 9) {
        finalSum = finalSum + array[i]*2 - 9;
      } else {
        finalSum = finalSum + array[i]*2;
      };
    } else {
      finalSum = finalSum + array[i];
    };
  };
  return finalSum % 10 === 0;
};

// Function to return nested array of invalid cards
const findInvalidCards = batchArray => {
  let invalidArray = batchArray.filter (cardNo => {
    return !validateCred(cardNo);
  });
  return invalidArray;
};

// Function to return array of companie(s) which issue invalid card(s)
const idInvalidCardCompanies = invalidCards => {
  const companyList = [];
  for (const cardNo of invalidCards) {
    let companyName;
    switch (cardNo[0]) {
      case 3:
        companyName = 'Amex';
        break;
      case 4:
        companyName = 'Visa';
        break;
      case 5:
        companyName = 'Mastercard';
        break;
      case 6:
        companyName = 'Discover';
        break;
      default:
        companyName = 'Company not found';
        break;      
    };
    if (!companyList.includes(companyName)) {
      companyList.push(companyName);
    };
  };
  return companyList;
};

//console.log(validateCred(valid1)); // Should print true
//console.log(validateCred(invalid1)); // Should print false

//console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Shouldn't print anything
//console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers
//console.log(idInvalidCardCompanies(findInvalidCards([invalid1, invalid2, valid3, invalid4, invalid5]))); // Should print ['Visa', 'Mastercard', 'Discover']

//Function to convert string to array of digits
const convert = string => {
  let numberArray = [];
  for (let i = 0; i < string.length; i++) {
    numberArray.push(parseInt(string[i]));
  };
  return numberArray;
};
//console.log(convert('123456789')); // Should print [1,2,3,4,5,6,7,8,9]

//Function to convert invalid to valid numbers - by changing the checking digit
const updateNumber = array => {
  if (validateCred(array)) {
    return 'This number is valid';
  } else {
    let finalSum = 0;
    for (let i = array.length - 2 ; i>=0 ; i--) {
      if ((array.length - 1 - i) % 2 === 1) {
        if (array[i]*2 > 9) {
          finalSum = finalSum + array[i]*2 - 9;
        } else {
          finalSum = finalSum + array[i]*2;
        };
      } else {
        finalSum = finalSum + array[i];
      };
    };
    let newLastDigit;
    if (finalSum % 10 === 0) {
      newLastDigit = 0;
    } else {
      newLastDigit = 10 - (finalSum % 10);
    };
    array.pop();
    array.push(newLastDigit);
    let newValidNo = array;
    return newValidNo;
  };
};

//console.log(updateNumber(invalid1)); //Should print [4,5,3,2,7,7,8,7,7,1,0,9,1,7,9,0]
//let updatedInvalid1 = updateNumber(invalid1);
//console.log(validateCred(updatedInvalid1)); // Should print true