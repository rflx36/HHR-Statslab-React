


import { ChangeEvent, useContext, useEffect, useMemo, } from 'react';
import '../css/main_components.css';
import { ContextBaseStats, ContextEquips, ContextSkills, ContextStates } from '../StatContext';
import { ItemSlot } from '../types';
import { InitialItemTypeValue, InitialWeaponTypeValue } from '../initialValue';




export default function ContainerMain() {
    return (
        <div className='cont-all'>

            <div className="shield-guard-bg" id="shield-guard-bg-id">

            </div>
            <ItemsCont />
            <StatCont />
            <SetCont />
            <BoosterCont />
            <ShieldCont />
            <RangeCont />
            <ChargeCont />
        </div>
    );
}




function BoosterCont() {
    return (
        <div className='booster-skill-cont'>
            <SkillCont name='Attack' max={30} />
        </div>
    )
}
function ShieldCont() {
    const equips = useContext(ContextEquips);
    return (
        <>
            {
                (((equips?.get.selected_secondary_weapon.defense || 0) > 0) ||
                    ((equips?.get.sheated_primary_weapon.defense || 0) > 0)) &&
                (<div className='shield-skill-cont'>
                    <SkillCont name='Shield' max={25} />
                </div>)
            }
        </>
    )
}

function RangeCont() {
    const equips = useContext(ContextEquips);
    return (
        <>
            {
                (equips?.get.selected_primary_weapon.class == "cowboy" || equips?.get.selected_secondary_weapon.class == "cowboy") &&
                (
                    <div className='range-damage-cont' >
                        <DamageCont min={70} max={100} name='bullet range' />
                    </div>
                )
            }
        </>
    )
}
function ChargeCont() {
    const equips = useContext(ContextEquips);

    return (
        <>
            {
                (equips?.get.selected_primary_weapon.class == "archer" || equips?.get.selected_secondary_weapon.class == "archer") &&
                (
                    <div className='charge-damage-cont'>
                        <DamageCont min={60} max={140} name='bow charge' />
                    </div>
                )
            }
        </>
    )
}

function DamageCont(props: { min: number, max: number, name: string }) {
    const ui_state = useContext(ContextStates);

    let val = (props.name == "bow charge") ? (ui_state?.get.charge || 0) : (ui_state?.get.range);

    const ChangeControl = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.name == "bow charge") {
            ui_state?.set(x => ({ ...x, charge: parseInt(e.target.value) }));
        }
        else {
            ui_state?.set(x => ({ ...x, range: parseInt(e.target.value) }));
        }
    }
    return (
        <div className='control-cont'>
            <p>{props.name}</p>
            <input id={(props.name != "bow charge") ? "range-input-id" : ""} className='control-input' type='range' min={props.min} max={props.max} value={val} onChange={ChangeControl}></input>
            <p className='control-input-label'>{val}%</p>
        </div>
    )
}

function SkillCont(props: { name: string, max: number }) {
    const skill = useContext(ContextSkills);
    const stat = useContext(ContextBaseStats);
    let val = skill?.get.attack_booster || 0;
    let isShield = props.name == "Shield";
    let id = "booster-skill";
    if (isShield) {
        val = skill?.get.shield_expert || 0;
        id = "shield-skill";
    }
    const SetSkillValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (isShield) {
            skill?.set(x => ({ ...x, shield_expert: parseInt(event.target.value) }))
        }
        else {

            skill?.set(x => ({ ...x, attack_booster: parseInt(event.target.value) }))
        }
        stat?.set(x => ({ ...x }));
    }

    return (
        <div className='skill-cont'>
            <p>{props.name} Skill</p>
            <input id={id + "-input"} type='range' min={0} max={props.max} value={val} onChange={SetSkillValue}></input>
            <p id={id + "-label"}>{((isShield) ? val * 5 : val) + "%"}</p>
        </div>
    )
}




function ItemsCont() {
    const equips = useContext(ContextEquips);
    const stat = useContext(ContextBaseStats);
    const c_l = stat?.get.current_level || 0;


    const RemoveAllItems = () => {
        equips?.set(x => ({
            ...x,
            selected_primary_weapon: InitialWeaponTypeValue,
            selected_secondary_weapon: InitialWeaponTypeValue,
            sheated_primary_weapon: InitialWeaponTypeValue,
            sheated_secondary_weapon: InitialWeaponTypeValue,
            selected_helmet: InitialItemTypeValue,
            selected_armor: InitialItemTypeValue,
            selected_pants: InitialItemTypeValue,
            selected_shoes: InitialItemTypeValue,
            selected_accessories: InitialItemTypeValue
        }));
        stat?.set(x => ({ ...x }));
    }

    return (
        <div className='cont-items'>
            <div className='item-cont item-sheath'>
                <ItemCont
                    slot="primary sheated"
                    id='item-sheath-primary'
                    hasEnchants={equips?.get.sheated_primary_weapon.enchanted}
                    url={equips?.get.sheated_primary_weapon.url}
                    isEligible={(equips?.get.sheated_primary_weapon.level || 0) <= c_l}
                />
                {(equips?.get.sheated_primary_weapon.weapon_type == "single handed")
                    && (
                        <ItemCont
                            slot="secondary sheated"
                            id='item-sheath-secondary'
                            hasEnchants={equips?.get.sheated_secondary_weapon.enchanted}
                            url={equips?.get.sheated_secondary_weapon.url}
                            isEligible={(equips?.get.sheated_secondary_weapon.level || 0) <= c_l}
                        />
                    )}

            </div>
            <div className='item-cont item-set'>
                <ItemCont
                    slot="accessories"
                    id='item-accessories'
                    url={equips?.get.selected_accessories.url}
                    isEligible={(equips?.get.selected_accessories.level || 0) <= c_l}
                />
                <ItemCont
                    slot="helmet"
                    id='item-helmet'
                    url={equips?.get.selected_helmet.url}
                    isEligible={(equips?.get.selected_helmet.level || 0) <= c_l}
                />
                <ItemCont
                    slot="armor"
                    id='item-armor'
                    url={equips?.get.selected_armor.url}
                    isEligible={(equips?.get.selected_armor.level || 0) <= c_l}
                />
                <ItemCont
                    slot="pants"
                    id='item-pants'
                    url={equips?.get.selected_pants.url}
                    isEligible={(equips?.get.selected_pants.level || 0) <= c_l}
                />
                <ItemCont
                    slot="shoes"
                    id='item-shoes'
                    url={equips?.get.selected_shoes.url}
                    isEligible={(equips?.get.selected_shoes.level || 0) <= c_l}
                />
            </div>
            <div className='item-cont item-weapon'>
                <ItemCont
                    slot="primary"
                    id='item-weapon-primary'
                    hasEnchants={equips?.get.selected_primary_weapon.enchanted}
                    url={equips?.get.selected_primary_weapon.url}
                    isEligible={(equips?.get.sheated_primary_weapon.level || 0) <= c_l}
                />

                {
                    (equips?.get.selected_primary_weapon.weapon_type == "single handed")
                    && (
                        < ItemCont
                            slot="secondary"
                            id='item-weapon-secondary'
                            hasEnchants={equips?.get.selected_secondary_weapon.enchanted}
                            url={equips?.get.selected_secondary_weapon.url}
                            isEligible={(equips?.get.selected_secondary_weapon.level || 0) <= c_l}
                        />
                    )}

            </div>
            <button className='quick-remove-cont' title='Remove All' onClick={RemoveAllItems}></button>
        </div>
    )
}



function ItemCont(props: { id: string, slot: ItemSlot, hasEnchants?: boolean, url?: string, isEligible?: boolean }) {
    const ui_state = useContext(ContextStates);

    const LoadItems = () => {
        ui_state?.set(x => ({ ...x, item: props.slot, page: "item" }));
    }
    let bg_style = {};
    if (props.url != "") {
        bg_style = { backgroundImage: "url(/" + props.url + ")" };

        if (props.isEligible != true) {
            bg_style = { filter: "grayscale(1)", backgroundImage: "url(/" + props.url + ")" };
        }

    }
    return (

        <button id={props.id} onClick={LoadItems} style={bg_style} title={props.id.replace("item-", "")}>
            {(props.hasEnchants) && (<div className='weapon-enchanted'></div>)}
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
            Math.floor((equips?.get.selected_secondary_weapon.defense || 0) * ((skills?.get.shield_guard || 0) + (((skills?.get.shield_expert || 0) * 5) / 100))) +

            (Math.floor(Math.floor((equips?.get.sheated_primary_weapon.defense || 0) * 0.5) * ((skills?.get.shield_guard || 0) + (((skills?.get.shield_expert || 0) * 5) / 100))))
        );
        n += stat!.get.current_pet_total_fdef_bonus;
        if (skills?.get.is_shield_guarded && (equips?.get.selected_secondary_weapon.defense || 0) > 0) {
            n = Math.floor(n * (1 + (skills.get.shield_guard * 0.03)));
        }
        const guild_perk_bonus = skills!.get.guild_defense_boost;
        n = Math.floor(n * (1 + ((guild_perk_bonus * 5) / 100)));
        return n;
    }

    const CalculateFinalAttack = (type: string) => {
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

        const pet_orb_bonus = Math.floor(stat!.get.current_pet_total_fatk_bonus * 1.45);
        const guild_perk_bonus = skills!.get.guild_attack_boost;
        primary = Math.floor(primary * (1 + (((skills?.get.attack_booster || 0) + (guild_perk_bonus * 5)) / 100)));
        secondary = Math.floor(secondary * (1 + (((skills?.get.attack_booster || 0) + (guild_perk_bonus * 5)) / 100)));


        if (equips?.get.selected_primary_weapon.class != stat?.get.current_class) {
            primary = Math.floor(primary * 0.25);
        }
        if (equips?.get.selected_secondary_weapon.class != stat?.get.current_class) {
            secondary = Math.floor(secondary * 0.25);
        }

        primary += ((equips!.get.selected_primary_weapon.name != "") ? pet_orb_bonus : 0);
        secondary += ((equips!.get.selected_secondary_weapon.name != "") ? pet_orb_bonus : 0);
        if (type == "p") {
            return primary;
        }
        else {
            return secondary;
        }
    }
    const GetSheathBonusSpeed = () => {
        let bonus = 0;

        if (equips?.get.sheated_primary_weapon.name != "" && equips?.get.sheated_primary_weapon.weapon_type != "two handed") {
            bonus += 5;
        }
        if (equips?.get.sheated_secondary_weapon.name != "") {
            bonus += 5;
        }
        return bonus;
    }
    const CalculateSpeed = (sheat_bonus: number) => {
        let speed = 100;
        return speed + sheat_bonus;
    }
    const CalculateMoveSpeed = (sheath_bonus: number) => {
        return ((1000 + Math.round((stat!.get.current_dex + 1) * 3.1185)) / 10) + sheath_bonus
    }

    const GetCrit = () => {

        let value = String((Math.round(((Math.sqrt(stat!.get.current_dex + 1) / 2) + 0.5) * 100)) / 100 + "x");
        return value;
    }
    const CalculateTotalPrice = () => {

        const weap_1 = (equips?.get.selected_primary_weapon.enchanted) ? (equips?.get.selected_primary_weapon.price || 0) * 2 : (equips?.get.selected_primary_weapon.price || 0);
        const weap_2 = (equips?.get.selected_secondary_weapon.enchanted) ? (equips?.get.selected_secondary_weapon.price || 0) * 2 : (equips?.get.selected_secondary_weapon.price || 0);
        const sheath_1 = (equips?.get.sheated_primary_weapon.enchanted) ? (equips?.get.sheated_primary_weapon.price || 0) * 2 : (equips?.get.sheated_primary_weapon.price || 0);
        const sheath_2 = (equips?.get.sheated_secondary_weapon.enchanted) ? (equips?.get.sheated_secondary_weapon.price || 0) * 2 : (equips?.get.sheated_secondary_weapon.price || 0);

        let cost =
            (equips?.get.selected_accessories.price || 0) +
            (equips?.get.selected_helmet.price || 0) +
            (equips?.get.selected_armor.price || 0) +
            (equips?.get.selected_pants.price || 0) +
            (equips?.get.selected_shoes.price || 0) +
            weap_1 +
            weap_2 +
            sheath_1 +
            sheath_2 +
            stat!.get.current_pet_total_cost

        return cost.toLocaleString('en-US');
    }
    const CalculateTotalEnchantment = () => {
        const GEV = (n: number) => { return Math.round(Math.sqrt(n) * 2) };

        let w_1 = equips?.get.selected_primary_weapon;
        let w_2 = equips?.get.selected_secondary_weapon;
        let s_1 = equips?.get.sheated_primary_weapon;
        let s_2 = equips?.get.sheated_secondary_weapon;
        let cost =
            GEV((w_1?.enchanted) ? w_1.price : 0) +
            GEV((s_1?.enchanted && s_1.defense === 0) ? s_1.price : 0) +
            GEV((w_2?.enchanted && w_2.defense === 0) ? w_2.price : 0) +
            GEV((s_2?.enchanted) ? s_2.price : 0);

        return cost.toLocaleString('en-US');
    }

    const fdef = useMemo(() => CalculateFinalDefense(), [stat?.get]); // cache unchanged properties
    const fatk_p = useMemo(() => CalculateFinalAttack("p"), [stat?.get]);
    const fatk_s = useMemo(() => CalculateFinalAttack("s"), [stat?.get]);
    const sheath_bonus_speed = GetSheathBonusSpeed();
    const speed = CalculateSpeed(sheath_bonus_speed);
    const move_speed = CalculateMoveSpeed(sheath_bonus_speed);
    const crit = GetCrit();
    const total_price = CalculateTotalPrice();
    const total_enchantment = CalculateTotalEnchantment();

    useEffect(() => {

        stat?.set(x => ({
            ...x,
            current_fdef: fdef,
            current_fatk_p: fatk_p,
            current_fatk_s: fatk_s
        }));
    }, [fdef, fatk_p, fatk_s]);
    const fatk_display = (equips?.get.selected_primary_weapon.weapon_type == "two handed") ? fatk_p.toLocaleString('en-US') : (fatk_p.toLocaleString('en-US') + " & " + fatk_s.toLocaleString('en-US'));


    return (
        <div className='cont-stats'>
            <StatInfo name='hp' />
            <StatInfo name='mp' />
            <StatInfo name='atk' />
            <StatInfo name='def' />
            <StatInfo name='dex' />
            <div className='stat-br'></div>
            <StatResult name='crit multiplier' value={crit} />
            <StatResult name='speed' value={String(speed) + "%"} movementSpeed={String(move_speed) + "%"} />
            <StatResult name='final attack' value={fatk_display} />
            <StatResult name='final defense' value={fdef.toLocaleString('en-US')} />
            <StatResult name='total' isCost={true} value={total_price} />
            <StatResult name='enchantment' isCost={false} value={total_enchantment} />
        </div>
    )
}






function StatResult(props: { name: string, value: string, isCost?: boolean, movementSpeed?: string }) {
    let cont_name = "stat-result-cont";
    let text_name = props.name;
    let img_display;
    let cost = props.isCost;
    if (cost != undefined) {
        cont_name = "stat-" + ((cost) ? "cost" : "enchantment") + "-cont";
        text_name = ((cost) ? "total" : "enchantment") + " cost";
        img_display = ((cost) ? "coin" : "fish") + "-bg";
    }
    if (props.name == "speed") {
        return (
            <div className='stat-result-cont' >
                <p>speed:</p>
                <p>{props.movementSpeed} {props.value}</p>
            </div>

        )
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
            <p>{props.name.toLocaleLowerCase()}:</p>

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


        let points_value = (level_value * 3) - 3;
        if (isNaN(points_value) || points_value < 0) {
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
                <SetButton name='About' />
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
            case "About":
                page?.set(page => ({ ...page, page: "help" }));
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
            <ToggleButton name='perks' />
            <ToggleButton name='pets' />
            <ToggleButton name='saves' />
            <ToggleButton name='monster' />
        </div>
    )
}

function ToggleButton(props: { name: string }) {
    const ui_state = useContext(ContextStates);
    if (props.name === "guard") {
        let equips = useContext(ContextEquips);
        if (!equips?.get.selected_secondary_weapon.defense || 0 > 0) {
            return;
        }

    }
    let toggle_name = "toggle-" + props.name + "-";
    let bg = {};
    const ToggleButton = () => {

        if (props.name == "saves") {
            ui_state?.set(x => ({ ...x, page: "save" }));

        }
        else if (props.name == "monster") {
            let monster_button_state = ui_state?.get.monster;
            switch (monster_button_state) {
                case "hide":
                    ui_state?.set(x => ({ ...x, monster: "show" }));

                    break;
                case "show":

                    ui_state?.set(x => ({ ...x, monster: "show variants" }));

                    break;
                case "show variants":

                    ui_state?.set(x => ({ ...x, monster: "environment" }));
                    break;
                case "environment":

                    ui_state?.set(x => ({ ...x, monster: "hide" }));
                    break;
            }
        }
        else if (props.name == "pets") {
            ui_state?.set(x => ({ ...x, page: "pets", is_pet: true }));
        }
        else if (props.name == "perks") {

            ui_state?.set(x => ({ ...x, page: "perk" }));
        }
    }
    if (props.name == "monster") {
        switch (ui_state?.get.monster) {
            case "hide":
                bg = { backgroundImage: "url(/UI/monster-toggle-hide.png)" };
                break;
            case "show":
                bg = { backgroundImage: "url(/UI/monster-toggle-show.png)" };
                break;
            case "show variants":
                bg = { backgroundImage: "url(/UI/monster-toggle-variant.png)" };
                break;
            case "environment":
                bg = { backgroundImage: "url(/UI/pve-toggle.png)" };
                break;
        }
    }
    return (
        <div className={toggle_name + "button"} id={toggle_name + "button-id"} onClick={ToggleButton}>
            <div style={bg} className={toggle_name + "image"} id={toggle_name + "img"}></div>
        </div>
    )
}