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

const scientificNotationFit = function(stringInput, position, digits) {
    let leftSide = stringInput.substr(0,position -1);
    let rightSide = stringInput.substr(position);

    leftSide = Number.parseFloat(parseFloat(leftSide)).toFixed(digits - rightSide.length);
    return leftSide.toString() + rightSide;
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
let periodEntered = false;

keyPad.forEach(keyEntry => {
    keyEntry.addEventListener('click', (e) => {
        if(keyEntry.id == 'clear') {
            displayValue = 0;
            chaining = false;
            equalSequence = true;
            entryMade = false;
            periodEntered = false;
            valueX = 0;
            valueY = 0;
            operation = '';
            displayScreen.textContent = displayValue;
        }
        else if(keyEntry.id == 'delete') {
            if(displayValue != 0) {
                if(displayValue.substr(displayValue.length - 1) == '.') {
                    periodEntered = false;
                }
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
            periodEntered = false;
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
                periodEntered = false;
            }
        }
        else {
            equalSequence = false;
            entryMade = true;
            if(displayValue == 0) {
                displayValue = keyEntry.id.toString();
            }
            else {
                if(!periodEntered || keyEntry.id.toString() != '.') {
                    displayValue += keyEntry.id.toString();
                }
            }
            if(keyEntry.id.toString() == '.') {
                periodEntered = true;
            }
            displayScreen.textContent = displayValue;
        
        }
        let displayScreenString = displayScreen.textContent;
        if(displayScreenString.length >= 18) {
            ePosition = displayScreenString.indexOf('e');
            console.log(parseFloat(displayScreenString));
            if(ePosition == -1) {  //no scientific notation
                let displayScreenFloat = parseFloat(displayScreenString);
                if(displayScreenFloat >= 1e16) {
                    displayScreen.textContent = displayScreenFloat.toExponential(6);    
                }
                else {
                    displayScreen.textContent = Number.parseFloat(parseFloat(displayScreen.textContent)).toFixed(10);
                }
            }
            else { // scientific notation
                displayScreen.textContent = scientificNotationFit(displayScreen.textContent, ePosition, 10);
            }
        }
    });
});
