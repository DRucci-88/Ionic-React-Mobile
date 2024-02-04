import React from 'react';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Route, Redirect} from "react-router-dom";
import Explore from "./Explore";
import Search from "./Search";
import Plan from "./Plan";
import Review from "./Review";
import {heart, home, pencil, search} from "ionicons/icons";

const TabsController: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={'/tabs/explore'} component={Explore}/>
        <Route exact path={'/tabs/search'} component={Search}/>
        <Route exact path={'/tabs/plan'} component={Plan}/>
        <Route exact path={'/tabs/review'} component={Review}/>
        <Redirect exact from={'/tabs'} to={'/tabs/explore'}/>
      </IonRouterOutlet>

      <IonTabBar slot={'bottom'}>
        <IonTabButton tab={'explore'} href={'/tabs/explore'}>
          <IonIcon icon={home}/>
          <IonLabel>Explore</IonLabel>
        </IonTabButton>
        <IonTabButton tab={'search'} href={'/tabs/search'}>
          <IonIcon icon={search}/>
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab={'plan'} href={'/tabs/plan'}>
          <IonIcon icon={heart}/>
          <IonLabel>Plan</IonLabel>
        </IonTabButton>
        <IonTabButton tab={'review'} href={'/tabs/review'}>
          <IonIcon icon={pencil}/>
          <IonLabel>Review</IonLabel>
        </IonTabButton>
      </IonTabBar>

    </IonTabs>
  );
};

export default TabsController;