import React, {useRef} from "react";
import {
  IonButton, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonIcon,
  IonItem, IonLabel, IonList,
  IonPage, IonRow,
  IonTitle, IonToggle,
  IonToolbar
} from "@ionic/react";
import {moon} from "ionicons/icons";

import './Home.css'

const Home: React.FC = () => {

  const toggleDarkModeRef = useRef<HTMLIonToggleElement>(null);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const changeTheme = (isDark: boolean) => document.body.classList.toggle('dark',isDark);

  /* Code executed when theme system change on their setting */
  // prefersDark.addListener((e) => checkToggle(e.matches));  // Deprecated
  prefersDark.addEventListener('change',(e)=>{  // New Version
    console.log("Dark Listener");
    changeTheme(e.matches);
  });

  // THIS IS STUPID WAYS :)
  // if (prefersDark.matches) {
  //   console.log("Dark System Theme");
  //   changeTheme(true);
  // }
  // else {
  //   console.log("Light System Theme")
  //   changeTheme(false);
  // }

  const toggleDarkModeHandler = (event: CustomEvent) => {
    changeTheme(event.detail.checked);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className={'ion-padding'}>
        <IonRow className={'ion-justify-content-center'}>
          <IonCol size-sm={'8'} size-md={'8'}>
            <IonGrid className={'ion-no-padding'}>
              <h4>00000037417 - Norbertus Dewa Rucci</h4>
              <IonButton expand={'block'} routerLink={'/bmi'}>BMI CALCULATOR</IonButton>
              <IonButton expand={'block'} routerLink={'/bmr'}>BMR CALCULATOR</IonButton>
              <IonList>
                <IonItem lines={'none'}>
                  <IonIcon icon={moon} slot={'start'} className="component-icon component-icon-dark"/>
                  <IonLabel>Toggle Dark Theme</IonLabel>
                  <IonToggle ref={toggleDarkModeRef} slot={'end'} onIonChange={toggleDarkModeHandler} />
                </IonItem>
              </IonList>
            </IonGrid>
          </IonCol>
        </IonRow>


      </IonContent>
    </IonPage>
  );
};

export default Home;