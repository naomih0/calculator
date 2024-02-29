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
    let total = num1 / num2;
    return precision(total);
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

        if (prevPress === 'operator' || prevPress === 'equal') {
            clearDisplay(); 
            prevPress = ''; 

            if (calculateArray.length === 1) {
                calculateArray = []; // Clear the array if it has the previous result and user click on new number 
            };
        };
            
            currentNumber += event.target.textContent; // Concatenate the clicked number to the currentNumber 
            displayNumber(event) // Display the current number

            console.log("Num:", currentNumber)
    });
});

const allOperatorButtons = document.querySelectorAll('.operator'); // Buttons: +, -, *, /
allOperatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        addOperatorToArray(event); 
        prevPress = 'operator';
    });
});

const equalButton = document.querySelector('.equal'); 
equalButton.addEventListener('click',  (event) => {

    addOperatorToArray(event);
    prevPress = 'equal';
});

// FIX IT: Bug: Displaying multiple 0s when pressing 0 multiple times, then a number, then backspace; ex: 00005
function displayNumber(event) {
    let numberValue = event.target.textContent; // Value of pressed number button
    let updateScreen = displayScreen.textContent; // Current value that on the display screen 
 
     // Prevents displaying multiple zeros; Replace initial '0' with starting number OR display second number after operator press
    if (updateScreen === '0' || prevPress === 'operator') {
        displayScreen.textContent = numberValue;
    }

    else {
        displayScreen.textContent = updateScreen + numberValue;  // Concatenate the number on screen with the press number
    };
};


function addOperatorToArray(event) {
    let operator = event.target.textContent; // Value of the pressed operator button

    console.log("addOp", operator, currentNumber)

    // Adds the number pressed to array when operator or equal button is pressed
    if (currentNumber !== '') {

        if (calculateArray.length === 0 || calculateArray.length === 2) { // numbers can only be first or third element in array
            calculateArray.push(parseFloat(currentNumber));
            currentNumber = ''; 
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

    checkArray(calculateArray, operator); 
};

function checkArray(calculateArray, operator) {
    console.log('Checkin:', calculateArray)

    if (calculateArray.length === 3) {
        operate(calculateArray, operator) // Calcuates when array reaches 3 element
    };
};

function clearDisplay() {
    displayScreen.textContent = '0'; 
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', (event) => {

    clearDisplay(event);
    currentNumber = '';
    calculateArray = [];

    console.log('Clear Button:', calculateArray)
    console.log("Clear Num:", currentNumber)
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

