let runningTotal = 0;
let buffer: any = '0';
let previousOperator: string | null;

const screen = document.querySelector<HTMLElement>('.screen');

function buttonClick(value: any): void {
  if (isNaN(value)) handleSymbol(value);
  else handleNumber(value);

  screen!.innerText = buffer;
}

function handleSymbol(symbol: string) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;

    case '=':
      if (previousOperator === null) {
        return
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;

    case '←':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
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

function handleMath(symbol: string) {
  if (buffer === '0') return;

  const intBuffer = parseFloat(buffer);

  if (runningTotal === 0) runningTotal = intBuffer;
  else flushOperation(intBuffer);

  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer: number) {
  if (previousOperator === '+') {
    runningTotal = Number((runningTotal + intBuffer).toFixed(3));
  } else if (previousOperator === '−') {
    runningTotal = Number((runningTotal - intBuffer).toFixed(3));
  } else if (previousOperator === '×') {
    runningTotal = Number((runningTotal * intBuffer).toFixed(3));
  } else if (previousOperator === '÷') {
    runningTotal = Number((runningTotal / intBuffer).toFixed(3));
  }
}

function handleNumber(value: any) {
  if (buffer === '0') buffer = value;
  else buffer += value;
}

function init() {
  document.querySelector<HTMLElement>('.calc-buttons')!.addEventListener('click', function (event) {
    const input = event.target as HTMLElement;
    buttonClick(input!.innerText);
  })
}

init();

export { }; // Indicates that the file is an ES module
