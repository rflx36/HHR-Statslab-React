import { BaseStatsType, EquipsType, ItemType, PetStatsType, PremiumAdType, PVEType, SkillsType, UIStateType } from "./types"

export const StatlabVersion = "2.1+";


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
    mage_skills: [0, 0, 0],
    guild_attack_boost: 0,
    guild_defense_boost: 0,
    guild_elemental_boost: 0

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
    current_hander: "unequiped",
    current_pet_total_cost: 0,
    current_pet_total_fatk_bonus: 0,
    current_pet_total_fdef_bonus: 0
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
    is_pet: false,
    is_change_pet: false,
    shield: false,
    booster: false,
    enchanted: false,
    all: false,
    point: false,
    save: "save",
    charge: 100,
    range: 100,
    current: "",
    save_session: "",
    pet_selection: 1,
    pet_evolution: 1
}


export const InitialPremiumState: PremiumAdType = {
    display: false,
    page: 1
}

export const InitialPetStats: PetStatsType = {
    name: "",
    evolution: 1,
    hp: 0,
    atk: 0,
    def: 0,
    dex: 0,
    price: 0,
    type: "warrior",
    level: 1,
    points: 0,
    selected_helmet: InitialItemTypeValue,
    selected_shoes: InitialItemTypeValue,
    fatk: 0,
    fdef: 0,
    url: "",
    color: "ffffff"
}

export const InitialPetStatSlots: Array<PetStatsType> =
    [InitialPetStats, InitialPetStats, InitialPetStats, InitialPetStats, InitialPetStats, InitialPetStats];






export const UIcache = [
    "button-hovered",
    "button",
    "enchanted",
    "guard-skill",
    "icon-accessories",
    "icon-archer",
    "icon-armor",
    "icon-base-damage-crit",
    "icon-base-damage",
    "icon-bullorn",
    "icon-character",
    "icon-checked",
    "icon-close",
    "icon-coin",
    "icon-cowboy",
    "icon-element-electric",
    "icon-element-fire",
    "icon-element-ice",
    "icon-element-poison",
    "icon-equipped",
    "icon-fish",
    "icon-guard",
    "icon-helmets",
    "icon-mage",
    "icon-mana",
    "icon-minus",
    "icon-monster-def",
    "icon-monster-dmg",
    "icon-pants",
    "icon-perks",
    "icon-pets",
    "icon-plus",
    "icon-remove",
    "icon-shoes",
    "icon-single-handed",
    "icon-title",
    "icon-two-handed",
    "icon-unchecked",
    "icon-warrior",
    "monster-toggle-hide",
    "monster-toggle-show",
    "monster-toggle-variant"
]
