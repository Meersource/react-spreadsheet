import React, { useState } from "react";
import "./App.css";
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

  const [singleCopy, setSingleCopy] = useState();
  const [sLineCopy, setSLineCopy] = useState([]);
  // const [mulState, setMulState] = useState();

  const onSelectCall = (fData) => {
    if (fData.length > 1) {
      let newArr = [];
      console.log("Multiple Selection", fData.length);
      for (let i = 0; i < fData.length; i++) {
        const Coordi = {
          row: fData[i].row,
          column: fData[i].column,
        };
        const nb = data[Coordi.row][Coordi.column];
        console.log("valueBySelect", nb);
        newArr.push(Coordi);
        // ourMSCPHandler(fData);
        setMSCP(newArr);
        // console.log("arr",newArr);
        // console.log("valuez",data[MSCP.newArr.row][MSCP.newArr.column].value);
        console.log("selected 0:", data[Coordi.row][Coordi.column].value);
        // console.log("selectedState",data[MSCP.row][MSCP.column].value);
      }
      console.log("cd", MSCP);
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

  const copyDataHandler = () => {
    // Called When the Copy button is clicked
    const ourData = data;
    const row = selectedCellPoint.row;
    const column = selectedCellPoint.column;
    const copiedValue = ourData[row][column].value;

    setSingleCopy(copiedValue); // set state of copied value to singleCopy

    console.log("copy", ourData[row][column].value);
  };

  const copyMulDataHandler = () => {
    const selecteValues = MSCP.map((i) => data[i.row][i.column].value);
    console.log("sl", selecteValues);

    setSLineCopy(selecteValues);
    console.log("1q", sLineCopy);
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
      <h1>React-SpreadSheet{sLineCopy}</h1>
    {console.log("1q", sLineCopy)}

      <div className="section-design">
        <button onClick={copyDataHandler} className="btn-design">
          Copy
        </button>
        <button onClick={pasteDataHandler} className="btn-design">
          Paste
        </button>
        <button onClick={cutDataHandler} className="btn-design">
          Cut
        </button>
        <button onClick={consoleHanler}>Console</button>
        <button onClick={copyMulDataHandler}>Mul Copy</button>
        {/* <button onClick={MultiCopyDataHandler}>Multi</button> */}
      </div>
      <Spreadsheet
        data={data}
        onChange={(data) => onChangeCall(data)}
        onSelect={(data) => {
          if (data.length === 1) {
            onSelectCall(data[0]);
          } else {
            onSelectCall(data);
          }
        }} // due to the static position of the object needed
        columnLabels={["Gas0", "Power1", "Emissions2"]}
        rowLabels={["Q0", "Q1", "Q2", "Q3"]}
      />
    </div>
  );
}
