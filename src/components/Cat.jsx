import baseCat from "../assets/cat/base.png";
import hungryCat from "../assets/cat/hungry.png";
import tiredCat from "../assets/cat/tired.png";
import sleepingCat from "../assets/cat/sleeping.png";
import openMouthCat from "../assets/cat/open-mouth.png";
import { forwardRef } from "react";

export const Cat = forwardRef(({state}, ref) => {

    function getCatImage() {
        if (state === "sleeping") return sleepingCat;
        if (state === "hungry") return hungryCat;
        if (state === "tired") return tiredCat;
        if (state === "open-mouth") return openMouthCat;
        return baseCat;
    }

    return (
        <>
            <img src={getCatImage()} className="cat pixel" alt="cat" ref={ref}/>
        </>
    );
});