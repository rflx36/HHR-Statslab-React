export interface ItemType {
    name: string,
    attack: number,
    defense: number,
    price: number,
    class: "archer" | "cowboy" | "mage" | "warrior" | null,
    url: string,
    weapon_type?: HanderType,
    enchanted?: boolean
}

export interface EquipsType {
    selected_accessories:ItemType,
    selected_helmet: ItemType,
    selected_armor: ItemType,
    selected_pants: ItemType,
    selected_shoes: ItemType,
    selected_primary_weapon: ItemType,
    selected_secondary_weapon: ItemType,
    sheated_primary_weapon:ItemType,
    sheated_secondary_weapon:ItemType
}

export interface SkillsType {
    is_shield_guarded : boolean,
    shield_guard : number,
    shield_expert: number,
    attack_booster :number,
    class_skills : Array<number>
}

export interface BaseStatsType {
    current_level : number ,
    current_points : number ,
    current_hp : number,
    current_mp : number,
    current_atk : number,
    current_def : number,
    current_dex : number,
    current_speed : 100 | 105 | 110,
    current_total_cost : number,
    current_total_enchantment_cost : number,
    current_fatk_p :number,
    current_fatk_s :number,
    current_fdef :number

}
export type ClassType = "archer" | "cowboy" | "mage" | "warrior";
export type HanderType = "single handed" | "two handed" | "shielded";
