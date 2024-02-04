import React from "react";
import {IonButton, IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";

const Home: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className={'ion-padding'}>
          <h4>00000037417 - Norbertus Dewa Rucci</h4>
          <IonButton expand={'block'} routerLink={'/bmi'}>BMI CALCULATOR</IonButton>
          <IonButton expand={'block'} routerLink={'/bmr'}>BMR CALCULATOR</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;