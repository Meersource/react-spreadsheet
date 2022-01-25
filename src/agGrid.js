import React from "react";
import { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import 'ag-grid-enterprise';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const disableClickSelectionRenderers = ['actionsRenderer'];

const AgGrid = (props) => {
  const [rowData, setRowData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);




  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    const actionsRenderer = (params) => {
      const { id } = params.data;
      return <>
        <button onClick={() => props.editHandler(id)}>Edit</button>
        <button onClick={() => props.deleteHandler(id)}>Delete</button>
      </>;
    };
    const actions = { field: 'Actions', cellRenderer: 'actionsRenderer', cellRendererFramework: actionsRenderer };
    setRowData(props.data);
    setTableColumns([...props.columns, actions]);
  }, [props]);

  const getSelectedRowData = () => {
    if (gridApi !== null) {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      console.log(selectedData, 'selectedRows');
      return selectedData;
    }
  };

  const getUnselectedRowData = () => {
    if (gridApi !== null) {
      let items = [];
      gridApi && gridApi.forEachNode(function (node) {
        if (node.selected === false) {
          items.push(node.data);
        }
      });
      console.log(items, 'unselectedRows');
      return items;
    }
  }
  // const gridRef = useRef(null);
  // useEffect(() => {
  //   fetch("https://www.ag-grid.com/example-assets/row-data.json")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData));
  // }, []);

  // const onButtonClick = (e) => {
  //   const selectedNodes = gridRef.current.api.getSelectedNodes();
  //   // console.log("selection", selectedNodes[0].data)
  //   const selectedData = selectedNodes.map((node) => node.data);
  //   console.log("selection", selectedData);
  //   const selectedDataStringPresentation = selectedData
  //     .map((node) => `${node.make} ${node.model}`)
  //     .join(", ");
  //   alert(`Selected nodes: ${selectedDataStringPresentation}`);
  // };
  // const rowSelect = () => {
  // const selectedNodes = gridRef.current.api.getSelectedNodes();
  // console.log("selection", selectedNodes[0].data)
  // const selectedData = selectedNodes.map((node) => node.data);
  // console.log("selected row is: ",);
  // }
  function MyRenderer(params) {
    const backgroundColor = params.value === true ? 'green' : 'grey';
    return (
      <div>
        <span
          style={{
            height: ' 15px',
            width: '15px',
            backgroundColor: backgroundColor,
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
      </div>
    );
  }
  const onCellClicked = (e) => {
    console.log("cellClicked: ", e);
  };

  const rowClick = (row) => {
    console.log("rowSelected: ", row);
  };

  const rowDoubleClicked = (row) => {
    console.log(row, 'rowDoubleClicked');
  }
  // const RowEditingStarted =(e)=>{
  // console.log("rs e",e);
  // }


  // const dynamicCellStyle = params => {
  //   if (params.value === 'Celica') {
  //     return { backgroundColor: '#AED9B2' }
  //   }
  // };
  // const staticCellStyle = { background: 'grey', color: 'white' };

  const button = () => { return <button>Click</button> }
  // const onRowDragEnter = (e) => {
  //   console.log('onRowDragEnter', e);
  // };

  const onRowDragEnd = (e) => {
    let items = [];
    e.api.forEachNode(function (node) {
      items.push(node.data);
    });
    console.log('onRowDragEnd', items);
    getTableState()
    // setRowData(items)
  };

  const addRow = () => {
    const newRow = { id: 6, index: 6, position: false, make: "Porsche", model: "Boxter", price: 72000 };
    setRowData([...rowData, newRow]);
  };

  // const onRowDragMove = (e) => {
  //   console.log('onRowDragMove', e);
  // };

  // const onRowDragLeave = (e) => {
  //   console.log('onRowDragLeave', e);
  // };
  const latestData = () => {
    let items = [];
    gridApi && gridApi.forEachNode(function (node) {
      items.push(node.data);
    });
    console.log(items, 'latestData')
    return items;
  }

  const changeRow = () => {
    const dataCopy = [...rowData]
    dataCopy[0].position = false;
    setRowData([...dataCopy]);
  }

  const deselectRows = () => {
    gridApi.forEachNode(function (node) {
      console.log(node)
      node.setSelected(false);
    });
  }

  const onCellFocused = (e) => {
    if (e.column && e.column.colId === "Actions") {
      gridApi.gridOptionsWrapper.gridOptions.suppressRowClickSelection = true;
    } else {
      gridApi.gridOptionsWrapper.gridOptions.suppressRowClickSelection = false;
    }
  }

  // const getRowStyle = params => {
  //   if (params.node.rowIndex % 2 === 0) {
  //     return { background: '#f7f7f7' };
  //   }
  // };

  async function getTableState() {
    const tableData = await latestData();
    const selectedRows = await getSelectedRowData();
    const unSelectedRows = await getUnselectedRowData();
    props.getTableState(tableData, selectedRows, unSelectedRows);
  };

  console.log(gridApi, 'arr123');
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 1800 }}>
      {/* onRowEditingStarted={RowEditingStarted} */}
      <button onClick={latestData}>Get Latest rows</button>
      <button onClick={addRow}>Add row</button>
      <button onClick={deselectRows}>Deselect All Rows</button>
      <button onClick={getSelectedRowData}>Get Selected Rows</button>
      <button onClick={getUnselectedRowData}>Get Unselected Rows</button>
      <AgGridReact
        rowStyle={props.rowStyle}
        // suppressDragLeaveHidesColumns={true}
        enableRangeSelection={true}
        // enableFillHandle={true}
        onGridReady={onGridReady}
        onRowClicked={(r) => rowClick(r)}
        onRowDoubleClicked={(row) => rowDoubleClicked(row)}
        // ref={gridRef}
        onCellValueChanged={(e) => console.log(e)}
        // suppressRowClickSelection={true}
        // rowSelection="multiple"
        // rowMultiSelectWithClick={true}

        onCellClicked={(e) => onCellClicked(e)}
        rowData={rowData}
        rowHeight={50}
        // suppressRowHoverHighlight={true}
        // checkboxSelection={true}

        rowDragEntireRow={false}
        rowDragManaged={true}
        rowDragMultiRow={true}
        animateRows={true}
        onRowDragEnd={onRowDragEnd}
        // owDragEnter={onRowDragEnter}
        // getRowStyle={getRowStyle}
        // pagination={true}
        // paginationPageSize={10}
        // onRowDragMove={onRowDragMove}
        // onRowDragLeave={onRowDragLeave}
        onCellFocused={e => onCellFocused(e)}
      >
        {tableColumns.map((i) =>
          <AgGridColumn
            rowDrag={i.rowDrag}
            field={i.field}
            resizable={i.resizable}
            sortable={i.sortable}
            editable={i.editable}
            filter={i.filter}
            pinned={i.pinned}
            cellRendererFramework={i.cellRendererFramework}
            cellStyle={i.cellStyle}
            headerName={i.headerName}
            valueGetter={i.valueGetter}
            valueSetter={i.valueSetter}
            checkboxSelection={i.checkboxSelection}
            headerCheckboxSelection={i.headerCheckboxSelection}
            // width={i.width}
            wrapText={i.wrapText}
          ></AgGridColumn>)}
      </AgGridReact>
    </div>
  );
};

export default AgGrid;
