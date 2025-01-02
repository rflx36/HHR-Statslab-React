
import "../css/save_components.css"
import { useContext, useState } from "react";
import { ContextBaseStats, ContextEquips, ContextPetStats, ContextSkills, ContextStates } from "../StatContext";
import { BaseStatsType, EquipsType, PetStatsType, SkillsType } from "../types";
import { InitialBaseStats, InitialEquip, InitialPetStatSlots, InitialSkills, StatlabVersion } from "../initialValue";




export default function ContainerSave() {


    return (
        <div className="cont-saving">
            <SaveCloseButton />
            <SaveDetails />
            <SaveList />
        </div>
    );
}

function SaveCloseButton() {
    const ui_state = useContext(ContextStates);
    const Close = () => {

        ui_state?.set(ui => ({ ...ui, page: "main", current: ui.save_session, save: (ui.save_session === "") ? "save" : "update" }));
    }
    return (
        <div className="close-button" onClick={Close}></div>
    )
}
function SaveDetails() {
    const ui_state = useContext(ContextStates);
    const stat = useContext(ContextBaseStats);
    const isCurrent = (ui_state?.get.current || "") == "";

    let dat = JSON.parse(localStorage.getItem(ui_state!.get.current) || "{}");

    const stat_class = (isCurrent) ? (stat?.get.current_class || "") : dat.stats.current_class;
    const stat_level = (isCurrent) ? (stat?.get.current_level || 0) : dat.stats.current_level;
    const stat_hp = (isCurrent) ? (stat?.get.current_hp || 0) : dat.stats.current_hp;
    const stat_mp = (isCurrent) ? (stat?.get.current_mp || 0) : dat.stats.current_mp;
    const stat_atk = (isCurrent) ? (stat?.get.current_atk || 0) : dat.stats.current_atk;
    const stat_def = (isCurrent) ? (stat?.get.current_def || 0) : dat.stats.current_def;
    const stat_dex = (isCurrent) ? (stat?.get.current_dex || 0) : dat.stats.current_dex;

    return (
        <div className="save-details">
            <div id="save-details-id">
                <h1 style={{ margin: "20px" }}>{(isCurrent) ? "Current" : ui_state?.get.current}</h1>
                <SaveDetail type="class" value={stat_class} />
                <SaveDetail type="level" value={stat_level} />
                <SaveDetail type="hp" value={(stat_hp + 3) * 5} />
                <SaveDetail type="mp" value={stat_mp * 3} />
                <SaveDetail type="atk" value={stat_atk + 1} />
                <SaveDetail type="def" value={stat_def + 1} />
                <SaveDetail type="dex" value={stat_dex + 1} />
            </div>
            <div className="save-actions">
                <ActionCont page_state={ui_state!.get.save} />
            </div>
        </div>
    )
}

function ActionCont(props: { page_state: string }) {

    const stat = useContext(ContextBaseStats);
    const equips = useContext(ContextEquips);
    const skills = useContext(ContextSkills);
    const pet_stat = useContext(ContextPetStats);
    const ui_state = useContext(ContextStates);
    const [input, setInput] = useState("");
    const current_save = ui_state!.get.current;


    const DisplayActionButtons = () => {
        // const button_state_display = (ui_state!.get.current_selected == current_save) ? "update" : props.page_state;
        const LoadData = () => {
            interface saveDataType {
                stats: BaseStatsType,
                equips: EquipsType,
                skills: SkillsType,
                pets_stat: Array<PetStatsType>
            }

            const save_data: saveDataType = JSON.parse(localStorage.getItem(current_save) || "");

            const data_stat = (save_data.stats != undefined) ? save_data.stats : InitialBaseStats;
            const data_equips = (save_data.equips != undefined) ? save_data.equips : InitialEquip;
            const data_skills = (save_data.skills != undefined) ? save_data.skills : InitialSkills;
            const data_pet_stat = (save_data.pets_stat != undefined) ? save_data.pets_stat : InitialPetStatSlots;
          

            stat?.set(data_stat);
            equips?.set(data_equips);
            skills?.set(data_skills);
            pet_stat?.set(data_pet_stat);
            ui_state?.set(x => ({ ...x, page: "main", save: "update", save_session: current_save, pet_selection: 1 }));

        }

        const DeleteData = () => {
            localStorage.removeItem(current_save);
            ui_state?.set(x => ({ ...x, page: "main", current: "", save: "save", save_session: "" }));
        }

        const SaveData = () => {
            const base = stat!.get;
            const equip = equips!.get;
            const skill = skills!.get;
            const pets = pet_stat!.get;
            SetSave(input, base, equip, skill, pets);
            ui_state?.set(x => ({ ...x, page: "main", current: input, save: "update", save_session: input }));

        }
        const UpdateData = () => {
            const base = stat!.get;
            const equip = equips!.get;
            const skill = skills!.get;
            const pets = pet_stat!.get
            SetUpdate(current_save, base, equip, skill, pets);
            ui_state?.set(x => ({ ...x, page: "main", current: current_save, save: "update", save_session: current_save }));
        }

        switch (props.page_state) {

            case "load":
                return (
                    <>
                        <button className="action-delete" onClick={DeleteData}>
                            <p>DELETE</p>
                        </button>
                        <button className="action-load" onClick={LoadData}>
                            <p>LOAD</p>
                        </button>
                    </>
                );
            case "update":
                return (
                    <>
                        <button className="action-delete" onClick={DeleteData}>
                            <p>DELETE</p>
                        </button>
                        <button className="action-update" onClick={UpdateData}>
                            <p>UPDATE</p>
                        </button>
                    </>
                );

            default:

                return (
                    <>
                        <div className="save-name">
                            <input type="text" autoComplete="off" id="save-name-input" placeholder="Enter name..." value={input} onChange={(e) => setInput(e.target.value)}></input>
                        </div>
                        <button className="action-save" onClick={SaveData}>
                            <p>SAVE</p>
                        </button>
                    </>
                );
        }
    }
    return (
        <div className="action-cont">
            {DisplayActionButtons()}
        </div>
    )
}


function SaveDetail(props: { type: string, value: string | number }) {
    return (
        <div className="save-detail-h">
            <div className="save-selected-info">
                <p className="save-info-type">{props.type}:</p>
                <p>{props.value}</p>
            </div>
        </div>
    )
}


function SaveList() {
    let keys = Object.keys(localStorage);
    return (
        <div className="save-list">
            {keys.map((e, i) => {

                return (
                    <SavedDataContainer
                        save_name={e}
                        key={i}
                    />
                )
            })}
        </div>
    )
}

function SavedDataContainer(props: { save_name: string }) {

    const ui_state = useContext(ContextStates);
    let dat = JSON.parse(localStorage.getItem(props.save_name) || "");

    if (dat.ver == StatlabVersion) {
        let img = (dat.equips.selected_helmet.url != "") ? dat.equips.selected_helmet.url : "UI/icon-helmets.png";

        const GetData = () => {
            ui_state?.set(x => ({ ...x, current: props.save_name, save: "load" }));
        }
        return (
            <div className="saved-data-cont" onClick={GetData} id={
                (ui_state?.get.current == props.save_name) ? "save-data-active" : ""}>
                <img src={ img}></img>
                <p>{props.save_name}</p>
            </ div>
        )
    }
    else {

        console.log("[NO LONGER SUPPORTED] removed saved data : "+ props.save_name);
        localStorage.removeItem(props.save_name);
        return (
            <></>
        )
    }

}



function SetSave(name: string, stat: BaseStatsType, equip: EquipsType, skill: SkillsType, pet_stat: Array<PetStatsType>) {

    name = name.trim().toLocaleLowerCase();
    if (name == "") {
        alert("Please enter a name before saving");
        return;
    }
    if (localStorage.getItem(name) != null) {
        let temp_data = JSON.parse(localStorage.getItem(name) || "");
        if (temp_data.ver == StatlabVersion) {

            alert("name already exist");
            return;
        }

    }
    const current_data = {
        ver: StatlabVersion,
        stats: stat,
        equips: equip,
        skills: skill,
        pets_stat: pet_stat
    }
    localStorage.setItem(name, JSON.stringify(current_data));
}

function SetUpdate(name: string, stat: BaseStatsType, equip: EquipsType, skill: SkillsType, pet_stat: Array<PetStatsType>) {
    const updated_data = {
        ver: StatlabVersion,
        stats: stat,
        equips: equip,
        skills: skill,
        pets_stat: pet_stat
    }
    localStorage.setItem(name, JSON.stringify(updated_data));
}