"use strict";
// const calculateBtn = document.querySelector<HTMLButtonElement>('ion-button')
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');
// 2 models of type assertion
const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');
const strBmi = document.getElementById('bmi');
const strCriteria = document.getElementById('criteria');
let enteredHeight;
let enteredWeight;
let bmi;
const calculateBMI = () => {
    // convert string to number by using unary operator '+'
    enteredHeight = +heightInput.value / 100;
    enteredWeight = +weightInput.value;
    bmi = enteredWeight / (enteredHeight * enteredHeight);
    strBmi.innerHTML = bmi.toString();
    strCriteria.innerHTML = criteriaType(bmi);
    console.log(bmi);
};
const criteriaType = (bmi) => {
    if (bmi < 8.5)
        return "Kurus";
    else if (bmi < 24.9)
        return "Normal";
    else if (bmi < 29.9)
        return "Gemuk";
    else
        return "Obesitas";
};
const resetInput = () => {
    heightInput.value = "";
    weightInput.value = "";
    strBmi.innerHTML = "BMI Result";
    strCriteria.innerHTML = "BMI Criteria";
};
calculateBtn === null || calculateBtn === void 0 ? void 0 : calculateBtn.addEventListener('click', calculateBMI);
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', resetInput);
