import {
  IonApp,
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { calculatorOutline, refreshOutline} from 'ionicons/icons'

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
import React, {useRef, useState} from "react";

const App: React.FC = () => {
  const [ calculatedBMI, setCalculatedBMI ] = useState<number>()
  const [ resultBMI, setResultBMI ] = useState<string>("BMI Result")
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredHeight || !enteredWeight) return;
    const bmi: number = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));
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
    if(bmi<8.5) return "Thin"
    else if(bmi<24.9) return "Normal"
    else if(bmi<29.9) return "Fat"
    else return "Obesity"
  }

  return(
  <IonApp>

    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">height (cm)</IonLabel>
            <IonInput ref={heightInputRef}/>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">weight (kg)</IonLabel>
            <IonInput ref={weightInputRef}/>
          </IonItem>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol className="ion-text-left">
          <IonButton onClick={calculateBMI}>
            <IonIcon slot="start" icon={calculatorOutline}/>
            Calculate
          </IonButton>
        </IonCol>

        <IonCol>
          <IonButton onClick={resetInputs}>
            <IonIcon slot="start" icon={refreshOutline}/>
            Reset
          </IonButton>
        </IonCol>
      </IonRow>

      {(calculatedBMI !=null && calculatedBMI > 0) && <IonRow>
        <IonCol>
          <IonCard>
            <IonCardHeader className="ion-text-center">
              <IonCardTitle>{resultBMI}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="ion-text-center">
              <h2>{calculatedBMI}</h2>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>}

    </IonGrid>
  </IonApp>
)};

export default App;
