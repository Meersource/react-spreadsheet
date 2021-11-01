import React from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "./App.css";

let data = [
  {
    id: 0,
    title: "Conan the Barbarian",
    year: 1982,
    parameters: [
      { name: "speed", value: 20 },
      { name: "weight", value: 13 },
      { name: "height", value: 54 },
      { name: "length", value: 40 },
    ],
  },
  {
    id: 1,
    title: "Men in Black",
    year: 1999,
    parameters: [
      { name: "speed", value: 240 },
      { name: "weight", value: 123 },
      { name: "height", value: 554 },
      { name: "length", value: 480 },
    ],
  },
  {
    id: 2,
    title: "Men in Black 2",
    year: 2002,
    parameters: [
      { name: "speed", value: 240 },
      { name: "weight", value: 123 },
      { name: "height", value: 554 },
      { name: "length", value: 480 },
    ],
  },
  {
    id: 3,
    title: "Beetlejuice",
    year: "1988",
    parameters: [
      { name: "speed", value: 20 },
      { name: "weight", value: 13 },
      { name: "height", value: 54 },
      { name: "length", value: 40 },
    ],
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
    parameters: [
      { name: "speed", value: 50 },
      { name: "weight", value: 12 },
      { name: "height", value: 66 },
      { name: "length", value: 53 },
    ],
  },
  {
    id: 5,
    title: "Dune",
    year: "2021",
    parameters: [
      { name: "speed", value: 140 },
      { name: "weight", value: 57 },
      { name: "height", value: 34 },
      { name: "length", value: 25 },
    ],
  },
];

const paginationComponentOptions = {
  rowsPerPageText: "Filas por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  paginationDefaultPage: 50,
  selectAllRowsItemText: "Todos",
};





class CustomDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      selectRow: [],
      copiedRow: [],
      hideRow: [],
      // hideButton: false,
    };
    this.rowSelectCritera = this.rowSelectCritera.bind(this);
    this.handleRowSelected = this.handleRowSelected.bind(this);
  }

  buttonHandler = (row, e) => {
    console.log("row:", row, "e", e);
  };
  onRowClicked = (row) => {
    console.log("row clicked", row);
  };

  copyHandler = () => {
    const copy = this.state.selectRow;
    const selectedIndex = this.state.columns
    console.log(data.map((i) => i)[0], "selectedIndex");

    console.log(" index", selectedIndex)
    this.setState({ copiedRow: copy });
  };
  pasteHandler = () => {
    const copiedRow = this.state.copiedRow;
    const statedata = this.state.data;
    this.setState({ data: [...statedata, ...copiedRow] });
  };


  deleteHandler = () => {
    let sData = [...this.state.data];
    let selectedData = this.state.selectRow;
    const result = sData.filter((i) => !selectedData.some((j) => i === j));
    this.setState({ data: result, selectRow: "" });
  };
  rowDeleteHandler = (row) => {
    const eventId = row.target.id;
    let sData = [...this.state.data];

    let newData = sData.filter((val) => {
      console.log("id", val.id, eventId);
      return Number(eventId) !== val.id;
    });
    this.setState({ data: newData });
    console.log("id", eventId);
    console.log("all data:", newData, sData);
  };
  rowSelectCritera = (row) => {
    console.log(row, "checkthis");
  };

  cutHandler = () => {
    let selectedData = this.state.selectRow;
    this.setState({ copiedRow: selectedData });

    let sData = [...this.state.data];
    console.log("sData", sData, "selecteData", selectedData);
    const result = sData.filter((i) => !selectedData.some((j) => i === j));
    this.setState({ data: result });
  };
  hideHandler = () => {
    let selectedData = this.state.selectRow;
    console.log("location", selectedData[0].id);
    this.setState({ hideRow: selectedData });
    let sData = [...this.state.data];
    // console.log("sData", sData, "selecteData", selectedData);
    const result = sData.filter((i) => !selectedData.some((j) => i === j));
    this.setState({ data: result });
  };

  unHideHandler = () => {
    const hideRow = this.state.hideRow;
    const statedata = this.state.data;

    this.setState({ data: [...hideRow, ...statedata], hideRow: [] });
  };

  handleRowSelected(row, index) {
    console.log("handle rowSelection: ", row.selectedRows);
    this.setState({ selectRow: row.selectedRows });
  }

  render() {
    const customStyles = {
      header: {
        style: {
          minHeight: "56px",
        },
      },
      headRow: {
        style: {
          borderTopStyle: "solid",
          borderTopWidth: "1px",
          borderTopColor: defaultThemes.default.divider.default,
          //   background: 'green'
        },
      },
      headCells: {
        style: {
          "&:not(:last-of-type)": {
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderRightColor: defaultThemes.default.divider.default,
          },
        },
      },
      cells: {
        style: {
          "&:not(:last-of-type)": {
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderRightColor: defaultThemes.default.divider.default,
          },
        },
      },
    };

     let bData= (row,index) => index + 1

    const columns = [
       {
          name: 'Sr #',
          // cell: (row,index) => index + 1,
         cell:bData,
          grow: 0,
        },
      {
        name: "Title",
        selector: (row) => row.title,
        style: (row) => row.style,
        sortable: true,
        // style: { height: "50px" },
      },

      {
        name: "Year",
        selector: (row) => row.year,
        // conditionalCellStyles: [
        //   {
        //     when: (row) => row.year <= 1982,
        //     style: {
        //       backgroundColor: "rgba(63, 195, 128, 0.9)",
        //       color: "red",
        //     },
        //   },

        //   {
        //     when: (row) => row.year === 2002,
        //     style: {
        //       backgroundColor: "rgba(23, 115, 158, 0.3)",
        //       color: "red",
        //     },
        //   },
        // ],
        sortable: true,
        right: true,
      },
      {
        name: "Print",
        selector: (row) => row.print,
        ignoreRowClick: true,
        cell: (row) => (
          <img
            src="https://i.picsum.photos/id/239/200/200.jpg?hmac=8JqlXUpZ9Xy0H6tMK8sCPQAYU9vUn9Qa8Kg-U9h3sCY"
            alt=""
          />
        ),
      },
      {
        name: "Poster Button",

        button: true,
        omit: this.state.hideButton,
        cell: (row) => (
          <button id={row.id} onClick={(row) => this.rowDeleteHandler(row)}>
            Delete
          </button>
        ),
      },
    ];
    console.log(data.map((i) => i.parameters)[0], "checkyhisconsole");
    const arr = data
      .map((i) => i.parameters)[0]
      .map((j, key) => {
        return {
          name: j.name,
          selector: (row) => data[row.id].parameters[key].value,
        };
      });

    let newColumn = [...columns, ...arr];

    const conditionalRowStyles = [
      {
        when: (row) => row.year === 1999,
        style: {
          backgroundColor: "#fff300",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.year === 2002,
        style: {
          backgroundColor: "rgba(23, 115, 158, 0.3)",
          color: "red",
        },
      },
    ];

    return (
      <div>
        <button onClick={this.copyHandler}>copy</button>
        <button onClick={this.cutHandler}>cut</button>
        <button onClick={this.pasteHandler}>Paste</button>
        <button onClick={this.deleteHandler}>Delete</button>
        <button onClick={this.hideHandler}>Hide</button>
        <button onClick={this.unHideHandler}>UnHide</button>

        <DataTable
          title="DataTable"
          columns={newColumn}
          data={this.state.data}
          selectableRows
          pagination
          paginationDefaultPage={50}
          selectableRowSelected={this.rowSelectCritera}
          onSelectedRowsChange={this.handleRowSelected}
          striped
          highlightOnHover
          dense
          customStyles={customStyles}
          paginationComponentOptions={paginationComponentOptions}
          selectableRowsSingle
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    );
  }
}

export default CustomDataTable;
