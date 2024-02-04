import {
  IonAvatar,
  IonButton, IonButtons, IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonInput,
  IonItem, IonLabel, IonMenuButton,
  IonPage, IonRow,
  IonTitle,
  IonToolbar, useIonAlert
} from '@ionic/react';
import './Home.css';
import React, {useEffect, useRef, useState} from "react";
import {Student} from "../Student";
import {BASE_URL} from "../data/DbConfig";

const Home: React.FC = () => {

  const url = BASE_URL;
  const [students, setStudents] = useState<Student[]>([]);
  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File>();

  const [alertMsg] = useIonAlert();

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
  }

  const insertHandler = () => {
    const formData = new FormData();

    const inNim = nim.current?.value as string;
    const inNama = nama.current?.value as string;
    const inProdi = prodi.current?.value as string;

    formData.append('nim', inNim);
    formData.append('nama',inNama);
    formData.append('prodi',inProdi);
    formData.append('foto', selectedFile as File);

    console.log(selectedFile);

    fetch(url.concat('insert_new_student.php'), {
      method: 'post',
      body: formData
    }).then(response => response.text())
      .then((data)=> {
        const dataObj = JSON.parse(data);
        console.log(dataObj);
        alertMsg({
          message: dataObj['message'],
          header: (dataObj['success'] === 1) ? "Success" : "Failed",
          buttons: ['Ok']
        })
        if (dataObj['success'] === 1) getAllDataHandler();
      })

  };

  const getAllDataHandler = () => {
    fetch(url.concat('select_all_students.php'))
      .then(response => response.json())
      .then((data) => {
        console.log(data.students);
        data.students === undefined ? setStudents([]) : setStudents(data.students.reverse());
      })
  }

  useEffect(() => {
    getAllDataHandler()
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Student</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>

          <IonRow>
            <IonCol className={'ion-text-center'}>
              <h1>Insert New Student</h1>
            </IonCol>
          </IonRow>
          <IonItem>
            <IonLabel position={'floating'}>NIM</IonLabel>
            <IonInput ref={nim}/>
          </IonItem>
          <IonItem>
            <IonLabel position={'floating'}>Nama</IonLabel>
            <IonInput ref={nama}/>
          </IonItem>
          <IonItem>
            <IonLabel position={'floating'}>Jurusan</IonLabel>
            <IonInput ref={prodi}/>
          </IonItem>
          <IonItem>
            <input type={'file'} onChange={fileChangeHandler}/>
          </IonItem>
          <IonButton expand={'full'} onClick={insertHandler}>Insert</IonButton>

          <IonRow>
            <IonCol className={'ion-text-center'}>
              <h1>All Data Student</h1>
            </IonCol>
          </IonRow>
          <IonButton expand={'block'} fill={'clear'} onClick={getAllDataHandler}>Get All Data</IonButton>
          {students.map(student => (
            <IonItem key={student.nim}>
              <IonAvatar slot={'start'}>
                <img src={url + (student.foto ? student.foto : 'uploads/avatar0.svg')} alt={'Students'}/>
              </IonAvatar>
              <IonLabel>
                {student.nim} <br/>
                {student.nama} <br/>
                {student.prodi} <br/>
                {student.foto}
              </IonLabel>
            </IonItem>
          ))}

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
