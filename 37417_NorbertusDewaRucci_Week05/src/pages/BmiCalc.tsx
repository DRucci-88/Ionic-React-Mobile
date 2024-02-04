import React, {useRef, useState} from "react";
import {
  IonBackButton,
  IonButton, IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem, IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import BmiResult from "../components/BmiResult";
import AlertMsg from "../components/AlertMsg";
import InputControl from "../components/InputControl";
import './Calc.css';

type optionValue = 'cmkg' | 'ftlbs';

const BmiCalc: React.FC = () => {
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const [ calculatedBmi, setCalculatedBmi ] = useState<number>(0);
  const [ resultBmi, setResultBmi ] = useState<string>("BMI Result");
  const [ errMsg, setErrMsg ] = useState<string>("");
  const [ units, setUnits ] = useState<optionValue>('cmkg')

  const clickCalculateBmi = () =>{
    const inputHeight = heightInputRef.current!.value;
    const inputWeight = weightInputRef.current!.value;

    if(!inputHeight || !inputWeight || +inputHeight <= 0 || +inputWeight <= 0){
      setErrMsg("Please enter a valid (Non-Negative) input number")
      return;
    }

    const bmi: number = +(+inputWeight / ((+inputHeight/100) * (+inputHeight/100))).toFixed(3);
    setCalculatedBmi(bmi);
    setResultBmi(criteriaBMI(bmi));
  }

  const clickReset = () =>{
    heightInputRef.current!.value = "";
    weightInputRef.current!.value = "";
    setCalculatedBmi(0);
    setResultBmi("BMI Result");
  }

  const criteriaBMI = (bmi: number): string => {
    if(bmi<8.5) return "Thin"
    else if(bmi<24.9) return "Normal"
    else if(bmi<29.9) return "Fat"
    else return "Obesity"
  }

  const clearErrMsg = (err: string) => setErrMsg(err);

  const selectUnitsHandler = (selectedValue: optionValue) => {
    setUnits(selectedValue);
    if(selectedValue === 'ftlbs') {
      heightInputRef.current!.value = (heightInputRef.current!.value ?
        +heightInputRef.current!.value : 0) * 0.0328;
      weightInputRef.current!.value = (weightInputRef.current!.value ?
        +weightInputRef.current!.value : 0) * 2.2;
    }
    else if(selectedValue === 'cmkg'){
      heightInputRef.current!.value = (heightInputRef.current!.value ?
        +heightInputRef.current!.value : 0) / 0.0328;
      weightInputRef.current!.value = (weightInputRef.current!.value ?
        +weightInputRef.current!.value : 0) / 2.2;
    }
  }

  return(
    <IonPage>

      <AlertMsg msg={errMsg} alertCallBack={clearErrMsg}/>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/home'}/>
          </IonButtons>
          <IonTitle>Calculator BMI</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={'ion-padding'}>
        <IonGrid>
          <IonRow className={'ion-justify-content-center'}>
            <IonCol size-sm={"8"} size-md={'8'}>
              <IonGrid className={'ion-no-padding'}>

                <InputControl selectedValue={units} onSelectValue={selectUnitsHandler}/>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">Height {units === 'cmkg' ? '(cm)' : '(ft)'}</IonLabel>
                      <IonInput ref={heightInputRef}/>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">Weight {units === 'cmkg' ? '(kg)' : '(lbs)'}</IonLabel>
                      <IonInput ref={weightInputRef}/>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol className="ion-text-left">
                    <IonButton color={'secondary'} expand="block" onClick={clickCalculateBmi}>Calculate</IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton color={'medium'} expand="block" onClick={clickReset}>Reset</IonButton>
                  </IonCol>
                </IonRow>

                <BmiResult calculatedBmi={calculatedBmi} resultBmi={resultBmi}/>

              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  )
}

export default BmiCalc;