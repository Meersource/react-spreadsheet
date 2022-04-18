import { useState, useRef } from 'react';
import html2canvas from "html2canvas";
import { PDFViewer, Document, View, Page, Text, StyleSheet, PDFDownloadLink, BlobProvider, Image } from '@react-pdf/renderer';
import Plotly from './Plotly'
import Study from './StudyTable'
import ReactTable from './react-table'
import Recharts from './Recharts'


function PDFLibrary() {
    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);
    // const inputRef = useRef(null);

    // function onDocumentLoadSuccess({ numPages }) {
    //     setNumPages(numPages);
    // }

    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    const printDocument = (key) => {
        return html2canvas(document.getElementById(key)).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            return imgData;
        });
    };

    const MyDoc = () => (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Text>Section #1</Text>
                    <Image src={() => printDocument('div1')} />
                </View>
            </Page>
            <Page style={styles.page}>
                <View>
                    <Text>Section #2</Text>
                    <Image src={() => printDocument('div2')} />
                </View>
            </Page>
        </Document>)

    return (
        <div>
            <div id="div1">
                <Study />
                <Plotly />
            </div>
            <div id="div2">
                <ReactTable />
                <Recharts />
            </div>
            <br />
            <br />
            <div>
                <PDFDownloadLink document={<MyDoc />} fileName="download.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <button>Download now!</button>)}
                </PDFDownloadLink>
                <br />
                <br />
                <PDFViewer width='100%' height='1000px'>
                    <MyDoc />
                </PDFViewer>
            </div>
            {/* <BlobProvider document={<MyDoc />}>
                {({ blob, url, loading, error }) => {
                    // Do whatever you need with blob here
                    return <div>{loading ? 'Loading document...' : <button>Download now!</button>}
                        There's something going on on the fly</div>;
                }}
            </BlobProvider> */}
        </div>
    );
}

export default PDFLibrary;

// import { useRef } from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// const App = () => {
//     const inputRef = useRef(null);
//     const printDocument = () => {
//         html2canvas(inputRef.current).then((canvas) => {
//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF();
//             pdf.addImage(imgData, "JPEG", 0, 0);
//             pdf.save("download.pdf");
//         });
//     };

//     return (
//         <>
//             <div className="App">
//                 <div className="mb5">
//                     <button onClick={printDocument}>Print</button>
//                 </div>
//                 {/* <div id="divToPrint" ref={inputRef}>
//                     <div>Note: Here the dimensions of div are same as A4</div>
//                     <div>You Can add any component here</div>
//                 </div> */}
//                 <div id="divToPrint" ref={inputRef}>
//                     <Plotly />
//                 </div>
//             </div>
//         </>
//     );
// };
// export default App;