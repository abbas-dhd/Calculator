let operator = "";
let operand_1 = "";
let operand_2 = "";
let result = null;

let shouldReset = false;
let outputScreen = document.querySelector(".output");
let pastOutputScreen = document.querySelector(".past");

function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function div(a, b) {
    return a / b;
}
function mul(a, b) {
    return a * b;
}

function buttonClickHandler(event) {
    let currentType = event.target.dataset["type"];
    switch (currentType) {
        case "number": // set oprands
            setOprands(event.target.id);
            break;
        case "operator": // set operator
            setOperator(event.target.innerText);
            break;
        case "equal": // evaluate
            evaluate();
            operand_2 = "";
            operator = "";
            // console.log(result);
            break;
        case "point": // add point
            setPoint();
            break;
        case "all-clear":
            allClear();
            break;
        case "clear":
            erase();
    }
}

function evaluate() {
    operand_2 = outputScreen.textContent;
    if (operand_1 === "" || operand_2 === "" || operator === "") {
        alert("Invalid Operation");
        allClear();
        return;
    }

    let a = Number(operand_1);
    let b = Number(operand_2);

    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = sub(a, b);
            break;
        case "*":
            result = mul(a, b);
            break;
        case "/":
            result = div(a, b);
            break;
    }

    outputScreen.textContent = result;
    pastOutputScreen.textContent = `${operand_1} ${operator} ${operand_2} =`;
    shouldReset = true;
}

function resetScreen() {
    shouldReset = false;
    outputScreen.textContent = "";
}

function allClear() {
    operator = "";
    operand_1 = "";
    operand_2 = "";
    result = null;

    shouldReset = false;
    outputScreen.textContent = "0";
    pastOutputScreen.textContent = "";
}

function erase() {
    if (outputScreen.textContent.length <= 0) return;

    outputScreen.textContent = outputScreen.textContent.toString().slice(0, -1);
}

function setOperator(_operator) {
    if (operator !== "") {
        evaluate();
    }
    operand_1 = outputScreen.textContent;
    operator = _operator;
    pastOutputScreen.textContent = `${operand_1} ${operator}`;
    resetScreen();
}

function setOprands(number) {
    if (shouldReset || outputScreen.textContent == "0") resetScreen();

    outputScreen.textContent += number;
}

function setPoint() {
    if (shouldReset) resetScreen();
    if (outputScreen.textContent === "") outputScreen.textContent = "0";
    if (outputScreen.textContent.includes(".")) return;

    outputScreen.textContent += ".";
}

const allButtonsElement = document.querySelectorAll(".btn");
console.log(allButtonsElement);

allButtonsElement.forEach((elem) => {
    elem.addEventListener("click", buttonClickHandler);
});
