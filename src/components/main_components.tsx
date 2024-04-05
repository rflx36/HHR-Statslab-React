


import { ChangeEvent, useContext, } from 'react';
import '../css/main_components.css';
import { ContextBaseStats, ContextEquips, ContextStates } from '../StatContext';



export default function ContainerMain() {
    // const stat = useContext(ContextBaseStats);

    // const testing = () =>
    // {
    //     // stat?.set(x => (SetProperty(x,"current_atk","10"))) 
    //     console.log((SetProperty({...stat?.get},"current_atk","10")));
    // }
    return (
        <div className='cont-all'>

            <div className="shield-guard-bg" id="shield-guard-bg-id">

            </div>

            <div className="cont-items">

            </div>
            <StatCont />
            <SetCont />
            {/* <p>stat atk:{stat?.get.current_atk}</p>
            <button onClick={testing}>Add 10</button> */}
        </div>
    );
}


function StatCont() {
    return (
        <div className='cont-stats'>
            <StatInfo name='hp' />
            <StatInfo name='mp' />
            <StatInfo name='atk' />
            <StatInfo name='def' />
            <StatInfo name='dex' />
        </div>
    )
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

    if (id_name == "reset-points") {
        
        if ((stat?.get.current_points || 0) / 3 >= (stat?.get.current_level || 0) - 1 ){
            id_name += "-disabled";
        }
     
    }
    return (
        <div className="set-button" id={id_name} onClick={Trigger}  >
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