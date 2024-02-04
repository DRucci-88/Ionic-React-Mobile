import React, {useContext, useEffect} from "react";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import GoodMemories from "./GoodMemories";
import BadMemories from "./BadMemories";
import {
  happy,
  sad,
} from "ionicons/icons";
import NewMemory from "./NewMemory";
import MemoriesContext from "../data/memories-context";

const MainTabs: React.FC = () => {
  console.log("Main Tabs");
  const memoriesCtx = useContext(MemoriesContext)
  const {initContext} = memoriesCtx
  useEffect(() => {
    initContext();
  },[initContext])

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={'/tabs/goodMemories'} component={GoodMemories}/>
        <Route exact path={'/tabs/badMemories'} component={BadMemories}/>
        <Route exact path={'/tabs/newMemory'} component={NewMemory}/>
        <Redirect exact from={'/tabs'} to={'/tabs/goodMemories'}/>
      </IonRouterOutlet>

      <IonTabBar slot={'bottom'}>
        <IonTabButton tab={'goodMemories'} href={'/tabs/goodMemories'}>
          <IonIcon icon={happy}/>
          <IonLabel>Good Memories</IonLabel>
        </IonTabButton>
        <IonTabButton tab={'badMemories'} href={'/tabs/badMemories'}>
          <IonIcon icon={sad}/>
          <IonLabel>Bad Memories</IonLabel>
        </IonTabButton>
      </IonTabBar>

    </IonTabs>
  )
}

export default MainTabs;