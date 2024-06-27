
import { useContext, useEffect, useState } from "react";
import { AdWallProvider, ContextStates, StatProvider } from "./StatContext";
import { StartLoading } from "./initialLoad";
import ContainerMain from "./components/main_components";
import ContainerClass from "./components/class_components";

import './css/app.css';
import ContainerDetail from "./components/detail_components";
import ContainerItem from "./components/item_components";
import ContainerSave from "./components/save_components";
import ContainerMonster from "./components/monster_component";
import ContainerHelp from "./components/helpSection";
import PremiumCont, { PremiumBGDarken, PremiumDetail } from "./components/premium_ad";

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
          <StatProvider>
            <div className="cont">
              <ContainerMonster />
              <h1 id="cont-title-id">REBORN STAT LAB</h1>
              <AppPages />

            </div>
          </StatProvider>
        )
      }
      <AdWallProvider>
        <PremiumCont />
        <PremiumDetail />
        <PremiumBGDarken />
      </AdWallProvider>

    </>
  )
}

export default App;

function AppPages() {
  const ui_state = useContext(ContextStates);
  let current_page = ContainerClass(); // initial : "class"
  switch (ui_state?.get.page) {

    case "main":
      current_page = ContainerMain();
      break;

    case "detail":
      current_page = ContainerDetail();
      break;

    case "item":
      current_page = ContainerItem();
      break;

    case "save":
      current_page = ContainerSave();
      break;
    case "help":
      current_page = ContainerHelp();
  }
  return current_page;
}