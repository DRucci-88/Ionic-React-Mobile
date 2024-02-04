import React from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";

const BmiResult: React.FC<{
  calculatedBmi: number,
  resultBmi: string
}> = props => {

  return (
    <IonCard>
      <IonCardHeader className={'ion-text-center'}>
        <IonCardTitle>{props.resultBmi}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent className={'ion-text-center'}>
        {props.calculatedBmi > 0 && <h2>{props.calculatedBmi}</h2>}

      </IonCardContent>
    </IonCard>
  )
};

export default BmiResult;
