import baseCat from "../assets/cat/base.png";
import hungryCat from "../assets/cat/hungry.png";
import tiredCat from "../assets/cat/tired.png";
import sleepingCat from "../assets/cat/sleeping.png";


export function Cat({state}) {

    function getCatImage() {
        if (state === "sleeping") return sleepingCat;
        if (state === "hungry") return hungryCat;
        if (state === "tired") return tiredCat;
        return baseCat;
    }

    return (
        <>
            <img src={getCatImage()} className="cat pixel" alt="cat"/>
        </>
    );
}