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