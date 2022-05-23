import {
    SpreadsheetComponent,
    SheetsDirective,
    SheetDirective,
    RangesDirective,
    RangeDirective,
    ColumnsDirective,
    ColumnDirective,
} from "@syncfusion/ej2-react-spreadsheet";
// import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import Dropdown from 'react-multilevel-dropdown';

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

const data = [{ name: 'rehman', age: '24' }, { name: 'asad', age: '25' }]
const values = { ciclo: 2.340, exigido: 4.560, optimo: 1.230 }
let spreadsheet = null;
const SyncFusionSpreadSheet = () => {
    // const testData = new DataManager({
    //     url: 'https://js.syncfusion.com/demos/ejServices//wcf/Northwind.svc/Orders',
    //     crossDomain: true
    // });

    // Triggers before going to the editing mode.
    const oncellEdit = (args) => {
        console.log('hello')
    };

    const oncellSave = (args) => {
        console.log('hello')
    };

    const beforeSave = (args) => {
        console.log(args)
    };

    const onCreated = () => {
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
        // spreadsheet.merge('B1:C1');
    }

    const getNextKey = (key) => {
        if (key === 'Z' || key === 'z') {
            return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25); // AA or aa
        } else {
            var lastChar = key.slice(-1);
            var sub = key.slice(0, -1);
            if (lastChar === 'Z' || lastChar === 'z') {
                // If a string of length > 1 ends in Z/z,
                // increment the string (excluding the last Z/z) recursively,
                // and append A/a (depending on casing) to it
                return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
            } else {
                // (take till last char) append with (increment last char)
                return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
            }
        }
    };

    const colName = (n) => {
        const ordA = 'a'.charCodeAt(0);
        const ordZ = 'z'.charCodeAt(0);
        const len = ordZ - ordA + 1;

        let s = "";
        while (n >= 0) {
            s = String.fromCharCode(n % len + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s;
    }

    // Trigger before saving the edited cell content.
    const onbeforeCellSave = (args) => {
        console.log('hello')
        const cellAddress = args.address.split('!')[1]
        const nextCell = getNextKey(cellAddress.replace(/[^a-z]/gi, ''))
        const cellToEdit = `${nextCell}${cellAddress.replace(/\D/g, "")}`
        spreadsheet.updateCell({ value: values[args.value.trim()] }, cellToEdit);
    };

    const beforeCellUpdate = (args) => {
        console.log('hello')
    };


    const btnClick = (value) => {
        const selectedCell = spreadsheet.selectionModule.startCell;
        if (selectedCell) {
            const address = `${colName(selectedCell[1])}${selectedCell[0] + 1}`
            const args = { value: value, address: `!${address}` }
            spreadsheet.updateCell({ value }, address);
            onbeforeCellSave(args);
        }
    }

    const save = () => {
        spreadsheet.saveAsJson().then(Json => (console.log(Json)));
    };

    const addTable = (type) => {
        const selectedCell = spreadsheet.selectionModule.startCell;
        const elementsTable = ['Elemento', 'Description', 'TN', 'K', 'F', 'M', 'OW', 'IW', 'ER', 'IR', 'IC']
        const articlesTable = ['Articulo', 'Description', 'TN', 'K', 'F', 'M', 'OW', 'IW', 'ER', 'IR', 'IC']
        const col = type === 'elements' ? elementsTable : articlesTable
        if (selectedCell) {
            let address = `${colName(selectedCell[1])}${selectedCell[0] + 1}`
            col.forEach(i => {
                spreadsheet.updateCell({ value: i }, address);
                const nextCell = getNextKey(address.replace(/[^a-z]/gi, ''))
                address = `${nextCell}${address.replace(/\D/g, "")}`
            })
        }
    }

    const attributesHandler = (attr, key) => {
        const selectedCell = spreadsheet.selectionModule.startCell;
        if (selectedCell) {
            const address = `${colName(selectedCell[1])}${selectedCell[0] + 1}`
            spreadsheet.updateCell({ value: `${attr} ${key}` }, address);
        }
    }

    const atributes = ['ciclo', 'optimo', 'exigido'];
    const tables = ['elements', 'articles'];

    return (
        <div>
            <button className="e-btn" onClick={() => btnClick('ciclo')}>Add ciclo</button>
            <button className="e-btn" onClick={() => btnClick('optimo')}>Add optimo</button>
            <button className="e-btn" onClick={() => btnClick('exigido')}>Add exigido</button>
            <button className="e-btn" onClick={() => addTable()}>Add Table</button>
            <button className="e-btn" onClick={() => save()}>Save as JSON</button>

            <Dropdown
                title={'Attributes'}
                position='right'
            >
                {atributes.map((i) =>
                    <Dropdown.Item key={i}
                    >{i}
                        <Dropdown.Submenu position="right">
                            <Dropdown.Item onClick={() => attributesHandler(i, 'label')}>Label</Dropdown.Item>
                            <Dropdown.Item onClick={() => attributesHandler(i, 'value')}>Value</Dropdown.Item>
                        </Dropdown.Submenu>
                    </Dropdown.Item>)}
            </Dropdown>
            <Dropdown
                title={'Tables'}
                position='right'
            >
                {tables.map((i) =>
                    <Dropdown.Item onClick={() => addTable(i)} key={i}>{i}</Dropdown.Item>)}
            </Dropdown>

            <SpreadsheetComponent allowSave={true} height='800px'
                saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
                ref={(ssObj) => { spreadsheet = ssObj; }}
                beforeSave={(a) => beforeSave(a)}
                cellEdit={(a) => oncellEdit(a)}
                cellSave={(a) => oncellSave(a)}
                beforeCellSave={(a) => onbeforeCellSave(a)}
                beforeCellUpdate={(a) => beforeCellUpdate(a)}
                created={() => onCreated()}
            >
                <SheetsDirective>
                    <SheetDirective>
                        <RangesDirective>
                            <RangeDirective dataSource={data}></RangeDirective>
                        </RangesDirective>
                        <ColumnsDirective>
                            <ColumnDirective width={100}></ColumnDirective>
                        </ColumnsDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </div>

    );
}

export default SyncFusionSpreadSheet;
