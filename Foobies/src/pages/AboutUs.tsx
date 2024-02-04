import React from "react";
import {IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar} from "@ionic/react";
import profileStyle from './Profile.module.scss'
import {bookmark} from "ionicons/icons";
import './AboutUs.css';
import AppBar from "../components/AppBar";

const AboutUs: React.FC = () => {
  return (
    <IonPage>

      <AppBar title={'Our Team'} backButton={true}/>

      <IonContent>
      <div className={ profileStyle.topHeader }/>
      <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" className="ion-justify-content-center ion-align-items-center ion-text-center">
              
                <IonCard>
                  <IonCardTitle slot= "start"></IonCardTitle>
                  <IonRow>
                    <IonCard>
                      <IonCol size="4">
                        <img src={"assets/images/logoAbout.png"} alt="avatar" className={ profileStyle.avatar } />
                      </IonCol>
                    </IonCard>
                  </IonRow>
                </IonCard>
              
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList>
          <IonCard>
            <IonItem>
              <IonAvatar slot="start">
                <img src={"assets/images/rucci.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Norbertus Dewa Rucci</h2>
                <h3>00000037417</h3>
                <p>“Get busy living or get busy dying.”</p>
              </IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonAvatar slot="start">
                <img src={"assets/images/billy.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Billy Natanael Wongkar</h2>
                <h3>00000037503</h3>
                <p>“The purpose of our lives is to be happy.”</p>
              </IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonAvatar slot="start">
                <img src={"assets/images/gilang.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Gilang Satria Putra</h2>
                <h3>00000037741</h3>
                <p>“In order to write about life first you must live it.”</p>
              </IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonAvatar slot="start">
                <img src={"assets/images/nehe.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Nehemia Cecio Tanjung Jati</h2>
                <h3>00000039011</h3>
                <p>“Live for each second without hesitation.”</p>
              </IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonAvatar slot="start">
                <img src={"assets/images/michael.png"} />
              </IonAvatar>
              <IonLabel>
                <h2>Michael Jhondry</h2>
                <h3>00000033120</h3>
                <p>“I like criticism. It makes you strong.”</p>
              </IonLabel>
            </IonItem>
          </IonCard>

        </IonList>

        <IonFooter className="footerAboutUs">
          <IonToolbar color="primary">
            <IonTitle>Foobies - ©2021 by NoobMaster50</IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonPage>
  )
}

export default AboutUs;