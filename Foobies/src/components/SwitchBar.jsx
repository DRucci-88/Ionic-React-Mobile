import {CreateAnimation, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {home, medkit, person, restaurant,} from 'ionicons/icons';
import Tab1 from '../pages/Home';
import Tab3 from '../pages/Health';
import Home from '../pages/Home';
import Tab2 from '../pages/Cook';
import Tab4 from '../pages/Profile';
import Profile from '../pages/Profile';
import BmrCalc from "../pages/BmrCalc";
import BmiCalc from "../pages/BmiCalc";

import React, {useEffect, useRef, useState} from "react";
import {Redirect, Route} from "react-router";
import Recipe from "../pages/Recipe";
import Search from "../pages/Search";
import AboutUs from "../pages/AboutUs";
import Favorite from "../pages/Favorite";

const SwitchTabBar = () => {

    const [activeTab, setActiveTab] = useState("tab0");
    const switchRefs = useRef([]);

    const tabs = [
        {
            label: "Home",
            url: "/home",
            icon: home,
            color: "#FF7800",
            backgroundColor: "#FFBC97",
            component: Tab1
        },
        {
            label: "Cook",
            url: "/cook",
            icon: restaurant,
            color: "#3578e5",
            backgroundColor: "#e7f0ff",
            component: Tab2
        },
        {
            label: "Health",
            url: "/health",
            icon: medkit,
            color: "#76b140",
            backgroundColor: "#ddf7c5",
            component: Tab3
        },
        {
            label: "Profile",
            url: "/profile",
            icon: person,
            color: "#e46062",
            backgroundColor: "#fcddde",
            component: Tab4
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

    const getTabButtonStyle = tab => {

        return {

            backgroundColor: tab.backgroundColor,
            color: tab.color,
            transition: "0.5s all ease-in-out"
        };
    }

    useEffect(() => {

        const tabIndex = activeTab.match(/\d+/)[0];
        // console.log(tabIndex);
        switchRefs.current[tabIndex].animation.play();
    }, [activeTab]);

    return (

        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>

                    {tabs.map((tab, index) => {

                        return (
                            <Route key={index} exact path={tab.url}>
                                <tab.component/>
                            </Route>
                        );
                    })}
                    <Route exact path={'/aboutUs'} component={AboutUs}/>
                    <Route exact path={'/favorite'} component={Favorite}/>
                    <Route exact path={'/recipe/:id'} component={Recipe}/>
                    <Route exact path={"/search"} component={Search}/>
                    <Route exact path={"/bmi"} component={BmiCalc}/>
                    <Route exact path={'/bmr'} component={BmrCalc}/>

                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom" onIonTabsDidChange={e => setActiveTab(e.detail.tab)}>

                    {tabs.map((tab, index) => {

                        const tabStyle = getTabButtonStyle(tab);
                        const isActive = activeTab === `tab${index}`;

                        return (
                            <IonTabButton key={index} style={isActive ? tabStyle : {}} tab={`tab${index}`}
                                          href={tab.url}>

                                <IonIcon icon={tab.icon}/>

                                {isActive &&
                                <CreateAnimation ref={ref => switchRefs.current[index] = ref} {...switchAnimation}>
                                    <IonLabel>{tab.label}</IonLabel>
                                </CreateAnimation>}
                            </IonTabButton>
                        );
                    })}
                </IonTabBar>
            </IonTabs>

        </IonReactRouter>
    );
}

export default SwitchTabBar;


