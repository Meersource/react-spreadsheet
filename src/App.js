import React, { useState } from "react";

import Spreadsheet from "react-spreadsheet";

export default function App() {
  const [data, setData] = useState([
    [{ value: 45 }, { value: 13 }, { value: 23 }],
    [{ value: 34 }, { value: 53 }, { value: 55 }],
    [{ value: 45 }, { value: 90 }, { value: 0.33 }],
    [{ value: 78 }, { value: 0.13 }, { value: 54 }],
  ]); // State for Data of the Spreadsheet
  const [selectedCellPoint, setSelectedCellPoint] = useState({
    row: 0,
    column: 0,
  }); // State for Selected Cell Points
  const [MSCP, setMSCP] = useState([]);
  const [MSCPCopyData, setMSCPCopyData] = useState([]);

  const [singleCopy, setSingleCopy] = useState(); // State for copied Value

  const ourMSCPHandler = (fData) => {
    setMSCP(fData);
  };
  const onSelectCall = (fData) => {
    // Called When onSelect of spreadsheet triggers
    // const fData= data
    if (fData.length > 1) {
      console.log("Multiple Selection", fData.length);
      for (let i = 0; i < fData.length; i++) {
        const row = fData[i].row;
        const column = fData[i].column;
        ourMSCPHandler(fData);
        console.log("selected 0:", data[row][column].value);
      }
    } else {
      const points = {
        // Destructuring data into positon for position points
        row: fData.row,
        column: fData.column,
      };
      setSelectedCellPoint(points); //Called to set Selected Cell Points of the cell
      console.log("Selected Points", points);
    }
  };

  const onChangeCall = (data) => {
    // Called When onChange of spreadsheet triggers
    setData(data);
    console.log(
      "changeData",
      data[selectedCellPoint.row][selectedCellPoint.column].value
    );
  };

  const onCommitCall = (data) => {}; // Called When onCellCommit of spreadsheet triggers

  const onActivateCall = (data) => {
    // Called When onActivate of spreadsheet triggers
    console.log("On Activate Call", data);
  };

  const copyDataHandler = () => {
    // Called When the Copy button is clicked
    const ourData = data;
    const row = selectedCellPoint.row;
    const column = selectedCellPoint.column;
    const copiedValue = ourData[row][column].value;

    setSingleCopy(copiedValue); // set state of copied value to singleCopy

    console.log("copy", ourData[row][column].value);
  };

  const MultiCopyDataHandler = () => {
    // Called When the Copy button is clicked
    MSCP.forEach((e)=>{
      const row= e.row
      const column= e.column
      const newData = []
      newData.push(data[row][column].value)
      setMSCPCopyData(newData);
    })    
    // const row = MSCP.row;
    // const column = MSCP.column;
    // const copiedValue = ourData[row][column].value;

    // setSingleCopy(copiedValue); // set state of copied value to singleCopy

    // console.log("copy", ourData[row][column].value);
  };

  const pasteDataHandler = () => {
    // Called when the Paste button is clicked
    setData(
      (data[selectedCellPoint.row][selectedCellPoint.column].value = singleCopy)
    ); // Setting copied cell value onto the selected cell

    onSelectCall(selectedCellPoint); // Called When onSelect of spreadsheet triggers
    onChangeCall(data); // Called When onChange of spreadsheet triggers

    console.log(
      "New Data",
      data[selectedCellPoint.row][selectedCellPoint.column].value
    );
  };

  const cutDataHandler = () => {
    copyDataHandler();
    data[selectedCellPoint.row][selectedCellPoint.column].value = "";
    onSelectCall(selectedCellPoint);
    onChangeCall(data);
  };
  

  const consoleHanler = () => {
    console.log("MSCP: ", MSCP);
    console.log("MSCP Copy Data; ", MSCPCopyData);
  };
  return (
    <div className="App">
      <h1>React-SpreadSheet</h1>
      <Spreadsheet
        data={data}
        onCellCommit={(data) => onCommitCall(data)}
        onActivate={(data) => onActivateCall(data)}
        onChange={(data) => onChangeCall(data)}
        onSelect={(data) => {
          if (data.length === 1) {
            onSelectCall(data[0]);
          } else {
            onSelectCall(data);
          }
        }} // due to the static position of the object needed
        columnLabels={["Gas", "Power", "Emissions"]}
        rowLabels={["Q1", "Q2", "Q3", "Q4"]}
      />
      <button onClick={copyDataHandler}>Copy</button>
      <button onClick={pasteDataHandler}>Paste</button>
      <button onClick={cutDataHandler}>Cut</button>
      <button onClick={consoleHanler}>Console</button>
      <button onClick={MultiCopyDataHandler}>Multi</button>
    </div>
  );
}
