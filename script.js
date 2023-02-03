let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      runningTotal = 0;
      buffer = '0';
      break;
    case '=':
      if (previousOperator === null) {
        return
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      runningTotal = 0;
      buffer = runningTotal;
      break;
    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.toString(0, buffer.length - 1);
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

export { }; // Indicates that the file is an ES module
