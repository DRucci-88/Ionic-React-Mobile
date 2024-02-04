import React from "react";
import {
  IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonPage,
  IonTitle,
  IonToolbar, isPlatform
} from "@ionic/react";
import {add} from "ionicons/icons";

const BadMemories: React.FC = () => {

  return (
    <IonPage>

      {isPlatform('android') &&
      <IonFab vertical={'bottom'} horizontal={'end'}>
          <IonFabButton href={'/tabs/newMemory'}>
              <IonIcon icon={add}/>
          </IonFabButton>
      </IonFab>
      }

      <IonHeader>
        <IonToolbar>
          {isPlatform('ios') &&
          <IonButtons  slot={'end'}>
              <IonButton>
                  <IonIcon slot={'icon-only'} icon={add}/>
              </IonButton>
          </IonButtons>}

          <IonTitle>Bad Memories</IonTitle>
        </IonToolbar>

        <IonContent>
          Bad Memories
        </IonContent>
      </IonHeader>
    </IonPage>
  )
};

export default BadMemories;