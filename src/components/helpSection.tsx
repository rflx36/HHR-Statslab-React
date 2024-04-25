
import { useContext } from "react";
import "../css/helpSection.css"
import { ContextStates } from "../StatContext";


export default function ContainerHelp() {


    return (
        <div className="help-cont">
            <CloseButton />
            <div className="help-details">
                <h1>What is statlab?</h1>
                <div className="help-info">
                    <p>It's an automatic HHR character stat calculator that computes your final defense, final attack, total equipment cost, point requirements,  damage dealt, and damage taken in PvE.</p>
                 
                </div>
                <div className="help-info">
                <p>Basically it's a tool that helps you reset points for free or practice and try out gears, allowing you to adjust skill points and wear gears until you achieve your desired stats.</p>
                    <p className="text-extra">This statlab website is created by <span style={{color:"red"}}>RFLX</span> and it is hosted by <span style={{color:"blue"}}>A3lx</span></p>
                    <p className="text-extra">you can join our official HHR bot Discord Server <a style={{ color: "blue" }} href="https://discord.com/invite/BPGmpJbXR2">here</a></p>
                </div>
            </div>
            <div className="help-details">
                <h1>Elements Formula</h1>
                <div className="help-info">
                    <p><span style={{ color: "#e55617 " }}>Fire</span> = deals 10% of damage  </p>
                    <p className="text-extra">10 ticks over 6 seconds</p>
                </div>
                <div className="help-info">
                    <p><span style={{ color: "#FFEE37 " }}>Electric</span> = deals 35% of damage  </p>
                    <p className="text-extra">electric deals chained damage onto nearby enemies</p>
                </div>
                <div className="help-info">
                    <p><span style={{ color: "#42b844 " }}>Poison</span> = deals a percent of damage on high defense enemies</p>
                    <p className="text-extra">ticks intervals are about every 0.9s</p>
                    <p className="text-extra">poison damage = (√((player_fatk+30)/((mob_fdef/6)+30) *5) )/2</p>
                </div>
                <div className="help-info">
                    <p><span style={{ color: "#60AFFF " }}>Ice</span> = Reduces Enemy % armor based off % Enemy health you deal</p>
                    <p className="text-extra">Special thanks to SamSam for helping me on this one out</p>
                </div>
            </div>
            <div className="help-details">
                <h1>Damage Formulas</h1>
                <div className="help-info">
                    <p><span style={{ color: "#9e9e9e" }} > Final attack </span>= weapon power <span id="multiply">x</span> base attack stat</p>
                    <p className="text-extra "> base_attack_stat = ((1 + atk_stat) + helmet_attack + armor_attack + pants_attack + shoes_attack + accessories_attack + sheath_bonus_damage)</p>
                    <p className="text-extra"> sheath_bonus_damage (two handed) = 25% of sheathed weapon power</p>
                    <p className="text-extra"> sheath_bonus_damage (single handed) =   +6% of sheathed weapon power  </p>
                </div>
                <div className="help-info">
                    <p><span style={{ color: "#9e9e9e" }} >Monster Final Attack </span> = monster attack ^ 2 </p>
                    <p className="text-extra"> Monster Variants Final Attack = monster_attack * (monster_attack + monster_helmet_attack)</p>
                    <p className="text-extra"> sasquatch punches deals 250% of the damage</p>
                </div>
                <div className="help-info">
                    <p><span style={{ color: "#9e9e9e" }} >Damage</span>  = (Attacker_final_attack + dampening) / (Defender_final_defense + dampening ) <span id="multiply">x</span> multiplier</p>
                    <p className="text-extra">dampening = 30</p>
                    <p className="text-extra">multiplier = 5</p>
                </div>
                <div className="help-info">
                    <p><span style={{ color: "#9e9e9e" }} > Final Defense </span>= (def_stat + 8) <span id="multiply">x</span> base defense stat</p>
                    <p className="text-extra">base_defense_stat = helmet_defense + armor_defense + pants_defense + shoes_defense + accessories_defense + (shield_defense * shield_skill_multiplier) + (bonus_sheath_shield_defense * shield_skill_multiplier)</p>
                    <p className="text-extra">bonus_shield_sheath_defense = 35% of sheathed shield defense</p>
                </div>
                <div className="help-info">
                    <p><span style={{ color: "#9e9e9e" }} > Monster Final Defense </span> = monster defense ^ 2 </p>
                    <p className="text-extra"> Monster Variants Final defense = monster_defense * (monster_defense + monster_helmet_defense)</p>
                </div>

            </div>
            <div className="help-details">
                <h1>Consequences of using wrong class items</h1>
                <div className="help-info">
                    <p style={{color:"#ff2f2f"}}>using unmatched class weapons makes your damage dealt to 25%</p>
                    <p style={{color:"#ff2f2f"}}>wearing unmatched class armor removes the armor attack stat</p>
                    
                    <p style={{color:"#ff2f2f"}}>sheathing unmatched class weapons makes the weapon power reduces to 25%</p>
                </div>
            </div>
        </div>
    )
}



function CloseButton(){
    const ui_state = useContext(ContextStates);
    const Close = ()=>{
        
        ui_state?.set(ui => ({ ...ui, page: "main" }));
    }
    return (
        <div className="close-button" onClick={Close} style={{top:"-5px",right:"-10px"}}></div>
    )
}