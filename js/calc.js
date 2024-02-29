let precision = (total) => parseFloat(total.toPrecision(15));
let calculateArray = [];
let currentNumber = '';
let prevPress = '';

function add(num1, num2) {
    let total = num1 + num2;
    return precision(total);
}

function subtract(num1, num2) {
    let total = num1 - num2;
    return precision(total);
}

function multiply(num1, num2) {
    let total = num1 * num2;
    return precision(total);
}

function divide(num1, num2) {
    let total = num1 / num2;
    return precision(total);
}

function operate(array, newOperator) {
    let num1 = parseFloat(array[0])
    let operator = array[1]
    let num2 = parseFloat(array[2])

    let results;
    switch (operator) {
        case '+':
            results = add(num1, num2);
            break
        case '-':
            results = subtract(num1, num2);
            break
        case '*':
            results = multiply(num1, num2);
            break
        case '/':
            results = divide(num1, num2);
            break
        default:
            results = 'Invalid operator'
            break
    }
    console.log('Results:', results)
    if (results !== 'Invalid operator') {
        displayScreen.textContent = results
        if (newOperator !== '=')
            calculateArray = [results, newOperator];
        else {
            calculateArray = [results]
        }
        prevPress = 'operator'
    }
}

const displayScreen = document.querySelector('.display-screen');

const allNumButtons = document.querySelectorAll('.num');
allNumButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (prevPress === 'operator' || prevPress === 'equal') {
            clearDisplay();
            prevPress = ''
            if (calculateArray.length === 1)
                calculateArray = [];
        }
            currentNumber += event.target.textContent;
            displayNumber(event)
            console.log("Num:", currentNumber)
    });
})

const allOperatorButtons = document.querySelectorAll('.operator');
allOperatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        addOperator(event)
        prevPress = 'operator'
    })
})

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click',  (event) => {
    addOperator(event);
    prevPress = 'equal'
});


function displayNumber(event) {
    let buttonValue = event.target.textContent;
    let updateScreen = displayScreen.textContent;


    if (currentNumber === '0' && buttonValue === '0') {

        return;
    }
 
    if (updateScreen === '0' || prevPress === 'operator') {
        displayScreen.textContent = buttonValue;
    } else {

        displayScreen.textContent = updateScreen + buttonValue;
    }
}  

function addOperator(event) {
    let operator = event.target.textContent
    console.log("addOp", operator, currentNumber)

    if (currentNumber !== '') {
        if (calculateArray.length === 0 || calculateArray.length === 2) {
            calculateArray.push(parseFloat(currentNumber));
            currentNumber = '';
        }
    }
    if ((calculateArray.length === 1 && operator !== '=')) {
        calculateArray.push(operator);
    } 
    if ((calculateArray.length === 2 && operator !== '=' && prevPress === 'operator')) {
        calculateArray[1] = operator;
    } 
    

    checkArray(calculateArray, operator);
    
    
  }

function checkArray(calculateArray, operator) {
    console.log('Checkin:', calculateArray)
    if (calculateArray.length === 3) {
        operate(calculateArray, operator)
    }
}

function clearDisplay() {

    displayScreen.textContent = '0'
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', (event) => {
    clearDisplay(event);
    currentNumber = ''
    calculateArray = [];
    console.log('Clear Button:', calculateArray)
    console.log("Clear Num:", currentNumber)
})

const backButton = document.querySelector('.backspace');
backButton.addEventListener('click', backSpace);

function backSpace() {
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1); // Remove the last character
        displayScreen.textContent = currentNumber || '0'; // Update display, if currentNumber is empty, show '0'
    }
    console.log('BackSpace', currentNumber)
}

