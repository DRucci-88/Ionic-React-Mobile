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
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";

const GoodMemories: React.FC = () => {

  // Firebase 9 Modular
  const db = getFirestore()

  const [goodMemories, setGoodMemories] = useState<Memory[]>([])

  const getGoodMemories = async () => {
    const goodOnly = query(collection(db,'memories'),
      where('type','==','good'))
    const querySnapshot = await getDocs(goodOnly);
    console.log(querySnapshot.docs);
    setGoodMemories(querySnapshot.docs.map((doc) => doc.data() as Memory))
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // })
  }

  useEffect( () => {
    getGoodMemories().then(() => '');
  },[])

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuButton/>
          </IonButtons>
          <IonButtons slot={'end'}>
            <IonButton href={'/student-memory/new-memory'}>
              <IonIcon slot={'start'} icon={add}/>
              Add Memory
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
                  <img src={memory.photo} alt={memory.title}/>
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