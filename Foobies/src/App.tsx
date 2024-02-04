import {IonApp} from '@ionic/react';

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
import './theme/custom-tab-bar.css'
import React, {useEffect} from "react";
import SwitchTabBar from "./components/SwitchBar";
import {getAuth} from "firebase/auth";
import './firebaseConfig'
import {collection, getDocs, getFirestore, doc, getDoc} from "firebase/firestore";
import {FavFirebase} from "./data/favFirebase";
const App: React.FC = () => {

  useEffect(() => {

    function configStart() {
      sessionStorage.clear()
      console.log("APP")
      const auth = getAuth()
      auth.onAuthStateChanged(async (user) => {
        if(user) {
          const db = getFirestore()
          const docSnap = await getDoc(doc(db, 'users', user.uid))
          const a : FavFirebase[] = docSnap.get('fav') as FavFirebase[]
          console.log(a);
          sessionStorage.setItem('fav', JSON.stringify(a))
          setTimeout(() => '',1000)
        }
        else{
          sessionStorage.setItem('fav', JSON.stringify({}))
        }

      })
    }
    configStart()
  },[])

  // sessionStorage.setItem("fav", JSON.stringify())

  return(
    <IonApp>
      <SwitchTabBar />
      {/*<SwitchBars/>*/}
    </IonApp>
);
}

export default App;
