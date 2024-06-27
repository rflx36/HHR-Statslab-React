import { useContext } from "react"
import { ContextStates } from "../StatContext"


export default function CloseButton(){
    const ui_state = useContext(ContextStates);
    const Close = ()=>{
        ui_state?.set(ui => ({ ...ui, page: "main" }));
    }
    return (
        <div className="close-button" onClick={Close}></div>
    )
}