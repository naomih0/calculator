let precision = (total) => parseFloat(total.toPrecision(15));

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

function operate(num1, operator, num2) {
    let results;
    switch (operator) {
        case '+':
            results = add(num1, num2);
            return results;
        case '-':
            results = subtract(num1, num2);
            return results;
        case '*':
            results = multiply(num1, num2);
            return results;
        case '/':
            results = divide(num1, num2);
            return results;
        default:
            return 'Invalid operator'
    }
}

const displayScreen = document.querySelector('.display-screen');

const allNumButtons = document.querySelectorAll('.num');
allNumButtons.forEach(button => {
    button.addEventListener('click', displayNumber);
})

const allOperatorButtons = document.querySelectorAll('.operator');

function displayNumber(event) {
    
   let buttonValue = event.target.textContent;
   let updateScreen = displayScreen.textContent;

   displayScreen.textContent = updateScreen + buttonValue;
} 

function clearDisplay(event) {

    displayScreen.textContent = '';
}

function storeOperand() {
    let operand = [];
    
    //if ()
 }


let num1 = 2;
let operator = '+';
let num2 = 1.2;

console.log(operate(num1, operator, num2))


