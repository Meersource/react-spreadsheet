import React from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "./App.css";

let data = [
  {
    id: 1,
    style: { height: "250px" },
    title: "Conan the Barbarian",
    year: 1982,
  },
  { id: 2, title: "Men in Black", year: 1999 },
  { id: 3, title: "Men in Black 2", year: 2002 },
  {
    id: 4,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 5,
    title: "Ghostbusters",
    year: "1984",
  },
];

// const StyledCell = styled.div`
//    {
//     background: green !important;
//     width: 100%;
//     height: 100%;
//   }
// `;
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
    };
    this.rowSelectCritera = this.rowSelectCritera.bind(this);
    this.handleRowSelected = this.handleRowSelected.bind(this);
    this.toggleCleared = this.toggleCleared.bind(this);
  }

  buttonHandler = (row, e) => {
    console.log("row:", row, "e", e);
    // this.setState({selectRow: row})
  };

  pasteHandler = () => {
    const copiedRow = this.state.copiedRow;
    const statedata = this.state.data;
    this.setState({ data: [...statedata, ...copiedRow] });
  };

  copyHandler = () => {
    const copy = this.state.selectRow;
    this.setState({ copiedRow: copy });
  };

  deleteHandler = () => {
    let sData = [...this.state.data];
    let selectedData = this.state.selectRow;
    const result = sData.filter((i) => !selectedData.some((j) => i === j));
    this.setState({ data: result, selectRow: "" });
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
    this.setState({ hideRow: selectedData });
    let sData = [...this.state.data];
    console.log("sData", sData, "selecteData", selectedData);
    const result = sData.filter((i) => !selectedData.some((j) => i === j));
    this.setState({ data: result });
  };

  unHideHandler = () => {
    const hideRow = this.state.hideRow;
    const statedata = this.state.data;

    this.setState({ data: [...hideRow, ...statedata] });
  };

  handleRowSelected(row) {
    console.log(row);
    this.setState({ selectRow: row.selectedRows });
  }

  toggleCleared(row) {
    console.log(row);
    // this.setState({ selectRow: row.selectedRows });
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
            // background: color
          },
        },
      },
    };
    const columns = [
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
        conditionalCellStyles: [
          {
            when: (row) => row.year <= 1982,
            style: {
              backgroundColor: "rgba(63, 195, 128, 0.9)",
              color: "red",
            },
          },

          {
            when: (row) => row.year === 2002,
            style: {
              backgroundColor: "rgba(23, 115, 158, 0.3)",
              color: "red",
            },
          },
        ],
        sortable: true,
        right: true,
      },
      {
        name: "Print",
        selector: (row) => row.print,
        // style: (row) => ({
        //   backgroundColor: row.isSpecial ? "pink" : "#FFA500",
        // }),
        ignoreRowClick: true,
        cell: (row) => (
          // <button onClick={(e) => this.buttonHandler(row, e)}>click</button>
          <img
            src="https://i.picsum.photos/id/239/200/200.jpg?hmac=8JqlXUpZ9Xy0H6tMK8sCPQAYU9vUn9Qa8Kg-U9h3sCY"
            alt=""
          />
        ),
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
          columns={columns}
          data={this.state.data}
          selectableRows
          pagination
          paginationDefaultPage={50}
          selectableRowSelected={this.rowSelectCritera}
          onSelectedRowsChange={this.handleRowSelected}
          clearSelectedRows={this.toggleCleared}
          striped
          highlightOnHover
          dense
          customStyles={customStyles}
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    );
  }
}

export default CustomDataTable;
