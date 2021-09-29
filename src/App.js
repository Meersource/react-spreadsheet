import React, { useState } from "react";
import "./App.css";
import Spreadsheet from "react-spreadsheet";


const clickHandler = () => {
  console.log("hello", 0);
}

let button =(  <button onClick={clickHandler}> Click Me  </button> )

export default function App() {
  const RangeView = ({ cell }) => (
    <button
      type="button"
      value={cell.value}
      // disabled
      onClick={clickHandler}
    >click</button>
  );
  
  const RangeEdit = ({ cell, onChange }) => (
  console.log("hello")
  );
  const [data, setData] = useState([
    [{ value: 45 }, { value: 13 }, { value: 23, clickable : false }],
    [{ value: 34 }, { value: 53 }, { value: 55 }],
    [{ value: 45 }, { value: 90 }, { value: 43 }],
    [{ value: 78 }, { value: 21 }, { DataViewer: RangeView}],
  ]); // State for Data of the Spreadsheet
  const [MSCP, setMSCP] = useState([]);

  const [sLineCopy, setSLineCopy] = useState([]);

  const [biggestCopiedRow, setBiggestCopiedRow] = useState([]); // My Biggest Copied Row Index
  const [smallestCopiedRow, setSmallestCopiedRow] = useState([]); // My Biggest Copied Row Index
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
  };

 
  const copyMulDataHandler = () => {
    const selecteValues = MSCP.map((i) => data[i.row][i.column].value);

    let newArr = []

    MSCP.forEach(function (number, index){
      newArr.push({
        index: {
          row: number.row,
          column: number.column
        },
        value: data[number.row][number.column].value
      })  
    })


    if(MSCP.length > 1){
      let count = 0;
      let smallestRow = MSCP[0].row;
      let biggestRow = MSCP[0].row;

      for(let i = 0; i<MSCP.length; i++){
        count = count + 1;
        if(MSCP[i].row < smallestRow){
          smallestRow = MSCP[i].row;
        }
        if(MSCP[i].row > biggestRow){
          biggestRow = MSCP[i].row;
        }
      }
      setBiggestCopiedRow(biggestRow);
      setSmallestCopiedRow(smallestRow);

      console.log("Smallest Selected Row: ", smallestRow,"Biggest Selected Row: ", biggestRow);
      console.log("Smallest Copied Row: ", smallestCopiedRow,"Biggest Copied Row: ", biggestCopiedRow);
    }
    console.log("New Array: ", newArr);

    setSLineCopy(selecteValues);
  };
  const pasteMulDataHandler = () => {
    if(sLineCopy.length >= 1) {

      let sData = [...data];
      MSCP.forEach(function (number, index) {
        sData[number.row][number.column].value = sLineCopy[index];
      });

     if(MSCP.length > 1){
      let count = 0;
      let smallestRow = MSCP[0].row;
      let biggestRow = MSCP[0].row;

      for(let i = 0; i<MSCP.length; i++){
        count = count + 1;
        if(MSCP[i].row < smallestRow){
          smallestRow = MSCP[i].row;
        }
        if(MSCP[i].row > biggestRow){
          biggestRow = MSCP[i].row;
        }
      }

      console.log("Smallest Selected Row: ", smallestRow,"Biggest Selected Row: ", biggestRow);
      console.log("Smallest Copied Row: ", smallestCopiedRow,"Biggest Copied Row: ", biggestCopiedRow);

      if(biggestRow >= biggestCopiedRow ){
        let differenceCopiedRow = biggestCopiedRow - smallestCopiedRow;
        let differenceSelectedRow = biggestRow - smallestRow;
        console.log("differenceSelectedRow:", differenceSelectedRow);
        for(let i=0; i<differenceCopiedRow - differenceSelectedRow; i++){
          sData.push([{ value: "" }, { value: "" }, { value: "" }]);
        } 
      }
    }
      setData(sData);
    }
  };

  const cutDataHandler = () => {
    copyMulDataHandler();
    let sData = [...data];
    MSCP.forEach(function (number, index) {
      sData[number.row][number.column].value = "";
    });
    setData(sData);
  };

  const addRowHandler = () => {
    let nData = [...data];
    let selectedCellPoint = data.length;
    if(MSCP.length > 0){
      selectedCellPoint = MSCP[0].row+1
    }
    nData.splice(selectedCellPoint, 0 , [{ value: "" }, { value: "" }, { value: "" }])
    setData(nData);
  };

  const addColHandler = () => {
    let nData = [...data];
    for (var i = 0; i < nData.length; i++) {
      nData[i].push({ value: "" });
    }
    setData(nData);
  };

  const readOnlyHandler = () => {
       
      let nData = [...data]

      MSCP.forEach(function (number, index) {
        nData[number.row].splice([number.column], 1, {value: nData[number.row][number.column].value, readOnly : true} );
      });

      setData(nData)


    console.log("Selected Values", data);
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
          Read Only
        </button>
        {button}
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
