import lampOnImg from "../assets/items/lamp-on.png";
import lampOffImg from "../assets/items/lamp-off.png";

export function Lamp({lampOn, toggle}) {
    return (
        <>
            <img src={lampOn ? lampOnImg : lampOffImg}
                 className="lamp pixel"
                 alt="lamp"/>

            <div className="lamp-hitbox" onClick={toggle}/>
            <div className="lamp-hitbox-2" onClick={toggle}/>
        </>
    );
}