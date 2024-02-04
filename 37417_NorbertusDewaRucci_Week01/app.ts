// const calculateBtn = document.querySelector<HTMLButtonElement>('ion-button')
const calculateBtn = <HTMLButtonElement>document.getElementById('calculate')
const resetBtn = <HTMLButtonElement>document.getElementById('reset')

// 2 models of type assertion
const heightInput = document.getElementById('height-input') as HTMLInputElement
const weightInput = <HTMLInputElement> document.getElementById('weight-input')
const strBmi = <HTMLElement> document.getElementById('bmi')
const strCriteria = <HTMLElement> document.getElementById('criteria')

let enteredHeight: number
let enteredWeight: number
let bmi: number

const calculateBMI = (): void => {
  // convert string to number by using unary operator '+'
  enteredHeight = +heightInput.value / 100
  enteredWeight = +weightInput.value
  bmi = enteredWeight / (enteredHeight * enteredHeight)

  strBmi.innerHTML = bmi.toString()

  strCriteria.innerHTML = criteriaType(bmi)

  console.log(bmi)
}

const criteriaType = (bmi: number): string => {
  if(bmi<8.5) return "Kurus"
  else if(bmi<24.9) return "Normal"
  else if(bmi<29.9) return "Gemuk"
  else return "Obesitas"
  
}

const resetInput = (): void => {
  heightInput.value = ""
  weightInput.value = ""
  strBmi.innerHTML = "BMI Result"
  strCriteria.innerHTML = "BMI Criteria"
}

calculateBtn?.addEventListener('click',calculateBMI)
resetBtn?.addEventListener('click',resetInput)
