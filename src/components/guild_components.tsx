import { ChangeEvent, useContext } from "react";
import { ContextSkills } from "../StatContext";

import '../css/guild_components.css';
import CloseButton from "./closeButton";



export default function ContainerGuild() {
    return <GuildCont />
}


function GuildCont() {


    return (
        <div className="guild-boost-cont">
            <CloseButton/>
            <RangeInputCont type="attack" />
            <RangeInputCont type="defense" />
            <RangeInputCont type="elemental" />
        </div>
    )
}

function RangeInputCont(props: { type: string }) {

    const skills = useContext(ContextSkills);
    let text = "final " + props.type + " by 5%";
    if (props.type == "elemental") {
        text = "elemental effectiveness by 5%";
    }

    const ChangeBoostModifier = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        switch (props.type) {
            case "attack":
                skills!.set(x => ({ ...x, guild_attack_boost: value }));
                break;
            case "defense":

                skills!.set(x => ({ ...x, guild_defense_boost: value }));
                break;
            case "elemental":

                skills!.set(x => ({ ...x, guild_elemental_boost: value }));
                break;
        }
    }
    const GetBoostValue = () => {
        switch (props.type) {
            case "attack":
                return skills!.get.guild_attack_boost;
            case "defense":
                return skills!.get.guild_defense_boost;
            case "elemental":
                return skills!.get.guild_elemental_boost;

        }
        return 0;
    }

    return (
        <div className="guild-boost-input-cont">
            <p className="guild-boost-text">Guild Perk Boost {text} (current bonus: {GetBoostValue() * 5}%)</p>
            <div className="guild-boost-input-range-cont">
                <input type="range" min={0} max={3} value={GetBoostValue()} onChange={e => ChangeBoostModifier(e)}></input>
                <p>{GetBoostValue()}x</p>
            </div>
        </div>
    )
}