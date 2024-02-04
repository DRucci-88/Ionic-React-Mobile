import React, {useRef} from "react";
import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {ban, chevronForwardOutline, createSharp, trashOutline} from "ionicons/icons";
import Avatar1 from '../avatars/Avatar1.svg';
import Avatar2 from '../avatars/Avatar2.svg';
import Avatar3 from '../avatars/Avatar3.svg';

const FRIENDS_DATA = [
  {id: 'fi', name:'John Thor', image: Avatar1},
  {id: 'f2', name:'John Ness', image: Avatar2},
  {id: 'f3', name:'John Doe', image: Avatar3}
];

const Meet: React.FC = () => {

  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null)

  const callFriendHandler = () => {
    console.log("Calling...");
  }

  const blockFriendHandler = (event: React.MouseEvent) => {
    slidingOptionRef.current?.closeOpened();
    event.stopPropagation();
    console.log("Blocking...");
  }

  // const blockFriendHandler = () => {
  //   slidingOptionRef.current?.closeOpened();
  //   console.log("Blocking...");
  // }

  const deleteFriendHandler = () => {
    slidingOptionRef.current?.closeOpened();
    console.log("Deleting...");
  }

  const editFriendHandler = () => {
    slidingOptionRef.current?.closeOpened();
    console.log("Editing...");
  }

  const itemSlidingHandler = () => {
    console.log("Sliding...");
  }

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonMenuButton/>
          </IonButtons>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <IonList>
          {FRIENDS_DATA.map((friend) => (
            <IonItemSliding key={friend.id} ref={slidingOptionRef} onDragEnter={itemSlidingHandler}>
              <IonItemOptions side={'start'} onClick={() => console.log('Ion Item Options')}>
                <IonItemOption color={'danger'} onClick={blockFriendHandler}>
                  <IonIcon slot={'icon-only'} icon={ban}/>
                </IonItemOption>
                <IonItemOption color={'warning'} onClick={deleteFriendHandler}>
                  <IonIcon slot={'icon-only'} icon={trashOutline}/>
                </IonItemOption>
              </IonItemOptions>

              <IonItemOptions slot={'end'}>
                <IonItemOption color={'warning'} onClick={editFriendHandler}>
                  <IonIcon slot={'icon-only'} icon={createSharp}/>
                </IonItemOption>
              </IonItemOptions>

              <IonItem lines={'full'} button onClick={callFriendHandler}>
                <IonAvatar slot={'start'}>
                  <img src={friend.image} alt={'Missing profile'}/>
                </IonAvatar>
                <IonLabel>{friend.name}</IonLabel>
                <IonIcon slot={'end'} icon={chevronForwardOutline}/>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Meet;