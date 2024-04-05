import React, { createContext, useState } from "react";
import { InitialBaseStats, InitialEquip, InitialSkills, InitialUIState } from "./initialValue";
import { BaseContextType, EquipsContextType, SkillsContextType, UIStateContextType } from "./types";


export const ContextBaseStats = createContext<BaseContextType | null>(null);
export const ContextEquips = createContext<EquipsContextType | null>(null);
export const ContextSkills = createContext<SkillsContextType | null>(null);

export const ContextStates = createContext<UIStateContextType | null>(null);

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
export const StatProvider = (props: React.PropsWithChildren) => {
  return (
    <UIStateProvider>
      <BaseStatsProvider>
        <EquipsProvider>
          <SkillsProvider>
            {props.children}
          </SkillsProvider>
        </EquipsProvider>
      </BaseStatsProvider>
    </UIStateProvider>

  )
}

