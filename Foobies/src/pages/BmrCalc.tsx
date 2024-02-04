
import { IonApp, IonTitle, IonToolbar, IonHeader, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonButton, IonIcon, IonCard, IonCardContent, IonAlert, IonContent, IonPage, IonItemDivider, IonList, IonListHeader, IonRadio, IonRadioGroup, IonBackButton, IonButtons } from '@ionic/react';

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
import '../theme/variables.css';
import { useRef, useState } from "react";


import BtnControls from '../components/BtnControls';
import BmrResult from '../components/BmrResult';
import InputControl from '../components/InputControl';
import { body, bookmark } from 'ionicons/icons';

const BmrCalc: React.FC = () => {
  const [ calculatedBMR, setCalculatedBMR ] = useState<number>();
  const [ sedentary, setSedentary ] = useState<number>();
  const [ exercise1, setExercise1 ] = useState<number>();
  const [ exercise2, seteExercise2 ] = useState<number>();
  const [ daily, setDaily ] = useState<number>();
  const [ intense, setIntense ] = useState<number>();
  const [ gender, setSelected ] = useState<number>();
  const [ error, setError ] = useState<string>();
  const [ calcUnits, setCalcUnits ] = useState<'cmkg' | 'ftlbs'>('cmkg');
  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const ageInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMR = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;
    const enteredAge = ageInputRef.current!.value;

    if(
      !enteredWeight || 
      !enteredHeight || !enteredAge ||
      +enteredHeight <= 0 || +enteredAge <= 0 ||
      +enteredWeight <= 0)
      {
        setError('Please enter a valid (non-negative) input number.');
        return;
      }

    const weightConvers = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConvers = calcUnits === 'ftlbs' ? 0.0328 : 1;
      
    const weight = +enteredWeight / weightConvers;
    const height = +enteredHeight / heightConvers;
    const age = +enteredAge;

    let bmr;
    let seden;
    let exercise1;
    let exercise2;
    let daily;
    let intense;

    if (gender == 1){
        bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
        seden = bmr * 1.2;
        exercise1 = bmr * 1.375;
        exercise2 = bmr * 1.55;
        daily = bmr * 1.725;
        intense = bmr * 1.9;
    } else if(gender == 2){
        bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
        seden = bmr * 1.2;
        exercise1 = bmr * 1.375;
        exercise2 = bmr * 1.55;
        daily = bmr * 1.725;
        intense = bmr * 1.9;
    }

    console.log(bmr);
    setCalculatedBMR(bmr);
    setSedentary(seden);
    setExercise1(exercise1);
    seteExercise2(exercise2);
    setDaily(daily);
    setIntense(intense);
  };
  
  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    ageInputRef.current!.value = "";
  };

  const clearError = () => {
    setError('');
  };

  

return (
  <>
    <IonPage>
    <IonAlert 
      isOpen={!!error}
      message={error}
      buttons={[
        { text: 'Okay', handler: clearError }
      ]} />

    <IonApp>
      <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonButtons slot="end">
              <IonButton>
                <IonIcon slot="icon-only" icon={body}/>
              </IonButton>
            </IonButtons>
          <IonTitle className="titleAboutUs">BMR Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

            <div className="bmr">
                <img src="assets/images/bmr.png" alt="" />
            </div>
            
      <IonGrid>
          <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
              <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl selectedValue = {calcUnits} onSelectValue={selectCalcUnitHandler}/>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Age</IonLabel>
                <IonInput ref={ageInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        
          <IonRadioGroup value={gender} onIonChange={e => setSelected(e.detail.value)}>
                <IonRow className="ion-padding"> 
                    <IonListHeader>
                        <IonLabel>Gender</IonLabel>
                    </IonListHeader>

                    <IonCol>
                        <IonItem>
                            <IonLabel>Male</IonLabel>
                            <IonRadio mode="md" slot="start" value="1" />
                        </IonItem>
                    </IonCol>

                    <IonCol>
                        <IonItem>
                            <IonLabel>Female</IonLabel>
                            <IonRadio mode="md" slot="start" value="2"  />
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonRadioGroup>
   
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Height ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Weight({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <BtnControls onCalculate={calculateBMR} onReset={resetInputs}/>
          {calculatedBMR && 
          sedentary && 
          exercise1 && 
          exercise2 &&
          daily &&
          intense &&<BmrResult 
          calcBMR = {calculatedBMR} 
          calcSeden = {sedentary}
          calcExercise1 = {exercise1}
          calcExercise2 = {exercise2}
          calcDaily = {daily}
          calcIntense = {intense}
          /> }
          
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonApp>
    </IonPage>
    </>
  )
};

export default BmrCalc;
