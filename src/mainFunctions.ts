

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