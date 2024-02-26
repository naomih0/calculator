
function operate(array) {
    console.log('yep', o)
    let num1 = parseFloat(array[0])
    let operator = array[1]
    let num2 = parseFloat(array[2])

    let results;
    switch (operator) {
        case '+':
            results = add(num1, num2);
            displayResults(results)
            console.log(results)
            return results;
        case '-':
            results = subtract(num1, num2);
            o = []; // clears array
            o.push(results) 
            console.log(results)
            return results;
        case '*':
            results = multiply(num1, num2);
            o = []; // clears array
            o.push(results) 
            console.log(results)
            return results;
        case '/':
            results = divide(num1, num2);
            o = []; // clears array
            o.push(results) 
            console.log(results)
            return results;
        default:
            return 'Invalid operator'
    }
}

const displayScreen = document.querySelector('.display-screen');

let buttonClick = false;
const allNumButtons = document.querySelectorAll('.num');
allNumButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (buttonClick) {
            clearDisplay(event)
            displayNumber(event)
            buttonClick = false;
        } else {
            displayNumber(event)
        }
    });
})

const allOperatorButtons = document.querySelectorAll('.operator');
allOperatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        buttonClick = true
        storeStuff(event)
    })
})

const equalButton = document.querySelector('.equal')
equalButton.addEventListener('click', checkArray)

function displayNumber(event) {
    
   let buttonValue = event.target.textContent;
   let updateScreen = displayScreen.textContent;

   displayScreen.textContent = updateScreen + buttonValue;
} 

function clearDisplay(event) {

    displayScreen.textContent = '';
}


function storeStuff(event) {
    let display = displayScreen.textContent.trim();
    let op = event.target.textContent;

    // Check if the last element in the array is a number
    if (typeof o[o.length - 1] === 'number') {
        // If it is, only add the operator
        o.push(op);
    } else {
        // If not, add both display and operator
        o.push(display, op);
    }

    // Check if the array length exceeds 3
    if (o.length > 3) {
        // If it does, remove the newest element
        o.splice(3);
    }

    if (o.length === 3) {
        operate(o);
    }
    console.log(o)
}

function checkArray() {
    let display = displayScreen.textContent.trim();

    o.push(display)

    if (o.length === 3) {
        operate(o);
        console.log(o)
    }
}

function displayResults(results) {
    o = []; // clears array
    o.push(results) 

    displayScreen.textContent = results;
}

