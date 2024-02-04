import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader, IonItem, IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle, IonToggle,
  IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

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
import Main from "./pages/Main";
import CrushContextProvider from "./data/CrushContextProvider";
import Target from "./pages/Target";
import Profile from "./pages/Profile";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>

      <IonMenu contentId={'main'}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Gebet App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink={'/main'}>
                <IonLabel>Daftar Calon Pasangan</IonLabel>
              </IonItem>
              <IonItem button routerLink={'/target'}>
                <IonLabel>Target Pasangan</IonLabel>
              </IonItem>
              <IonItem button routerLink={'/profile'}>
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem button routerLink={'/profile'}>
                {/*<IonLabel>Profile</IonLabel>*/}
                Welcome to Dark Theme
                <IonToggle color="primary" />
              </IonItem>
            </IonMenuToggle>
          </IonList>
          
        </IonContent>
      </IonMenu>

      <CrushContextProvider>
        <IonRouterOutlet id={'main'}>
          <Route path={'/main'} component={Main}/>
          <Route path={'/target'} component={Target}/>
          <Route path={'/profile'} component={Profile}/>
          <Redirect exact from={'/'} to={'/main'}/>
        </IonRouterOutlet>
      </CrushContextProvider>


    </IonReactRouter>
  </IonApp>
);

export default App;
