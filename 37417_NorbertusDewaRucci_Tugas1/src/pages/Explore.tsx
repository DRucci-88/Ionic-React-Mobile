import React from 'react';
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import './Explore.css';
const Explore: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className={'ion-padding ion-no-border'}>
        <h2>Explore</h2>
      </IonHeader>

      <IonContent>
        <div className={'container-keep-exploring'}>
          <img src={'assets/images/keep exploring.jpg'} alt={'Keep Exploring'}/>
          <div className={'center ion-text-center'}>
            Discover more in Singapore
            <IonButton color={'dark'} shape={'round'} >Keep Exploring</IonButton>
          </div>
        </div>

        <div className={'container-goodbye'}>
          <img src={'assets/images/lake.jpg'} alt={'Good Bye'}/>
          <div className={'left'}>
            <strong style={{fontSize: "36px"}}>Goodbye to crushing heat and crushing crowds</strong>
            <p>Why fall is the best time to visit our national parks</p>
            <IonButton shape={'round'} color={'dark'}>Get the Intel</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Explore;