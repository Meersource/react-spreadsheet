import { Designer } from "@grapecity/activereports-react";
import React from 'react';

function Test() {
    // return (
    //     <div>
    //         <Designer />
    //     </div>
    // );
    const designerRef = React.createRef();
    const btnClick = function () {
        designerRef.current.setReport({ id: "report.rdlx-json" });
    };

    return (
        <div id="designer-host">
            <button type="button" onClick={btnClick}>
                Open Report
            </button>
            <Designer ref={designerRef} />
        </div>
    );
}

export default Test;