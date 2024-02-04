import {
  IonAlert,
  IonApp,
  IonCol,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import BmiControls from './components/BmiControls';
import InputControl from './components/InputControl';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, { useRef, useState } from "react";
import BmiResult, { IPropsBmiResult } from "./components/BmiResult";

type optionValue = 'cmkg' | 'ftlbs';

const App: React.FC = () => {

  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [resultBMI, setResultBMI] = useState<string>("BMI Result");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<optionValue>('cmkg');

  const [bmiResultValue, setBmiResultValue] = useState<IPropsBmiResult>({
    calculateBmi: 900,
    resultBmi: "Kamu Obesitas"
  });

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value as number;
    const enteredHeight = heightInputRef.current!.value as number;

    if (!enteredHeight || !enteredWeight || +enteredHeight <= 0 || enteredWeight <= 0) {
      setErrorMsg("Please enter a valid (Non-Negative) input number")
      return;
    }

    const bmi: number = +(+enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100))).toFixed(3);
    console.log(bmi);

    setCalculatedBMI(bmi);
    setResultBMI(criteriaBMI(bmi));
  }

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    setResultBMI("BMI Result");
    setCalculatedBMI(0)
  }

  const criteriaBMI = (bmi: number): string => {
    if (bmi < 8.5) return "Thin"
    else if (bmi < 24.9) return "Normal"
    else if (bmi < 29.9) return "Fat"
    else return "Obesity"
  }

  const clearErrorMsg = () => {
    setErrorMsg("")
  }

  const selectCalcUnitHandler = (selectedValue: optionValue) => {
    setCalcUnits(selectedValue);
    if (selectedValue === 'ftlbs') {
      heightInputRef.current!.value = (heightInputRef.current!.value ?
        +heightInputRef.current!.value : 0) * 0.0328;

      weightInputRef.current!.value = (weightInputRef.current!.value ?
        +weightInputRef.current!.value : 0) * 2.2;
    }
    else if (selectedValue === 'cmkg') {
      heightInputRef.current!.value = (heightInputRef.current!.value ?
        +heightInputRef.current!.value : 0) / 0.0328;

      weightInputRef.current!.value = (weightInputRef.current!.value ?
        +weightInputRef.current!.value : 0) / 2.2;
    }
  }

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!errorMsg}
        message={errorMsg}
        buttons={[
          { text: 'Okay', handler: clearErrorMsg }
        ]}
      />

      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">height ({calcUnits === 'cmkg' ? 'cm' : 'ft'})</IonLabel>
                <IonInput ref={heightInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">weight ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef} />
              </IonItem>
            </IonCol>
          </IonRow>

          <BmiControls onCalculate={calculateBMI} onReset={resetInputs} />

          {(calculatedBMI != null && calculatedBMI > 0) &&
            // <BmiResult calculateBmi={calculatedBMI} resultBmi={resultBMI}/>

            <BmiResult
              calculateBmi={bmiResultValue.calculateBmi}
              resultBmi={bmiResultValue.resultBmi}
            />
          }

        </IonGrid>
      </IonApp>
    </React.Fragment>
  )
};

export default App;
