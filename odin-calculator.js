const MAX_DISPLAY_CHARS = 10;

const calculatorDisplay = document.getElementById("display");

const allButtons = document.getElementsByClassName("button");

let operandSelector = 0;
let op = null;
operands = ["", ""]
let lastOp = "";

console.log("start");
for (const button of allButtons)
{
    console.log(button);
    button.addEventListener("click", onCalculatorButtonClicked);
}

function overwriteDisplay(update) {
    calculatorDisplay.textContent = update.substring(0, MAX_DISPLAY_CHARS);
}

function appendDisplay(update) {
    if (calculatorDisplay.textContent.length < MAX_DISPLAY_CHARS)
    {
        calculatorDisplay.textContent += update;
    }
}

function addAtoB(numberA, numberB) {
    return numberA + numberB;
}

function multiplyAbyB(numberA, numberB) {
    return numberA * numberB;
}

function divideAbyB(numberA, numberB) {
    return numberA / numberB;
}

function subtractBfromA(numberA, numberB) {
    return numberA - numberB;
}

function resetCalculator() {
    operandSelector = 2;
    operands[0] = operands[1] = ""
}

const operationLookup =
{
    "+": addAtoB,
    "*": multiplyAbyB,
    "/": divideAbyB,
    "-": subtractBfromA,
};

function operate(operation, numberA, numberB) {
    const result = (operationLookup[operation] !== undefined) ? operationLookup[operation](numberA, numberB) : 0;
    console.log(result);
    return result;
}

function onCalculatorButtonClicked(event)
{
    console.log(event);
    switch (event.srcElement.textContent)
    {
        case "+": 
        case "-": 
        case "*": 
        case "/": 
            // Continuing a chain of operations
            if ((operandSelector != 0) && (op != null) && (operands[0] != "") && (operands[1] != ""))
            {
                if (op.toString() == "/" && operands[1].toString() == "0")
                {
                    overwriteDisplay("No please");
                    resetCalculator();
                    break;
                }

                // Save the current operation result
                operands[0] = operate(op, parseFloat(operands[0]), parseFloat(operands[1])).toString();
                // Use the seconds operand slot for the new number input
                operands[1] = ""
            }
            op = event.srcElement.textContent;
            overwriteDisplay("");
            operandSelector = 1;

            lastOp = event.srcElement.textContent
            break;
        case "=":
            if ((operandSelector != 0) && (op != null) && (operands[0] != "") && (operands[1] != ""))
            {
                if (op.toString() == "/" && operands[1].toString() == "0")
                {
                    overwriteDisplay("No please");
                    resetCalculator();
                    break;
                }

                overwriteDisplay(operate(op, parseFloat(operands[0]), parseFloat(operands[1])).toString());
                // Save the current operation result
                operands[0] = operate(op, parseFloat(operands[0]), parseFloat(operands[1])).toString();
                // Use the seconds operand slot for the new number input
                operands[1] = ""

                lastOp = event.srcElement.textContent
            }
            break;
        case "C":
            // Don't delete text from a result
            if (lastOp == "=")
            {
                break;
            }
            
            let len = operands[operandSelector].length
            if (len > 1)
            {
                // remove last character
                operands[operandSelector] = operands[operandSelector].substring(0, len - 1)
            }
            else
            {
                // clear screen
                operands[operandSelector] = ""
            }
            overwriteDisplay(operands[operandSelector]);
            console.log("op" + operandSelector + " = " + operands[operandSelector]);
            break;
        case "CE":
            overwriteDisplay("");
            resetCalculator();
            break;
        default:
            if (operandSelector == 2) // Just finished calculation, clear screen
            {
                overwriteDisplay("");
                operandSelector = 0;
                operands[0] = operands[1] = ""
            }

            if (operands[operandSelector].length == MAX_DISPLAY_CHARS)
            {
                break;
            }

            if ((event.srcElement.textContent != ".") ||
                ((event.srcElement.textContent == ".") && 
                (!operands[operandSelector].includes("."))))
            {
                appendDisplay(event.srcElement.textContent);
                operands[operandSelector] += event.srcElement.textContent;
            }
            console.log("op" + operandSelector + " = " + operands[operandSelector]);
            break;
    }
}