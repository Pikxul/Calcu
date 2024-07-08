document.addEventListener('DOMContentLoaded', () => {
    const calculatorScreen = document.querySelector('.calculator-screen');
    const keys = document.querySelector('.calculator-keys');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;

    // Calculator functionality

    keys.addEventListener('click', (event) => {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) {
            return;
        }

        handleInput(value);
        updateScreen();
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (key >= '0' && key <= '9') {
            handleInput(key);
        } else if (key === '.') {
            handleInput(key);
        } else if (key === '=' || key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('clear');
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleInput(key);
        }

        updateScreen();
    });

    function handleInput(value) {
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(value);
                break;
            case '=':
                calculate();
                break;
            case 'clear':
                clear();
                break;
            case '.':
                appendDecimal();
                break;
            default:
                appendNumber(value);
                break;
        }
    }

    function handleOperator(nextOperator) {
        if (operator && previousInput) {
            calculate();
        } else {
            previousInput = currentInput;
        }

        operator = nextOperator;
        currentInput = '0';
    }

    function calculate() {
        let result;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = `${result.toFixed(2)}`;
        operator = null;
        previousInput = '';
    }

    function clear() {
        currentInput = '0';
        previousInput = '';
        operator = null;
    }

    function appendNumber(number) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }

    function appendDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function updateScreen() {
        calculatorScreen.textContent = currentInput;
    }
});

// Adding hover effect to button with id "buttonhover"
document.addEventListener('DOMContentLoaded', () => {
    const test = document.getElementById('buttonhover');

    if (test) {
        test.addEventListener(
            'mouseover',
            (event) => {
                event.target.style.color = 'orange';

                setTimeout(() => {
                    event.target.style.color = '';
                }, 250);
            },
            false
        );
    }
});
