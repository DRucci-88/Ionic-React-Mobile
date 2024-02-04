import React, {useEffect, useState} from "react";
import {IonBackButton, IonBadge, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/react";
import {bookmark} from "ionicons/icons";
import {useHistory} from "react-router";
import {getAuth} from "firebase/auth";
import {FavFirebase} from "../data/favFirebase";

const AppBar: React.FC<{
  title: string;
  backButton: boolean;
}> = props => {

  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [favCount, setFavCount] = useState<number>(0);

  useEffect(() => {
    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
      if (user){
        setName(user.displayName!)
        try {
          const stored: FavFirebase[] = JSON.parse(sessionStorage.getItem('fav')!)
          setFavCount(stored.length)
        }
        catch (e){
        }

        // console.log(stored[0])

      }
      else setName("Chef")
    })
  },[])

  return (
    <IonHeader className={'ion-no-margin'}>
      <IonToolbar>
        {props.backButton && (
          <IonButtons slot={'start'}>
            <IonBackButton/>
          </IonButtons>
        )}
        <IonTitle>
          {props.title}
          <p className={'ion-no-margin'}>{name}</p>
        </IonTitle>

        <IonButtons slot={'end'} onClick={() => history.push('/favorite')}>
          <IonButton>
            <IonBadge slot={'start'}>{favCount}</IonBadge> &nbsp;
            <IonIcon slot={'end'} icon={bookmark}/>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}
export default AppBar;
