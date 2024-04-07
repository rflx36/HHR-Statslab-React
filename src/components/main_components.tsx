


import { ChangeEvent, useContext, useMemo, } from 'react';
import '../css/main_components.css';
import { ContextBaseStats, ContextEquips, ContextSkills, ContextStates } from '../StatContext';
import { ItemSlot } from '../types';



export default function ContainerMain() {

    return (
        <div className='cont-all'>

            <div className="shield-guard-bg" id="shield-guard-bg-id">

            </div>
            <ItemsCont />
            <StatCont />
            <SetCont />

        </div>
    );
}

function ItemsCont() {
    const equips = useContext(ContextEquips);


    return (
        <div className='cont-items'>
            <div className='item-cont item-sheath'>
                <ItemCont
                    slot="primary sheated"
                    id='item-sheath-primary'
                    hasEnchants={equips?.get.sheated_primary_weapon.enchanted}
                    url={equips?.get.sheated_primary_weapon.url}
                />
                {(equips?.get.sheated_primary_weapon.weapon_type == "single handed")
                    && (
                        <ItemCont
                            slot="secondary sheated"
                            id='item-sheath-secondary'
                            hasEnchants={equips?.get.sheated_secondary_weapon.enchanted}
                            url={equips?.get.sheated_secondary_weapon.url}
                        />
                    )}

            </div>
            <div className='item-cont item-set'>
                <ItemCont slot="accessories" id='item-accessories' url={equips?.get.selected_accessories.url} />
                <ItemCont slot="helmet" id='item-helmet' url={equips?.get.selected_helmet.url} />
                <ItemCont slot="armor" id='item-armor' url={equips?.get.selected_armor.url} />
                <ItemCont slot="pants" id='item-pants' url={equips?.get.selected_pants.url} />
                <ItemCont slot="shoes" id='item-shoes' url={equips?.get.selected_shoes.url} />
            </div>
            <div className='item-cont item-weapon'>
                <ItemCont
                    slot="primary"
                    id='item-weapon-primary'
                    hasEnchants={equips?.get.selected_primary_weapon.enchanted}
                    url={equips?.get.selected_primary_weapon.url} />
                {
                    (equips?.get.selected_primary_weapon.weapon_type == "single handed")
                    && (
                        < ItemCont
                            slot="secondary"
                            id='item-weapon-secondary'
                            hasEnchants={equips?.get.selected_secondary_weapon.enchanted}
                            url={equips?.get.selected_secondary_weapon.url} />
                    )}

            </div>

        </div>
    )
}
function ItemCont(props: { id: string, slot: ItemSlot, hasEnchants?: boolean, url?: string }) {
    const ui_state = useContext(ContextStates);

    const LoadItems = () => {
        ui_state?.set(x => ({ ...x, item: props.slot, page: "item" }));
    }
    let bg_style = {};
    if (props.url != "") {
        bg_style = { backgroundImage: "url(./src/assets/" + props.url + ")" }
    }
    return (

        <button id={props.id} onClick={LoadItems} style={bg_style} title={props.id.replace("item-", "")}>
            {(props.hasEnchants != undefined) && (<div className='weapon-enchanted'></div>)}
        </button>
    )
}
function StatCont() {
    const stat = useContext(ContextBaseStats);
    const equips = useContext(ContextEquips);
    const skills = useContext(ContextSkills);



    const CalculateFinalDefense = () => {
        let n = ((stat?.get.current_def || 0) + 8) * (2 +
            (equips?.get.selected_helmet.defense || 0) +
            (equips?.get.selected_armor.defense || 0) +
            (equips?.get.selected_pants.defense || 0) +
            (equips?.get.selected_shoes.defense || 0) +
            (equips?.get.selected_accessories.defense || 0) +
            ((equips?.get.selected_secondary_weapon.defense || 0) * ((skills?.get.shield_guard || 0) + Math.floor(((skills?.get.shield_expert || 0) * 5) / 100))) +
            ((equips?.get.selected_primary_weapon.defense || 0) * ((skills?.get.shield_guard || 0) + Math.floor(((skills?.get.shield_expert || 0) * 5) / 100)))
        );
        if (skills?.get.is_shield_guarded && (equips?.get.selected_secondary_weapon.defense || 0) > 0) {
            n = Math.floor(n * (1 + (skills.get.shield_guard * 0.03)));
        }
        return n;
    }

    const CalculateFinalAttack = () => {
        let sheath_bonus_damage = 0;
        if (equips?.get.sheated_primary_weapon.power || 0 != 0) {
            let sheath_primary = equips?.get.sheated_primary_weapon.power || 0;
            let sheath_secondary = equips?.get.sheated_secondary_weapon.power || 0;


            if (equips?.get.sheated_primary_weapon.class != stat?.get.current_class) {
                sheath_primary *= 0.25;
            }
            if (equips?.get.sheated_secondary_weapon.class != stat?.get.current_class) {
                sheath_secondary *= 0.25;
            }

            if (equips?.get.sheated_primary_weapon.weapon_type == "two handed") {
                sheath_bonus_damage = Math.floor(sheath_primary * 0.25);
            }
            else {
                sheath_bonus_damage = Math.floor((sheath_primary * 0.06) + (sheath_secondary * 0.06));
            }

        }

        let base_damage = (1 + (stat?.get.current_atk || 0) +
            ((equips?.get.selected_helmet.class === stat?.get.current_class) ? equips?.get.selected_helmet.power || 0 : 0) +
            ((equips?.get.selected_armor.class === stat?.get.current_class) ? equips?.get.selected_armor.power || 0 : 0) +
            ((equips?.get.selected_pants.class === stat?.get.current_class) ? equips?.get.selected_pants.power || 0 : 0) +
            ((equips?.get.selected_shoes.class === stat?.get.current_class) ? equips?.get.selected_shoes.power || 0 : 0) +
            ((equips?.get.selected_accessories.class === stat?.get.current_class) ? equips?.get.selected_accessories.power || 0 : 0) +
            (sheath_bonus_damage));

        let primary = (equips?.get.selected_primary_weapon.power || 0) * base_damage;
        let secondary = (equips?.get.selected_secondary_weapon.power || 0) * base_damage;


        if (equips?.get.selected_primary_weapon.weapon_type == "two handed") {
            return primary.toLocaleString('en-US');
        }
        else {
            return primary.toLocaleString('en-US') + " & " + secondary.toLocaleString('en-US');
        }
    }
    const CalculateSpeed = () => {
        let speed = 100;

        if (equips?.get.sheated_primary_weapon.name != "" && equips?.get.sheated_primary_weapon.weapon_type != "two handed") {
            speed += 5;
        }
        if (equips?.get.sheated_secondary_weapon.name != "") {
            speed += 5;
        }
        return String(speed)+"%";
    }
    const GetCrit = () => {

        let dex_crit_chance = [
            1.00, 1.21, 1.37, 1.50, 1.62, 1.72, 1.82, 1.91, 2.00, 2.08, 2.16, 2.23, 2.30, 2.37, 2.44,
            2.50, 2.56, 2.62, 2.68, 2.74, 2.79, 2.85, 2.90, 2.95, 3.00, 3.05, 3.10, 3.15, 3.19, 3.24,
            3.28, 3.33, 3.37, 3.42, 3.46, 3.50, 3.54, 3.58, 3.62, 3.66, 3.70, 3.74, 3.78, 3.82, 3.85,
            3.89, 3.92, 3.96, 4.00, 4.04, 4.08, "", "", "", "", "", "", "", "", 4.37, "", "", "", "", 4.53, "",
            4.59, "", "", 4.68, "", "", "", "", "", "", "", "", "", "", 5.00
        ];
        return String(dex_crit_chance[stat?.get.current_dex || 0]) +"x";
    }
    const CalculateTotalPrice = () => {
        let cost =
            (equips?.get.selected_accessories.price || 0) +
            (equips?.get.selected_helmet.price || 0) +
            (equips?.get.selected_armor.price || 0) +
            (equips?.get.selected_pants.price || 0) +
            (equips?.get.selected_shoes.price || 0) +
            (equips?.get.selected_primary_weapon.price || 0) +
            (equips?.get.selected_secondary_weapon.price || 0) +
            (equips?.get.sheated_primary_weapon.price || 0) +
            (equips?.get.sheated_secondary_weapon.price || 0);

        return cost;
    }
    const CalculateTotalEnchantment = () => {
        const GEV = (n: number) => { return Math.round(Math.sqrt(n) * 2) };
        let cost =
            GEV(equips?.get.selected_accessories.price || 0) +
            GEV(equips?.get.selected_helmet.price || 0) +
            GEV(equips?.get.selected_armor.price || 0) +
            GEV(equips?.get.selected_pants.price || 0) +
            GEV(equips?.get.selected_shoes.price || 0) +
            GEV(equips?.get.selected_primary_weapon.price || 0) +
            GEV(equips?.get.selected_secondary_weapon.price || 0) +
            GEV(equips?.get.sheated_primary_weapon.price || 0) +
            GEV(equips?.get.sheated_secondary_weapon.price || 0);

        return cost;
    }

    const fdef = useMemo(() => CalculateFinalDefense(), [stat?.get]); // cache unchanged properties
    const fatk = useMemo(() => CalculateFinalAttack(), [stat?.get]);
    const speed = CalculateSpeed();
    const crit = GetCrit();
    const total_price = CalculateTotalPrice();
    const total_enchantment = CalculateTotalEnchantment();


    return (
        <div className='cont-stats'>
            <StatInfo name='hp' />
            <StatInfo name='mp' />
            <StatInfo name='atk' />
            <StatInfo name='def' />
            <StatInfo name='dex' />
            <div className='stat-br'></div>
            <StatResult name='crit multiplier' value={crit} />
            <StatResult name='speed' value={speed} />
            <StatResult name='final attack' value={fatk} />
            <StatResult name='final defense' value={String(fdef)} />
            <StatResult name='total' isCost={true} value={String(total_price)} />
            <StatResult name='enchantment' isCost={false} value={String(total_enchantment)} />
        </div>
    )
}






function StatResult(props: { name: string, value: string, isCost?: boolean }) {
    let cont_name = "stat-result-cont";
    let text_name = props.name;
    let img_display;
    let cost = props.isCost;
    if (cost != undefined) {
        cont_name = "stat-" + ((cost) ? "cost" : "enchantment") + "-cont";
        text_name = ((cost) ? "total" : "enchantment") + " cost";
        img_display = ((cost) ? "coin" : "fish") + "-bg";
    }
    return (
        <div className={cont_name}>
            <p>{text_name}:</p>
            
            {(cost == undefined) ?
                (<p>{props.value}</p>) :
                (<div>
                    <p>{props.value}</p>
                    <div id={img_display}></div>
                </div>)
            }
        </div>
    );
}


function StatInfo(props: { name: string }) {
    const stat = useContext(ContextBaseStats);


    const GetStatValue = (): number => {
        switch (props.name) {
            case "hp":
                return stat?.get.current_hp || 0;
            case "mp":
                return stat?.get.current_mp || 0;
            case "atk":
                return stat?.get.current_atk || 0;
            case "def":
                return stat?.get.current_def || 0;
            case "dex":
                return stat?.get.current_dex || 0;
        }
        return 0;
    }

    const GetEncoded = () => {
        switch (props.name) {
            case "hp":
                return (GetStatValue() + 3) * 5;
            case "mp":
                return GetStatValue() * 3;
            default:
                return GetStatValue() + 1;
        }
    }

    const GetDecoded = (n: number) => {
        switch (props.name) {
            case "hp":
                return Math.floor((n / 5) - 3);
            case "mp":
                return Math.floor(n / 3);
            default:
                return n - 1;
        }
    }


    const input_name = "input-" + props.name;
    let input_element = document.getElementById(input_name) as HTMLInputElement;
    if (input_element != null) {
        input_element.valueAsNumber = GetEncoded();
    }

    const UpdateValue = (x: ChangeEvent<HTMLInputElement>) => {
        let value = parseInt((x.target.value.replace(/^0+/, '')).replace(/\D/g, ''));
        let n = GetDecoded(value); // n = stat value

        let points_release = GetStatValue() - n;
        let points = stat?.get.current_points || 0;
        let points_stack = points + points_release;

        if (points_stack < 0 || n < 0 || isNaN(n)) {
            stat?.set(x => ({ ...x }));
            return;
        }
        switch (props.name) {
            case "hp":
                stat?.set(x => ({ ...x, current_hp: n, current_points: points_stack }));
                break;
            case "mp":
                stat?.set(x => ({ ...x, current_mp: n, current_points: points_stack }));
                break;
            case "atk":
                stat?.set(x => ({ ...x, current_atk: n, current_points: points_stack }));
                break;
            case "def":
                stat?.set(x => ({ ...x, current_def: n, current_points: points_stack }));
                break;
            case "dex":
                stat?.set(x => ({ ...x, current_dex: n, current_points: points_stack }));
                break;
        }
    }

    const ModifyStat = (Condition: boolean) => {
        const state_value = Condition ? 1 : -1;
        switch (props.name) {
            case "hp":
                stat?.set(x => ({ ...x, current_hp: x.current_hp + state_value, current_points: x.current_points - state_value }));
                break;
            case "mp":
                stat?.set(x => ({ ...x, current_mp: x.current_mp + state_value, current_points: x.current_points - state_value }));
                break;
            case "atk":
                stat?.set(x => ({ ...x, current_atk: x.current_atk + state_value, current_points: x.current_points - state_value }));
                break;
            case "def":
                stat?.set(x => ({ ...x, current_def: x.current_def + state_value, current_points: x.current_points - state_value }));
                break;
            case "dex":
                stat?.set(x => ({ ...x, current_dex: x.current_dex + state_value, current_points: x.current_points - state_value }));
                break;
        }
    }

    return (
        <div className='stat-info-cont'>
            <p>{props.name.toLocaleUpperCase()}:</p>

            <input id={input_name} type='number' onBlur={UpdateValue} defaultValue={GetEncoded()} ></input>
            <button className='icon-minus' onClick={() => ModifyStat(false)} style={
                (GetStatValue() > 0)
                    ? { opacity: 1, cursor: 'pointer' }
                    : { opacity: 0, cursor: 'default', pointerEvents: 'none' }
            }></button>
            <button className='icon-plus' onClick={() => ModifyStat(true)} style={
                (stat?.get.current_points || 0 > 0)
                    ? { opacity: 1, cursor: 'pointer' }
                    : { opacity: 0, cursor: 'default', pointerEvents: 'none' }
            }></button>
        </div>
    )
}








function SetCont() {
    const stat = useContext(ContextBaseStats);
    const ui_state = useContext(ContextStates);

    const UpdateLevel = (event: ChangeEvent<HTMLInputElement>) => {

        let level_value = parseInt(event.target.value);
        if (level_value === 0) {
            return;
        }
        let points_value = (parseInt(event.target.value) * 3) - 3;
        if (isNaN(points_value)) {
            points_value = 0;
        }

        stat?.set(stat => ({
            ...stat,
            current_level: level_value,
            current_points: points_value,
            current_hp: 0,
            current_mp: 0,
            current_atk: 0,
            current_def: 0,
            current_dex: 0
        }));
        //console.log(level_value); disable equip items if level is NAN
        ui_state?.set(ui => ({ ...ui, point: false }));// on interaction of stat 

    }

    return (
        <div className="cont-set">
            <div className="set-cont">
                <div className="level-set">
                    <p>Level: </p>
                    <div className="level-input-cont">
                        <input id="level-input" type="number" onChange={value => UpdateLevel(value)} value={String(stat?.get.current_level || "")}></input>
                    </div>
                </div>
                <div className="points-label">
                    <p>Points:</p>
                    <p id="points-label-value">{stat?.get.current_points}</p>
                </div>
                <p id="class-label">Class: {stat?.get.current_class}</p>

                <SetButton name='Reset Points' />
                <SetButton name='Change Class' />
                <SetButton name='Tutorial' />
                <ToggleCont />
            </div>
        </div>
    )
}


function SetButton(props: { name: string }) {
    const page = useContext(ContextStates);
    const stat = useContext(ContextBaseStats);


    const Trigger = () => {
        switch (props.name) {
            case "Reset Points":

                let points: number = (stat?.get.current_level) || 0;
                stat?.set(stat => ({
                    ...stat,
                    current_hp: 0,
                    current_mp: 0,
                    current_atk: 0,
                    current_def: 0,
                    current_dex: 0,
                    current_points: (points * 3) - 3
                }));
                break;

            case "Change Class":

                page?.set(page => ({ ...page, page: "class" }));
                break;

            case "Tutorial":
                const win: Window = window;
                win.open("https://www.youtube.com/watch?v=ILISxC_CF30&ab_channel=BlueHairedDirt");
                break;

            default:
                break;
        }
    }
    let id_name = String((props.name).replace(/ /g, "-")).toLocaleLowerCase();
    let is_eligible = false;
    if (id_name == "reset-points") {
        is_eligible = ((stat?.get.current_points || 0) / 3 >= (stat?.get.current_level || 0) - 1);
        if (is_eligible) {
            id_name += "-disabled";
        }

    }
    return (
        <div className="set-button" id={id_name} onClick={is_eligible ? () => { return } : Trigger}  >
            <p>{props.name}</p>
        </div>
    )
}
function ToggleCont() {
    return (
        <div className='toggle-cont'>
            <ToggleButton name='guard' />
            <ToggleButton name='saves' />
            <ToggleButton name='monster' />
        </div>
    )
}

function ToggleButton(props: { name: string }) {

    if (props.name === "guard") {
        let equips = useContext(ContextEquips);
        if (equips?.get.selected_secondary_weapon.weapon_type !== "shielded") {
            return;
        }

    }
    let toggle_name = "toggle-" + props.name + "-";
    return (
        <div className={toggle_name + "button"} id={toggle_name + "button-id"}>
            <div className={toggle_name + "image"} id={toggle_name + "img"}></div>
        </div>
    )
}