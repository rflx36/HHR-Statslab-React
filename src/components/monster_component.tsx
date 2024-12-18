import { useContext } from "react";
import { ContextBaseStats, ContextPetStats, ContextStates } from "../StatContext";
import { data_items } from "../initialLoad";
import "../css/monster_component.css"
import { PVEType } from "../types";


export default function ContainerMonster() {


    return (
        <MonsterCont />
    )
}

function MonsterCont() {
    const ui_state = useContext(ContextStates);
    const pet_stat = useContext(ContextPetStats);
    let data = [];
    switch (ui_state?.get.monster) {
        case "show":
            data = data_items[23].filter((arr: any) => arr.variant == false);
            break;
        case "show variants":
            data = data_items[23];
            break;
        case "environment":
            data = data_items[24];
            break;  
    }
    if (pet_stat?.get != undefined) {

        if ((pet_stat!.get[0].name == "" && ui_state!.get.is_pet)) {
            return <></>;
        }
    }

    return (
        <>
            {((data.length > 0 && ui_state?.get.page != "class" && ui_state?.get.page != "save" && ui_state?.get.page != "help")) && (
                <div className="monster-stat-cont">
                    <div className="monster-cont" >
                        {data.map((e, i) => {
                            return (
                                <IndexContainers
                                    name={e.name}
                                    hp={e.hp}
                                    atk={e.power}
                                    def={e.defense}
                                    url={e.url}
                                    variant_atk={e.variant_atk}
                                    variant_def={e.variant_def}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                </div >
            )}
        </>
    )
}


function IndexContainers(props: PVEType) {
    const stat = useContext(ContextBaseStats);
    const ui_state = useContext(ContextStates);
    const pet_stat = useContext(ContextPetStats);
    const current_pet_selected = ui_state!.get.pet_selection - 1;
    const current_pet_info = pet_stat!.get[current_pet_selected];

    let damage = (props.atk || 0) * ((props.atk || 0) + (props.variant_atk || 0));
    let defense = (props.def || 0) * ((props.def || 0) + (props.variant_def || 0));

    if (props.name.includes("Sasquatch")) {
        damage *= 2.5;
    }
    if (props.name.includes("Fishurn")) {
        damage *= 0.7;
    }

    if (props.name.includes("Block Bot")){
        damage *= 0.4;
    }
    
    let fatk = stat?.get.current_fatk_p || 0;

    if (stat?.get.current_class == "archer") {
        fatk *= ((ui_state?.get.charge || 0) / 100); // 60% - 140% damage based off charge
    }
    else if (stat?.get.current_class == "cowboy") {
        fatk *= ((ui_state?.get.range || 0) / 100); // bullet damage reduced based off distance travel
    }

    const defender = (ui_state!.get.is_pet) ? current_pet_info.fdef : stat!.get.current_fdef;
    const attacker = (ui_state!.get.is_pet) ? current_pet_info.fatk : fatk;
    
    let dmg = GetDamage(damage, defender);
    let def = GetDamage(attacker, defense);


    const pve_damage = AbbrevFormat(dmg);
    const pve_def = AbbrevFormat(def);

    const col = ((dmg >= 0) ? ' linear-gradient(rgb(236, 0, 2) 0%, rgb(169, 0, 11) 100%)' : '#00EA00');

    const info_monster_damage = (ui_state!.get.is_pet) ? "Damage to pet" : "Damage to you";
    const info_monster_defend = (ui_state!.get.is_pet) ? "Pet Damage Dealt" : "Your Damage Dealt";

    const ViewDetail = () => {

        if (ui_state!.get.is_pet) {
            return;
        }
        if (props.name == ui_state?.get.monster_detail.name && ui_state.get.page == "detail") {
            return;
        }
        if (ui_state?.get.monster == "environment") {
            return;
        }
        const PVEDetail = { ...props };

        ui_state?.set(x => ({ ...x, monster_detail: PVEDetail, page: "detail" }));

    }
    return (
        <div className="monster-index" onClick={ViewDetail} style={(ui_state!.get.is_pet) ? { background: "#" + current_pet_info.color, borderColor: "#000000b8" } : {}}>
            <div className="monster-image" title={props.name} style={(ui_state!.get.is_pet) ? { backgroundColor: "#00000030", backgroundImage: "url(" + props.url + ")" } : { backgroundImage: "url(" + props.url + ")" }}></div>
            <div className="monster-stat">
                {((props.atk || 0) > 0) && (
                    <div className="monster-dmg" title={info_monster_damage} style={(ui_state!.get.is_pet) ? { background: "#00000030" } : {}}>
                        <div className="monster-dmg-icon"></div>
                        <p style={{ background: col }} >{pve_damage}</p>
                    </div>
                )}

                {((props.def || 0) > 0) && (
                    <div className="monster-def" title={info_monster_defend} style={(ui_state!.get.is_pet) ? { background: "#00000030" } : {}}>
                        <div className="monster-def-icon"></div>
                        <p>{pve_def}</p>
                    </div>
                )}
            </div>
        </div>
    )
}


export function GetDamage(attacker: number, defender: number) {
    return Math.round(5 * ((attacker + 30) / (defender + 30)));
}

function AbbrevFormat(num: number) {
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(0) + 'k';
    } else if (num < 1000000000) {
        return (num / 1000000).toFixed(0) + 'm';
    } else if (num < 1000000000000) {
        return (num / 1000000000).toFixed(0) + 'b';
    } else {
        return (num / 1000000000000).toFixed(0) + 't';
    }
}