import { useContext } from "react";
import { ContextPetStats } from "./StatContext";
import { ClassType, ItemType, PetStatsType } from "./types";
import { InitialItemTypeValue } from "./initialValue";


interface PetSetStatType extends PetStatsType {
    index: number
}
let PetSetStatDetails: PetSetStatType = {
    index: 0,
    name: "",
    evolution: 1,
    hp: 0,
    atk: 0,
    def: 0,
    dex: 0,
    price: 0,
    type: "warrior",
    level: 1,
    points: 0,
    selected_helmet: InitialItemTypeValue,
    selected_shoes: InitialItemTypeValue,
    fatk: 0,
    fdef: 0,
    url: "",
    color:""
}

export function PetSetStat(index: number, property: string, value: string | number | ItemType | ClassType | 1 | 2 | 3) {
    PetSetStatDetails = {
        ...PetSetStatDetails,
        index: index,
        [property]: value
    }
    console.log("Set:");
    console.log(PetSetStatDetails);
}
export function PetUpdateStat() {
    const pet_stat = useContext(ContextPetStats);
    const { index, ...pet_data } = PetSetStatDetails;

    let temp = [...pet_stat!.get];
    temp[PetSetStatDetails.index] = pet_data;
    pet_stat!.set(temp);
    console.log("Updated");
}

// export function PetSetStat(
//     index: number,
//     s_name?: string,
//     s_evolution?: number,
//     s_hp?: number,
//     s_atk?: number,
//     s_def?: number,
//     s_dex?: number,
//     s_price?: number,
//     s_type?: ClassType,
//     s_level?: number,
//     s_points?: number,
//     s_fatk?: number,
//     s_fdef?: number,
//     s_url?: string,
//     s_helmet?: ItemType,
//     s_shoes?: ItemType,
// ) {
//     const pet_stat = useContext(ContextPetStats);

//     let temp = [...pet_stat!.get];
//     let x = temp[index];
//     const pet_info: PetStatsType = {
//         ...x,
//         ...(s_name != null && { name: s_name }),
//         ...(s_evolution != null && { evolution: s_evolution as 1 | 2 | 3 }),
//         ...(s_hp != null && { hp: s_hp }),
//         ...(s_atk != null && { _atk: s_atk }),
//         ...(s_def != null && { def: s_def }),
//         ...(s_dex != null && { dex: s_dex }),
//         ...(s_price != null && { price: s_price }),
//         ...(s_type != null && { type: s_type }),
//         ...(s_level != null && { level: s_level }),
//         ...(s_points != null && { points: s_points }),
//         ...(s_fatk != null && { fatk: s_fatk }),
//         ...(s_fdef != null && { fdef: s_fdef }),
//         ...(s_url != null && { url: s_url }),
//         ...(s_helmet != null && { helmet: s_helmet }),
//         ...(s_shoes != null && { shoes: s_shoes }),
//     }

//     temp[index] = pet_info;
//     pet_stat!.set(temp);
// }


// export function UpdateLevel(event:ChangeEvent<HTMLInputElement>){
//     const stat = useContext(ContextBaseStats);
//     let level_value = event.target.value;
//     if (level_value === "" ||  parseInt(level_value) > 1000000){
//         level_value = "1";
//     }
//     stat?.set(stat=>({...stat,current_level: parseInt(level_value)}));

//     console.log( typeof event.target.value);

//     console.log(event.target.value)
// }



// export function SetProperty(object:object,property:string,value:string){
//     const data = `{
//         "...data": ${JSON.stringify(object)},
//         "${property}": ${value}
//     }`;

//     return JSON.parse(data);
// }