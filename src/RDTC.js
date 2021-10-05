import React from "react";
import DataTable from "react-data-table-component";
import "./App.css"

let data = [
    { id: 1, title: "Conan the Barbarian", year: 1982 },
    { id: 2, title: "Men in Black", year: 1999 },
    { id: 3, title: "Men in Black 2", year: 2002 },
];

class CustomDataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            selectRow: [],
            copiedRow: [],
        };
        this.rowSelectCritera = this.rowSelectCritera.bind(this);
        this.handleRowSelected = this.handleRowSelected.bind(this);
        this.toggleCleared = this.toggleCleared.bind(this);

    }

    buttonHandler = (row, e) => {
        console.log("row:", row, "e", e);
        // this.setState({selectRow: row})
    };

    // checkboxHandler = (row, e) => {
    //     if (e.target.checked) {
    //         const selectedrow = [...this.state.selectRow];
    //         this.setState({ selectRow: [...selectedrow, row] });
    //     } else {
    //         const data = this.state.selectRow.filter((i) => {
    //             return i !== row;
    //         });
    //         this.setState({ selectRow: data });
    //     }
    // };

    pasteHandler = () => {
        const copiedRow = this.state.copiedRow;
        const statedata = this.state.data;
        this.setState({ data: [...statedata, ...copiedRow] });
    };

    copyHandler = () => {
        const copy = this.state.selectRow;
        this.setState({ copiedRow: copy });
        // this.setState({selectRow: ""})
    };

    //   cutHandler = () => {
    //     this.copyHandler();
    //     this.setState({ selectRow: "" });
    //   };

    deleteHandler = () => {
        let sData = [...this.state.data];
        let selectedData = this.state.selectRow;
        const result = sData.filter((i) => !selectedData.some((j) => i === j));
        this.setState({ data: result, selectRow: '' });
    };
    rowSelectCritera = (row) => {
        console.log(row, 'checkthis')
    }

    cutHandler = () => {
        let selectedData = this.state.selectRow;
        this.setState({ copiedRow: selectedData });

        let sData = [...this.state.data];
        console.log("sData", sData, "selecteData", selectedData);
        const result = sData.filter((i) => !selectedData.some((j) => i === j));
        this.setState({ data: result });
    };

    handleRowSelected(row) {
        console.log(row)
        this.setState({ selectRow: row.selectedRows });
    }

    toggleCleared(row) {
        console.log(row)
        // this.setState({ selectRow: row.selectedRows });
    }


    render() {

        // console.log(this.state.data);
        const columns = [
            {
                name: "Title",
                selector: "title",
                sortable: true,
            },
            {
                name: "Year",
                selector: "year",
                sortable: true,
                right: true,
            },
            {
                name: "Print",
                selector: "Print",
                ignoreRowClick: true,
                cell: (row) => (
                    // <button onClick={(e) => this.buttonHandler(row, e)}>click</button>
                    <img src="https://i.picsum.photos/id/239/200/200.jpg?hmac=8JqlXUpZ9Xy0H6tMK8sCPQAYU9vUn9Qa8Kg-U9h3sCY" alt="" />
                ),
            },
        ];

        return (
            <div>
                <button onClick={this.copyHandler}>copy</button>
                <button onClick={this.cutHandler}>cut</button>
                <button onClick={this.pasteHandler}>Paste</button>
                <button onClick={this.deleteHandler}>Delete</button>

                {/* {console.log("select copy :", this.state.copiedRow)}
                {console.log("select row :", this.state.selectRow)} */}

                <DataTable title="DataTable"
                    columns={columns}
                    data={this.state.data}
                    selectableRows
                    pagination
                    selectableRowSelected={this.rowSelectCritera}
                    onSelectedRowsChange={this.handleRowSelected}
                    clearSelectedRows={this.toggleCleared}
                    striped
                
                />
            </div>
        );
    }
}

export default CustomDataTable;
