import React, {useCallback, useEffect, useState} from "react";
import MemoriesContext, {Memory} from "./memories-context";
import {Storage} from "@ionic/storage";
import {Directory, Filesystem} from "@capacitor/filesystem";

type memoryType = 'good' | 'bad';

const MemoriesContextProvider: React.FC = props => {

  const [memories, setMemories] = useState<Memory[]>([]);
  const addMemory = (path: string, base46Url: string, title: string, type: memoryType) => {
    console.log("Add Memory");
    const newMemory: Memory = {
      id: Math.random().toString(),
      title,
      type,
      imagePath: path,
      base64Url: base46Url
    };
    console.log(newMemory);
    setMemories(currMemories => {
      // Push new obj
      return [...currMemories, newMemory];
    });
  };

  useEffect( () => {
    console.log("Storable Memories");
    // if (memories===[]) return;
    const storableMemories = memories.map(memory => {
      return {
        id: memory.id,
        title: memory.title,
        imagePath: memory.imagePath,
        type: memory.type
      }
    });
    // https://github.com/ionic-team/ionic-storage
    const store = new Storage();
    store.create().then(_ => '');
    store.set('memories', JSON.stringify(storableMemories)).then(r => console.log("Get Memory[] from Json",r));
  }, [memories]);

  const initContext = useCallback( async () => {
    console.log("init Context");
    const memoriesData = await (await (new Storage().create())).get('memories')
    const storedMemories: Memory[] = memoriesData.value ? JSON.parse(memoriesData.value) : [];
    const loadedMemories: Memory[] = [];
    for (const storedMemory of storedMemories){
      const file = await Filesystem.readFile({
        path: storedMemory.imagePath,
        directory: Directory.Data
      })
      loadedMemories.push({
        id: storedMemory.id,
        title: storedMemory.title,
        type: storedMemory.type,
        imagePath: storedMemory.imagePath,
        base64Url: 'data:image/jpeg;base64,' + file.data
      })
    }
    console.log("Loaded Memories ",loadedMemories);
    if (loadedMemories !== [])
      setMemories(loadedMemories);
  },[]);

  return (
    <MemoriesContext.Provider value={{memories, addMemory, initContext}}>
      {props.children}
    </MemoriesContext.Provider>
  )
}

export default MemoriesContextProvider;