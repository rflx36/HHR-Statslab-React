import { useContext } from "react"
import { ContextStates } from "../StatContext"


export default function CloseButton() {
    const ui_state = useContext(ContextStates);
    const Close = () => {

        if (ui_state!.get.is_pet) {
            ui_state?.set(ui => ({...ui, page:"pets"}));
        }
        else {

            ui_state?.set(ui => ({ ...ui, page: "main" }));
        }
    }
    return (
        <div className="close-button" onClick={Close}></div>
    )
}