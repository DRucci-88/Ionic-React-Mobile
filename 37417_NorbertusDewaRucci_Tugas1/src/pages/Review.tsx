import React from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
} from "@ionic/react";
import './Review.css';

const Review: React.FC = () => {
  return(
    <IonPage>
      <IonHeader className={'ion-padding ion-no-border'}>
        <h2>Review</h2>
      </IonHeader>

      <IonContent className={'ion-padding'}>
        <div id={'container'}>
          <IonCard>
            <IonImg src={'assets/images/food review.webp'}/>
            <IonButton>Write a Review</IonButton>
          </IonCard>
          <IonCard>
            <IonImg src={'assets/images/food review 2.jpg'}/>
            <IonButton>Upload a Photo</IonButton>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Review;