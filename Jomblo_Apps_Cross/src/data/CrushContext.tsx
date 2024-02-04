import React from "react";

export interface Crush{
  id: string,
  name: string,
  photo: string,
  desc: string
}

interface Context {
  crushPotential: Crush[],
  crushTarget: Crush[],
  addToTarget: (crush: Crush) => void,
  removeCrushTarget: (crush: Crush | null) => void
}

export const CrushContext = React.createContext<Context>({
  crushPotential: [],
  crushTarget: [],
  addToTarget: () => {},
  removeCrushTarget: () => {}
});
