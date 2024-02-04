import React, {useRef, useState} from "react";
import {
  IonButton,
  IonCol, IonContent,
  IonGrid, IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption, IonTitle, IonToolbar, useIonAlert, IonBackButton, IonButtons
} from "@ionic/react";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import Memory from "../data/Memory";

type memoryType = 'good' | 'bad';

const NewMemory: React.FC = () => {

  // Input Variable Needed
  const title = useRef<HTMLIonInputElement>(null);
  const [chosenMemoryType, setChosenMemoryType] = useState<memoryType>('good');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState<string>('')

  // Firebase configuration
  const storage = getStorage();
  const db = getFirestore();

  // Other
  const [alert] = useIonAlert();

  const insertHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();

    if (selectedFile === undefined || selectedFile === null){
      alert("Selected Image / File still empty");
      return;
    }
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, selectedFile as Blob).then((_) => {
      getDownloadURL(storageRef).then((photoUrl) => addData(photoUrl))
    })
  }

  const addData = async (photoUrl: string) => {
    try {
      const newMemory: Memory = {
        id: Date.now().toString(),
        title: title.current!!.value as string,
        type: chosenMemoryType as string,
        photo: photoUrl
      }
      const docRef = await addDoc(collection(db,'memories'), newMemory);
      if(docRef.id.toString().length !== 0)
        alert('Document written with ID: ", docRef.id')
      console.log("Document written with ID: ", docRef.id);
      console.log(docRef);
    }
    catch(e) {
      console.log("Error adding document", e);
    }
  }

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target?.files![0]);
    setFileName('memory/'+event.target?.files![0].name);
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Memory</IonTitle>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/student-memory/good-memories'}/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <form onSubmit={insertHandler}>
            <IonRow>
              <IonCol className={'ion-text-center'}>
                <h1>Add New Memory</h1>
              </IonCol>
            </IonRow>
            <IonItem>
              <IonLabel position={'floating'}>Memory Title</IonLabel>
              <IonInput ref={title} required clearInput/>
            </IonItem>
            <IonItem>
              <IonSelect
                interface={'popover'} value={chosenMemoryType}
                onIonChange={(e) => setChosenMemoryType(e.detail.value)}>
                <IonSelectOption value={'good'}>Good Memory</IonSelectOption>
                <IonSelectOption value={'bad'}>Bad Memory</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position={'stacked'}>Image</IonLabel>
              <input type={'file'} required onChange={fileChangeHandler}/>
            </IonItem>
            <IonButton type={'submit'} expand={'block'}>Insert</IonButton>
            <IonButton type={'reset'} expand={'block'} color={'tertiary'}>Reset</IonButton>
          </form>
        </IonGrid>
      </IonContent>

    </IonPage>
  )
}

export default NewMemory;