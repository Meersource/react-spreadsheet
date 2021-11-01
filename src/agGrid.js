import React from "react";
import { useState, useEffect, useRef } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import 'ag-grid-enterprise';
import "./App.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgGrid = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const rowHeight = 50;
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  //  const rowData = [
  //      {make: "Toyota", model: "Celica", price: 35000},
  //      {make: "Ford", model: "Mondeo", price: 32000},
  //      {make: "Porsche", model: "Boxter", price: 72000}
  //  ];

 

  const onButtonClick = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    // console.log("selection", selectedNodes[0].data)
    const selectedData = selectedNodes.map((node) => node.data);
    console.log("selection", selectedData);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };
  // const rowSelect = () => {
  //   const selectedNodes = gridRef.current.api.getSelectedNodes();
  //     // console.log("selection", selectedNodes[0].data)
  //     const selectedData = selectedNodes.map((node) => node.data);
  //     console.log("selected row is: ", selectedData);
  // }
  const onCellClicked = (e) => {
    console.log("cellClicked: ", e.data);
  };

  const rowClick = (row) => {
    console.log("rowSelected: ", row.data);
  };
  // const RowEditingStarted =(e)=>{
  // console.log("rs e",e);
  // }

  const rowStyle = { boxShadow: '9px 10px 9px -12px rgba(0,0,0,0.75)' };

  const dynamicCellStyle = params => {
    if (params.value === 'Celica') {
    return { backgroundColor: '#AED9B2'}
        //mark police cells as red
        // return {color: 'red', backgroundColor: 'green'};
    }

};
const staticCellStyle = {background: 'grey',color: 'white'};


  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: 620 }}>
      {/* onRowEditingStarted={RowEditingStarted} */}
      <button onClick={(e) => onButtonClick(e)}>Get selected rows</button>

      <AgGridReact
       
      rowStyle={rowStyle}
      suppressDragLeaveHidesColumns={true}
        enableRangeSelection={true}
        enableFillHandle={true}
        onRowClicked={(r) => rowClick(r)}
        ref={gridRef}
        rowSelection="multiple"
        onCellClicked={(e) => onCellClicked(e)}
        rowData={rowData}
        rowHeight={rowHeight}
        // suppressRowHoverHighlight={true}
       

            rowDragManaged={true}
            rowDragEntireRow={true}
            rowDragMultiRow={true}
            animateRows={true}
      >
        {/* <AgGridColumn field="make" sortable={true}></AgGridColumn> */}
        <AgGridColumn
        cellStyle={staticCellStyle}
        fullWidth ={true}
          editable={true}
          field="make"
          sortable={true}
          filter={true}
          checkboxSelection={true}
        ></AgGridColumn>
        <AgGridColumn
        cellStyle={dynamicCellStyle}

          editable={true}
          field="model"
          filter={true}
          resizable={true}
        ></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
        {/* pagination = true */}
      </AgGridReact>
    </div>
  );
};

export default AgGrid;
