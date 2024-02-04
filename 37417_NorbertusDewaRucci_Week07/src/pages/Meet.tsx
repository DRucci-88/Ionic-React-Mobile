import React, {useContext, useRef, useState} from "react";
import {
  IonAlert,
  IonAvatar, IonButton,
  IonButtons, IonCol,
  IonContent, IonFab, IonFabButton, IonGrid,
  IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton, IonModal,
  IonPage, IonRow,
  IonTitle, IonToast,
  IonToolbar, isPlatform
} from "@ionic/react";
import {addOutline, ban, chevronForwardOutline, createSharp, trashOutline} from "ionicons/icons";
import FriendsContext, {Friend} from "../data/friend-context";

// const FRIENDS_DATA = [
//   {id: 'fi', name:'John Thor', image: 'assets/avatars/Avatar1.svg'},
//   {id: 'f2', name:'John Ness', image: 'assets/avatars/Avatar2.svg'},
//   {id: 'f3', name:'John Doe', image: 'assets/avatars/Avatar3.svg'}
// ];

// const FRIENDS_DATA: Friend[] = [
//   {id: 'fi', name:'John Thor', photo: 'assets/avatars/Avatar1.svg'},
//   {id: 'f2', name:'John Ness', photo: 'assets/avatars/Avatar2.svg'},
//   {id: 'f3', name:'John Doe', photo: 'assets/avatars/Avatar3.svg'}
// ]

const Meet: React.FC = () => {

  const [startDeleting, setStartDeleting] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [startEditing, setStartEditing] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>();
  const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null)
  const nameRef = useRef<HTMLIonInputElement>(null);
  const friendsCtx = useContext(FriendsContext);

  const callFriendHandler = () => {
    console.log("Calling...");
  }

  // const blockFriendHandler = (event: React.MouseEvent) => {
  //   slidingOptionRef.current?.closeOpened();
  //   console.log("Blocking...");
  // }

  const blockFriendHandler = () => {
    slidingOptionRef.current?.closeOpened();
    console.log("Blocking...");
  }

  // DELETE OPERATION
  const startDeletingFriendHandler = (friendId: string) => {
    slidingOptionRef.current?.closeOpened();
    setStartDeleting(true);
    const friend = friendsCtx.friends.find(a => a.id === friendId);
    setSelectedFriend(friend);
    console.log('Start Delete')
  }
  const deleteFriendHandler = () => {
    setStartDeleting(false);
    setToastMsg("Deleted Friend !")
    friendsCtx.deleteFriend(friendsCtx.friends.findIndex(a => a === selectedFriend));
    console.log("Deleted");
  }

  // EDIT OPERATION
  const startEditHandler = (friendId: string) => {
    slidingOptionRef.current?.closeOpened();
    const friend: Friend | undefined = friendsCtx.friends.find(a => a.id === friendId);
    // const friend = FRIENDS_DATA.find(a => a.id === friendId);
    setSelectedFriend(friend);
    setStartEditing(true);
    console.log(friend?.id);
    console.log(friendsCtx.friends.findIndex(a => a.id === friendId));
    console.log(friendsCtx.friends.findIndex(() => friend));
    console.log("Start Edit");
  }

  const itemSlidingHandler = () => {
    console.log("Sliding...");
  }

  const startAddFriendHandler = () => {
    setStartEditing(true);
    setSelectedFriend(null);
    console.log("Adding Friends");
  }

  // ADD AND EDIT OPERATION
  const saveFriendHandler = () => {
    const enteredName = nameRef.current?.value;
    if(!enteredName) return;
    if(selectedFriend === null)
      friendsCtx.addFriend(enteredName.toString(),'')
    else
      friendsCtx.updateFriend(friendsCtx.friends.findIndex(() => selectedFriend), enteredName.toString());
    setStartEditing(false);
  }

  return(
    // <React.Fragment>
    <>
      <IonAlert
        isOpen={startDeleting}
        header={'Are you sure ?'}
        message={'Do you want to delete your friend? This cannot be undone.'}
        buttons={[
          {text: 'No', role: 'cancel', handler: () => setStartDeleting(false)},
          {text: 'Yes', handler: deleteFriendHandler}
        ]}
      />

      <IonToast
        isOpen={!!toastMsg}
        message={toastMsg}
        duration={2000}
        onDidDismiss={() => setToastMsg("")}
      />

      <IonPage>

        <IonModal isOpen={startEditing}>
          <IonHeader>
            <IonToolbar>
              <IonTitle slot={'start'}>Edit Friends</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow className={'ion-text-center'}>
                <IonCol>
                  <IonItem>
                    <IonLabel position={'floating'}>Friend Name</IonLabel>
                    <IonInput inputMode={'text'} value={selectedFriend?.name} ref={nameRef}/>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow className={'ion-text-center'}>
                <IonCol>
                  <IonButton
                    fill={'clear'}
                    color={'dark'}
                    onClick={() => setStartEditing(false)}
                  >Cancel</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand={'block'}
                    onClick={saveFriendHandler}
                  >Save</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot={'start'}>
              <IonMenuButton/>
            </IonButtons>
            {isPlatform('android') && (
              <IonButtons slot={'end'}>
                <IonButton onClick={startAddFriendHandler}>
                  <IonIcon icon={addOutline}/>
                </IonButton>
              </IonButtons>
            )}
            <IonTitle>Meet</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isPlatform('android') && (
          <IonFab vertical={'bottom'} horizontal={'end'} slot={'fixed'}>
            <IonFabButton color={'secondary'} onClick={startAddFriendHandler}>
              <IonIcon icon={addOutline}/>
            </IonFabButton>
          </IonFab>
        )}

        <IonContent>
          <IonList>
            {/*{FRIENDS_DATA.map((friend) => (*/}
            {friendsCtx.friends.map((friend) => (
              <IonItemSliding key={friend.id} ref={slidingOptionRef} onDragEnter={itemSlidingHandler}>
                <IonItemOptions side={'start'}>
                  <IonItemOption color={'danger'} onClick={blockFriendHandler}>
                    <IonIcon slot={'icon-only'} icon={ban}/>
                  </IonItemOption>
                  <IonItemOption color={'warning'} onClick={startDeletingFriendHandler.bind(null, friend.id)}>
                    <IonIcon slot={'icon-only'} icon={trashOutline}/>
                  </IonItemOption>
                </IonItemOptions>

                <IonItemOptions slot={'end'}>
                  <IonItemOption color={'warning'} onClick={startEditHandler.bind(null,friend.id)}>
                    <IonIcon slot={'icon-only'} icon={createSharp}/>
                  </IonItemOption>
                </IonItemOptions>

                <IonItem lines={'full'} button onClick={callFriendHandler}>
                  <IonAvatar slot={'start'}>
                    <img src={friend.photo} alt={'Missing profile'}/>
                  </IonAvatar>
                  <IonLabel>{friend.name}</IonLabel>
                  <IonIcon slot={'end'} icon={chevronForwardOutline}/>
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>

        </IonContent>
      </IonPage>
    </>


  );
};

export default Meet;