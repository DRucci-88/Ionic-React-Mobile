import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent, IonHeader,
  IonItem, IonLabel, IonList, IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from "react";
import StudentMemoryTabs from "./pages/StudentMemoryTabs";

const App: React.FC = () => (
  <IonApp>

    <IonReactRouter>

      <IonMenu contentId={'main'}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Modul 10</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink={'/home'}>
                <IonLabel>Student</IonLabel>
              </IonItem>
              <IonItem button routerLink={'/studentMemory'}>
                <IonLabel>Student Memory</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id={'main'}>
        <Route exact path="/home" component={Home}/>
        <Route path='/studentMemory' component={StudentMemoryTabs}/>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
