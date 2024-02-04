import React from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent, IonCol, IonContent, IonHeader,
  IonIcon, IonMenuButton,
  IonPage,
  IonRow,
  IonText, IonTitle,
  IonToolbar
} from "@ionic/react";
import {personAddOutline, personCircleOutline} from "ionicons/icons";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={"start"}>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profil</IonTitle>
          <IonButtons slot={'end'}>
            <IonIcon
              size="large"
              icon={personCircleOutline}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={"ion-padding"}>
        <IonCard>
          <IonCardContent>
            <IonCol>
              <img src={"assets/photo/rucci_ganteng.jpg"} alt="My Profile" />
            </IonCol>

            <IonCol>
              <IonRow>
                <IonCol size="12" className={'ion-text-center'}>
                  <IonTitle>Norbertus Dewa Rucci</IonTitle>
                  <IonTitle>00000037417</IonTitle>
                </IonCol>
              </IonRow>
            </IonCol>

            <IonRow>
              <IonCol size="6">
                <IonButton href={'https://www.instagram.com/ewarucci/'} fill={'solid'} expand="block">
                  Instagram
                </IonButton>
              </IonCol>

              <IonCol size="6">
                <IonButton href={'https://www.instagram.com/ewarucci/'} color="secondary" expand="block">
                  <IonIcon icon={personAddOutline} size="small" />
                  &nbsp; Follow
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;