import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';
import React from 'react';

const BtnControls: React.FC<{onCalculate: () => void; onReset: () => void}> = props => {
    return (
    <IonRow>
        <IonCol size="12" size-md="6" className="ion-text-center">
          <IonButton expand="block" color="success" onClick = {props.onCalculate}>
            <IonIcon slot="start" icon={calculatorOutline}/>
            CALCULATE
          </IonButton>
        </IonCol>
        <IonCol size="12" size-md="6" className="ion-text-center">
          <IonButton fill="clear" color="medium" onClick = {props.onReset}>
            <IonIcon slot="start" icon={refreshOutline}/>
            RESET
          </IonButton>
        </IonCol>
    </IonRow>
    );
};

export default BtnControls;