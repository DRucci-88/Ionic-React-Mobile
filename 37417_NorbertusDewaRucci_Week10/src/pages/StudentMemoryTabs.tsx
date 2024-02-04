import React from "react";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import BadMemories from "./BadMemories";
import {happy, sad} from "ionicons/icons";
import {Redirect, Route} from "react-router-dom";
import NewMemory from "./NewMemory";
import GoodMemories from "./GoodMemories";

const StudentMemoryTabs: React.FC = () => {
  return(
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={'/studentMemory/goodMemories'} component={GoodMemories}/>
        <Route exact path={'/studentMemory/badMemories'} component={BadMemories}/>
        <Route exact path={'/studentMemory/newMemory'} component={NewMemory}/>
        <Redirect exact from={'/studentMemory'} to={'/studentMemory/goodMemories'}/>
      </IonRouterOutlet>

      <IonTabBar slot={'bottom'}>
        <IonTabButton tab={'goodMemories'} href={'/studentMemory/goodMemories'}>
          <IonIcon icon={happy}/>
          <IonLabel>Good Memories</IonLabel>
        </IonTabButton>
        <IonTabButton tab={'badMemories'} href={'/studentMemory/badMemories'}>
          <IonIcon icon={sad}/>
          <IonLabel>Bad Memories</IonLabel>
        </IonTabButton>
      </IonTabBar>

    </IonTabs>
  )
}

export default StudentMemoryTabs;