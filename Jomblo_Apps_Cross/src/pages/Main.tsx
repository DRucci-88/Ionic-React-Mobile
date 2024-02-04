import React, {useContext, useState} from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons, IonCard, IonCardContent, IonCol,
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

import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {Pagination} from "swiper";

import "swiper/swiper-bundle.css"
import "swiper/modules/pagination/pagination.min.css"
// import "swiper/"

// import "swiper/css";
// import "swiper/css/pagination";

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
          <IonTitle>Bosen Jomblo </IonTitle>
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
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {/*<h2>Highlight</h2>*/}
          {crushCtx.crushPotential.map((crush) => (
            <SwiperSlide key={crush.id}>
              <IonCard>
                <IonItem>
                  <img src={crush.photo} alt={"Missing"}/>
                </IonItem>
                <IonCardContent className={'ion-text-center'}>
                  {crush.name}
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          ))}
          {/*<SwiperSlide>1</SwiperSlide>*/}
          {/*<SwiperSlide>1</SwiperSlide>*/}
          {/*<SwiperSlide>1</SwiperSlide>*/}
          {/*<SwiperSlide>1</SwiperSlide>*/}
        </Swiper>
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