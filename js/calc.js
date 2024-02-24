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

