import {
  IonAvatar,
  IonButton, IonButtons,
  IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonInput, IonItem, IonLabel, IonList, IonMenuButton,
  IonPage, IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert
} from '@ionic/react';
import './Home.css';
import React, {useEffect, useRef, useState} from "react";
import '../firebaseConfig';
import {Student} from "../data/Student";
import { collection, addDoc, getFirestore, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const Home: React.FC = () => {
  // All input Form
  const nim = useRef<HTMLIonInputElement>(null)
  const name = useRef<HTMLIonInputElement>(null)
  const major = useRef<HTMLIonInputElement>(null)

  // React
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState('');
  const [alert] = useIonAlert();
  const [student, setStudent] = useState<Array<Student>>([]);

  // Firebase 9 Modular
  const storage = getStorage();
  const db = getFirestore();

  const inputElement = useRef<HTMLIonButtonElement>(null)

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db,'students'));
    console.log(querySnapshot);
    // await querySnapshot.forEach((doc) => {
    //   setStudent([...student,doc.data() as Student])
    //   console.log(doc.id, ' => ', doc.data());
    // })
    setStudent(querySnapshot.docs.map((doc) => doc.data() as Student))
  }

  useEffect(() => {
    getData().then(() => '');
  },[])

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target?.files![0]);
    setFileName('images/'+event.target?.files![0].name);
    console.log("File Change Handler");
  }

  // https://firebase.google.com/docs/storage/security
  // https://firebase.google.com/docs/storage/web/upload-files#full_example
  const insertHandler = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Insert handler");
    // https://www.freecodecamp.org/news/how-to-clear-input-values-of-dynamic-form-in-react/
    document.querySelectorAll('input')
      .forEach(input => input.value = '');

    if (fileName.length === 0 || selectedFile === undefined || selectedFile === null){
      alert("Selected Image / File still empty");
      return;
    }
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, selectedFile as Blob).then((e) => {
      console.log("Upload File Success",e);
      getDownloadURL(storageRef).then((photoUrl) => {
        addData(photoUrl);
      });
    });

    alert("Insert data to Firebase Success");
  }

  const addData = async (photoUrl: string) => {
    try {
      const newStudent: Student = {
          nim: nim.current?.value as string,
          name: name.current?.value as string,
          major: major.current?.value as string,
          photo: fileName,
          photoUrl: photoUrl
      }
      const docRef = await addDoc(collection(db, 'students'), newStudent);
      console.log("Document written with ID: ", docRef.id);
      console.log(docRef);
    }
    catch (e) {
      console.log("Error adding document", e);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid>
          <form onSubmit={insertHandler} method={'post'}>
            <IonRow>
              <IonCol className={'ion-text-center'}>
                <h1>Insert New Student</h1>
              </IonCol>
            </IonRow>
            <IonItem>
              <IonLabel position={'floating'}>NIM</IonLabel>
              <IonInput ref={nim}  clearInput/>
            </IonItem>
            <IonItem>
              <IonLabel position={'floating'}>Name</IonLabel>
              <IonInput ref={name} inputMode={'text'}  clearInput/>
            </IonItem>
            <IonItem>
              <IonLabel position={'floating'}>Major</IonLabel>
              <IonInput ref={major} inputMode={'text'}  clearInput/>
            </IonItem>
            <IonItem>
              <IonLabel>Image</IonLabel>
              <input type={'file'} onChange={fileChangeHandler}/>
            </IonItem>
            <IonButton type={'submit'} expand={'block'}>Insert</IonButton>
            <IonButton type={'reset'} expand={'block'} color={'tertiary'}
              ref={inputElement}>Reset</IonButton>
          </form>
        </IonGrid>

        <IonRow>
          <IonCol className={'ion-text-center'}>
            <h1>Student Gallery</h1>
          </IonCol>
        </IonRow>

        {student.length === 0 ? (
          <IonRow>
            <IonCol className={'ion-text-center'}>
              No data on Student Gallery
            </IonCol>
          </IonRow>
        ) : (
          <IonList>
            {student.map(student => (
              <IonItem key={student.nim}>
                <IonAvatar slot={'start'}>
                  <img src={student.photoUrl} alt="Student Here"/>
                </IonAvatar>
                <IonLabel>
                  {student.nim} <br/>
                  {student.name} <br/>
                  {student.major} <br/>
                  {/*{student.photo}*/}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
