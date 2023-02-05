"use strict";
// exports.__esModule = true;
var runningTotal = 0;
var buffer = '0';
var previousOperator;
var screen = document.querySelector('.screen');
function buttonClick(value) {
    if (isNaN(value))
        handleSymbol(value);
    else
        handleNumber(value);
    screen.innerText = buffer;
}
function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}
function handleMath(symbol) {
    if (buffer === '0')
        return;
    var intBuffer = parseFloat(buffer);
    if (runningTotal === 0)
        runningTotal = intBuffer;
    else
        flushOperation(intBuffer);
    previousOperator = symbol;
    buffer = '0';
}
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal = Number((runningTotal + intBuffer).toFixed(3));
    }
    else if (previousOperator === '−') {
        runningTotal = Number((runningTotal - intBuffer).toFixed(3));
    }
    else if (previousOperator === '×') {
        runningTotal = Number((runningTotal * intBuffer).toFixed(3));
    }
    else if (previousOperator === '÷') {
        runningTotal = Number((runningTotal / intBuffer).toFixed(3));
    }
}
function handleNumber(value) {
    if (buffer === '0')
        buffer = value;
    else
        buffer += value;
}
function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        var input = event.target;
        buttonClick(input.innerText);
    });
}
init();
