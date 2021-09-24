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
  const [selectedCellPoint, setSelectedCellPoint] = useState({}); // State for Selected Cell Points
  const [MSCP, setMSCP] = useState([]);

  const [singleCopy, setSingleCopy] = useState();
  const [sLineCopy, setSLineCopy] = useState([]);
  // const [mulState, setMulState] = useState();

  const onSelectCall = (fData) => {
    console.log(fData)
    if (fData) {
      let newArr = [];
      for (let i = 0; i < fData.length; i++) {
        const Coordi = {
          row: fData[i].row,
          column: fData[i].column,
        };
        newArr.push(Coordi);
        setMSCP(newArr);
      }
    } else {
      const points = {
        // Destructuring data into positon for position points
        row: fData.row,
        column: fData.column,
      };
      setSelectedCellPoint(points); //Called to set Selected Cell Points of the cell
    }
  };


  const copyDataHandler = () => {
    // Called When the Copy button is clicked
    const ourData = data;
    const row = selectedCellPoint.row;
    const column = selectedCellPoint.column;
    const copiedValue = ourData[row][column].value;

    setSingleCopy(copiedValue); // set state of copied value to singleCopy

  };

  const copyMulDataHandler = () => {
    const selecteValues = MSCP.map((i) => data[i.row][i.column].value);
    setSLineCopy(selecteValues);
  };
  const pasteMulDataHandler = () => {
    let sData = [...data]
    MSCP.forEach(function (number, index) {
      sData[number.row][number.column].value = sLineCopy[index]
    });
    setData(sData)
  }

  const pasteDataHandler = () => {

    data[selectedCellPoint.row][selectedCellPoint.column].value = singleCopy

    onSelectCall(selectedCellPoint); // Called When onSelect of spreadsheet triggers
    setData(data);
  };

  const cutDataHandler = () => {
    copyDataHandler();
    data[selectedCellPoint.row][selectedCellPoint.column].value = "";
    onSelectCall(selectedCellPoint);
    setData(data);
  };

  console.log()

  return (
    <div className="App">
      <h1>React-SpreadSheet</h1>

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
        <button onClick={copyMulDataHandler}>Mul Copy</button>
        <button onClick={pasteMulDataHandler}>Mul paste</button>
      </div>
      <Spreadsheet
        data={data}
        onChange={(data) => setData(data)}
        onSelect={(data) => {
          if (data.length === 1) {
            onSelectCall(data[0]);
          } else {
            onSelectCall(data);
          }
        }}
        columnLabels={["Gas0", "Power1", "Emissions2"]}
        rowLabels={["Q0", "Q1", "Q2", "Q3"]}
      />
    </div>
  );
}
