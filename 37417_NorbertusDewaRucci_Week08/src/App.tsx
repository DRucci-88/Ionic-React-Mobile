import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {defineCustomElements} from "@ionic/pwa-elements/loader";

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
import MainTabs from "./pages/MainTabs";
import MemoriesContextProvider from "./data/MemoriesContextProvider";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MemoriesContextProvider>
        <IonRouterOutlet id={'app'}>
          <Redirect exact from={'/'} to={'/tabs'}/>
          <Route path={'/tabs'} component={MainTabs}/>
        </IonRouterOutlet>
      </MemoriesContextProvider>

    </IonReactRouter>
  </IonApp>
);
// ReactDOM.render(<App/>, document.getElementById('root'))
// defineCustomElements(window).then(r => "");
export default App;
