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
let chaining = false; // multiple operations

keyPad.forEach(keyEntry => {
    keyEntry.addEventListener('click', (e) => {
        if(keyEntry.id == 'clear') {
            displayValue = 0;
            chaining = false;
            valueX = 0;
            valueY = 0;
            operation = '';
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
            if(chaining) {
                displayValue = operate(operation, valueX, +displayValue);
                valueX = +displayValue;
                displayScreen.textContent = displayValue;            
            }
            else {
                valueX = +displayValue;
                displayValue = 0;
                chaining = true;
            }
            
            operation = keyEntry.id;
            
        }
        else if(keyEntry.id == 'equals') {
            //todo: press equal before operator does nothing
            //todo: press equal 2x repeats the last operation 
            valueY = +displayValue;
            displayValue = operate(operation, valueX, valueY);
        }
        else {
            //todo: enter after chaining doesn't concat
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
