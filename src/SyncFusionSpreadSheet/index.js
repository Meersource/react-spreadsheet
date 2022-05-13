import * as React from "react";
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective } from "@syncfusion/ej2-react-spreadsheet";
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';

import "./index.css"

// const data = [{
//     OrderID: 10248,
//     CustomerID: 'VINET',
//     EmployeeID: 5,
//     ShipName: 'Vins et alcools Chevalier',
//     ShipCity: 'Reims',
//     ShipAddress: '59 rue de lAbbaye'
// },
// {
//     OrderID: 10249,
//     CustomerID: 'TOMSP',
//     EmployeeID: 6,
//     ShipName: 'Toms Spezialitäten',
//     ShipCity: 'Münster',
//     ShipAddress: 'Luisenstr. 48'
// },
// {
//     OrderID: 10250,
//     CustomerID: 'HANAR',
//     EmployeeID: 4,
//     ShipName: 'Hanari Carnes',
//     ShipCity: 'Rio de Janeiro',
//     ShipAddress: 'Rua do Paço, 67'
// },
// {
//     OrderID: 10251,
//     CustomerID: 'VICTE',
//     EmployeeID: 3,
//     ShipName: 'Victuailles en stock',
//     ShipCity: 'Lyon',
//     ShipAddress: '2, rue du Commerce'
// },
// {
//     OrderID: 10252,
//     CustomerID: 'SUPRD',
//     EmployeeID: 4,
//     ShipName: 'Suprêmes délices',
//     ShipCity: 'Charleroi',
//     ShipAddress: 'Boulevard Tirou, 255'
// }, {
//     OrderID: 'Ciclo',
//     CustomerID: 'SUPRD',
// }];

const data = [{ name: 'rehman', age: '24' }, { name: 'asad', age: '25' },]

const SyncFusionSpreadSheet = () => {

    // const testData = new DataManager({
    //     url: 'https://js.syncfusion.com/demos/ejServices//wcf/Northwind.svc/Orders',
    //     crossDomain: true
    // });

    // Triggers before going to the editing mode.
    const oncellEdit = (args) => {
        // Preventing the editing in 5th(Amount) column.
        console.log(args)
        if (args.address.includes('E')) {
            args.cancel = true;
        }
    };

    // Trigger before saving the edited cell content.
    const onbeforeCellSave = (args) => {
        // Prevent saving the edited changes in 4th(Rate) column.
        console.log(args)
        if (args.address.includes('D')) {
            args.cancel = true;
            // Manually removes the editable state without saving the changes. Use `endEdit` method if you want to save the changes.
            this.spreadsheet.closeEdit();
        }
    }

    return (
        <SpreadsheetComponent cellEdit={(a) => oncellEdit(a)} beforeCellSave={(a) => onbeforeCellSave(a)}>
            <SheetsDirective>
                <SheetDirective>
                    <RangesDirective>
                        <RangeDirective dataSource={data}></RangeDirective>
                    </RangesDirective>
                    <ColumnsDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        {/* <ColumnDirective width={110}></ColumnDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective> */}
                    </ColumnsDirective>
                </SheetDirective>
            </SheetsDirective>
        </SpreadsheetComponent>
    );
}

export default SyncFusionSpreadSheet;


// import { TextBox } from '@syncfusion/ej2-inputs';
// import { RadioButton } from '@syncfusion/ej2-buttons';
// import { DatePicker } from '@syncfusion/ej2-calendars';
// import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
// import { Spreadsheet, CellRenderEventArgs, BeforeSelectEventArgs, getRangeIndexes, ChangeEventArgs } from '@syncfusion/ej2-spreadsheet';

// /**
//  * Cell template
//  */
// //Initialize Spreadsheet component
// let spreadsheet = new Spreadsheet({
//     showRibbon: false,
//     showFormulaBar: false,
//     allowOpen: false,
//     allowSave: false,
//     allowEditing: false,
//     selectionSettings: { mode: 'None' },
//     scrollSettings: {
//         isFinite: true
//     },
//     sheets: [{
//         rowCount: 40,
//         showGridLines: false,
//         name: 'Registration Form',
//         rows: [{
//             height: 55,
//             cells: [{
//                 index: 1,
//                 value: 'Interview Registration Form',
//                 style: {
//                     fontSize: '12pt',
//                     fontWeight: 'bold',
//                     textAlign: 'center',
//                     verticalAlign: 'middle',
//                     textDecoration: 'underline'
//                 }
//             }]
//         }, {
//             height: 45,
//             cells: [{
//                 index: 1,
//                 value: 'Name:'
//             }],
//         }, {
//             height: 45,
//             cells: [{
//                 index: 1,
//                 value: 'Date of Birth:'
//             }]
//         }, {
//             height: 45,
//             cells: [{
//                 index: 1,
//                 value: 'Gender:'
//             }]
//         }, {
//             height: 45,
//             cells: [{
//                 index: 1,
//                 value: 'Year of Experience:'
//             }]
//         }, {
//             height: 45,
//             cells: [{
//                 index: 1,
//                 value: 'Areas of Interest:'
//             }]
//         }, {
//             height: 45,
//             cells: [{
//                 index: 1,
//                 value: 'Mobile Number:'
//             }]
//         }, {
//             height: 45,
//             cells: [{
//                 index: 1,
//                 value: 'Email:'
//             }]
//         }, {
//             height: 82,
//             cells: [{
//                 index: 1,
//                 value: 'Address:'
//             }]
//         }],
//         columns: [{
//             index: 1,
//             width: 190
//         }, {
//             width: 350
//         }],
//         ranges: [{
//             template: '<input />',
//             address: 'C2:C3'
//         }, {
//             template: '<div><input type="radio" name="gender" value="male" /><input type="radio" name="gender" value="female"/></div>',
//             address: 'C4'
//         }, {
//             template: '<input />',
//             address: 'C5:C8'
//         }, {
//             template: '<textarea rows="3"/>',
//             address: 'C9'
//         }, {
//             template: '<button class="e-btn e-flat" style="float:right">Add</button>',
//             address: 'C11'
//         }]
//     }],
//     beforeCellRender: (args) => {
//         //Initializing input components before cell rendering
//         if (spreadsheet.activeSheetIndex === 0) {
//             let target = args.element.firstElementChild;
//             switch (args.address) {
//                 case 'B1':
//                     (args.element).colSpan = 2;
//                     break;
//                 case 'C2':
//                     new TextBox({ placeholder: 'Name' }, target);
//                     break;
//                 case 'C3':
//                     new DatePicker({ placeholder: 'DOB', }, target);
//                     break;
//                 case 'C4':
//                     new RadioButton({ label: 'Male' }, args.element.firstElementChild.firstElementChild);
//                     new RadioButton({ label: 'Female' }, args.element.firstElementChild.lastElementChild);
//                     break;
//                 case 'C5':
//                     let experience = ['0 - 1 year', '1 - 3 years', '3 - 5 years', '5 - 10 years'];
//                     new DropDownList(
//                         { placeholder: 'Experience', dataSource: experience }, target);
//                     break;
//                 case 'C6':
//                     let languages = ['JAVA', 'C#', 'SQL'];
//                     new MultiSelect(
//                         {
//                             showClearButton: false, placeholder: 'Areas of Interest', dataSource: languages, change: (evt) => {
//                                 if (args.cell) {
//                                     args.cell.value = evt.value;
//                                 } else {
//                                     let range = getRangeIndexes(evt.address);
//                                     spreadsheet.sheets[spreadsheet.activeSheetIndex].rows[range[0]].cells[range[1]] = { value: evt.value };
//                                 }
//                             }
//                         }, target);
//                     break;
//                 case 'C7':
//                     new TextBox({ placeholder: 'Mobile Number' }, target);
//                     break;
//                 case 'C8':
//                     new TextBox({ placeholder: 'Email' }, target);
//                     break;
//                 case 'C9':
//                     new TextBox(null, target);
//                     break;
//                 default:
//             }
//         }
//     },
//     created: () => {
//         //Applies format to specified range
//         spreadsheet.cellFormat({ fontWeight: 'bold' }, 'B2:B9');
//     },
//     beforeSelect: (args) => {
//         //Prevents selection
//         args.cancel = true;
//     }
// });

// spreadsheet.appendTo('#spreadsheet');

// export default spreadsheet;