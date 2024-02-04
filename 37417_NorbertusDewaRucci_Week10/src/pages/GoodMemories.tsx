import React, {useEffect, useState} from "react";
import {
  IonButton,
  IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {add} from "ionicons/icons";
import Memory from "../data/Memory";
import {BASE_URL} from "../data/DbConfig";

const GoodMemories: React.FC = () => {

  const url = BASE_URL;

  const [goodMemories, setGoodMemories] = useState<Memory[]>([]);

  useEffect(() => {
    fetch(url.concat('select_all_good_memory.php'))
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        // Check if response callback is undefined
        data.memories === undefined ? setGoodMemories([]) : setGoodMemories(data.memories)
      })
  },[url])

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuButton/>
          </IonButtons>
          <IonButtons  slot={'end'}>
              <IonButton href={'/studentMemory/newMemory'}>
                <IonIcon slot={'start'} icon={add}/>
                Add memory
              </IonButton>
          </IonButtons>
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
                <IonCard >
                  <img src={url + memory.photo} alt={memory.title}/>
                  <IonCardHeader>
                    <IonCardTitle className={'ion-text-center'}>{memory.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}

        </IonGrid>

      </IonContent>

    </IonPage>
  )
}

export default GoodMemories;