import { useContext } from "react";
import { ContextBaseStats } from "../StatContext";



export default function TestButton() {
    const stats = useContext(ContextBaseStats);
    
    const apt = () => {
        stats?.set(stats => ({ ...stats, current_atk: stats.current_atk + 1 }));
    }
    return (
        <>  <p>this is a test 2:</p>
            <p>
                {JSON.stringify(stats?.get)}

            </p>
            <button onClick={apt}>Add </button>
            <button onClick={() => stats?.set(stats=> ({...stats,current_def:stats.current_def+10}))}>
                add 10 def
                 </button>
            {/* <button onClick={
                () => {
                    stats?.set(
                        stat => (
                            {
                                ...stat,
                                BaseStats: {
                                    ...stat.BaseStats,
                                    current_atk: stat.BaseStats.current_atk + 1
                                }
                            }
                        )
                    )
                }
            }
            ></button> */}
        </>)
        ;
}