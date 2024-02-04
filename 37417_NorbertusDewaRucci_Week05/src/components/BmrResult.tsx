import React from "react";
import {IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel} from "@ionic/react";
import './CardResult.css';

const BmrResult: React.FC<{
  calculatedBmr: number
}> = props => {
  return (
    <IonCard>
      <IonCardHeader className={'ion-text-center'}>
        <h1 className={'ion-no-margin'}>BMR = {props.calculatedBmr}</h1>
        <h5>Daily calorie needs based on activity level</h5>
      </IonCardHeader>

      <IonItem className={'ion-text-bold'}>
        <IonLabel>Activity Level</IonLabel>
        <IonLabel slot={'end'}>Calorie</IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Sedentary: little or no exercise</IonLabel>
        <IonLabel slot={'end'}>{(1.2 * props.calculatedBmr).toFixed(2)}</IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Exercise 1-3 times/week</IonLabel>
        <IonLabel slot={'end'}>{(1.375 * props.calculatedBmr).toFixed(2)}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Exercise 4-5 times/week</IonLabel>
        <IonLabel slot={'end'}>{(1.55 * props.calculatedBmr).toFixed(2)}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Daily exercise or intense exercise 3-4</IonLabel>
        <IonLabel slot={'end'}>{(1.725 * props.calculatedBmr).toFixed(2)}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Intense exercise 6-7 times/week</IonLabel>
        <IonLabel slot={'end'}>{(1.9 * props.calculatedBmr).toFixed(2)}</IonLabel>
      </IonItem>
    </IonCard>
  );
};

export default BmrResult;