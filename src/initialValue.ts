import { BaseStatsType, EquipsType, ItemType, PVEType, SkillsType, UIStateType } from "./types"

export const StatlabVersion = "2.0+";


export const InitialItemTypeValue: ItemType = {
    name: "",
    power: 0,
    defense: 0,
    price: 0,
    class: null,
    url: "",
    level: 0,
}
export const InitialWeaponTypeValue: ItemType = {
    ...InitialItemTypeValue,
    weapon_type: "unequiped",
    enchanted: false
}

export const InitialEquip: EquipsType = {
    selected_accessories: InitialItemTypeValue,
    selected_helmet: InitialItemTypeValue,
    selected_armor: InitialItemTypeValue,
    selected_pants: InitialItemTypeValue,
    selected_shoes: InitialItemTypeValue,
    selected_primary_weapon: InitialWeaponTypeValue,
    selected_secondary_weapon: InitialWeaponTypeValue,
    sheated_primary_weapon: InitialWeaponTypeValue,
    sheated_secondary_weapon: InitialWeaponTypeValue

}

export const InitialSkills: SkillsType = {
    is_shield_guarded: false,
    shield_guard: 1,
    shield_expert: 0,
    attack_booster: 0,
    warrior_skills: [0, 0, 0, 0, 0],
    archer_skills: [0, 0, 0],
    cowboy_skills: [0, 0, 0],
    mage_skills: [0, 0, 0]
}

export const InitialBaseStats: BaseStatsType = {
    current_level: 1,
    current_points: 0,
    current_hp: 0,
    current_mp: 0,
    current_atk: 0,
    current_def: 0,
    current_dex: 0,
    current_speed: 100,
    current_total_cost: 0,
    current_total_enchantment_cost: 0,
    current_fatk_p: 0,
    current_fatk_s: 0,
    current_fdef: 16,
    current_class: "warrior",
    current_hander: "unequiped"
}



const InitialPVEStat: PVEType = {
    name: "",
    hp: 0,
    url: "",
}

export const InitialUIState: UIStateType = {
    page: "class",
    monster: "hide",
    monster_detail: InitialPVEStat,
    item: "primary",
    shield: false,
    booster: false,
    enchanted: false,
    all: false,
    point: false,
    save: "save",
    charge: 100,
    range: 100,
    current: "",
    save_session: ""
}


export const dex_crit_chance = [
    1.00, 1.21, 1.37, 1.50, 1.62, 1.72, 1.82, 1.91, 2.00, 2.08, 2.16, 2.23, 2.30, 2.37, 2.44,
    2.50, 2.56, 2.62, 2.68, 2.74, 2.79, 2.85, 2.90, 2.95, 3.00, 3.05, 3.10, 3.15, 3.19, 3.24,
    3.28, 3.33, 3.37, 3.42, 3.46, 3.50, 3.54, 3.58, 3.62, 3.66, 3.70, 3.74, 3.78, 3.82, 3.85,
    3.89, 3.92, 3.96, 4.00, 4.04, 4.08, "", "", "", "", "", "", "", "", 4.37, "", "", "", "", 4.53, "",
    4.59, "", "", 4.68, "", "", "", "", "", "", "", "", "", "", 5.00
];