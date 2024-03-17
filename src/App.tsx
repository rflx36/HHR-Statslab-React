
import { useEffect, useState } from "react";
import { StatProvider } from "./StatContext";
import { StartLoading } from "./initialLoad";




function App() {


  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const InitialLoad = async () => { await StartLoading(); setLoading(false); }
    InitialLoad();
  }, [])

  return (
    <>
      <div id="loading-cache-cont">
      </div>
      {loading && (
        <>
          <div className="loader-cont">
            <p>lol im still loading</p>

          </div>

        </>
      )}

      <p>Is Still loading : {String(loading)} </p>
      <div className="cont">
        <h1 id="cont-title-id">REBORN STAT LAB</h1>
        <StatProvider>

        </StatProvider>
      </div>
    </>
  )
}

export default App
