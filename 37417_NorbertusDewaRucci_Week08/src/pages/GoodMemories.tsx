import React, {memo, useContext} from 'react';
import {
  IonButton,
  IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol,
  IonContent,
  IonFab,
  IonFabButton, IonGrid,
  IonHeader,
  IonIcon,
  IonPage, IonRow,
  IonTitle,
  IonToolbar, isPlatform
} from "@ionic/react";
import {add, map} from "ionicons/icons";
import MemoriesContext from "../data/memories-context";

const GoodMemories: React.FC = () => {

  const memoriesCtx = useContext(MemoriesContext)
  const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'good');
  console.log(goodMemories);
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

          <IonTitle>Good Memories</IonTitle>
        </IonToolbar>

      </IonHeader>

      <IonContent>
        <IonGrid>
          {goodMemories.length === 0 &&
          <IonRow>
              <IonCol className={'ion-text-center'}>
                  <h2>Good Memories Not Found.</h2>
              </IonCol>
          </IonRow>
          }
          {goodMemories.map(memory => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard>
                  <img src={memory.base64Url} alt={memory.title}/>
                  <IonCardHeader>
                    <IonCardTitle>{memory.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}

        </IonGrid>

      </IonContent>
    </IonPage>
  )
};

export default GoodMemories;