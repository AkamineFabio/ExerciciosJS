const previousValueText = document.querySelector('.calculadora__display-content');
const resultValueText = document.querySelector('.calculadora__display-result');
const buttons = document.querySelectorAll('.btn');
const btnDot = document.querySelector('#btn__dot');
const btnsOperation = document.querySelectorAll('.btn__op');


let isFirstOperation = true; //conferir se é a primeira vez que está fazendo uma operação
let firstValue = ''; //variavel para o primeiro valor da operação => o primeiro valor numérico antes do sinal da operação
let firstValueLength = ''; //variavel para saber quantas casas o primeiro valor possui
let secondValue = ''; //variavel para o primeiro valor da operação => o primeiro valor numérico antes do sinal da operação

let secondValueTempo = '';

let operationValue = null; //variavel para guardar o sinal da operação
let result = ''; //variavel para guardar o resultado. Caso o usuário deseje fazer outra operação usando o resultado, esse valor será atribuído ao firstValue.

class Calculadora {
    constructor(previousValueText, resultValueText) {
        this.previousValueText = previousValueText;
        this.resultValueText = resultValueText;
        this.currentValue = '';
    }

    //adiciona digitos para a tela da calculadora
    addDigit(digit) {

        if (digit === '.') {
            if (this.previousValueText.innerText.includes('.') && firstValue === '') {
                return;
            }
            if (firstValue !== '' && operationValue) {
                console.log('aaaaa');
                secondValueTempo = this.previousValueText.innerText.slice(firstValueLength + 1);
                console.log(`secondValueTempo: ${secondValueTempo}`);
                console.log(`TYPE OF secondValueTempo: ${typeof (secondValueTempo)}`);
                if (secondValueTempo.includes('.')) {
                    return;
                }
            }
            this.currentValue = digit;
            this.updateScreen();
            return;
        } else if (digit === '+' || digit === '-' || digit === '/' || digit === 'X' || digit === '%') { // caso o botao digitado seja uma operação
            operationValue = digit;
            if (operationValue) {
                for (let btns of btnsOperation) {
                    btns.disabled = true;
                }
            }
            else {
                this.resetOperation();
            }
            if (isFirstOperation) { //caso seja a primeira vez que esteja fazendo uma operação
                firstValueLength = this.previousValueText.innerText.length;
                console.log(`RESULT LENGTH: ${firstValueLength}`);
                firstValue = parseFloat(this.previousValueText.innerText);

            } else { //caso não seja a primeira operação e ele apertou um botão de operação, o valor do firstValue será o resultado da operação anterior
                firstValueLength = this.resultValueText.innerText.length;
                console.log(`RESULT LENGTH: ${firstValueLength}`);
                firstValue = parseFloat(result);
                this.previousValueText.innerText = firstValue;
            }
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
            operationValue = null;
            this.resetOperation();
            return;
        } else if (digit === '') {
            let removedElement = '';
            removedElement = this.previousValueText.innerText.charAt(this.previousValueText.innerText.length - 1);
            if (removedElement === operationValue) {
                operationValue = null;
                this.resetOperation();
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
            console.log(`FIRST VALUE: ${firstValue}`);
            console.log(`SECOND VALUE: ${secondValue}`);
            this.processOperation();
        } else {
            /* console.log(digit); */
            this.currentValue = digit;
            this.updateScreen();
        }



    }

    processOperation() {
        switch (operationValue) {
            case '+':
                result = firstValue + secondValue;
                this.resultValueText.innerText = result;
                this.resetOperation();
                break;
            case '-':
                result = firstValue - secondValue;
                this.resultValueText.innerText = result;
                this.resetOperation();
                break;
            case '/':
                result = firstValue / secondValue;
                this.resultValueText.innerText = result;
                this.resetOperation();
                break;
            case 'X':
                result = firstValue * secondValue;
                this.resultValueText.innerText = result;
                this.resetOperation();
                break;
            case '%':
                let percentagevalue = firstValue / 100;
                result = percentagevalue * secondValue;
                this.resultValueText.innerText = result;
                this.resetOperation();
                break;
            default:
                console.log(`ERRO`);
        }
    }

    //mudar o valor na tela da calculadora
    updateScreen() {
        this.previousValueText.innerText += this.currentValue;
    }

    resetOperation() {
        for (let btns of btnsOperation) {
            btns.disabled = false;
        }
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