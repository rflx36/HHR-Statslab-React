import React, { createContext, useState } from "react";
import { InitialBaseStats, InitialEquip, InitialPetStatSlots, InitialPremiumState, InitialSkills, InitialUIState } from "./initialValue";
import { AdContextType, BaseContextType, EquipsContextType, PetsContextType, SkillsContextType, UIStateContextType } from "./types";


export const ContextBaseStats = createContext<BaseContextType | null>(null);
export const ContextEquips = createContext<EquipsContextType | null>(null);
export const ContextSkills = createContext<SkillsContextType | null>(null);

export const ContextStates = createContext<UIStateContextType | null>(null);
export const ContextPetStats = createContext<PetsContextType | null>(null);
export const ContextAd = createContext<AdContextType | null>(null);


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

const UIStateProvider = (props: React.PropsWithChildren) => {
  const [get, set] = useState(InitialUIState);
  return (
    <ContextStates.Provider value={{ get, set }}>
      {props.children}
    </ContextStates.Provider>
  )
}

const PetStatProvider = (props: React.PropsWithChildren) => {
  const [get, set] = useState(InitialPetStatSlots)
  return (
    <ContextPetStats.Provider value={{ get, set }}>
      {props.children}
    </ContextPetStats.Provider>
  )
}


export const StatProvider = (props: React.PropsWithChildren) => {
  return (
    <UIStateProvider>
      <BaseStatsProvider>
        <PetStatProvider>
          <EquipsProvider>
            <SkillsProvider>
              {props.children}
            </SkillsProvider>
          </EquipsProvider>
        </PetStatProvider>
      </BaseStatsProvider>
    </UIStateProvider>

  )
}


export const AdWallProvider = (props: React.PropsWithChildren) => {
  const [get, set] = useState(InitialPremiumState);

  return (
    <ContextAd.Provider value={{ get, set }}>
      {props.children}
    </ContextAd.Provider>
  )
}