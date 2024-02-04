import React, {useEffect, useRef, useState} from "react";
import Tab0 from '../pages/Home'
import Tab1 from '../pages/Cook'
import Tab2 from '../pages/Health'
import Tab3 from '../pages/Profile'
import BmrCalc from "../pages/BmrCalc";
import BmiCalc from "../pages/BmiCalc";
import {home, medkit, person, restaurant} from "ionicons/icons";
import {IonReactRouter} from "@ionic/react-router";
import {CreateAnimation, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Recipe from "../pages/Recipe";
import Search from "../pages/Search";

interface tabsTemplate {
  label: string,
  url: string,
  icon: string,
  color: string,
  backgroundColor: string,
  component: any
}

const tabs: tabsTemplate[] = [
  {
    label: "Home",
    url: "/home",
    icon: home,
    color: "#FF7800",
    backgroundColor: "#FFBC97",
    component: Tab0
  },
  {
    label: "Cook",
    url: "/cook",
    icon: restaurant,
    color: "#3578e5",
    backgroundColor: "#e7f0ff",
    component: Tab1
  },
  {
    label: "Health",
    url: "/health",
    icon: medkit,
    color: "#76b140",
    backgroundColor: "#ddf7c5",
    component: Tab2
  },
  {
    label: "Profile",
    url: "/profile",
    icon: person,
    color: "#e46062",
    backgroundColor: "#fcddde",
    component: Tab3
  }
];

const revealAnimation = {
  property: "transform",
  fromValue: "translateX(-30px)",
  toValue: "translateX(0px)"
};

const switchAnimation = {
  duration: 200,
  direction: "normal",
  iterations: "1",
  fromTo: [revealAnimation],
  easing: "ease-in-out"
};

const getTabButtonStyle = (tab: { backgroundColor: string; color: string; }) => {
  return {
    backgroundColor: tab.backgroundColor,
    color: tab.color,
    transition: "0.5s all ease-in-out"
  };
}

const SwitchBars = () => {
  const [activeTab, setActiveTab] = useState<string>('tab0')
  const switchRefs = useRef<CreateAnimation>()

  useEffect(() => {
    // const tabIndex: number = Number(activeTab[3]);
    switchRefs.current?.animation.play()
    // switchRefs.current[tabIndex].animation.play()
  },[activeTab])

  return(
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {tabs.map((tab, index) => {
            return(
              <Route key={index} exact path={tab.url} component={tab.component}/>
            )
          })}
          <Route exact path={'/recipe/:id'} component={Recipe}/>
          <Route exact path={'/search'} component={Search}/>
          <Redirect exact from={'/'} to={'/home'}/>
          <Route exact path={"/bmi"} component={BmiCalc}/>
          <Route exact path={'/bmr'} component={BmrCalc}/>
        </IonRouterOutlet>

        <IonTabBar slot={'bottom'} onIonTabsDidChange={e => setActiveTab(e.detail.tab)}>
          {tabs.map((tab, index) => {
            const tabStyle = getTabButtonStyle(tab)
            const isActive = activeTab === `tab${index}`
            return (
              <IonTabButton
                key={index}
                style={isActive ? tabStyle : {}}
                tab={`tab${index}`}
                href={tab.url}>
                <IonIcon icon={tab.icon}/>
                {isActive &&
                <CreateAnimation >
                  <IonLabel>{tab.label}</IonLabel>
                </CreateAnimation>}
              </IonTabButton>
            )
          })}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )

}

export default SwitchBars;