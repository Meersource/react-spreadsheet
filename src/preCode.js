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
  // const [selectedCellPoint, setSelectedCellPoint] = useState({}); // State for Selected Cell Points
  const [MSCP, setMSCP] = useState([]);

  // const [singleCopy, setSingleCopy] = useState();
  const [sLineCopy, setSLineCopy] = useState([]);

  const onSelectCall = (fData) => {
    console.log(fData);
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
    }
    // else {
    //   const points = {
    //     // Destructuring data into positon for position points
    //     row: fData.row,
    //     column: fData.column,
    //   };
    //   setSelectedCellPoint(points); //Called to set Selected Cell Points of the cell
    // }
  };

  // const copyDataHandler = () => {
  //   // Called When the Copy button is clicked
  //   const ourData = data;
  //   const row = selectedCellPoint.row;
  //   const column = selectedCellPoint.column;
  //   const copiedValue = ourData[row][column].value;

  //   setSingleCopy(copiedValue); // set state of copied value to singleCopy
  //   console.log("copy", ourData[row][column].value);

  // };

  const copyMulDataHandler = () => {
    const selecteValues = MSCP.map((i) => data[i.row][i.column].value);
    setSLineCopy(selecteValues);
  };
  const pasteMulDataHandler = () => {
    if(sLineCopy.length >= 1) {

      let sData = [...data];
      MSCP.forEach(function (number, index) {
        sData[number.row][number.column].value = sLineCopy[index];
        console.log("Number: ", number);
        console.log("Index: ", index);
        if(MSCP.length < sLineCopy.length ){
          console.log("sData.length", MSCP.length);
          console.log("sLineCopy.length", sLineCopy.length);
          sData.push([{ value: "" }, { value: "" }, { value: "" }]);
          setData(sData);
    
        }
      });
  
      // if(sData.length < sLineCopy.length ){
      //   sData.push([{ value: "" }, { value: "" }, { value: "" }]);
  
      // }
      setData(sData);
    }
  };

  // const pasteDataHandler = () => {

  //   data[selectedCellPoint.row][selectedCellPoint.column].value = singleCopy

  //   onSelectCall(selectedCellPoint); // Called When onSelect of spreadsheet triggers
  //   setData(data);
  // };
  const cutDataHandler = () => {
    copyMulDataHandler();
    let sData = [...data];
    MSCP.forEach(function (number, index) {
      sData[number.row][number.column].value = "";
    });
    setData(sData);
  };

  // const cutDataHandler = () => {
  //   copyDataHandler();
  //   data[selectedCellPoint.row][selectedCellPoint.column].value = "";
  //   onSelectCall(selectedCellPoint);
  //   setData(data);
  // };
  const addRowHandler = () => {
    let nData = [...data];
    nData.push([{ value: "" }, { value: "" }, { value: "" }]);
    // for (var i = 0; i < nData.length; i++) {
    //   nData[i].push({ value: 1 });
    //   // nData.concat(newData);s
    // }
    setData(nData);
  };

  const addColHandler = () => {
    let nData = [...data];
    for (var i = 0; i < nData.length; i++) {
      nData[i].push({ value: "" });
    }
    setData(nData);
  };
  const readOnlyHandler=()=> {
    let sData=[...data]
    MSCP.forEach(function(number,index){
      let oldVal= data[number.row][number.column].value;
      data[MSCP[index].row].splice([MSCP[index].column],0 ,{value: oldVal,readOnly:true})
    })
    setData(sData)

  }


  return (
    <div className="App">
      <h1>React-SpreadSheet</h1>

      <div className="section-design">
        <button onClick={copyMulDataHandler} className="btn-design">
          Copy
        </button>
        <button onClick={pasteMulDataHandler} className="btn-design">
          Paste
        </button>
        <button onClick={cutDataHandler} className="btn-design">
          Cut
        </button>
        <button onClick={addRowHandler} className="btn-design">
          Add Row
        </button>
        <button onClick={addColHandler} className="btn-design">
          Add Column
        </button>
        <button onClick={readOnlyHandler} className="btn-design">
          read Only
        </button>
      </div>
      <Spreadsheet
        data={data}
        onChange={(data) => setData(data)}
        onSelect={(data) => {
          onSelectCall(data);
        }}
        rowLabels={["Q0", "Q1", "Q2", "Q3"]}
      />
    </div>
  );
}
