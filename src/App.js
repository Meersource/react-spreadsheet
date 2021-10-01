import React, { useState } from "react";
import "./App.css";
import Laptop from './image/laptop.jpg'
import Spreadsheet from "react-spreadsheet";
import CheckB from "./CheckB";

const imageAddress = "https://www.zanolliovens.com/wp-content/uploads/2016/04/default-placeholder.png";

export default function App() {
  const [TnC, setTnC] = useState("");

//   const [TC, setTC] = useState("");

//   const Check=({cell})=> {
//     <input type="checkbox" onChange={(e)=>setTC(e.target.checked)} />
//   }
//   const CheckEdit=({cell,onChange})=>{
// console.log("checkbox");
//   }


  const RangeView = ({ cell }) => (
    // <input type="checkbox" onChange={(e)=>{checkboxHandler(e)}}/>
    <img className="img-style" src={imageAddress} alt="img" />
  );
  
  // const RangeEdit = ({ cell, onChange }) => (
  //  checkboxHandler(cell)
  // );

  const [data, setData] = useState([
    [
      { value: <CheckB /> ,readOnly: true},
      { value: 1 },
      { value: "Allen" },
      { value: "This module is distributed" },
      {DataViewer: RangeView,value:0, readOnly: true}
    ],
    [
      { value: <CheckB /> },
      { value: 2 },
      { value: "Jeson" },
      { value: "get the correct behavior of the grid you " },
      {DataViewer: RangeView,value:0, readOnly: true}
    ],
    [
      { value: <CheckB /> },
      { value: 3 },
      { value: "Peter" },
      { value: "This is the most important prop" },
      {DataViewer: RangeView,value:0, readOnly: true}
    ],
    [
      { value: <input type="checkbox" /> },
      { value: 4 },
      { value: "Morgun" },
      { value: "Pass this property if you want to initialize" },
      {DataViewer: RangeView,value:0, readOnly: true}
    ],
  ]);
  const [MSCP, setMSCP] = useState([]);
  const [Copy, setCopy] = useState([]);

  const [biggestCopiedRow, setBiggestCopiedRow] = useState([]); // My Biggest Copied Row Index
  const [smallestCopiedRow, setSmallestCopiedRow] = useState([]); // My Biggest Copied Row Index

  const onSelectCall = (fData) => {
    console.log("selected data", fData);
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
    console.log("MSCP:", MSCP);
  };

  const copyDataHandler = () => {
    const selecteValues = MSCP.map((i) => data[i.row][i.column].value);

    if (MSCP.length > 1) {
      let count = 0;
      let smallestRow = MSCP[0].row;
      let biggestRow = MSCP[0].row;

      for (let i = 0; i < MSCP.length; i++) {
        count = count + 1;
        if (MSCP[i].row < smallestRow) {
          smallestRow = MSCP[i].row;
        }
        if (MSCP[i].row > biggestRow) {
          biggestRow = MSCP[i].row;
        }
      }
      setBiggestCopiedRow(biggestRow);
      setSmallestCopiedRow(smallestRow);

      console.log(
        "Smallest Selected Row: ",
        smallestRow,
        "Biggest Selected Row: ",
        biggestRow
      );
      console.log(
        "Smallest Copied Row: ",
        smallestCopiedRow,
        "Biggest Copied Row: ",
        biggestCopiedRow
      );
    }

    setCopy(selecteValues);
  };
  const pasteDataHandler = () => {
    if (Copy.length >= 1) {
      let sData = [...data];
      MSCP.forEach(function (number, index) {
        console.log("Pnumber : ", number + "index", index);
        sData[number.row][number.column].value = Copy[index];
      });

      if (MSCP.length > 1) {
        let count = 0;
        let smallestRow = MSCP[0].row;
        let biggestRow = MSCP[0].row;

        for (let i = 0; i < MSCP.length; i++) {
          count = count + 1;
          if (MSCP[i].row < smallestRow) {
            smallestRow = MSCP[i].row;
          }
          if (MSCP[i].row > biggestRow) {
            biggestRow = MSCP[i].row;
          }
        }

        console.log(
          "Smallest Selected Row: ",
          smallestRow,
          "Biggest Selected Row: ",
          biggestRow
        );
        console.log(
          "Smallest Copied Row: ",
          smallestCopiedRow,
          "Biggest Copied Row: ",
          biggestCopiedRow
        );

        if (biggestRow >= biggestCopiedRow) {
          let differenceCopiedRow = biggestCopiedRow - smallestCopiedRow;
          let differenceSelectedRow = biggestRow - smallestRow;
          console.log("differenceSelectedRow:", differenceSelectedRow);
          for (
            let i = 0;
            i < differenceCopiedRow - differenceSelectedRow;
            i++
          ) {
            sData.push([{ value: "" }, { value: "" }, { value: "" }]);
          }
        }
      }
      setData(sData);
    }
    setCopy("");
  };
  // MSCP[0]data.map((item) => {
  //   return(
  //     <input
  //     type="checkbox"
  //     value={TnC}
  //     onChange={(e) => setTnC(e.target.checked)}
  //   />

  //   )
  // });

  const cutDataHandler = () => {
    copyDataHandler();
    let sData = [...data];
    MSCP.forEach(function (number, index) {
      // console.log("number :",number, "index: ",index);
      sData[number.row][number.column].value = "";
    });
    setData(sData);
  };

  const addRowHandler = () => {
    let cell = data.length;

    if (MSCP.length > 0) {
      cell = MSCP[0].row + 1;
    }
    let nData = [...data];
    nData.splice(cell, 0, [
      { value: <CheckB /> },
      { value: "" },
      { value: "" },
      { value: "" },
      {DataViewer: RangeView,value:0, readOnly: true}
      
    ]);
    setData(nData);
  };
  // const addRowHandler = () => {
  //   let nData = [...data];
  //   nData.push([{ value: "" }, { value: "" }, { value: "" }]);
  //   // for (var i = 0; i < nData.length; i++) {
  //   //   nData[i].push({ value: 1 });
  //   //   // nData.concat(newData);s
  //   // }
  //   setData(nData);
  // };

  const addColHandler = () => {
    let nData = [...data];
    let position = nData[0].length;
    if (MSCP.length > 0) {
      position = MSCP[0].column + 1;
    }
    for (var i = 0; i < nData.length; i++) {
      nData[i].splice(position, 0, { value: "" });
    }
    setData(nData);
  };
  const deleteRowHandler = () => {
    let nData = [...data];
    // const selecteValues = MSCP.map((i) => MSCP[i].row);
    // const selecteValues = MSCP[0].row;
    MSCP.forEach(function (number, index) {
      nData.splice(number.row, 1);
    });
    setData(nData);
  };
  // const colorRow={
  //   backgroundColor:"red";
  // }
  // const colorRowHandler = () => {
  //   let nData = [...data];
  //   // const selecteValues = MSCP.map((i) => MSCP[i].row);
  //   // const selecteValues = MSCP[0].row;
  //   MSCP.forEach(function (number, index) {
  //     nData.splice(number.row, 0, style={{backgroundColor: "lightblue"}});
  //   });
  //   setData(nData);
  // };
  const deleColHandler = () => {
    let nData = [...data];
    let position = nData[0].length;
    if (MSCP.length > 0) {
      position = MSCP[0].column;
    }
    for (var i = 0; i < nData.length; i++) {
      nData[i].splice(position, 1);
    }
    setData(nData);
  };
  const readOnlyHandler = () => {
    let nData = [...data];

    MSCP.forEach(function (number, index) {
      nData[number.row].splice([number.column], 1, {
        value: nData[number.row][number.column].value,
        readOnly: true,
      });
    });

    setData(nData);

    console.log("Selected Values", data);
  };
  const sortColHandler = () => {
    let nData = [...data];
    for (let i = 0; i < data.length; i++) {
      nData[i].MSCP[0].column.sort();
    }
  };
  // const checkboxHandler = (e)=>{
  //   // setTnC(e.target)
  //   console.log(e);
  // }

  return (
    <div className="App">
      <h1>React-SpreadSheet {TnC}</h1>
      {console.log("TnC", TnC)}

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
        <button onClick={addRowHandler} className="btn-design">
          Add Row
        </button>
        <button onClick={addColHandler} className="btn-design">
          Add Column
        </button>
        <button onClick={deleteRowHandler} className="btn-design">
          Delete Row
        </button>
        <button onClick={deleColHandler} className="btn-design">
          Delete Col
        </button>
        <button onClick={readOnlyHandler} className="btn-design">
          Read Only
        </button>

        <button onClick={sortColHandler} className="btn-design">
          Sort
        </button>
      </div>
      <Spreadsheet
        data={data}
        onChange={(data) => setData(data)}
        onSelect={(data) => {
          onSelectCall(data);
        }}
        columnLabels={["Select", "Id", "Name", "Description"]}
        hideRowIndicators
        // rowLabels={["Q0", "Q1", "Q2", "Q3"]}
      />
      {/* <input
        type="checkbox"
        value={TnC}
        onChange={checkboxHandler}
      /> */}
      <CheckB />
    </div>
  );
}

// {
//   DataEditor: () => {},
//   DataViewer: function noRefCheck() {},
//   value: 0
// }
