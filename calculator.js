const operate = function(operation, x, y) {
    if(operation == 'add') {
        return x+y;
    }
    if(operation == 'subtract') {
        return x-y;
    }
    if(operation == 'multiply') {
        return x*y;
    }
    if(operation == 'divide') {
        return x/y;
    }
}

const keyPad = document.querySelectorAll('button');
const displayScreen = document.getElementById('displayScreen');

let displayValue = 0;
let valueX = 0;
let valueY = 0;
let operation = '';

keyPad.forEach(keyEntry => {
    keyEntry.addEventListener('click', (e) => {
        if(keyEntry.id == 'clear') {
            displayValue = 0;
        }
        else if(keyEntry.id == 'delete') {
            if(displayValue != 0) {
                displayValue = displayValue.slice(0,-1);    
            }
            if(displayValue == '') {
                displayValue = 0;
            }
        }
        else if(keyEntry.className == 'operator') {
            valueX = +displayValue;
            displayValue = 0;
            operation = keyEntry.id;
        }
        else if(keyEntry.id == 'equals') {
            valueY = +displayValue;
            displayValue = operate(operation, valueX, valueY);
        }
        else {
            if(displayValue == 0) {
                displayValue = keyEntry.id.toString();
            }
            else {
                displayValue += keyEntry.id.toString();
            }
        }
        displayScreen.textContent = displayValue;
    });
});
