import { createContext, useState } from "react";
import { InitialBaseStats, InitialEquip, InitialSkills } from "./initialValue";



const User = {
  BaseStats: InitialBaseStats,
  Equips: InitialEquip,
  Skills: InitialSkills
}

export const UserStat = createContext(User);

export const StatProvider = (props: React.PropsWithChildren) => {
  const [stat, setStat] = useState(User);
  

  return (
    <UserStat.Provider value={stat}>
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
  */
}