import React from 'react'
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonRow} from "@ionic/react";

export interface IPropsBmiResult {
  calculateBmi: number;
  resultBmi: string;
}

const BmiResult: React.FC<IPropsBmiResult> = props => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardHeader className="ion-text-center">
            <IonCardTitle>{props.resultBmi}</IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="ion-text-center">
            <h2>{props.calculateBmi}</h2>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>

  );
}
export default BmiResult;

