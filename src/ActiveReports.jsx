// import { Viewer as ReportViewer } from "@grapecity/activereports-react";
// import React from 'react';

// function Test() {
//     // return (
//     //     <div>
//     //         <ReportViewer />
//     //     </div>
//     // );
//     const designerRef = React.createRef();
//     const btnClick = function () {
//         designerRef.current.setReport({ id: "report.rdlx-json" });
//     };

//     return (
//         <div id="designer-host">
//             <button type="button" onClick={btnClick}>
//                 Open Report
//             </button>
//             <ReportViewer ref={designerRef} />
//         </div>
//     );
// }

// export default Test;

import "@grapecity/activereports/styles/ar-js-ui.css";
import "@grapecity/activereports/styles/ar-js-viewer.css";
import { Viewer, Designer } from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";
import { FontStore } from "@grapecity/activereports/core";

function App() {
    return (
        // <div id="viewer-host">
        // <Viewer report={{ Uri: '/activereportsjs/demos/resource/reports/Frontstore.rdlx-json' }} /> 
        // </div>
        <div id="designer-host">
            <Designer
                report={{ id: "blank.rdlx-json", displayName: "my report" }}
            ></Designer>
        </div>
    );
}

// FontStore.registerFonts("/activereportsjs/demos/resource/fontsConfig.json");

export default App;
