import React from 'react';

type memoryType = 'good' | 'bad';

export interface Memory {
  id: string,
  title: string,
  type: memoryType,
  imagePath: string,
  base64Url: string
}

const MemoriesContext = React.createContext<{
  memories: Memory[];
  addMemory: (path: string, base64Url: string,  title: string, type: memoryType) => void;
  initContext: () => void;
}>({
  memories: [],
  addMemory: () => {},
  initContext: () => {}
})

export default MemoriesContext;