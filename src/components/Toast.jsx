import toast from "../assets/food/toast-strawberry-0.png";
import toast1 from "../assets/food/toast-strawberry-1.png";
import toast2 from "../assets/food/toast-strawberry-2.png";
import toast3 from "../assets/food/toast-strawberry-3.png";
import toast4 from "../assets/food/toast-strawberry-4.png";
import {forwardRef} from "react";

export const Toast = forwardRef(({currentFrame, position, onMouseDown, dragging}, ref) => {

    const foodFrames = [toast, toast1, toast2, toast3, toast4];

    return <img src={foodFrames[currentFrame]}
                className="toast pixel"
                alt="toast"
                onMouseDown={onMouseDown}
                style={dragging ? {
                    left: position.x,
                    top: position.y,
                    cursor: "grab"
                } : {}}
                ref={ref}/>;
});