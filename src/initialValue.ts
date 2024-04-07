import { BaseStatsType, EquipsType, ItemType, SkillsType, UIStateType } from "./types"


export const InitialItemTypeValue: ItemType = {
    name: "",
    power: 0,
    defense: 0,
    price: 0,
    class: null,
    url: ""
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
    class_skills: [0, 0, 0, 0, 0, 0, 0, 0]
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




export const InitialUIState: UIStateType = {
    page: "class",
    monster: "hide",
    item: "primary",
    shield: false,
    booster: false,
    enchanted: false,
    all: false,
    point: false
}