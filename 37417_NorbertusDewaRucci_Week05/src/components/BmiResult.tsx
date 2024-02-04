import React from 'react';
import {IonCard, IonCardContent, IonCardHeader} from "@ionic/react";
import './CardResult.css';

const BmiResult: React.FC<{
  calculatedBmi: number,
  resultBmi: string
}> = props => {

  const colorCard = (bmi: number): string => {
    console.log(bmi);
    if(bmi===0) return "tertiary"
    else if(bmi<8.5) return "warning"
    else if(bmi<24.9) return "success"
    else if(bmi<29.9) return "warning"
    else return "danger"
  }

  return (
    <IonCard color={colorCard(props.calculatedBmi)} id={'result'}>
      <IonCardHeader className={'ion-text-center'}>
        <h1 className={'ion-no-margin'}>{props.resultBmi}</h1>
      </IonCardHeader>

      <IonCardContent className={'ion-text-center'}>
        {props.calculatedBmi > 0 && <h2>{props.calculatedBmi}</h2>}

      </IonCardContent>
    </IonCard>
  )
};

export default BmiResult;
