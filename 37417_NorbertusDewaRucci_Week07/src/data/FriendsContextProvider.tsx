import React, {useState} from "react";

import FriendsContext, {Friend} from "./friend-context";

const FriendsContextProvider: React.FC = props => {
  const [friends, setFriends] = useState<Friend[]>([
    {id: 'f1', name: 'John Thor', photo:'assets/avatars/Avatar1.svg'},
    {id: 'f2', name: 'Odin Son', photo:'assets/avatars/Avatar1.svg'},
    {id: 'f3', name: 'Le God ', photo:'assets/avatars/Avatar1.svg'}
  ]);

  const addFriend = (name: string, photo: string) => {
    if(photo === '') photo = "assets/avatars/Avatar2.svg";
    const newFriend: Friend = {
      id: Math.random().toString(), name: name, photo: photo
    }

    setFriends((currentFriends) => {
      return currentFriends.concat(newFriend);
    });
  }

  const updateFriend = (index: number, newName: string) => {
    // https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    const items = [...friends];
    items[index] = {
      ...items[index],
      name: newName
    };
    setFriends(items);
  }
  const deleteFriend = (index: number) => {
    // https://stackoverflow.com/questions/36326612/how-to-delete-an-item-from-state-array
    // const filteredArray = [...friends].splice(index, 1);
    // console.log(filteredArray);
    const filteredArray = friends.filter(item => item !== friends[index]);
    setFriends(filteredArray);
  }

  return(
    <FriendsContext.Provider value={{
      friends,
      addFriend,
      updateFriend,
      deleteFriend
    }}>
      {props.children}
    </FriendsContext.Provider>
  );
};

export default FriendsContextProvider;