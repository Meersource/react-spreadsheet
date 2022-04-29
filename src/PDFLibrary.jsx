import { useState, useRef } from 'react';
import html2canvas from "html2canvas";
import { PDFViewer, Document, View, Page, Text, StyleSheet, PDFDownloadLink, BlobProvider, Image } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import ReactDOMServer from 'react-dom/server';

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

    const html = `<html>
  <body>
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }
    </style>
    <h1>Heading 1</h1>
    <h2 style="background-color: pink">Heading 2</h2>
    <h3>Heading 3</h3>
    <h4 class="my-heading4">Heading 4</h4>
    <p>
      Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
      <s>strikethrough</s>,
      <strong><u><s><i>and all of the above</i></s></u></strong>
    </p>
    <p>
      Paragraph with image and
      <a href="http://google.com">link</a>
    </p>
    <hr />
    <ul>
      <li>Unordered item</li>
      <li>Unordered item</li>
    </ul>
    <ol>
      <li>Ordered item</li>
      <li>Ordered item</li>
    </ol>
    <br /><br /><br /><br /><br />
    Text outside of any tags
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Foo</td>
          <td>Bar</td>
          <td>Foobar</td>
        </tr>
        <tr>
          <td colspan="2">Foo</td>
          <td>Bar</td>
        </tr>
        <tr>
          <td>Some longer thing</td>
          <td>Even more content than before!</td>
          <td>Even more content than before!</td>
        </tr>
      </tbody>
    </table>
    <div style="width: 200px; height: 200px; background: pink"></div>
    <pre>
function myCode() {
  const foo = 'bar';
}
</pre>
  </body>
</html>
`;

    const element = (
        <html>
            <body>
                <style>
                    {`
          .heading4 {
            background: darkgreen;
            color: white;
          }
          pre {
            background-color: #eee;
            padding: 10px;
          }`}
                </style>
                <h1>Heading 1</h1>
                <h2 style={{ backgroundColor: 'pink' }}>Heading 2</h2>
                ...
            </body>
        </html>
    );

    const html2 = ReactDOMServer.renderToStaticMarkup(element);

    const MyDoc = () => (
        <Document>
            <Page style={styles.page}>
                <Html>{html}</Html>
                <Html>{html2}</Html>
                {/* <View>
                    <Text>Section #1</Text>
                    <Image src={() => printDocument('div1')} />
                </View> */}
            </Page>
            {/* <Page style={styles.page}>
                <View>
                    <Text>Section #2</Text>
                    <Image src={() => printDocument('div2')} />
                </View>
            </Page> */}
        </Document>)

    return (
        <div>
            {/* <div id="div1">
                <Study />
                <Plotly />
            </div>
            <div id="div2">
                <ReactTable />
                <Recharts />
            </div> */}
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