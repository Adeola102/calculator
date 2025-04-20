// Get references to the display and all buttons
const display = document.querySelector('.output-display p');
const buttons = document.querySelectorAll('.input-buttons div');

// Variables to keep track of the current input and calculation state
let currentInput = '';
let previousInput = '';
let operator = null;
let resetNext = false;

// Function to update the display
function updateDisplay() {
    display.textContent = currentInput || '0';
}

// Function to perform calculation
function calculate() {
    let result = 0;
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
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    resetNext = true;
}

// Function to handle button clicks
function handleButtonClick(e) {
    const target = e.currentTarget;
    const btnClass = target.className;
    const btnText = target.textContent.trim();

    if (btnClass.startsWith('num-')) {
        if (resetNext) {
            currentInput = btnText;
            resetNext = false;
        } else {
            currentInput = currentInput === '0' ? btnText : currentInput + btnText;
        }
        updateDisplay();
    } else if (btnClass === 'point') {
        if (resetNext) {
            currentInput = '0.';
            resetNext = false;
        } else if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    } else if (btnClass === 'add' || btnClass === 'minus' || btnClass === 'times' || btnClass === 'divide') {
        if (operator && !resetNext) {
            calculate();
        }
        operator = btnClass === 'add' ? '+' :
            btnClass === 'minus' ? '-' :
            btnClass === 'times' ? '*' :
            btnClass === 'divide' ? '/' : null;
        previousInput = currentInput;
        resetNext = true;
    } else if (btnClass === 'equal-to') {
        if (operator) {
            calculate();
            updateDisplay();
        }
    } else if (btnClass === 'c') {
        // Clear all
        currentInput = '';
        previousInput = '';
        operator = null;
        resetNext = false;
        updateDisplay();
    } else if (btnClass === 'ce') {
        // Clear entry (current input)
        currentInput = '';
        updateDisplay();
    } else if (btnClass === 'per') {
        // Percentage: convert current input to percentage
        if (currentInput) {
            let num = parseFloat(currentInput);
            num = num / 100;
            currentInput = num.toString();
            updateDisplay();
        }
    } else if (btnClass === 'root') {
        // Square root of current input
        if (currentInput) {
            let num = parseFloat(currentInput);
            if (num < 0) {
                alert("Invalid input for square root");
                return;
            }
            num = Math.sqrt(num);
            currentInput = num.toString();
            updateDisplay();
            resetNext = true;
        }
    }
}

// Attach event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Initialize display
updateDisplay();