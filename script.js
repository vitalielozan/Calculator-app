const display = document.getElementById('inputDisplay');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    button.classList.toggle('pressed');
    setTimeout(() => {
      button.classList.remove('pressed');
    }, 100);

    if (action === 'number') {
      appendNumber(value);
    } else if (action === 'operation') {
      appendOperation(value);
    } else if (action === 'clear') {
      clearDisplay();
    } else if (action === 'delete') {
      deleteLast();
    } else if (action === 'calculate') {
      calculateResult();
    }
  });
});

function appendNumber(number) {
  // Dacă afișajul este "0", înlocuim cu numărul nou (doar dacă nu este ".")
  if (display.value === '0' && number !== '.') {
    display.value = number;
  } else {
    // Altfel, adaugăm numărul la sfârșit
    display.value += number;
  }
}

function appendOperation(operation) {
  const lastChar = display.value[display.value.length - 1];

  // Dacă ultimul caracter este un operator, înlocuim
  if (['+', '-', '*', '/'].includes(lastChar)) {
    display.value = display.value.slice(0, -1) + operation;
  } else if (display.value.length > 0) {
    // Altfel, adaugăm operatorul
    display.value += operation;
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = '';
  }
}

function calculateResult() {
  try {
    let expression = display.value;

    // Înlocuim simbolurile pentru înmulțire și împărțire
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    // Efectuam evaluarea
    let result = new Function('return ' + expression)();

    // Afișează rezultatul sau "Eroare" dacă ceva nu este în regulă
    display.value = result.toString();
  } catch (error) {
    display.value = 'Eroare';
  }
}
