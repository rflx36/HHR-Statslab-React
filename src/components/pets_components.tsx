import { ChangeEvent, useContext, useEffect, useMemo } from "react";
import { ClassType, ItemSlot, PetStatsType } from "../types";
import { ContextBaseStats, ContextPetStats, ContextStates } from "../StatContext";
import '../css/pets_components.css';
import { data_items } from "../initialLoad";
import CloseButton from "./closeButton";
import { InitialPetStats } from "../initialValue";




export default function ContainerPets() {
    return <PetsCont />;
}

export function ContainerPetsSelection() {
    return <PetsSelectionCont />
}


function PetCloseButton(props: { total: number, total_atk_bonus: number, total_def_bonus: number }) {
    const ui_state = useContext(ContextStates);

    const stat = useContext(ContextBaseStats);
    const Close = () => {
        stat!.set(x => ({
            ...x,
            current_pet_total_cost: props.total,
            current_pet_total_fatk_bonus: props.total_atk_bonus,
            current_pet_total_fdef_bonus: props.total_def_bonus
        }))
        ui_state?.set(ui => ({ ...ui, page: "main", is_pet: false }));
    }
    return (
        <div className="close-button" onClick={Close}></div>
    )
}

function PetsSelectionCont() {

    const pet_data = data_items[25];
    return (
        <div className="pet-selection-cont">
            <CloseButton />
            <div className="pet-selection-list-cont">
                <PetRemoveSlotCont />
                {pet_data.map((e, i) => {
                    return <PetSelectionSlotCont
                        name={e.name}
                        hp={e.hp}
                        atk={e.atk}
                        def={e.def}
                        dex={e.dex}
                        price={e.price}
                        type={e.type}
                        url={e.url}
                        desc={e.description}
                        color={e.color}
                        key={i} />
                }
                )}
            </div>
            <div className="pet-selection-detail-cont">
                <div className="pet-selection-info-cont">

                </div>
                <div className="pet-selection-evolution-cont">
                    <p>Evolution: </p>
                    <PetEvolution id={1} />
                    <PetEvolution id={2} />
                    <PetEvolution id={3} />
                </div>
                <div className="pet-selection-description-cont">

                </div>
            </div>
        </div>
    )
}

function PetEvolution(props: { id: 1 | 2 | 3 }) {
    const ui_state = useContext(ContextStates);
    return (
        <button className="pet-evolution" onClick={() => ui_state!.set(x => ({ ...x, pet_evolution: props.id }))}>
            <p>{props.id}</p>
        </button>
    )
}

function PetRemoveSlotCont() {
    const ui_state = useContext(ContextStates);
    const pet_stat = useContext(ContextPetStats);
    const current_pet_selected = ui_state!.get.pet_selection - 1;

    const RemovePet = () => {

        let temp = [];
        temp.push(...pet_stat!.get.slice(0, current_pet_selected));
        temp.push(...pet_stat!.get.slice(current_pet_selected + 1))
        temp.push(InitialPetStats);;

        pet_stat!.set(temp);
        ui_state!.set(ui => ({ ...ui, page: "pets", pet_selection:1 }));
    }
    return (
        <div className="pet-remove-selection-slot-cont" onClick={RemovePet}>
            <img src="/src/assets/UI/icon-remove.png"></img>
        </div>
    )
}

function PetSelectionSlotCont(props: {
    name: Array<string>,
    hp: number,
    atk: number,
    def: number,
    dex: number,
    price: number,
    type: ClassType,
    url: Array<string>,
    desc: string,
    color:string
}) {
    const ui_state = useContext(ContextStates);
    const pet_stat = useContext(ContextPetStats);
    const evolution = ui_state!.get.pet_evolution - 1;


    const SetPet = () => {

        const FirstEmptyIndex = (data: PetStatsType[]) => {

            for (let i = 0; i < data.length; i++) {
                if (data[i].name == "") {
                    return i;
                }
            }
            return 0;
        }
        const available_slot = (ui_state!.get.is_change_pet) ? ui_state!.get.pet_selection - 1 : FirstEmptyIndex(pet_stat!.get);
        const pet_info: PetStatsType = {
            ...pet_stat!.get[available_slot],
            name: props.name[evolution],
            url: props.url[evolution],
            evolution: evolution as 1 | 2 | 3,
            price: props.price,
            type: props.type,
            color: props.color
        }

        let temp = [...pet_stat!.get];
        temp[available_slot] = pet_info;
        pet_stat!.set(temp);
        ui_state!.set(ui => ({ ...ui, page: "pets" }));
    }

    let pet_image = "./src/assets/" + props.url[evolution];
    if (props.url[evolution] == "") {
        pet_image = "./src/assets/Item-Images/pets/0.png";
    }
    return (
        <>
            <div className="pet-selection-slot-cont" onClick={SetPet}>
                <img src={pet_image}></img>

                <div className="pet-selection-slot-detail-cont">
                    <p>name: {props.name[ui_state!.get.pet_evolution - 1]}</p>
                    <p>hp: {Math.floor(props.hp * 100)}%</p>
                    <p>atk: {Math.floor(props.atk * 100)}%</p>
                    <p>def: {Math.floor(props.def * 100)}%</p>
                    <p>dex: {Math.floor(props.dex * 100)}%</p>
                    <p>price: {props.price.toLocaleString('en-US')}</p>
                    <p>equips type: {props.type}</p>
                    
                    <div className="pet-description-cont">
                        <p>{props.desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

function PetsCont() {
    const pet_stat = useContext(ContextPetStats);
    const ui_state = useContext(ContextStates);
    const current_pet_selected = ui_state!.get.pet_selection - 1;
    const current_pet_info = pet_stat!.get[current_pet_selected];
    
    const total_pet_cost = pet_stat!.get.reduce((sum, item) => sum + item.price, 0);
    const total_pet_helmet_cost = pet_stat!.get.reduce((sum, item) => sum + item.selected_helmet.price, 0);
    const total_pet_shoes_cost = pet_stat!.get.reduce((sum, item) => sum + item.selected_shoes.price, 0);
    const total_pet_orb_atk_bonus = pet_stat!.get.reduce((sum, item) => sum + Math.round(item.fatk / 20), 0);
    const total_pet_orb_def_bonus = pet_stat!.get.reduce((sum, item) => sum + Math.round(item.fdef / 20), 0);
    const total_cost = (total_pet_cost + total_pet_helmet_cost + total_pet_shoes_cost);

    return (
        <div className="pet-cont">
            <PetCloseButton
                total={total_cost}
                total_atk_bonus={total_pet_orb_atk_bonus || 0}
                total_def_bonus={total_pet_orb_def_bonus || 0}
            />
            {(pet_stat!.get[0].name != "") ?
                (
                    <div className="pet-details-cont">
                        <PetSetCont />
                        <PetStatCont />
                        <PetInfo
                            total={total_cost}
                            atk_bonus={(Math.round(current_pet_info.fatk / 20))}
                            def_bonus={(Math.round(current_pet_info.fdef / 20))}
                            total_atk_bonus={total_pet_orb_atk_bonus}
                            total_def_bonus={total_pet_orb_def_bonus}
                            type={current_pet_info.type}
                        />
                    </div>
                ) : (
                    <div className="pet-empty-cont">
                        <p>You currently dont have pets add one</p>
                    </div>
                )
            }

            <PetListCont />
        </div>
    )
}



function PetInfo(props: { total: number, atk_bonus: number, def_bonus: number, total_atk_bonus: number, total_def_bonus: number, type: ClassType }) {

    return (
        <div className="cont-pet-info">
            <div className="pet-total-cont">
                <p>total orb bonus</p>
                <div className="pet-total-info-cont">
                    <p>atk:</p>
                    <p>{props.total_atk_bonus.toLocaleString('en-US')}</p>
                </div>
                <div className="pet-total-info-cont">
                    <p>def:</p>
                    <p>{props.total_def_bonus.toLocaleString('en-US')}</p>
                </div>
                <p>total cost</p>
                <div className="pet-total-info-cont">
                    <div className="pet-total-cost-cont">
                        <p style={{ marginRight: "5px" }}>{props.total.toLocaleString('en-US')}</p>
                        <img src="src/assets/UI/icon-coin.png"></img>
                    </div>
                </div>
            </div>
            <div className="pet-details-info-cont">
                <PetStatResult name="equips type" value={props.type} />
                <PetStatResult name="orb atk" value={props.atk_bonus.toLocaleString('en-US')} />
                <PetStatResult name="orb def" value={props.def_bonus.toLocaleString('en-US')} />

            </div>

        </div>
    )
}


function PetItemCont(props: { slot: ItemSlot, url?: string, isEligible: boolean }) {


    const ui_state = useContext(ContextStates);

    const LoadItems = () => {
        ui_state?.set(x => ({ ...x, item: props.slot, page: "item" }));
    }
    let bg_style = {};
    if (props.url != "") {
        bg_style = { backgroundImage: "url(./src/assets/" + props.url + ")" };

        if (props.isEligible != true) {
            bg_style = { filter: "grayscale(1)", backgroundImage: "url(./src/assets/" + props.url + ")" };
        }

    }

    return (

        <button id={props.slot} onClick={LoadItems} style={bg_style} >

        </button>
    )
}

function PetSetCont() {
    const pet_stat = useContext(ContextPetStats);
    const ui_state = useContext(ContextStates);
    const current_pet_selected = ui_state!.get.pet_selection - 1;
    const current_pet_info = pet_stat!.get[current_pet_selected];



    const UpdateLevel = (event: ChangeEvent<HTMLInputElement>) => {

        let level_value = parseInt(event.target.value);
        if (level_value === 0) {
            return;
        }


        let points_value = (level_value * 3) - 3;
        if (isNaN(points_value) || points_value < 0) {
            points_value = 0;
        }


        let pet_info: PetStatsType = {
            ...current_pet_info
        }

        pet_info = {
            ...pet_info,
            level: level_value,
            points: points_value,
            hp: 0,
            atk: 0,
            def: 0,
            dex: 0

        }

        let temp = [...pet_stat!.get];
        temp[current_pet_selected] = pet_info;

        // pet_stat!.set(temp)
        pet_stat!.set(temp);
        // pet_stat!.set(()=>({...temp}));

    }

    return (
        <div className="cont-pet-set">
            <div className="pet-level-set">
                <p>level:</p>
                <div className="pet-level-input-cont">
                    <input className="pet-level-input" type="number" onChange={UpdateLevel} value={String(current_pet_info.level || "")} />
                </div>
            </div>
            <div className="pet-points-label">
                <p id="pet-points-label-display">points: </p>
                <p>{current_pet_info.points}</p>
            </div>
            <div className="pet-display-cont">
                <div className="pet-item-set">
                    <PetItemCont
                        slot="helmet"
                        url={current_pet_info.selected_helmet.url}
                        isEligible={current_pet_info.selected_helmet.level <= (current_pet_info.level || 0)} />
                    <PetItemCont
                        slot="shoes"
                        url={current_pet_info.selected_shoes.url}
                        isEligible={current_pet_info.selected_shoes.level <= (current_pet_info.level || 0)} />
                </div>
                <div className="pet-type-display">
                    <PetDisplay />
                </div>
            </div>
        </div>
    )
}

function PetDisplay() {
    const pet_stat = useContext(ContextPetStats);
    const ui_state = useContext(ContextStates);
    const current_pet_selected = ui_state!.get.pet_selection - 1;
    const current_pet_info = pet_stat!.get[current_pet_selected];
    let pet_data = data_items[25];
    let pet_data_type = pet_data.find((arr: any) => arr.name.includes(current_pet_info.name));
    const pet_slot_bg_is_empty = pet_data_type.url[current_pet_info.evolution] == "";
    const pet_slot_bg = (!pet_slot_bg_is_empty) ? pet_data_type.url[current_pet_info.evolution] : "/Item-Images/pets/0.png";

    return (
        <>
            <img src={"./src/assets/" + pet_slot_bg}></img>
            {(pet_slot_bg_is_empty) && (<p>{current_pet_info.name}</p>)}
        </>
    )
}

function PetStatCont() {
    const pet_stat = useContext(ContextPetStats);
    const ui_state = useContext(ContextStates);
    const current_pet_selected = ui_state!.get.pet_selection - 1;
    const current_pet_info = pet_stat!.get[current_pet_selected];

    const GetCrit = () => {

        let pet_data = data_items[25];
        let pet_data_type = pet_data.find((arr: any) => arr.name.includes(current_pet_info.name));

        let pet_dex_modifier = pet_data_type.dex;
        let value = String((Math.round(((Math.sqrt((current_pet_info.dex + 1)* pet_dex_modifier) / 2) + 0.5) * 100)) / 100 + "x");
        return value;
    }

    const CalculateFinalAttack = () => {
        let helmet_def = current_pet_info.selected_helmet.defense;
        let shoes_def = current_pet_info.selected_shoes.defense;

        if (current_pet_info.selected_helmet.class != current_pet_info.type) {
            helmet_def = Math.floor(helmet_def * 0.25);
        }

        if (current_pet_info.selected_shoes.class != current_pet_info.type) {
            shoes_def = Math.floor(shoes_def * 0.25);
        }

        let pet_data = data_items[25];

        let pet_data_type = pet_data.find((arr: any) => arr.name.includes(current_pet_info.name));
        let pet_atk_modifier = pet_data_type.atk
        let pet_atk_stat = current_pet_info.atk + 1;
        let pet_final_atk = Math.floor(pet_atk_modifier * (pet_atk_stat * (pet_atk_stat + helmet_def + shoes_def)))

        return pet_final_atk;
    }
    const CalculateFinalDefense = () => {
        let helmet_def = current_pet_info.selected_helmet.defense;
        let shoes_def = current_pet_info.selected_shoes.defense;

        let pet_data = data_items[25];
        let pet_data_type = pet_data.find((arr: any) => arr.name.includes(current_pet_info.name));

        let pet_def_modifier = pet_data_type.def;
        let pet_def_stat = current_pet_info.def + 1;
        let pet_final_def = Math.ceil(pet_def_modifier * Math.round(pet_def_stat * ((0.6 * pet_def_stat) + helmet_def + shoes_def)));



        return pet_final_def;
    }


    let crit = GetCrit();
    let fatk = useMemo(() => CalculateFinalAttack(), [current_pet_info.atk, current_pet_info.selected_helmet, current_pet_info.selected_shoes]);


    let fdef = useMemo(() => CalculateFinalDefense(), [current_pet_info.def, current_pet_info.selected_helmet, current_pet_info.selected_shoes]);

    useEffect(() => {
        let temp = [...pet_stat!.get];
        temp[current_pet_selected] = { ...current_pet_info, fatk: fatk, fdef: fdef };
        pet_stat!.set(temp);
    }, [fatk, fdef])







    return (
        <div className="cont-pet-stats">
            <PetStatInfo name="hp" />
            <PetStatInfo name="atk" />
            <PetStatInfo name="def" />
            <PetStatInfo name="dex" />
            <PetStatResult name="crit multiplier" value={crit} />
            <PetStatResult name="final attack" value={fatk.toLocaleString('en-US')} />
            <PetStatResult name="final defense" value={fdef.toLocaleString('en-US')} />

        </div>
    )
}





function PetStatResult(props: { name: string, value: string }) {
    return (
        <div className="pet-stat-result-cont">
            <p>{props.name}:</p>
            <p>{props.value}</p>
        </div>
    )
}



function PetStatInfo(props: { name: string }) {
    const pet_stat = useContext(ContextPetStats);
    const ui_state = useContext(ContextStates);
    const current_pet_selected = ui_state!.get.pet_selection - 1;
    const current_pet_info = pet_stat!.get[current_pet_selected];

    const pet_data = data_items[25];
    const pet_data_type = pet_data.find((arr: any) => arr.name.includes(current_pet_info.name));
    const pet_hp_modifier = pet_data_type.hp;
     
    const GetPetStatValue = (): number => {
        switch (props.name) {
            case "hp":
                return current_pet_info.hp;
            case "atk":
                return current_pet_info.atk;
            case "def":
                return current_pet_info.def;
            case "dex":
                return current_pet_info.dex;
        }
        return 0;
    }
    const GetPetEncoded = () => {

        switch (props.name) {
            case "hp":
                return Math.floor(((GetPetStatValue() + 3) * pet_hp_modifier ) * 5);
            default:
                return GetPetStatValue() + 1;
        }
    }
    const GetPetDecoded = (n: number) => {
        switch (props.name) {
            case "hp":
                return Math.floor(((n / 5)/pet_hp_modifier) - 3)  ;
            default:
                return n - 1;
        }
    }


    const pet_input_name = "pet-input-" + props.name;

    const pet_input_element = document.getElementById(pet_input_name) as HTMLInputElement;
    if (pet_input_element != null) {
        pet_input_element.valueAsNumber = GetPetEncoded();
    }

    const UpdatePetValue = (x: ChangeEvent<HTMLInputElement>) => {

        let value = parseInt((x.target.value.replace(/^0+/, '')).replace(/\D/g, ''));
        let n = GetPetDecoded(value);

        let points_release = GetPetStatValue() - n;
        let points = current_pet_info.points;
        let points_stack = points + points_release;

        if (points_stack < 0 || n < 0 || isNaN(n)) {

            pet_stat!.set([...pet_stat!.get]);
            return;
        }

        let pet_info: PetStatsType = {
            ...current_pet_info,
            points: points_stack
        }


        switch (props.name) {
            case "hp":
                pet_info = { ...pet_info, hp: n }
                break;
            case "atk":
                pet_info = { ...pet_info, atk: n }
                break;
            case "def":
                pet_info = { ...pet_info, def: n }
                break;
            case "dex":
                pet_info = { ...pet_info, dex: n }
                break;
        }
        let temp = [...pet_stat!.get];
        temp[current_pet_selected] = pet_info;
        pet_stat!.set(temp);
    }

    const ModifyPetStat = (condition: boolean) => {
        const state_value = condition ? 1 : -1;

        let current = pet_stat!.get[current_pet_selected]
        let pet_info: PetStatsType = {
            ...current,
        }
        switch (props.name) {
            case "hp":
                pet_info = { ...pet_info, hp: current.hp + state_value, points: current.points - state_value };
                break;
            case "atk":
                pet_info = { ...pet_info, atk: current.atk + state_value, points: current.points - state_value };
                break;
            case "def":
                pet_info = { ...pet_info, def: current.def + state_value, points: current.points - state_value };
                break;
            case "dex":
                pet_info = { ...pet_info, dex: current.dex + state_value, points: current.points - state_value };
                break;
        }
        let temp = [...pet_stat!.get];
        temp[current_pet_selected] = pet_info;
        pet_stat!.set(temp);
    }

    return (
        <div className="pet-stat-info-cont">
            <p>{props.name}:</p>
            <input id={pet_input_name} type="number" onBlur={UpdatePetValue} defaultValue={GetPetEncoded()} ></input>
            <button className="icon-minus" onClick={() => ModifyPetStat(false)} style={
                (GetPetStatValue() > 0)
                    ? { opacity: 1, cursor: "pointer" }
                    : { opacity: 0, cursor: 'default', pointerEvents: 'none' }
            }></button>
            <button className="icon-plus" onClick={() => ModifyPetStat(true)} style={
                (current_pet_info.points > 0)
                    ? { opacity: 1, cursor: "pointer" }
                    : { opacity: 0, cursor: 'default', pointerEvents: 'none' }
            }></button>
        </div>
    )



}

function PetListCont() {
    const pet_stat = useContext(ContextPetStats);

    const pet_data = pet_stat!.get;
    let use_add_button = false;
    let switcher = false;
    return (
        <div className="pet-list-cont">
            {

                (Object.entries(pet_data).map(([key, value], i) => {
                    if (use_add_button) {
                        use_add_button = false;
                        switcher = true;
                    }

                    if (value.name == "" && !switcher) {
                        use_add_button = true;
                    }
                    return <PetSlotCont key={i} index={parseInt(key)} name={value.name} url={value.url} is_add={use_add_button} />
                }))
            }
        </div>
    )
}


function PetSlotCont(props: { index: number, name: string, url: string, is_add: boolean }) {

    const ui_state = useContext(ContextStates);

    const SelectPet = () => {
        ui_state!.set(x => ({ ...x, page: "pets_select", is_change_pet: false }));
    }
    if (props.name == "" && props.is_add) {
        return <div className="pet-slot-add-cont" onClick={SelectPet}>
            <img className="item-display" src="./src/assets/UI/icon-remove.png"></img>
        </div>
    }

    if (props.name == "") {
        return <div className="pet-slot-empty-cont"></div>;
    }

    const current_selected = props.index == ui_state!.get.pet_selection - 1;
    const pet_slot_bg = (props.url != "") ? props.url : "/Item-Images/pets/0.png";
    const bg = (current_selected) ? { backgroundColor: "#96D719" } : {};
    const id = (current_selected) ? "pet-slot-active" : "pet-slot-id-" + props.index;
    const ChangePetSelection = () => {
        if (current_selected) {
            return
        }
        ui_state!.set(x => ({ ...x, pet_selection: (props.index + 1) as 1 | 2 | 3 | 4 | 5 | 6 }));
    }
    const ChangePet = () => {
        ui_state!.set(x => ({ ...x, page: "pets_select", is_change_pet: true }));
    }
    return (
        <div className="pet-slot-cont" id={id} style={bg} onClick={() => (current_selected) ? ChangePet() : ChangePetSelection()}>
            <img src={"./src/assets/" + pet_slot_bg}></img>

        </div>)
}