import { useContext } from "react";
import { ContextBaseStats } from "../StatContext";



export default function TestButton() {
    const stats = useContext(ContextBaseStats);
    // console.log(stats.stat);
    // console.log(stats.stat);
    let temp = stats?.get;
    console.log({ ...temp });


    const apt = () => {
        stats?.set(stats => ({ ...stats, current_atk: stats.current_atk + 1 }));
    }
    return (
        <>  <p>this is a test 2:</p>
            <p>
                {JSON.stringify(temp)}

            </p>
            <button onClick={apt }></button>
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