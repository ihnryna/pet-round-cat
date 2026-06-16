import './App.css'
import {Cat} from "./components/Cat.jsx";
import {Toast} from "./components/Toast.jsx";
import {Lamp} from "./components/Lamp.jsx";
import {useEffect, useRef, useState} from "react";
import {ProgressBar} from "./components/ProgressBar.jsx";
import { isPointInsideRect, getFoodCenter} from "./utils/geometry.js";

import heartFull from "./assets/progress-bars/health-full.png";
import heartEmpty from "./assets/progress-bars/health-empty.png";
import energyFull from "./assets/progress-bars/energy-full.png";
import energyEmpty from "./assets/progress-bars/energy-empty.png";


function App() {
    const [lampOn, setLampOn] = useState(true);
    const [catState, setCatState] = useState("normal");
    const [draggingFood, setDraggingFood] = useState(false);
    const [foodState, setFoodState] = useState("idle"); // idle | dragging | eating | done
    const [foodFrame, setFoodFrame] = useState(0);
    const [health, setHealth] = useState(0);

    const sceneRef = useRef();
    const foodRef = useRef();
    const catRef = useRef();

    const [foodPosition, setFoodPosition] = useState({
        x: 0,
        y: 0
    });

    function incHealth() {
        setHealth(prevState => {
            if (prevState===5) return prevState;
            return prevState+1;
        })
    }

    useEffect(() => {

        const handleMouseMove = (e) => {
            if (!draggingFood) return;

            const sceneRect = sceneRef.current.getBoundingClientRect();
            const foodRect = foodRef.current.getBoundingClientRect();
            const catRect = catRef.current.getBoundingClientRect();

            setFoodPosition({
                x: e.clientX - sceneRect.left - (foodRect.width / 2),
                y: e.clientY - sceneRect.top - (foodRect.height / 2)
            });

            const hit = isPointInsideRect({ x: e.clientX, y: e.clientY }, catRect);

            if (hit) {
                setCatState("open-mouth");
                console.log("open-mouth");
            } else {
                setCatState("base");
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => { window.removeEventListener("mousemove", handleMouseMove);};

    }, [draggingFood]);


    useEffect(() => {
        function handleMouseUp() {
            if (!draggingFood) return;

            setDraggingFood(false);

            const sceneRect = sceneRef.current.getBoundingClientRect();
            const catRect = catRef.current.getBoundingClientRect();
            const foodRect = foodRef.current.getBoundingClientRect();

            const foodCenter = getFoodCenter(foodPosition, sceneRect, foodRect);
            const hit = isPointInsideRect(foodCenter, catRect);

            if (hit) {
                console.log("CAT EATS");
                setFoodState("eating");
                setDraggingFood(true);
                incHealth();
            }
        }

        window.addEventListener("mouseup", handleMouseUp);
        return () => {window.removeEventListener("mouseup", handleMouseUp);};

    }, [draggingFood, foodPosition]);


    useEffect(() => {
        if (foodState !== "eating") return;
        let frame = 0;

        const interval = setInterval(() => {
            frame++;
            if (frame >= 5) {
                clearInterval(interval);
                setFoodState("idle");
                setCatState("normal");
                setDraggingFood(false);
                setFoodFrame(0);
                return;
            }
            setFoodFrame(frame);
        }, 120);

        return () => clearInterval(interval);
    }, [foodState]);


    function clickLamp() {
        setCatState(lampOn ? "sleeping" : "normal");
        setLampOn(prev => !prev);
    }

    function clickFood(e) {
        if (!lampOn) return;

        const sceneRect = sceneRef.current.getBoundingClientRect();
        const foodRect = foodRef.current.getBoundingClientRect();

        setFoodPosition({
            x: e.clientX - sceneRect.left - (foodRect.width / 2),
            y: e.clientY - sceneRect.top - (foodRect.height / 2)
        });

        setDraggingFood(true);
    }



    return (
        <div className="game">
            <div className={`scene ${lampOn ? "light" : "dark"}`} ref={sceneRef}>

                <Cat state={catState} ref={catRef}/>

                <Lamp lampOn={lampOn}
                      toggle={() => clickLamp()}/>

                <Toast currentFrame={foodFrame}
                       onMouseDown={clickFood}
                       position={foodPosition}
                       ref={foodRef}
                       dragging={draggingFood}/>

            </div>

            <div className="ui">
                <ProgressBar value={health} max={5} iconFull={heartFull} iconEmpty={heartEmpty}/>
                <ProgressBar value={3} max={5} iconFull={energyFull} iconEmpty={energyEmpty}/>
            </div>

        </div>
    )
}

export default App
