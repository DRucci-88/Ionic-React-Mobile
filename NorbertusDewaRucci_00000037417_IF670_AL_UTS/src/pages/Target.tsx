import React, {useContext, useRef, useState} from "react";
import {
  IonActionSheet,
  IonAvatar,
  IonButton,
  IonButtons, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonMenuButton,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {closeOutline, female, personCircle, personCircleOutline, share, trash} from "ionicons/icons";
import {Crush, CrushContext} from "../data/CrushContext";

const Target: React.FC = () => {

  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
  const crushCtx = useContext(CrushContext);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedCrush, setSelectedCrush] = useState<Crush | null>(null);

  const startDeleteTargetHandler = (id: string) => {
    setShowActionSheet(true);
    const crush = crushCtx.crushTarget.find(a => a.id === id);
    setSelectedCrush(crush!!);
    console.log("Start Delete");
  }

  const deleteTargetHandler = () => {
    crushCtx.removeCrushTarget(selectedCrush);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Target Gebetan</IonTitle>
          <IonButtons slot={'end'}>
            <IonIcon
              size="large"
              icon={personCircleOutline}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        header={'Yakin gak gebet dia lagi ?'}
        buttons={[{
          text: 'Yakin, hapus dari daftar',
          icon: trash,
          handler: () => {
            console.log('Delete clicked');
            deleteTargetHandler();
          }
        }, {
          text: 'Gak yakin, kembali',
          icon: share,
          handler: () => {
            console.log('Return')
            slidingOptionRef.current?.closeOpened();
          }
        }]}>

      </IonActionSheet>

      <IonContent>

        {/*Using Ternary Operation*/}
        {crushCtx.crushTarget.length === 0 ?
          <IonGrid className={'ion-text-center'}>
            <h4>Anda masih jones ??</h4>
            <IonButton href={'/main'} expand={'full'}>Cari gebetan</IonButton>
          </IonGrid>
          :
          <IonList>
            {crushCtx.crushTarget.map((crush) => (
              <IonItemSliding
                key={crush.id} ref={slidingOptionRef}
                onDragEnter={() => slidingOptionRef.current?.closeOpened()}>
                <IonItemOptions slot={'end'}>
                  <IonItemOption color={'danger'} onClick={startDeleteTargetHandler.bind(null, crush.id)}>
                    <IonIcon slot={'icon-only'} icon={closeOutline}/>
                  </IonItemOption>
                </IonItemOptions>

                <IonItem>
                  <IonGrid className={'ion-padding crush'}>
                    <IonRow>
                      <IonCol>
                        <IonAvatar>
                          <img src={crush.photo} alt={'Missing Profile'}/>
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
          </IonList>}


      </IonContent>
    </IonPage>
  );
};

export default Target;