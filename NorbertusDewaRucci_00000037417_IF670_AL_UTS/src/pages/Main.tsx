import React, {useContext, useState} from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons, IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading,
  IonMenuButton,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {female, heart, personCircle, personCircleOutline} from "ionicons/icons";
import {CrushContext} from "../data/CrushContext";
import {Redirect} from "react-router-dom";
import './Main.css';

const Main: React.FC = () => {

  const crushCtx = useContext(CrushContext);
  const [showLoading, setShowLoading] = useState(false);

  const [goTarget, setGoTarget] = useState(false);

  const saveToTarget = (crushId: string) => {
    console.log(crushId);
    const crush = crushCtx.crushPotential.find(a => a.id === crushId) || null;
    crushCtx.addToTarget(crush!!);
    setShowLoading(true);

  }
  // https://www.telerik.com/blogs/programmatically-navigate-with-react-router
  if(goTarget) return <Redirect to={'/target'}/>

  setTimeout(() => {
    setShowLoading(false);
  }, 2000)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>GebetApp</IonTitle>
          <IonButtons slot={'end'}>
            <IonIcon
              size="large"
              icon={personCircleOutline}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => {
          setShowLoading(false);
          setGoTarget(true);
        }}
        message={'Loading'}
        duration={1500}
        animated={true}
        spinner={'lines'}
      />

      <IonContent>
        <IonList>
          {crushCtx.crushPotential.map((crush) => (
            <IonItemSliding key={crush.id}>
              <IonItemOptions slot={'end'}>
                <IonItemOption color={'primary'} onClick={saveToTarget.bind(null, crush.id)}>
                  <IonIcon slot={'icon-only'} icon={heart}/>
                </IonItemOption>
              </IonItemOptions>

              <IonItem>
                <IonGrid className={'ion-padding crush'}>
                  <IonRow>
                    <IonCol>
                      <IonAvatar>
                        <img src={crush.photo} alt={"Missing"}/>
                      </IonAvatar>
                    </IonCol>
                    <IonCol size="8">
                      <IonRow>
                        <h2>{crush.name}</h2>
                      </IonRow>
                      <IonRow>
                        <IonLabel>{crush.desc}</IonLabel>
                      </IonRow>
                      <IonRow>
                        <IonIcon icon={female}/>
                        <IonLabel>Female</IonLabel>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>

            </IonItemSliding>

          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Main;