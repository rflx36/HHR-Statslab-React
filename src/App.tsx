
import { useEffect, useState } from "react";
import { StatProvider } from "./StatContext";
import { StartLoading } from "./initialLoad";
import './css/app.css';
import TestButton from "./components/button_container";


function App() {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const InitialLoad = async () => { await StartLoading(); setLoading(true); }
    InitialLoad();
  }, [])

  return (
    <>
      {
        !loading ? (
          <>
            <div className="loader-cont" id="loader-cont-id">

              <div id="loading-cache-cont">
              </div>
            </div>
          </>
        ) : (
          <>
            <StatProvider>
              <div className="cont">
                <h1 id="cont-title-id">REBORN STAT LAB</h1>

              <TestButton/>
              </div>
            </StatProvider>
          </>
        )
      }
    </>
  )
}

export default App
