import React from 'react';
import {IonLabel, IonSegment, IonSegmentButton} from "@ionic/react";

type optionValue = 'cmkg' | 'ftlbs';

const InputControl: React.FC<{
  selectedValue: optionValue
  onSelectValue: (selectedValue: optionValue) => void
}> = props => {
  return (
    <IonSegment
      value={props.selectedValue}
      color="secondary"
      onIonChange={e => props.onSelectValue(e.detail.value as optionValue)} >
      <IonSegmentButton value={'cmkg'}>
        <IonLabel>CM / KG</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value='ftlbs'>
        <IonLabel>FT / LBS</IonLabel>
      </IonSegmentButton>
    </IonSegment>

  );
}

export default InputControl;