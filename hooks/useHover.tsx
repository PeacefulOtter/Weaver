import { CSSProperties, useState } from "react";


const useHover = (styleOnHover: CSSProperties = {}, styleOnNotHover: CSSProperties = {}) =>
{
    const [isHover, setIsHover] = useState<boolean>(false);
    const [style, setStyle] = useState<CSSProperties>(styleOnNotHover);

    const onMouseEnter = () => { setIsHover(true); setStyle(styleOnHover) }
    const onMouseLeave = () => { setIsHover(false); setStyle(styleOnNotHover) }

    return {isHover, style, onMouseEnter, onMouseLeave}
}

export default useHover;