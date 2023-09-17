const previousValueText = document.querySelector('.calculadora__display-content');
const resultValueText = document.querySelector('.calculadora__display-result');
const buttons = document.querySelectorAll('.btn');

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
        }

        console.log(digit);
        this.currentValue = digit;
        this.updateScreen();
    }

    processOperation(operation) {

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
            console.log(`Operation:${value}`);
        }
    })
})