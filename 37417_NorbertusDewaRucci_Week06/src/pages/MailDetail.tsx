import React from 'react';
import {MAIL_DATA} from './Mail';

import {IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonContent} from "@ionic/react";
import {useParams} from "react-router";

const MailDetail: React.FC = () => {

  const mId = useParams<{mailId: string}>().mailId;
  const selectedMail = MAIL_DATA.find(m => m.id === mId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/tabs/mail'}/>
          </IonButtons>
          <IonTitle>
            {selectedMail ? selectedMail.subject : "No Mail Found"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={'ion-padding'}>
        <h2>Mail ID: {mId}</h2>
      </IonContent>
    </IonPage>
  )
};

export default MailDetail;