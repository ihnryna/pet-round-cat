import './App.css'
import {Cat} from "./components/Cat.jsx";
import {Lamp} from "./components/Lamp.jsx";
import {useState} from "react";

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
        </div>
    )
}

export default App
