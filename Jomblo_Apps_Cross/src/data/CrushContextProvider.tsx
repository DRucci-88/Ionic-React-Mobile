import React, {useState} from "react";
import {Crush, CrushContext} from "./CrushContext";

const CrushContextProvider: React.FC = props => {

  const [crushPotential, setCrushPotential] = useState<Crush[]>([
    {id: 'p0', name: 'yinyleon yang', photo: 'assets/avatars/avatar0.svg', desc: 'Mantap'},
    {id: 'p1', name: 'Divi Mini', photo: 'assets/avatars/avatar1.svg', desc: 'Oh yeah'},
    {id: 'p2', name: 'Sick For Lala', photo: 'assets/avatars/avatar2.svg', desc: 'Noice'},
    {id: 'p3', name: 'Sayang Reislin', photo: 'assets/avatars/avatar3.svg', desc: 'Beleh beleh'},
    {id: 'p4', name: 'Shaiden Rouge', photo: 'assets/avatars/avatar4.svg', desc: 'Prikitew'},
    {id: 'p5', name: 'Molly Blue Wolf', photo: 'assets/avatars/avatar5.svg', desc: 'Wadidaw'},
    {id: 'p6', name: 'Golden Natasha', photo: 'assets/avatars/avatar6.svg', desc: 'Kaboom'},
  ]);

  const [crushTarget, setCrushTarget] = useState<Crush[]>([

  ])

  const addToTarget = (newCrush: Crush) => {
    if(newCrush==null) return;

    // Add Target Crush
    setCrushTarget((temp) => {
      return temp.concat(newCrush);
    });
    // Remove Potential Crush
    const filteredArray = crushPotential.filter(item => item !== newCrush);
    setCrushPotential(filteredArray);
  }

  const removeCrushTarget = (removedCrush: Crush | null) => {
    if(removedCrush==null) return;
    // Remove Target Crush
    const filteredArray = crushTarget.filter(item => item !== removedCrush);
    setCrushTarget(filteredArray);
    // Add Potential Crush
    setCrushPotential((temp) => {
      return temp.concat(removedCrush);
    });
  }

  return(
    <CrushContext.Provider value={{
      crushPotential,
      crushTarget,
      addToTarget,
      removeCrushTarget
    }}>
      {props.children}
    </CrushContext.Provider>
  );
};

export default CrushContextProvider;