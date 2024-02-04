import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';
import React from 'react';
import './BmiResult.css';

const BmiResult: React.FC<{ 
  calcBMI: number, 
  category: string,
  color: string
}> =  props => {
    return (
        <IonRow>
            <IonCol>
              <IonCard id="result" color={props.color}>
                <IonCardContent className="ion-text-center">
                  <h2>{props.calcBMI.toFixed(2)}</h2>
                  <h1>{props.category}</h1>
                </IonCardContent>
              </IonCard>
            </IonCol>
        </IonRow>
    );
};

export default BmiResult;