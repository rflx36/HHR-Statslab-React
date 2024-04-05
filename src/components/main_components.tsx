


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
            <StatInfo name='hp' min={15} />
            <StatInfo name='mp' min={0} />
            <StatInfo name='atk' min={1} />
            <StatInfo name='def' min={1} />
            <StatInfo name='dex' min={1} />
        </div>
    )
}

// let stat_value = 0;




// switch (props.name) {
//     case "hp":
//         stat_value = ((stat?.get.current_hp || 0) + 3) * 5;
//         // stat_value = stat?.get.current_hp || 0;
//         break;
//     case "mp":
//         stat_value = (stat?.get.current_mp || 0) * 3;
//         // stat_value = stat?.get.current_mp || 0;
//         break;
//     case "atk":
//         // stat_value = stat?.get.current_atk || 0;
//         stat_value = (stat?.get.current_atk || 0) + 1;
//         break;
//     case "def":
//         // stat_value = stat?.get.current_def || 0;
//         stat_value = (stat?.get.current_def || 0) + 1;
//         break;
//     case "dex":
//         // stat_value = stat?.get.current_dex || 0;
//         stat_value = (stat?.get.current_dex || 0) + 1;
//         break;
//     default:
//         break;
// }
// // const UpdateStat = (object: object, name: string, cp: number, pr: number, ts: number) => {

// //     if (cp + pr < 0 || ts < 0) {
// //         return;
// //     }

// //     const data = `{
// //         "...data": ${JSON.stringify(object)},
// //         "current_points": ${cp + pr},
// //          "${"current_" + name}": ${ts+1}
// //     }`
// //     // console.log(JSON.parse(data));
// //     stat?.set(JSON.parse(data));
// // }
// // const SetStat = (input_value: ChangeEvent<HTMLInputElement>, type: string) => {
// //     let temp_stat = 0;
// //     let point_release = 0;
// //     let value = parseInt(input_value.target.value);
// //     if (isNaN(value)){
// //         value = 0;
// //     }
// //     let current_points = stat?.get.current_points || 0;
// //     switch (type) {
// //         case "hp":
// //             temp_stat = (value / 5) - 3;
// //             point_release = (stat?.get.current_hp || 0) - temp_stat
// //             // if ((stat?.get.current_points || 0) + point_release < 0 || temp_stat < 0) {
// //             //     return;
// //             // }
// //             // stat?.set(stat => ({
// //             //     ...stat,
// //             //     current_points: stat.current_points + point_release,
// //             //     current_hp: temp_stat
// //             // }));
// //             // stat?.set(x => (SetProperty(x, "current_atk", "10")))
// //             // stat?.set(x => (UpdateStat(x, type, current_points, point_release, temp_stat)));
// //             break;
// //         case "mp":

// //             temp_stat = value / 3;
// //             point_release = (stat?.get.current_mp || 0) - temp_stat
// //             break;
// //         case "atk":
// //             temp_stat = value - 1;
// //             point_release = (stat?.get.current_atk || 0) - temp_stat
// //             break;
// //         case "def":
// //             temp_stat = value - 1;
// //             point_release = (stat?.get.current_def || 0) - temp_stat
// //             break;
// //         case "dex":
// //             temp_stat = value - 1;
// //             point_release = (stat?.get.current_dex || 0) - temp_stat
// //             break;
// //     }

// //     //stat?.set(x => (UpdateStat(x, type, current_points, point_release, temp_stat)));
// //     // console.log((SetProperty({...stat?.get},"current_atk","10")));
// //     UpdateStat({...stat?.get},type, current_points, point_release, temp_stat);
// //     // console.log(UpdateStat({...stat?.get},type, current_points, point_release, temp_stat));
// //     // point_release = temp_stat_selection - temp_stat;
// //     // if ((stat?.get.current_points || 0) + point_release < 0 || temp_stat < 0) {
// //     //     return;
// //     // }

// //     // stat?.set(stat => ({
// //     //     ...stat,
// //     //     current_points: stat.current_points + point_release,
// //     //     current_hp: temp_stat
// //     // }));


// // }
// const SetStat = (input: ChangeEvent<HTMLInputElement>, type: string) => {
//     let stat_value = parseInt(input.target.value);
//     // if (stat_value === 0 ) {
//     //     return;
//     // }
//     // if (stat_value !== 0) {
//     //     stat_value = (stat_value / 5) - 3;
//     // }

//     switch (type) {
//         case "hp":
//             //stat?.set(stat => ({ ...stat, current_hp: stat_value }));
//             break;
//     }


// }
// console.log(ui_state?.get.input);
// <input id={props.name} type='number' min={props.min} onBlur={(val) => stat?.set(stat => ({ ...stat, current_hp: parseInt(val.target.value) /5 - 3}))}  value={stat_value}></input> 
// <div className='heh' onClick={()=> ui_state?.set(state => ({...state,overlay:"input",input:props.name as InputType}))}>{stat_value}</div>
// <input type='number' onChange={val => SetInputVal(val, props.name)} value={value}></input>
// <input type='number' onch value={value}></input>
// <input type='number' onChange={ChangeValue} value={isNaN(value) ? "" : value}></input>
//  <button className='confirm-button' onClick={UpdateValue}></button>
//  <input type='number' ref={inputRef}></input>

// let temp = inputRef.current?.value;
// console.log(temp);
// if (parseInt(String(temp)) === 2) {
//     console.log("heh!");
//     inputRef.current!.value = String(50);
// }
function StatInfo(props: { name: string, min: number }) {
    const stat = useContext(ContextBaseStats);


    const GetEncoded = (): number => {
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

    const GetStatValue = () => {
        switch (props.name) {
            case "hp":
                return (GetEncoded() + 3) * 5;
            case "mp":
                return GetEncoded() * 3;
            default:
                return GetEncoded() + 1;
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
        input_element.valueAsNumber = GetStatValue();
    }
    // inputRef.current!.value = String(GetStatValue());

    // const ChangeValue = (x: ChangeEvent<HTMLInputElement>) => {
    //     setTempValue(parseInt((x.target.value.replace(/^0+/, '')).replace(/\D/g, '')));
    // }





    // const UpdateValue = (x: ChangeEvent<HTMLInputElement>) => {
    //     // inputRef.current!.value = String(GetStatValue());

    //     let value = parseInt((x.target.value.replace(/^0+/, '')).replace(/\D/g, ''));
    //     if (value === 0 || isNaN(value)) {
    //         GetStatValue();
    //         console.log("reverted");
    //         return;
    //     }
    //     //setValue(value);

    // switch (props.name) {
    //     case "hp":
    //         stat?.set(x => ({ ...x, current_hp: Math.floor((value || 0) / 5 - 3) }));
    //         break;

    //     case "mp":
    //         stat?.set(x => ({ ...x, current_mp: Math.floor((value || 0) / 3) }));
    //         break;
    //     case "atk":
    //         stat?.set(x => ({ ...x, current_atk: (value || 0) - 1 }));
    //         break;
    //     case "def":
    //         stat?.set(x => ({ ...x, current_def: (value || 0) - 1 }));
    //         break;
    //     case "dex":
    //         stat?.set(x => ({ ...x, current_dex: (value || 0) - 1 }));
    //         break;

    // }
    //     GetStatValue();
    //     console.log("current value:" + value);
    //     // setValue(GetStatValue());


    // }
    // const [value, setValue] = useState(0);


    // const ChangeValue = (x: ChangeEvent<HTMLInputElement>) => {
    //    // setValue(parseInt((x.target.value.replace(/^0+/, '')).replace(/\D/g, '')));
    //     let value = parseInt((x.target.value.replace(/^0+/, '')).replace(/\D/g, ''));
    //     switch (props.name) {
    //         case "hp":
    //             stat?.set(x => ({ ...x, current_hp: Math.floor((value || 0) / 5 - 3) }));
    //             break;

    //         case "mp":
    //             stat?.set(x => ({ ...x, current_mp: Math.floor((value || 0) / 3) }));
    //             break;
    //         case "atk":
    //             stat?.set(x => ({ ...x, current_atk: (value || 0) - 1 }));
    //             break;
    //         case "def":
    //             stat?.set(x => ({ ...x, current_def: (value || 0) - 1 }));
    //             break;
    //         case "dex":
    //             stat?.set(x => ({ ...x, current_dex: (value || 0) - 1 }));
    //             break;

    //     }
    // // }
    // const UpdateValue = () => {
    //     if (Math.floor((value)/5 - 3) <= 0 || isNaN(value)) {

    //         return;
    //     }
    //     switch (props.name) {
    //         case "hp":
    //             stat?.set(x => ({ ...x, current_hp: Math.floor((value || 0) / 5 - 3) }));
    //             break;

    //         case "mp":
    //             stat?.set(x => ({ ...x, current_mp: Math.floor((value || 0) / 3) }));
    //             break;
    //         case "atk":
    //             stat?.set(x => ({ ...x, current_atk: (value || 0) - 1 }));
    //             break;
    //         case "def":
    //             stat?.set(x => ({ ...x, current_def: (value || 0) - 1 }));
    //             break;
    //         case "dex":
    //             stat?.set(x => ({ ...x, current_dex: (value || 0) - 1 }));
    //             break;

    //     }

    // }

    // const ChangeValue = useCallback(
    //     (e: ChangeEvent<HTMLInputElement>) => {
    //         setValue(parseInt(e.target.value));
    //     },
    //     [value]
    // )
    const UpdateValue = (x: ChangeEvent<HTMLInputElement>) => {
        let value = parseInt((x.target.value.replace(/^0+/, '')).replace(/\D/g, ''));
        let n = GetDecoded(value); // n = stat value
        if (n < 0) {
            console.log("Thats Lower value!!");
            stat?.set(x => ({ ...x }));
            return;
        }
        switch (props.name) {
            case "hp":
                stat?.set(x => ({ ...x, current_hp: n }));
                break;
            case "mp":
                stat?.set(x => ({ ...x, current_mp: n }));
                break;
            case "atk":
                stat?.set(x => ({ ...x, current_atk: n }));
                break;
            case "def":
                stat?.set(x => ({ ...x, current_def: n }));
                break;
            case "dex":
                stat?.set(x => ({ ...x, current_dex: n }));
                break;
        }
    }
    return (
        <div className='stat-info-cont'>
            <p>{props.name.toLocaleUpperCase()}:</p>

            <input id={input_name} type='number' onBlur={UpdateValue} defaultValue={GetStatValue()} ></input>
            <button className='icon-minus' style={
                // (stat_value > props.min)
                (0 > props.min)
                    ? { opacity: 1, cursor: 'pointer' }
                    : { opacity: 0, cursor: 'default' }
            }></button>
            <button className='icon-plus' style={
                (stat?.get.current_points || 0 > 0)
                    ? { opacity: 1, cursor: 'pointer' }
                    : { opacity: 0, cursor: 'default' }
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

        stat?.set(stat => ({ ...stat, current_level: level_value, current_points: points_value }));
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

                <SetButton name='Reset Points' enabled={ui_state?.get.point} />
                <SetButton name='Change Class' />
                <SetButton name='Tutorial' />
                <ToggleCont />
            </div>
        </div>
    )
}


function SetButton(props: { name: string, enabled?: boolean }) {
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

    if (id_name == "reset-points" && !props.enabled) {
        id_name += "-disabled";
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