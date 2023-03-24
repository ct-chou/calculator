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
let equalSequence = true; // if True it means we hit = after = 
let entryMade = false;

keyPad.forEach(keyEntry => {
    keyEntry.addEventListener('click', (e) => {
        if(keyEntry.id == 'clear') {
            displayValue = 0;
            chaining = false;
            equalSequence = true;
            entryMade = false;
            valueX = 0;
            valueY = 0;
            operation = '';
            displayScreen.textContent = displayValue;
        }
        else if(keyEntry.id == 'delete') {
            if(displayValue != 0) {
                displayValue = displayValue.slice(0,-1);    
            }
            if(displayValue == '') {
                displayValue = 0;
            }
            displayScreen.textContent = displayValue;
        }
        else if(keyEntry.className == 'operator') {
            if(chaining && entryMade) {
                displayValue = operate(operation, valueX, +displayValue);
            }
            if(!equalSequence && entryMade) {
                valueX = +displayValue;
                displayScreen.textContent = displayValue;
            }
            chaining = true;
            displayValue = 0;            
            operation = keyEntry.id;
            entryMade = false;
        }
        else if(keyEntry.id == 'equals') {
            if(operation != '' && entryMade) {
                if(!equalSequence) {
                    valueY = +displayValue;
                }
                displayValue = operate(operation, valueX, valueY);
                displayScreen.textContent = displayValue;
                valueX = +displayValue;
                displayValue = 0;
                equalSequence = true;
                chaining = false;
            }
        }
        else {
            equalSequence = false;
            entryMade = true;
            if(displayValue == 0) {
                displayValue = keyEntry.id.toString();
            }
            else {
                displayValue += keyEntry.id.toString();
            }
            displayScreen.textContent = displayValue;
        }
        
    });
});
