import React from "react";

export interface ItemType {
    name: string,
    power: number,
    defense: number,
    price: number,
    class: "archer" | "cowboy" | "mage" | "warrior" | null,
    url: string,
    level: number,
    weapon_type?: HanderType,
    rpm?: number,
    enchanted?: boolean
}

export interface EquipsType {
    selected_accessories: ItemType,
    selected_helmet: ItemType,
    selected_armor: ItemType,
    selected_pants: ItemType,
    selected_shoes: ItemType,
    selected_primary_weapon: ItemType,
    selected_secondary_weapon: ItemType,
    sheated_primary_weapon: ItemType,
    sheated_secondary_weapon: ItemType
}

export interface SkillsType {
    is_shield_guarded: boolean,
    shield_guard: number,
    shield_expert: number,
    attack_booster: number,
    warrior_skills: Array<number>,
    archer_skills: Array<number>,
    cowboy_skills: Array<number>,
    mage_skills: Array<number>,
    guild_attack_boost : number,
    guild_defense_boost :number,
    guild_elemental_boost: number,
}

export interface BaseStatsType {

    current_level: number,
    current_points: number,
    current_hp: number,
    current_mp: number,
    current_atk: number,
    current_def: number,
    current_dex: number,
    current_speed: 100 | 105 | 110,
    current_total_cost: number,
    current_total_enchantment_cost: number,
    current_fatk_p: number,
    current_fatk_s: number,
    current_fdef: number,
    current_class: ClassType,
    current_hander: HanderType,
    current_pet_total_cost: number,
    current_pet_total_fatk_bonus:number,
    current_pet_total_fdef_bonus:number
}
export interface UIStateType {
    page: "main" | "item" | "save" | "detail" | "class" | "help" | "pets" | "pets_select" | "perk",
    monster: "hide" | "show" | "show variants" | "environment",
    monster_detail: PVEType
    item: ItemSlot,
    is_pet: boolean,
    is_change_pet: boolean,
    shield: boolean,
    booster: boolean,
    enchanted: boolean,
    all: boolean,
    point: boolean,
    save: "save" | "load" | "update",
    charge: number,
    range: number,
    current: string,
    save_session: string,
    pet_selection: 1 | 2 | 3 | 4 | 5 | 6,
    pet_evolution : 1 | 2 | 3
    
}


export interface PVEType {
    name: string,
    hp: number,
    atk?: number,
    def?: number,
    url: string,
    variant_atk?: number,
    variant_def?: number
}

export interface PetStatsType {
    name : string,
    evolution: 1 | 2 | 3,
    hp: number,
    atk: number,
    def: number,
    dex: number,
    price: number,
    type: ClassType,
    level: number,
    points: number,
    selected_helmet: ItemType,
    selected_shoes: ItemType,
    fatk: number,
    fdef: number,
    url: string,
    color: string
}


export type ClassType = "archer" | "cowboy" | "mage" | "warrior";
export type HanderType = "single handed" | "two handed" | "shielded" | "unequiped";
export type ItemSlot = "primary" | "secondary" | "primary sheated" | "secondary sheated" | "helmet" | "armor" | "pants" | "shoes" | "accessories";


export interface PremiumAdType{
    display:boolean,
    page: 1 | 2 
}

export interface BaseContextType {
    get: BaseStatsType,
    set: React.Dispatch<React.SetStateAction<BaseStatsType>>
}

export interface EquipsContextType {
    get: EquipsType,
    set: React.Dispatch<React.SetStateAction<EquipsType>>
}

export interface SkillsContextType {
    get: SkillsType,
    set: React.Dispatch<React.SetStateAction<SkillsType>>
}
export interface UIStateContextType {
    get: UIStateType,
    set: React.Dispatch<React.SetStateAction<UIStateType>>
}

export interface AdContextType {
    get: PremiumAdType,
    set: React.Dispatch<React.SetStateAction<PremiumAdType>>
}

export interface PetsContextType{
    get: Array<PetStatsType>,
    set: React.Dispatch<React.SetStateAction<Array<PetStatsType>>>
}