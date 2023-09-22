const previousValueText = document.querySelector('.calculadora__display-content');
const resultValueText = document.querySelector('.calculadora__display-result');
const buttons = document.querySelectorAll('.btn');


let isFirstOperation = true; //conferir se é a primeira vez que está fazendo uma operação
let firstValue = ''; //variavel para o primeiro valor da operação => o primeiro valor numérico antes do sinal da operação
let firstValueLength = ''; //variavel para saber quantas casas o primeiro valor possui
let secondValue = ''; //variavel para o primeiro valor da operação => o primeiro valor numérico antes do sinal da operação

let operationValue = ''; //variavel para guardar o sinal da operação
let result = ''; //variavel para guardar o resultado. Caso o usuário deseje fazer outra operação usando o resultado, esse valor será atribuído ao firstValue.

class Calculadora {
    constructor(previousValueText, resultValueText) {
        this.previousValueText = previousValueText;
        this.resultValueText = resultValueText;
        this.currentValue = '';
    }

    //adiciona digitos para a tela da calculadora
    addDigit(digit) {

        if (digit === '.' && this.previousValueText.innerText.includes('.')) {
            return;
        } else if (digit === '+' || digit === '-' || digit === '/' || digit === 'X' || digit === '%') {
            operationValue = digit;
            if (isFirstOperation) {
                console.log(this.previousValueText.innerText);
                firstValueLength = this.previousValueText.innerText.length;
                firstValue = parseFloat(this.previousValueText.innerText);
                console.log(firstValue);
                console.log(`TYPE OF: ${typeof (firstValue)}`);
            } else {
                firstValue = parseFloat(result);
                this.previousValueText.innerText = firstValue;
            }
            console.log(digit);
            this.currentValue = digit;
            this.updateScreen();
            return;
        } else if (digit === 'C') {
            isFirstOperation = true;
            firstValue = '';
            firstValueLength = '';
            secondValue = '';
            this.previousValueText.innerText = '';
            this.resultValueText.innerText = '';
            return;
        } else if (digit === '') {
            let removedElement = '';
            removedElement = this.previousValueText.innerText.charAt(this.previousValueText.innerText.length - 1);
            if (removedElement === operationValue) {
                operationValue = '';
                firstValue = '';
                this.previousValueText.innerText = this.previousValueText.innerText.slice(0, -1);
                return;
            }
            this.previousValueText.innerText = this.previousValueText.innerText.slice(0, -1);
            return;
        } else if (digit === '=') {
            if (isFirstOperation) {
                isFirstOperation = false;
            }
            secondValue = this.previousValueText.innerText.slice(firstValueLength + 1);
            secondValue = parseFloat(secondValue);
            console.log(`SECOND VALUE: ${secondValue}`);
            this.processOperation();
        } else {
            console.log(digit);
            this.currentValue = digit;
            this.updateScreen();
        }



    }

    processOperation() {
        switch (operationValue) {
            case '+':
                result = firstValue + secondValue;
                this.resultValueText.innerText = result;
                console.log(`RESULT: ${result}`);
                break;
            case '-':
                result = firstValue - secondValue;
                this.resultValueText.innerText = result;
                console.log(`RESULT: ${result}`);
                break;
            case '/':
                result = firstValue / secondValue;
                this.resultValueText.innerText = result;
                console.log(`RESULT: ${result}`);
                break;
            case 'X':
                result = firstValue * secondValue;
                this.resultValueText.innerText = result;
                console.log(`RESULT: ${result}`);
                break;
            case '%':
                let percentagevalue = firstValue / 100;
                result = percentagevalue * secondValue;
                this.resultValueText.innerText = result;
                console.log(`RESULT: ${result}`);
                break;
            default:
                console.log(`ERRO`);
        }
    }

    //mudar o valor na tela da calculadora
    updateScreen() {
        this.previousValueText.innerText += this.currentValue;
    }
}

const calc = new Calculadora(previousValueText, resultValueText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (value >= 0 || value === '.') {
            calc.addDigit(value);
        } else {
            calc.addDigit(value);
        }
    })
})