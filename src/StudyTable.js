import { useState, useEffect } from 'react';
import AgGrid from './agGrid';

const data = [
    { id: 1, index: 1, make: "Toyota", model: "Celica", price: 35000, articles: [{ name: 'weight', unit: 'kg', value: '1' }, { name: 'height', unit: 'm', value: '2' }] },
    { id: 2, index: 2, make: "Ford", model: "Mondeo", price: 32000, articles: [{ name: 'weight', unit: 'kg', value: '5' }, { name: 'height', unit: 'm', value: '2' }] },
    { id: 3, index: 3, make: "Porsche", model: "Boxter", price: 72000, articles: [{ name: 'height', unit: 'm', value: '2' }, { name: 'weight', unit: 'kg', value: '3' }] },
    { id: 4, index: 4, make: "Toyota", model: "Celica", price: 35000, articles: [{ name: 'weight', unit: 'kg', value: '4' }, { name: 'height', unit: 'm', value: '2' }] },
    { id: 5, index: 5, make: "Ford", model: "Mondeo", price: 32000, articles: [{ name: 'weight', unit: 'kg', value: '5' }, { name: 'height', unit: 'm', value: '2' }] },
    { id: 6, index: 6, make: "Porsche", model: "Boxter", price: 72000, articles: [{ name: 'weight', unit: 'kg', value: '6' }, { name: 'height', unit: 'm', value: '2' }] }
];

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
};


const columns = [
    { field: 'index', resizable: true, width: '80px' },
    { field: 'make', sortable: true, filter: true, resizable: true, width: '180px' },
    { field: 'model', resizable: true, width: '180px' },
    { field: 'price', resizable: true, width: '180px' },
    // { displayName: 'new', valueGetter: (params) => params.data.articles[0].value, resizable: true, },
];

const Study = () => {
    const [rowData] = useState(data);
    const [columnsData, setColumnsData] = useState(columns);

    const newValueGetter = (params) => {
        const { data, colDef } = params;
        const article = data.articles && data.articles.filter((i) => i.name === colDef.field);
        if (article.length !== 0) {
            return article[0].value
        }
        return null;
    };

    useEffect(() => {
        const arr = rowData[0].articles
            .map((j) => ({
                displayName: `${j.name} (${j.unit})`,
                field: j.name,
                valueGetter: (params) => newValueGetter(params)
            }));
        setColumnsData(prevColumns => [...prevColumns, ...arr]);
    }, [rowData]);

    const getTableState = (tableData, selectedRows, unSelectedRows) => {
        console.log(tableData, selectedRows, unSelectedRows, 'tableAData');
    };

    const cellStyle = { borderBottom: '1px solid black', borderRight: '1px solid black', };
    const rowStyle = { margin: '0px', padding: '0px' };
    console.log(columnsData, 'arr123');

    return (
        <div>
            <AgGrid data={rowData} columns={columnsData} getTableState={getTableState} />
        </div>
    );
};

export default Study;
