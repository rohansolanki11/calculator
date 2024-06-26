class Calculator{
    constructor(previousTextElement,currentTextElement){
        this.previousTextElement=previousTextElement;
        this.currentTextElement=currentTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation=undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand==='') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand='';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay(){
        this.currentTextElement.innerText= this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }
        else{
            this.previousTextElement.innerText = '';
        }
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en-in',{maximumFractionDigits: 0});
        }

        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }
        else{
            return integerDisplay;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const acButton = document.querySelector('[data-ac]');
const delButton = document.querySelector('[data-del]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousTextElement,currentTextElement);

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
});

acButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
});

delButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
});