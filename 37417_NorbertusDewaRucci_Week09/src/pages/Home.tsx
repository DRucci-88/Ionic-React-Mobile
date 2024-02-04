import {IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar} from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';

import './Home.css';
import {GoogleMap, InfoWindow, LoadScript, Marker} from "@react-google-maps/api";
import React, {useState} from "react";

const Home: React.FC = () => {

  const [lat, setLat] = useState(-6.257498640666188);
  const [lng, setLng] = useState(106.61832847471764);

  const trackPosition = async () => {
    await Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 1000
    },(position => {
      if (position) console.log("Position: ",position);
    }));
  }

  const logCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy: true})
    console.log('Lat : ',coordinates.coords.latitude)
    console.log('Lng : ',coordinates.coords.longitude)
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  }

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()) setLat(e.latLng?.lat);
    if(e.latLng?.lng()) setLng(e.latLng?.lng);

  }

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  const umn = {
    lat: -6.257498640666188,
    lng: 106.61832847471764
  };
  const summarecon = {
    lat: -6.256655517159817,
    lng: 106.61653767277501
  }
  const holyWings = {
    lat: -6.257421238657244,
    lng: 106.62053705017836
  }
  const atm = {
    lat: -6.256081124909013,
    lng: 106.61813393961557
  }

  // -6.256081124909013, 106.61813393961557

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow>
          <IonCol>
            <IonButton expand={'full'} onClick={logCurrentPosition}>
              Current Position
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton expand={'full'} onClick={trackPosition}>
              Track Position
            </IonButton>
          </IonCol>
        </IonRow>
        {/* -6.3195247784614725, 106.87600233551238 */}
        <LoadScript googleMapsApiKey="AIzaSyAVrw-pixcmwoldCYJELpL1dnFihpY20xI">

          {/* AIzaSyCgDP3US6XOWFX_6Ra80XY-Mc1O8ij7KuA Lec */}
          {/* AIzaSyBhVgCvJJCvKb0MZ051ubqkCMJOGqWpSYI Deleted */}

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat: lat, lng: lng}}
            onClick={selectPos}
            zoom={18}>
            <></>
            <Marker position={atm}/>
            <Marker position={umn}/>
            <Marker position={{lat: lat, lng: lng}}/>
            <InfoWindow position={holyWings}>
              <div>
                <h2>Nice place to chill out</h2>
              </div>
            </InfoWindow>
          </GoogleMap>
        </LoadScript>


      </IonContent>
    </IonPage>
  );
};

export default Home;
