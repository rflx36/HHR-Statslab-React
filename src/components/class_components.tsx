
import { useContext } from "react";
import { ContextBaseStats, ContextStates } from "../StatContext";
import { ClassType } from "../types";
import '../css/class_components.css';



export default function ContainerClass() {
    return (
        <div className="cont-class-selection">  
            <SetClassComponent type="warrior" />
            <SetClassComponent type="archer" />
            <SetClassComponent type="cowboy" />
            <SetClassComponent type="mage" />
        </div>
    )
}



export function SetClassComponent(props: { type: ClassType }) {
    const stat = useContext(ContextBaseStats);
    const page = useContext(ContextStates);

    let class_name = `class-${props.type}`;

    const SetClass = (class_value: ClassType) => {

        stat?.set(stats => ({ ...stats, current_class: class_value }))
        page?.set(page => ({ ...page, page: "main" }));
    }

    return (
        <div onClick={() => SetClass(props.type)}>
            <button className={class_name}>
                <p>{props.type}</p>
            </button>
            
        </div>


    )
}
