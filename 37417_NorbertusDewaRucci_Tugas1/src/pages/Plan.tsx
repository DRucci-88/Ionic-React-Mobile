import React from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader, IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton
} from "@ionic/react";
import {
  documentTextOutline,
  heart,locationOutline,
  peopleOutline
} from "ionicons/icons";

const Plan: React.FC = () => {
  return(
    <IonPage>
      <IonHeader className={'ion-padding ion-no-border'}>
        <h2>Plan</h2>
      </IonHeader>

      <IonContent className={'ion-padding'}>
        <IonRow>
          <IonCol size={'8'}>
            <IonSegment>
              <IonSegmentButton value={'trips'}>
                <IonLabel>Trips</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value={'saves'}>
                <IonLabel>Saves</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value={'bookings'}>
                <IonLabel>Bookings</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCol>
          <IonCol/>
        </IonRow>

        <div>
          <IonItem>
            <IonIcon slot={'start'} icon={heart}/>
            <IonLabel>Save places you'd like to visit</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot={'start'} icon={locationOutline}/>
            <IonLabel>See your saves on a map</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot={'start'} icon={documentTextOutline}/>
            <IonLabel>Keep track of notes, links and more</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot={'start'} icon={peopleOutline}/>
            <IonLabel>Share and collaborate on your plans</IonLabel>
          </IonItem>
        </div>

        <h3 className={'ion-margin-top'}>Trip Name</h3>
        <IonRow>
          <IonCol>
            <IonButton color={'medium'} expand={'block'} shape={'round'} disabled>Create a Trip</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className={'ion-text-center'}>
            <u>Log in to access your Trips</u>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Plan;
