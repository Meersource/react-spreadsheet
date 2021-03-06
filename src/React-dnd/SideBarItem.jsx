import React from "react";
import { useDrag } from "react-dnd";

import { SIDEBAR_ITEM } from "./constants";

const SideBarItem = ({ data }) => {
    console.log(data, 'hello')
    const [{ opacity }, drag] = useDrag({
        type: SIDEBAR_ITEM,
        item: data,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    });

    return (
        <div className="sideBarItem" ref={drag} style={{ opacity }}>
            {data.component.content}
        </div>
    );
};
export default SideBarItem;
