import React from "react";
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import GoodMemories from "./GoodMemories";
import BadMemories from "./BadMemories";
import NewMemory from "./NewMemory";
import {happy, sad} from "ionicons/icons";

const StudentMemoryTabs: React.FC = () => {

  return(
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={'/student-memory/good-memories'} component={GoodMemories}/>
        <Route exact path={'/student-memory/bad-memories'} component={BadMemories}/>
        <Route exact path={'/student-memory/new-memory'} component={NewMemory}/>
        <Redirect exact from={'/student-memory'} to={'/student-memory/good-memories'}/>
      </IonRouterOutlet>

      <IonTabBar slot={'bottom'}>
        <IonTabButton tab={'good-memories'} href={'/student-memory/good-memories'}>
          <IonIcon icon={happy}/>
          <IonLabel>Good Memories</IonLabel>
        </IonTabButton>
        <IonTabButton tab={'bad'} href={'/student-memory/bad-memories'}>
          <IonIcon icon={sad}/>
          <IonLabel>Bad Memories</IonLabel>
        </IonTabButton>
      </IonTabBar>

    </IonTabs>

  )
}

export default StudentMemoryTabs;