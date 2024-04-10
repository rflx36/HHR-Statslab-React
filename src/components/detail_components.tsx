import { ChangeEvent, useContext } from "react";
import CloseButton from "./closeButton";
import { GetDamage } from "./monster_component";
import { ContextBaseStats, ContextEquips, ContextSkills, ContextStates } from "../StatContext";
import { dex_crit_chance } from "../initialValue";
import "../css/detail_components.css";
import { data_items } from "../initialLoad";
import { ClassType } from "../types";




export default function ContainerDetail() {
    return (
        <>
            <div className="cont-detailed-damage">
                <CloseButton />
                <DamageContainer />
                <SkillsContainer />
            </div>
        </>
    );
}

function SkillsContainer() {
    const skills = useContext(ContextSkills);
    const stat = useContext(ContextBaseStats);
    const equips = useContext(ContextEquips);
    const skill_data = data_items[22].filter((arr: any) => arr.class == stat?.get.current_class);

    let skill_stat: Array<number> = [];
    switch (stat?.get.current_class) {
        case "warrior":
            skill_stat = skills?.get.warrior_skills || [];
            break;
        case "archer":
            skill_stat = skills?.get.archer_skills || [];
            break;
        case "cowboy":
            skill_stat = skills?.get.cowboy_skills || [];
            break;
        case "mage":
            skill_stat = skills?.get.mage_skills || [];

    }

    return (
        <div className="cont-skills">

            {
                skill_data.map((e, i) => {


                    let enable = true;
                    if (stat?.get.current_class == "cowboy") {
                        if (!(equips?.get.selected_primary_weapon.name != "" || equips.get.selected_secondary_weapon.name != "")) {
                            enable = false;
                        }
                    }
                    else if (equips?.get.selected_primary_weapon.weapon_type == "two handed") {
                        if (e.weapon_type != "two handed") {
                            enable = false;
                        }
                    } else {
                        if ((equips?.get.selected_secondary_weapon.defense || 0) > 0) {
                            if (e.weapon_type != "shielded") {
                                enable = false;
                            }
                        }
                        else if (equips?.get.selected_primary_weapon.weapon_type == "single handed" || equips?.get.selected_secondary_weapon.weapon_type == "single handed") {
                            if (e.weapon_type != "single handed") {
                                enable = false;
                            }
                        }
                        else {
                            enable = false;
                        }
                    }
                    return (
                        <SkillCont
                            class={stat?.get.current_class || "warrior"}
                            name={e.name}
                            current_value={skill_stat[i]}
                            max_value={e.max_level}
                            current_mana={e.base_mp + (e.mp_increase * skill_stat[i])}
                            enabled={enable}
                            url={e.url}
                            key={i}
                            identifier={i}
                        />
                    )
                }
                )
            }
            <p id="active-skills-info">
                <i>Active skills depends on your equipped weapon type</i>
            </p>
        </div>
    )
}

function SkillCont(props: { class: ClassType, name: string, current_value: number, max_value: number, current_mana: number, enabled: boolean, url: string, identifier: number }) {
    const class_name = "skill-detail-cont skill-class-" + props.class + " " + ((!props.enabled) ? "disable-skill-cont" : "");
    const skills = useContext(ContextSkills);
    const SetSkillValue = (e: ChangeEvent<HTMLInputElement>) => {
        switch (props.class) {
            case "warrior":
                var arr = skills?.get.warrior_skills || [];
                arr[props.identifier] = parseInt(e.target.value);
                skills?.set(x => ({ ...x, warrior_skills: arr }))
                break;
            case "archer":
                var arr = skills?.get.archer_skills || [];
                arr[props.identifier] = parseInt(e.target.value);
                skills?.set(x => ({ ...x, archer_skills: arr }));
                break;

            case "cowboy":
                var arr = skills?.get.cowboy_skills || [];
                arr[props.identifier] = parseInt(e.target.value);
                skills?.set(x => ({ ...x, cowboy_skills: arr }));
                break;
            case "mage":
                var arr = skills?.get.mage_skills || [];
                arr[props.identifier] = parseInt(e.target.value);
                skills?.set(x => ({ ...x, mage_skills: arr }));
                break;

        }
    }

    return (
        <div className={class_name}>
            <img src={props.url}></img>
            <div className="skill-detail-more-cont">
                <p>{props.name}</p>
                <div className="range-level-cont">
                    <input type="range" min={0} max={props.max_value} value={props.current_value} onChange={SetSkillValue}></input>
                    <p >lvl: {props.current_value}</p>
                    <div className="mana-cont">
                        <div className="mana-icon"> </div>
                        <p>{props.current_mana}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


function DamageContainer() {
    const ui_state = useContext(ContextStates);
    const equips = useContext(ContextEquips);
    const stat = useContext(ContextBaseStats);
    const skills = useContext(ContextSkills);

    const monster_hp = ui_state?.get.monster_detail.hp || 0;
    const player_fatk = stat?.get.current_fatk_p || 0;
    const monster_fdef = (ui_state?.get.monster_detail.def || 0) * ((ui_state?.get.monster_detail.def || 0) + (ui_state?.get.monster_detail.variant_def || 0));
    const crit_multiplier = parseInt(String(dex_crit_chance[stat?.get.current_dex || 0]));
    const base_damage = GetDamage(player_fatk, monster_fdef); 
    const base_damage_crit = Math.floor(base_damage * crit_multiplier);

    let skills_data = data_items[22].filter((arr: any) => arr.class == stat?.get.current_class);


    let bonus_enchant = 1;
    bonus_enchant += (equips?.get.sheated_primary_weapon.enchanted) ? 0.25 : 0;
    bonus_enchant += (equips?.get.sheated_secondary_weapon.enchanted) ? 0.25 : 0;
    let skill_stat: Array<number> = [];
    switch (stat?.get.current_class) {
        case "warrior":
            skill_stat = skills?.get.warrior_skills || [];
            break;
        case "archer":
            skill_stat = skills?.get.archer_skills || [];
            break;
        case "cowboy":
            skill_stat = skills?.get.cowboy_skills || [];
            break;
        case "mage":
            skill_stat = skills?.get.mage_skills || [];
            break;
    }




    return (
        <div className="cont-damage">
            <div className="base-damage-detail-cont">
                <div className="base-info-detail-cont">
                    <img src={ui_state?.get.monster_detail.url}></img>
                    <div className="base-info-detail">
                        <p>{ui_state?.get.monster_detail.name}</p>
                        <p id="hp-val">
                            <span>HP:</span> {monster_hp}
                        </p>
                    </div>
                </div>
            </div>
            <div className="skill-damage-detail-cont">

                {
                    (equips?.get.selected_primary_weapon.enchanted == true) ? (
                        <>
                            <div className="damage-dealt-m-cont">
                                <ElementCont
                                    type="fire"
                                    title="10% of base damage per tick (10 ticks) for 6 seconds"
                                    damage={base_damage}
                                    b_enchant={bonus_enchant}
                                    is_skill={false}
                                    m_hp={monster_hp}
                                />
                                <ElementCont
                                    type="electric"
                                    title="35% of base damage"
                                    damage={base_damage}
                                    b_enchant={bonus_enchant}
                                    is_skill={false}
                                    m_hp={monster_hp}
                                />
                            </div>
                            <div className="damage-dealt-m-cont">
                                <ElementCont
                                    type="poison"
                                    title="Does (√((player_fatk+30)/((mob_fdef/6)+30) *5) )/2"
                                    damage={base_damage}
                                    b_enchant={bonus_enchant}
                                    is_skill={false}
                                    m_hp={monster_hp}
                                    fatk={player_fatk}
                                    m_fdef={monster_fdef}
                                />
                                <ElementCont
                                    type="ice"
                                    title=""
                                    damage={base_damage}
                                    b_enchant={bonus_enchant}
                                    is_skill={false}
                                    m_hp={monster_hp}
                                    fatk={player_fatk}
                                    m_fdef={monster_fdef}
                                />
                            </div>
                        </>
                    ) :
                        (<p id="active-elements-info"><i>To display elemental damage equip an enchanted weapon</i></p>)
                }


                <div className="damage-dealt-m-cont">
                    <div className="dealt-cont">
                        <label>Base Damage</label>
                        <img src="src/assets/UI/icon-base-damage.png"></img>
                        <p>{base_damage}</p>
                    </div>
                    <div className="dealt-cont">
                        <label style={{ textAlign: "center", width: "100%" }}>Base Damage Crit</label>
                        <img src="src/assets/UI/icon-base-damage-crit.png"></img>
                        <p>{base_damage_crit}</p>
                    </div>
                </div>
                {
                    skills_data.map((e, i) => {
                        if (stat?.get.current_class == "cowboy") {
                            if (!(equips?.get.selected_primary_weapon.name != "" || equips.get.selected_secondary_weapon.name != "")) {
                                return;
                            }
                        }
                        else if (equips?.get.selected_primary_weapon.weapon_type == "two handed") {
                            if (e.weapon_type != "two handed") {
                                return;
                            }
                        } else {
                            if ((equips?.get.selected_secondary_weapon.defense || 0) > 0) {
                                if (e.weapon_type != "shielded") {
                                    return;
                                }
                            }
                            else if (equips?.get.selected_primary_weapon.weapon_type == "single handed" || equips?.get.selected_secondary_weapon.weapon_type == "single handed") {
                                if (e.weapon_type != "single handed") {
                                    return;
                                }
                            }
                            else {
                                return;
                            }
                        }
                        return (
                            <SkillDamageCont
                                p_enchanted={equips?.get.selected_primary_weapon.enchanted || false}
                                class={stat?.get.current_class || ""}
                                skill_name={e.name}
                                base_value={e.base_value}
                                value_increase={e.value_increase}
                                skill_level={skill_stat[i]}
                                is_multiply={e.is_multiply}
                                damage={base_damage}
                                crit={crit_multiplier}
                                b_enchant={bonus_enchant}
                                m_hp={ui_state?.get.monster_detail.hp || 0}
                                key={i}
                                m_fdef={monster_fdef}
                            />

                        )
                    })
                }
            </div>
        </div>
    )
}



function ElementCont(props: { type: string, title: string, damage: number, b_enchant: number, is_skill: boolean, m_hp: number, fatk?: number, m_fdef?: number, base_val?: number, val_increase?: number, skill_lvl?: number }) {

    let damage = 0;
    switch (props.type) {
        case "fire":
            damage = (props.damage * 0.1) * (props.b_enchant || 1);
            break;
        case "electric":
            damage = (props.damage * 0.35) * (props.b_enchant || 1);
            break;
        case "poison":
            let PoisonDamage = GetDamage((props.fatk || 0), Math.floor((props.m_fdef || 0) / 6));
            PoisonDamage = Math.round(Math.sqrt(PoisonDamage) / 2);

            damage = PoisonDamage;
            if (props.is_skill) {
                damage = Math.round(damage * ((props.base_val || 0) + ((props.val_increase || 0) * (props.skill_lvl || 0))));
            }

            break;
        case "ice":
            let IcePercentSunder = Math.round(100 * (GetDamage((props.fatk || 0), props.m_fdef || 0) / props.m_hp)) / 100;
            let IceDamage = GetDamage((props.fatk || 0), IcePercentSunder * (props.m_fdef || 0));
            damage = IceDamage;
            if (props.is_skill){

            }
            break;
    }

    damage = Math.round(damage);

    let cont_name = (props.is_skill) ? "skill-dealt-element-cont" : "dealt-element-cont";

    return (
        <div className={cont_name} title={props.title}>
            <img src={"src/assets/UI/icon-element-" + props.type + ".png"} ></img>
            <div className="display-one-hit">{(damage >= props.m_hp) && "1 Hit"}</div>
            <p className={"element-" + props.type}>{damage}</p>
        </div>
    )


}




function SkillDamageCont(props: { m_fdef?: number, p_enchanted: boolean, class: string, skill_name: string, base_value: number, value_increase: number, skill_level: number, is_multiply: boolean, damage: number, crit: number, b_enchant: number, m_hp: number }) {

    let base_damage = props.damage;


    let skill_damage = Math.round(base_damage * (props.base_value + (props.value_increase * props.skill_level)));
    let skill_damage_crit = Math.floor(skill_damage * props.crit);

    let hit_identifier = (skill_damage >= props.m_hp) ? "1 Hit" : "";
    let hit_identifier_crit = (skill_damage_crit >= props.m_hp) ? "1 Hit" : "";
    let display_multiplier = " (" + Math.round((props.base_value + (props.value_increase * props.skill_level)) * 100) + "%)";
    let crit_text_display = "Skill crit";
    let multiply_text_display = "";

    if (props.is_multiply) {

        display_multiplier = "";
        if (props.skill_name == "guard arrow") {
            base_damage *= 0.1;
        }
        skill_damage = Math.floor(base_damage);
        skill_damage_crit = Math.floor(base_damage * props.crit);
        hit_identifier = ((skill_damage * (props.skill_level + 1)) >= props.m_hp) ? "1 Shot" : "";
        hit_identifier_crit = ((skill_damage_crit * (props.skill_level + 1)) >= props.m_hp) ? "1 Shot" : "";
        if (props.class == "archer") {
            crit_text_display = "per arrow Crit";
        }
        else if (props.class == "cowboy") {
            crit_text_display = "per bullet Crit";
        }
        else if (props.class == "mage") {
            crit_text_display = "per orb crit";
        }
        multiply_text_display = " x" + (props.skill_level + 1);
    }

    return (
        <div className="damage-dealt-m-cont">
            {
                (props.p_enchanted == true) &&
                (
                    <div className={"skill-damage-list-cont skill-class-" + props.class}>
                        <h6>{props.skill_name + " elemental damage"}</h6>
                        <ElementCont
                            type="fire"
                            title=""
                            damage={skill_damage}
                            b_enchant={props.b_enchant}
                            is_skill={true}
                            m_hp={props.m_hp}
                        />
                        <ElementCont
                            type="electric"
                            title=""
                            damage={skill_damage}
                            b_enchant={props.b_enchant}
                            is_skill={true}
                            m_hp={props.m_hp}
                        />
                        <ElementCont
                            type="poison"
                            title=""
                            damage={skill_damage}
                            b_enchant={props.b_enchant}
                            is_skill={true}
                            m_hp={props.m_hp}
                            fatk={base_damage}
                            m_fdef={props.m_fdef || 0}
                            base_val={props.base_value}
                            val_increase={props.value_increase}
                            skill_lvl={props.skill_level}
                        />
                        <ElementCont
                            type="ice"
                            title=""
                            damage={skill_damage}
                            b_enchant={props.b_enchant}
                            is_skill={true}
                            m_hp={props.m_hp}
                            fatk={base_damage}
                            m_fdef={props.m_fdef || 0}
                            base_val={props.base_value}
                            val_increase={props.value_increase}
                            skill_lvl={props.skill_level}
                        />
                    </div>
                )
            }

            <div className="dealt-cont">
                <label>{props.skill_name}
                    <span >{display_multiplier}</span>
                </label>
                <img src="src/assets/UI/icon-base-damage.png"></img>
                <div className="display-one-hit">{hit_identifier}</div>
                <p>{skill_damage}{multiply_text_display}</p>
            </div>
            <div className="dealt-cont">
                <label style={{ textAlign: "center", width: "100%" }}>{crit_text_display}</label>
                <img src="src/assets/UI/icon-base-damage-crit.png"></img>
                <div className="display-one-hit">{hit_identifier_crit}</div>
                <p>{skill_damage_crit}</p>
            </div>
        </div>
    )
}