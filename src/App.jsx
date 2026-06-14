import './App.css'
import {Cat} from "./components/Cat.jsx";
import {Lamp} from "./components/Lamp.jsx";
import {useState} from "react";
import {ProgressBar} from "./components/ProgressBar.jsx";
import heartFull from "./assets/progress-bars/health-full.png";
import heartEmpty from "./assets/progress-bars/health-empty.png";
import energyFull from "./assets/progress-bars/energy-full.png";
import energyEmpty from "./assets/progress-bars/energy-empty.png";

function App() {
    const [lampOn, setLampOn] = useState(true);
    const [catState, setCatState] = useState("normal");


    function clickLamp() {
        if (lampOn) {
            setCatState("sleeping");
        } else {
            setCatState("normal");
        }
        setLampOn(prev => !prev);
    }

    return (
        <div className="game">
            <div className={`scene ${lampOn ? "light" : "dark"}`}>

                <Cat state={catState}/>

                <Lamp lampOn={lampOn}
                      toggle={() => clickLamp()}/>

            </div>

            <div className="ui">
                <ProgressBar value={3} max={5} iconFull={heartFull} iconEmpty={heartEmpty}/>
                <ProgressBar value={3} max={5} iconFull={energyFull} iconEmpty={energyEmpty}/>
            </div>

        </div>
    )
}

export default App
