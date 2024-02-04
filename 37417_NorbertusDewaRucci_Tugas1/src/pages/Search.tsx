import React from "react";
import {
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonSearchbar
} from "@ionic/react";
import './Search.css';

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className={'ion-padding ion-no-border'}>
        <h2>Search</h2>
      </IonHeader>

      <IonContent className={'ion-padding'}>
        <IonSearchbar placeholder={'Where to ?'}/>
        <IonCard>
          <img style={{width: '100%', height: '300px'}} src={'assets/images/green.jpg'}/>
          <div className="hero-image">
            <div className="hero-text">
              <h1>See what's good nearby.</h1>
              <button>Turn on location settings</button>
            </div>
          </div>
        </IonCard>
        <h1>Destination travelers love</h1>

        <IonRow>
          <IonCol size={'6'}>
            <div className={'container-img'}>
              <img src={'assets/images/new york.jpg'}/>
              <div className={'bottom-left'}>New York City</div>
            </div>
          </IonCol>
          <IonCol size={'6'}>
            <div className={'container-img'}>
              <img src={'assets/images/singapore.jpg'}/>
              <div className={'bottom-left'}>Singapore</div>
            </div>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size={'6'}>
            <div className={'container-img'}>
              <img src={'assets/images/rome.jpg'}/>
              <div className={'bottom-left'}>Rome</div>
            </div>
          </IonCol>
          <IonCol size={'6'}>
            <div className={'container-img'}>
              <img src={'assets/images/paris.webp'}/>
              <div className={'bottom-left'}>Paris</div>
            </div>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Search;