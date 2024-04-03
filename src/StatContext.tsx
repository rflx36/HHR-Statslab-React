import React, { createContext, useState } from "react";
import { InitialBaseStats, InitialEquip, InitialSkills } from "./initialValue";
import { BaseContextType, EquipsContextType, SkillsContextType } from "./types";


// type ContextType = {
//   get: BaseStatsType | EquipsType | SkillsType,
//   set: React.Dispatch<React.SetStateAction<BaseStatsType | EquipsType | SkillsType>>
// }
// type BaseContextType = {
//   get: BaseStatsType,
//   set: React.Dispatch<React.SetStateAction<BaseStatsType>>
// }

/*
const User: UserStatsType = {
  BaseStats: InitialBaseStats,
  Equips: InitialEquip,
  Skills: InitialSkills
}*/

// const context = createContext<ContextType | null>(null);

export const ContextBaseStats = createContext<BaseContextType | null>(null);
export const ContextEquips = createContext<EquipsContextType | null>(null);
export const ContextSkills = createContext<SkillsContextType | null>(null);


// export const UserStat = createContext<ContextType | null>(null);

const BaseStatsProvider = (props: React.PropsWithChildren) => {
  const [get, set] = useState(InitialBaseStats);
  return (
    <ContextBaseStats.Provider value={{ get, set }}>
      {props.children}
    </ContextBaseStats.Provider>
  )
}
const EquipsProvider = (props: React.PropsWithChildren) => {
  const [get, set] = useState(InitialEquip);
  return (
    <ContextEquips.Provider value={{ get, set }}>
      {props.children}
    </ContextEquips.Provider>
  )
}
const SkillsProvider = (props: React.PropsWithChildren) => {
  const [get, set] = useState(InitialSkills);
  return (
    <ContextSkills.Provider value={{ get, set }}>
      {props.children}
    </ContextSkills.Provider>
  )
}

export const StatProvider = (props: React.PropsWithChildren) => {
  return (

    <BaseStatsProvider>
      <EquipsProvider>
        <SkillsProvider>
          {props.children}
        </SkillsProvider>
      </EquipsProvider>
    </BaseStatsProvider>

  )
}


/*
export const StatProvider = (props: React.PropsWithChildren) => {

  const [get, set] = useState(User);

  return (
    <UserStat.Provider value={{ get, set }}>
      {props.children}
    </UserStat.Provider>
  )


  /*
  console.log(stat);

  const Updatestat = () => {

    let updated_stat = {...stat};
    updated_stat.BaseStats.current_atk++;

    setStat(updated_stat);

  }*/
//<button onClick={()=>{setStat(stat=>({...stat,current_atk:stat.current_atk+1}))}}>+1</button>
/*

<button onClick={
      ()=>{
        setStat(
          stat=>(
            {
              ...stat,
              BaseStats: {
                ...stat.BaseStats,
                current_atk: stat.BaseStats.current_atk +1 
              }
            }
          )
        )
      }
    }
      ></button>
 
}


*/