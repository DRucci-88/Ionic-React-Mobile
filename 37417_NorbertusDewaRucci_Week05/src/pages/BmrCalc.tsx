import React, {useRef, useState} from 'react';
import {
  IonBackButton, IonButton,
  IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonInput, IonItem, IonLabel, IonListHeader,
  IonPage, IonRadio, IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import InputControl from "../components/InputControl";
import AlertMsg from "../components/AlertMsg";
import BmrResult from "../components/BmrResult";
import './Calc.css';

type optionValue = 'cmkg' | 'ftlbs';

const BmrCalc: React.FC = () => {
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const ageInputRef = useRef<HTMLIonInputElement>(null);
  const genderRadioReg = useRef<HTMLIonRadioGroupElement>(null);

  const [ calculatedBmr, setCalculatedBmr ] = useState<number>(0);
  const [ units, setUnits ] = useState<optionValue>('cmkg');
  const [ errMsg, setErrMsg ] = useState<string>("")

  const clickCalculateBmi = () =>{
    const inputAge = ageInputRef.current!.value;
    const inputHeight = heightInputRef.current!.value;
    const inputWeight = weightInputRef.current!.value;
    const radioGender = genderRadioReg.current!.value;

    if(!inputHeight || !inputWeight || +inputHeight <= 0 || +inputWeight <= 0){
      setErrMsg("Please enter a valid (Non-Negative) input number")
      return;
    }
    let bmr: number = 0;
    if(radioGender === 'male')
      bmr = 66 + (13.7 * +inputWeight) + (5 * +inputHeight) - (6.8 * +inputAge!);
    else
      bmr = 65 + (9.6 * +inputWeight) + (1.8 * +inputHeight) - (4.7 * +inputAge!);
    console.log(bmr);
    setCalculatedBmr(bmr);
  }

  const clickReset = () =>{
    ageInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    weightInputRef.current!.value = "";
    genderRadioReg.current!.value = ""
    setCalculatedBmr(0);
  }

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

  const clearErrMsg = (err: string) => setErrMsg(err);

  return (
    <IonPage>

      <AlertMsg msg={errMsg} alertCallBack={clearErrMsg}/>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/home'}/>
          </IonButtons>
          <IonTitle>BMR Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={'ion-padding'}>
        <IonGrid>
          <IonRow className={'ion-justify-content-center'}>
            <IonCol size-sm={'8'} size-md={'8'}>
              <IonGrid className={'ion-no-padding'}>
                <InputControl selectedValue={units} onSelectValue={selectUnitsHandler}/>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">Age</IonLabel>
                      <IonInput ref={ageInputRef}/>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRadioGroup allowEmptySelection ref={genderRadioReg}>
                  <IonListHeader>
                    <IonLabel>Gender</IonLabel>
                  </IonListHeader>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Male</IonLabel>
                        <IonRadio value={"male"}/>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Female</IonLabel>
                        <IonRadio value={"female"}/>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonRadioGroup>

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
                      <IonLabel position="floating">Weight {units === 'ftlbs' ? '(kg)' : '(lbs)'}</IonLabel>
                      <IonInput ref={weightInputRef}/>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size={'12'} size-md={'6'} className="ion-text-left">
                    <IonButton expand="block" color={'success'} onClick={clickCalculateBmi}>Calculate</IonButton>
                  </IonCol>
                  <IonCol size={'12'} size-md={'6'} className={'ion-text-right'}>
                    <IonButton expand="block" color={'medium'} onClick={clickReset}>Reset</IonButton>
                  </IonCol>
                </IonRow>

                {(calculatedBmr != null && calculatedBmr > 0) && <BmrResult calculatedBmr={calculatedBmr}/>}
                {/*<BmrResult calculatedBmr={calculatedBmr}/>*/}
              </IonGrid>
            </IonCol>
          </IonRow>

        </IonGrid>

      </IonContent>
    </IonPage>
  )
}

export default BmrCalc;