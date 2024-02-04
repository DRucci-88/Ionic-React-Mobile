import {IonRow, IonCol, IonCard, IonCardContent, IonText} from '@ionic/react';
import React from 'react';
import './BmrResult.css';

const BmrResult: React.FC<{
  calcBMR: number,
  calcSeden: number,
  calcExercise1: number,
  calcExercise2: number,
  calcDaily: number,
  calcIntense: number
}> = props => {
  return (
    <IonRow>
      <IonCol>
        <IonCard className="bmrresulthealth">
          <IonCardContent>
            <h2 className="ion-text-center">BMR = {props.calcBMR.toFixed(2)} Calories/day</h2>
            <h3 className="ion-text-center">Daily calorie needs based on activity level</h3>
            <IonRow>
              <IonCol size="8.5" className="ion-text-left">
                <IonText ><b>Activity Level</b></IonText>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonText ><b>Calorie</b></IonText>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="8.5" className="ion-text-left">
                <h3>Sedentary: little or no exercise</h3>
              </IonCol>
              <IonCol className="ion-text-right">
                <h3>{props.calcSeden.toFixed(2)}</h3>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="8.5" className="ion-text-left">
                <h3>Exercise 1-3 times/week</h3>
              </IonCol>
              <IonCol className="ion-text-right">
                <h3>{props.calcExercise1.toFixed(2)}</h3>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="8.5" className="ion-text-left">
                <h3>Exercise 4-5 times/week</h3>
              </IonCol>
              <IonCol className="ion-text-right">
                <h3>{props.calcExercise2.toFixed(2)}</h3>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="8.6" className="ion-text-left">
                <h3>Daily exercise or intense exercise 3-4 times/week</h3>
              </IonCol>
              <IonCol className="ion-text-right">
                <h3>{props.calcDaily.toFixed(2)}</h3>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="8.5" className="ion-text-left">
                <h3>Intense exercise 6-7 times/week</h3>
              </IonCol>
              <IonCol className="ion-text-right">
                <h3>{props.calcIntense.toFixed(2)}</h3>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmrResult;