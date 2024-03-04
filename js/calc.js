// Global Variables
let calculateArray = [];
let currentNumber = '';
let prevPress = ''; 

let precision = (total) => parseFloat(total.toPrecision(15));

// Basic Operator Functions : +, -, *, /
function add(num1, num2) {
    let total = num1 + num2;
    return precision(total);
};

function subtract(num1, num2) {
    let total = num1 - num2;
    return precision(total);
};

function multiply(num1, num2) {
    let total = num1 * num2;
    return precision(total);
};

function divide(num1, num2) {
    if (num1 === 0 && num2 === 0) {
        return 'Don\'t divide by zero!';
    }
    else {
        let total = num1 / num2;
        return precision(total);
    };
};

// finalArray is calculateArray with three elements; newOperator is the operator that trigger this function
function operate(finalArray, newOperator) { 
    // Extracts the numbers and operator from the array
    let num1 = parseFloat(finalArray[0]);
    let operator = finalArray[1];
    let num2 = parseFloat(finalArray[2]);

    let results;

    switch (operator) {
        case '+':
            results = add(num1, num2); 
            break;
        case '-':
            results = subtract(num1, num2);
            break;
        case '*':
            results = multiply(num1, num2);
            break;
        case '/':
            results = divide(num1, num2);
            break;
        default:
            results = 'Invalid operator' // old test ; Delete later
            break;
    };

    console.log('Results:', results) 

    if (results !== 'Invalid operator') {
        displayScreen.textContent = results; // Updates display with results

        if (newOperator !== '=') 
            calculateArray = [results, newOperator]; // Allows the calculator to chain calculations: (ex: [6, '-'])

        else {
            calculateArray = [results];
            prevPress = 'operator';
        };
    };
};


const displayScreen = document.querySelector('.display-screen');

const allNumButtons = document.querySelectorAll('.num'); // Buttons: 0-9
allNumButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        newNumber(); // Checks if user input prompts a new number 
        displayNumber(event.target.textContent); // Display the current number
    });
});

const allOperatorButtons = document.querySelectorAll('.operator'); // Buttons: +, -, *, /
allOperatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        addOperatorToArray(event.target.textContent); 
        prevPress = 'operator';
    });
});

const equalButton = document.querySelector('.equal'); 
equalButton.addEventListener('click',  (event) => {

    addOperatorToArray(event.target.textContent);
    prevPress = 'equal';
});


function displayNumber(numberValue) {
    // let numberValue = event.target.textContent; // Value of pressed number button
    let updateScreen = displayScreen.textContent; // Current value that on the display screen 
 
    let hasDecimalPoint = updateScreen.includes('.'); 

    // Prevents displaying multiple zeros; Replace initial '0' with starting number OR display second number after operator press
    if (updateScreen === '0' || prevPress === 'operator') {
       displayScreen.textContent = numberValue;

        if (numberValue === '.') { // Checks if user press '.' if screen has 0
            displayScreen.textContent = '0' + numberValue; // If yes, it does '0.'
        }

        else if (prevPress === 'decimal') {
            displayScreen.textContent = updateScreen + numberValue; // Concatenate a number after '0.'
        }

        else {
            displayScreen.textContent = numberValue;
        };
    }

    else if (numberValue === '.' && hasDecimalPoint) {
        return; // Prevents more then 1 '.'
    }

    else {
        displayScreen.textContent = updateScreen + numberValue;  // Concatenate the number on screen with the pressed number
    };

    // Max number of 20 slots, if more cuts it out
    if (displayScreen.textContent.length > 20) {

        displayScreen.textContent = displayScreen.textContent.slice(0, 20);
        return;
    };

    currentNumber = updateScreen === '0' ? numberValue : currentNumber + numberValue; // Concatenate the clicked number to the currentNumber 
    console.log("Num:", currentNumber)
};


function addOperatorToArray(operator) {
    // let operator = event.target.textContent; // Value of the pressed operator button

    console.log("addOpKEY", operator, currentNumber)

    // Adds the number pressed to array when operator or equal button is pressed
    if (currentNumber !== '') {

        if (currentNumber === '.') { // Makes 0. into 0 in array
            currentNumber = '0';
        }

        if (calculateArray.length === 0 || calculateArray.length === 2) { // Numbers can only be first or third element in array
            calculateArray.push(parseFloat(currentNumber));
        };
    };

    // Pushes operator to array if a first number exists
    if ((calculateArray.length === 1 && operator !== '=')) {
        calculateArray.push(operator);
    };

    // Allows for users to change operators midway through
    if ((calculateArray.length === 2 && operator !== '=' && prevPress === 'operator')) {
        calculateArray[1] = operator; // Updates operator
    };

    currentNumber = ''; 
    checkArray(calculateArray, operator); 
};

function checkArray(calculateArray, operator) {
    console.log('Checkin:', calculateArray)
    console.log(operator)


    if (calculateArray.length === 3) {
        operate(calculateArray, operator) // Calcuates when array reaches 3 element
    };
};

function clearDisplay() {
    displayScreen.textContent = '0'; 
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {

    clearDisplay();
    currentNumber = '';
    calculateArray = [];
});

const backButton = document.querySelector('.backspace');
backButton.addEventListener('click', backSpace);

function backSpace() {

    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1); // Remove the last character
        displayScreen.textContent = currentNumber || '0'; // Update display, if currentNumber is empty, show '0'
    };

    console.log('BackSpace', currentNumber)
};

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', (event) => {

    newNumber();
    displayNumber(event.target.textContent);
    prevPress = 'decimal';
});

const percentageButton = document.querySelector('.percentage');
percentageButton.addEventListener('click', numberToPercent)

function numberToPercent() {
    let updateScreen = displayScreen.textContent; // Current value that on the display screen 
 
    let convertNumber = (updateScreen / 100)

    currentNumber = convertNumber;
    displayScreen.textContent = currentNumber;
    
    // Updates the array with new number
    if (calculateArray.length === 1) {
        calculateArray[0] = currentNumber;
    } 

    else if (calculateArray.length === 2) {
        calculateArray[2] = currentNumber;
    };

    console.log('Percent:', currentNumber)
};

const negativeButton = document.querySelector('.negative');
negativeButton.addEventListener('click', negativeConvert);

function negativeConvert() {
    let updateScreen = displayScreen.textContent; // Current value that on the display screen 

    let convertNegative = '';

    if (updateScreen.includes('-')) {

        convertNegative = updateScreen.replace('-', '');
        currentNumber = convertNegative;
        displayScreen.textContent = currentNumber;
    }

    else {

        convertNegative = '-' + updateScreen;
        currentNumber = convertNegative;
        displayScreen.textContent = currentNumber;
    };

    console.log('Neg Con', currentNumber)
};

function newNumber() {

    if (prevPress === 'operator' || prevPress === 'equal') {
        clearDisplay(); 
        prevPress = ''; 

        if (calculateArray.length === 1) {
            calculateArray = []; // Clear the array if it has the previous result and user click on new number 
        };
    };
};


// Keyboard Function

// All Clear
document.addEventListener('keydown', function(event) {

    if (event.key === 'c') {
        clearDisplay();
        currentNumber = '';
        calculateArray = [];
    };
});

// Negative Button
document.addEventListener('keydown', function(event) {

    if (event.key === 'n') {
        negativeConvert();
    };
});

// Percent Button
document.addEventListener('keydown', function(event) {

    if (event.key === '%') {
        numberToPercent();
    };
});

// Back Button
document.addEventListener('keydown', function(event) {

    if (event.key === 'Backspace') {
        backSpace();
    };
});

// Decimal Button
document.addEventListener('keydown', function(event) {

    if (event.key === '.') {
        newNumber();
        displayNumber(event.key);
        prevPress = 'decimal';
    };
});

// Equal Button
document.addEventListener('keydown', function(event) {

    if (event.key === '=' || event.key === 'Enter') {
        event.preventDefault(); 
        addOperatorToArray('=');
        prevPress = 'equal';
    };
});

// Operator Buttons 
document.addEventListener('keydown', function(event) {

    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        addOperatorToArray(event.key); 
        prevPress = 'operator';
    };
});

// Number Buttons 
document.addEventListener('keydown', function(event) {

    if (event.key >= '0' && event.key <= '9') {
        newNumber();
        displayNumber(event.key); 
    };
});

