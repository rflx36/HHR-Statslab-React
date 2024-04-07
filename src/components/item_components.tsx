import { useContext } from "react";
import CloseButton from "./closeButton";
import { ContextBaseStats, ContextEquips, ContextStates } from "../StatContext";


import '../css/item_components.css';
import { ClassType, HanderType, ItemSlot, ItemType } from "../types";
import { data_items } from "../initialLoad";
import { InitialItemTypeValue, InitialWeaponTypeValue } from "../initialValue";



export default function ContainerItem() {
    return (

        <div className="cont-items-selection">
            <CloseButton />
            <ItemsAll />
            <ItemsInfo />
        </div>

    );
}


function RequestIndex(c: ClassType, s: ItemSlot, isAll: boolean) {
    let items: Array<any> = [];
    let d = data_items;

    switch (s) {
        case "helmet":
            items = items.concat(d[0], d[1], d[2], d[3]);
            break;
        case "armor":
            items = items.concat(d[4], d[5], d[6], d[7]);
            break;
        case "pants":
            items = items.concat(d[8], d[9], d[10], d[11]);
            break;
        case "shoes":
            items = items.concat(d[12], d[13], d[14], d[15]);
            break;
        case "primary":
            items = items.concat(d[16], d[17], d[18], d[19]);
            break;
        case "secondary":

            items = items.concat(d[16], d[18], d[19]);
            items = items.filter((arr: any) => arr.twohanded === false);
            items = d[20].concat(items);
            break;
        case "primary sheated":
            items = items.concat(d[20], d[16], d[17], d[18], d[19]);
            break;
        case "secondary sheated":
            items = items.concat(d[16], d[17], d[18], d[19]);
            items = items.filter((arr: any) => arr.twohanded === false);
            break;
        case "accessories":
            items = d[21];
            break;
    }
    if (!isAll) {
        items = items.filter((arr: any) => arr.class == String(c));

    }
    return items;

}

function ItemsAll() {

    const ui_state = useContext(ContextStates);
    const stat = useContext(ContextBaseStats);

    let item_data = RequestIndex(stat!.get.current_class, ui_state!.get.item, ui_state!.get.all) || [];
    return (
        <div className="cont-items-all">
            <ItemRemove slot={ui_state!.get.item as ItemSlot} />
            {
                // items[type_selector].map((e, i) => {
                item_data.map((e, i) => {
                    return (
                        <Item
                            slot={ui_state!.get.item as ItemSlot}
                            class={e.class as ClassType}
                            name={e.name as string}
                            level={e.level as number}
                            price={e.price as number}
                            url={e.url as string}

                            type={(e.twohanded != undefined) ? (e.twohanded == true) ? "two handed" : "single handed" as HanderType : undefined}
                            power={e.power as number}
                            defense={e.defense as number}
                            rpm={e.rpm as number}
                            key={i} />
                    )
                })
            }
        </div>
    )
}
interface PrequisitesType {
    slot: ItemSlot, // required
    class: ClassType, // required
    name: string, // required
    level: number, // required
    price: number, // required
    url: string, //required

    type?: HanderType
    power?: number,
    defense?: number,
    rpm?: number,

}
function Item(props: PrequisitesType) {
    const stat = useContext(ContextBaseStats);
    const equips = useContext(ContextEquips);
    const ui_state = useContext(ContextStates);
    const pow_based = ["primary", "secondary", "primary sheated", "secondary sheated"];

    let isPow = false;
    if (pow_based.includes(props.slot)) {
        isPow = true;
    }
    let isEligible = ((stat?.get.current_level || 0) >= props.level);


    const SetItem = () => {
        const ItemInfo: ItemType = {
            name: props.name,
            power: props.power || 0,
            defense: props.defense || 0,
            price: props.price,
            class: props.class,
            url: props.url,
            weapon_type: props.type,
            enchanted: (isPow && props.defense == 0) && ui_state?.get.enchanted
        }
        switch (props.slot) {
            case "primary":
                equips?.set(x => ({ ...x, selected_primary_weapon: ItemInfo }));
                break;
            case "secondary":
                equips?.set(x => ({ ...x, selected_secondary_weapon: ItemInfo }));
                break;
            case "primary sheated":
                equips?.set(x => ({ ...x, sheated_primary_weapon: ItemInfo }));
                break;
            case "secondary sheated":
                equips?.set(x => ({ ...x, sheated_secondary_weapon: ItemInfo }));
                break;
            case "helmet":
                equips?.set(x => ({ ...x, selected_helmet: ItemInfo }));
                break;
            case "armor":
                equips?.set(x => ({ ...x, selected_armor: ItemInfo }));
                break;
            case "pants":
                equips?.set(x => ({ ...x, selected_pants: ItemInfo }));

                break;
            case "shoes":
                equips?.set(x => ({ ...x, selected_shoes: ItemInfo }));
                break;
            case "accessories":
                equips?.set(x => ({ ...x, selected_accessories: ItemInfo }));
                break;

        }
        ui_state?.set(x => ({ ...x, page: "main" }));



    }
    // isEnchanted trigger + isWeapon + IsNotAShield
    let isEnchantable = (ui_state?.get.enchanted || false) && isPow && props.defense == undefined;
    return (

        <div className={isEligible ? "item" : "item-underleveled"} onClick={isEligible ? SetItem : () => { return }} >
            {(isEnchantable) &&
                (<div className="item-enchanted-cont">
                    <img className="item-enchanted" src="./src/assets/UI/enchanted.png"></img>
                </div>)}
            <img className="item-display" src={"./src/assets/" + props.url}></img>
            <div className="item-details">
                <p className="details-title">{props.name}</p>

                <img className="details-img" src={"./src/assets/" + props.url}></img>
                {(ui_state?.get.all) && (<p className="details-p" id={(props.class == stat?.get.current_class) ? "class-valid" : "class-invalid"}>Class: {props.class}</p>)}
                {(props.defense != undefined) && (<p className="details-p" >Defense: {props.defense}</p>)}
                {(props.power != undefined) && (<p className="details-p">{(isPow) ? "Power" : "Attack"}: {props.power}</p>)}
                {(props.rpm != undefined) && (<p className="details-p">RPM: {props.rpm}</p>)}
                {(props.type == "two handed") && (<p className="details-p">TWO HANDED</p>)}

                <p className="details-p" id="underleveled">Required level: {props.level}</p>
                <p className="details-p">Price: {props.price}</p>
                {(isEnchantable) && (<p className="details-p details-enchanted">Enchantment Cost: {Math.round(Math.sqrt(props.price) * 2)}</p>)}
            </div>
        </div>

    )
}
function ItemRemove(props: { slot: ItemSlot }) {
    const equips = useContext(ContextEquips);
    const ui_state = useContext(ContextStates);


    const RemoveItem = () => {
        switch (props.slot) {
            case "primary":
                equips?.set(x => ({ ...x, selected_primary_weapon: InitialWeaponTypeValue }));
                break;
            case "secondary":
                equips?.set(x => ({ ...x, selected_secondary_weapon: InitialWeaponTypeValue }));
                break;
            case "primary sheated":
                equips?.set(x => ({ ...x, sheated_primary_weapon: InitialWeaponTypeValue }));
                break;
            case "secondary sheated":
                equips?.set(x => ({ ...x, sheated_secondary_weapon: InitialWeaponTypeValue }));
                break;
            case "helmet":
                equips?.set(x => ({ ...x, selected_helmet: InitialItemTypeValue }));
                break;
            case "armor":
                equips?.set(x => ({ ...x, selected_armor: InitialItemTypeValue }));
                break;
            case "pants":
                equips?.set(x => ({ ...x, selected_pants: InitialItemTypeValue }));
                break;
            case "shoes":
                equips?.set(x => ({ ...x, selected_shoes: InitialItemTypeValue }));
                break;
            case "accessories":
                equips?.set(x => ({ ...x, selected_accessories: InitialItemTypeValue }));
                break;

        }
        ui_state?.set(x => ({ ...x, page: "main" }));
    }

    return (
        <div className="item-remove" onClick={RemoveItem}>
            <img className="item-display" src="./src/assets/UI/icon-remove.png"></img>
        </div>
    )
}
function ItemsInfo() {
    const ui_state = useContext(ContextStates);

    const ToggleAll = () => {
        ui_state?.set(x => ({ ...x, all: !x.all }));
    }
    const ToggleEnchant = () => {
        ui_state?.set(x => ({ ...x, enchanted: !x.enchanted }));
    }
    const link_checked = "src/assets/UI/icon-checked.png";
    const link_unchecked = "src/assets/UI/icon-unchecked.png";
    let weapon_slots = ["primary", "secondary", "primary sheated", "secondary sheated"];
    return (
        <div className="cont-items-info">
            <div className="cont-items-image"></div>
            <div className="cont-items-details"></div>
            <div className="all-class-cont">
                <div className="div-cont">
                    <p>all class</p>
                    <button id="toggle-class" onClick={ToggleAll}>
                        <img src={(ui_state?.get.all) ? link_checked : link_unchecked}></img>
                    </button>
                </div>
                {weapon_slots.includes(ui_state!.get.item) &&
                    (<div className="div-cont">
                        <p>enchanted</p>
                        <button id="toggle-enchanted" onClick={ToggleEnchant}>
                            <img src={(ui_state?.get.enchanted) ? link_checked : link_unchecked}></img>
                        </button>
                    </div>)
                }
            </div>
        </div>
    )
}