const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const acBtn = document.querySelector('[data-all-clear]')
const previousO = document.querySelector('[data-previous-operand]')
const currentO = document.querySelector('[data-current-operand]')



// The Class //



class Calculator {
    constructor(previousO,currentO){
        this.previousO = previousO
        this.currentO = currentO
        this.clear()
    }

    clear(){  
        //Clear all the inputs and set them all to a default value as soon as we create a new calculator.
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(num) {
        if (num === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + num.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if(this.previousOperand !=='') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
              computation = prev + current
              break
            case '-':
              computation = prev - current
              break
            case '*':
              computation = prev * current
              break
            case '÷':
              computation = prev / current
              break
            default:
              return
          }
          this.currentOperand = computation
          this.operation = undefined
          this.previousOperand = ''
    }



    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    
      updateDisplay() {
        this.currentO.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousO.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousO.innerText = ''
        }
      }
    }
    
  
    

//////////////////////////////////////////////////////////////////////////////

const calculator = new Calculator(previousO,currentO)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })