import React, {useRef, useState} from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar, useIonAlert
} from "@ionic/react";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {camera} from "ionicons/icons";

import './NewMemory.css';
import {useHistory} from "react-router";
import {BASE_URL} from "../data/DbConfig";

type memoryType = 'good' | 'bad';

const NewMemory: React.FC = () => {

  const url = BASE_URL;

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string,
    preview: string
  }>();
  const [chosenMemoryType, setChosenMemoryType] = useState<memoryType>('good')
  const titleRef = useRef<HTMLIonInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File>();

  const [present] = useIonAlert();
  const history = useHistory();

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
      height: 500
    });

    console.log(photo);
    // path always undefined when using web browser without PWA.
    console.log(photo.path);
    // webPath, saving picture as blob "blob:http://localhost:3000/......"
    // webPath only saving temporary data on localhost and will be deleted after refresh / render maybe.
    console.log(photo.webPath);

    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    setSelectedFile(blob as File);

    if(!photo || !photo.webPath) return;
    console.log("Photo Taken and Saved as blob")
    setTakenPhoto({
      path: photo.path ? photo.path : "",
      preview: photo.webPath
    })
  }

  const addMemoryHandler = async () => {
    console.log("Add memory Handler");
    const enteredTitle = titleRef.current?.value
    if (enteredTitle?.toString().length === 0 || !enteredTitle || !takenPhoto) {
      console.log("Add Memory failed");
      // present("Memory Title still empty");
      present({
        message: "Memory Title still empty <br> OR <br> Photo not loaded",
        header: "Mayday Mayday",
        buttons: [{text: 'OK'}]
      })
      return;
    }
    // console.log(enteredTitle);
    // console.log(takenPhoto);
    // console.log(takenPhoto!!.preview);

    const formData = new FormData();

    const title = titleRef?.current.value as string;
    const type = chosenMemoryType as string;
    const photoName = (new Date().getTime() + '.jpeg') as string;
    formData.append('title', title);
    formData.append('type', type);
    formData.append('photo', selectedFile as File);
    formData.append('photoName', photoName);

    console.log(type);

    // console.log(selectedFile as File);
    // console.log(photoName);

    fetch(url.concat("insert_new_memory.php"), {
      method: 'post',
      body: formData
    }).then(response => response.text())
      .then((data)=> {
        console.log(data);
        const dataObj = JSON.parse(data);
        console.log(dataObj);
        present({
          message: dataObj['message'],
          header: (dataObj['success'] === 1) ? "Success" : "Failed",
          buttons: ['Ok']
        })
      });

    history.length > 0 ? history.goBack() : history.replace('/goodMemories');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/studentMemory'}/>
          </IonButtons>
          <IonTitle>Add New Memory</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <IonGrid className={'ion-padding'}>
          <IonItem>
            <IonLabel position={'floating'}>Memory Title</IonLabel>
            <IonInput type={'text'} ref={titleRef} required/>
          </IonItem>

          <IonRow>
            <IonCol>
              <IonSelect
                interface={'popover'} value={chosenMemoryType}
                onIonChange={e => setChosenMemoryType(e.detail.value)}>
                <IonSelectOption value={'good'}>Good Memory</IonSelectOption>
                <IonSelectOption value={'bad'}>Bad Memory</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>

          <IonRow className={'ion-text-center'}>
            <IonCol>
              <div className={'image-preview'}>
                {takenPhoto ?
                  <img src={takenPhoto.preview} alt={'Swag Face'}/>
                  // <img src={'assets/Swag Face.jpg'} alt={'Swag Face'}/>
                  : <h3>No Photo Chosen</h3>}
              </div>

              <IonButton onClick={takePhotoHandler}>
                <IonIcon slot={'start'} icon={camera}/>
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className={'ion-margin-top ion-text-center'}>
            <IonCol>
              <IonButton onClick={addMemoryHandler}>
                <IonLabel>SAVED TO SERVER</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default NewMemory;
