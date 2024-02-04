import React, {useContext, useRef, useState} from 'react';
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
import {base64FromPath} from "@ionic/react-hooks/filesystem";

import './NewMemory.css';
import {Directory, Filesystem} from "@capacitor/filesystem";
import MemoriesContext from "../data/memories-context";
import {useHistory} from "react-router";

type memoryType = 'good' | 'bad';

const NewMemory: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string,
    preview: string
  }>();
  const [chosenMemoryType, setChosenMemoryType] = useState<memoryType>('good')
  const titleRef = useRef<HTMLIonInputElement>(null)

  const memoriesCtx = useContext(MemoriesContext);
  const history = useHistory();

  const [present] = useIonAlert();

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

    if(!photo || !photo.webPath) return;
    console.log("Photo Taken")
    setTakenPhoto({
      path: photo.path ? photo.path : "",
      preview: photo.webPath
    })
  }

  const addMemoryHandler = async () => {
    console.log("Add memory Handler");
    const enteredTitle = titleRef.current?.value
    if(enteredTitle?.toString().length === 0 || !enteredTitle || !takenPhoto) {
      console.log("Add Memory failed");
      // present("Memory Title still empty");
      present({message: "Memory Title still empty <br> OR <br> Photo not loaded", header: "Mayday Mayday", buttons: [{text: 'OK'}]})
      return;
    }
    console.log(enteredTitle);
    console.log(takenPhoto);
    console.log(takenPhoto!!.preview);
    const fileName = new Date().getTime() + '.jpeg';
    const base64 = await base64FromPath(takenPhoto!.preview);
    // data:image/jpeg;base64,
    // comment above is template and continue with blob file maybe
    console.log(base64);
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data
    });
    memoriesCtx.addMemory(fileName, base64, enteredTitle.toString(), chosenMemoryType);
    // history.length > 0 ? history.goBack() : history.replace('/goodMemories');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/tabs'}/>
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
                interface={'popover'} value={'good'}
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
                <IonLabel>ADD MEMORY</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default NewMemory;
