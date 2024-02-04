import { IonPage, IonContent, IonCard } from "@ionic/react";

import React from "react";

import './Health.css';
import AppBar from "../components/AppBar";

const Health: React.FC = () => {
    return (
    <IonPage>
        <AppBar title={'Health'} backButton={false}/>
        <IonContent className="ion-padding">
            <IonCard className="titleHealth">
                <h2>- - Please Choose - -</h2>
            </IonCard>

            <IonCard color="light" routerLink="/bmi" className="bmiStyle">
                <div className="bmi">
                    <img src={"assets/images/bmi.png"} alt="" />
                    <h2 className="h2Card"> BMI Result</h2>
                </div>
            </IonCard>

            <IonCard color="light" routerLink="/bmr" className="bmrStyle">
                <div className="bmr">
                    <img src={"assets/images/bmr.png"} alt="" />
                    <h2 className="h2Card"> BMR Result</h2>
                </div>
            </IonCard>
          
        </IonContent>
    </IonPage>
    );
  };
  
  export default Health;