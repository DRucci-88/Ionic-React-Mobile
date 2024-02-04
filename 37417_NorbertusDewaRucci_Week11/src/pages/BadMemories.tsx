import React, {useEffect, useState} from "react";
import {
  IonButton,
  IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {add} from "ionicons/icons";
import {collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import Memory from "../data/Memory";

const BadMemories: React.FC = () => {

  // Firebase 9 Modular
  const db = getFirestore()

  const [badMemories, setBadMemories] = useState<Memory[]>([])

  const getBadMemories = async () => {
    const goodOnly = query(collection(db,'memories'),
      where('type','==','bad'))
    const querySnapshot = await getDocs(goodOnly);
    console.log(querySnapshot.docs);
    setBadMemories(querySnapshot.docs.map((doc) => doc.data() as Memory))
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // })
  }

  useEffect( () => {
    getBadMemories().then(() => '');
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
          <IonTitle>Bad Memories</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          {badMemories.length === 0 &&
          <IonRow>
              <IonCol className={'ion-text-center'}>
                  <h2>Bad Memories Not Found.</h2>
              </IonCol>
          </IonRow>
          }
          {badMemories.map(memory => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard>
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

export default BadMemories;