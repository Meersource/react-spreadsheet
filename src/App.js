import { useState, useEffect } from 'react';
import AgGrid from './agGrid';

const data = [
  { id: 1, index: 1, position: true, make: "Toyota", model: "Celica", price: 35000, demo: { value: 1, used: true }, articles: [{ name: 'weight', unit: 'kg', value: '1' }, { name: 'height', unit: 'm', value: '2' }] },
  { id: 2, index: 2, position: false, make: "Ford", model: "Mondeo", price: 32000, demo: { value: 1, used: true }, articles: [{ name: 'weight', unit: 'kg', value: '5' }, { name: 'height', unit: 'm', value: '2' }] },
  { id: 3, index: 3, position: false, make: "Porsche", model: "Boxter", price: 72000, demo: { value: 3, used: true }, articles: [{ name: 'height', unit: 'm', value: '2' }, { name: 'weight', unit: 'kg', value: '3' }] },
  { id: 4, index: 4, position: false, make: "Toyota", model: "Celica", price: 35000, demo: { value: 1, used: false }, articles: [{ name: 'weight', unit: 'kg', value: '4' }, { name: 'height', unit: 'm', value: '2' }] },
  { id: 5, index: 5, position: false, make: "Ford", model: "Mondeo", price: 32000, demo: { value: 1, used: true }, articles: [{ name: 'weight', unit: 'kg', value: '5' }, { name: 'height', unit: 'm', value: '2' }] },
  { id: 6, index: 6, position: false, make: "Porsche", model: "Boxter", price: 72000, demo: { value: 1, used: true }, articles: [{ name: 'weight', unit: 'kg', value: '6' }, { name: 'height', unit: 'm', value: '2' }] }
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

function Renderer(params) {
  const backgroundColor = params.value === true ? 'green' : 'grey';
  const { value } = params.value;
  return value;
};

function newValueSetter(params) {
  console.log(params, 'cellparams')
  params.data.demo = { value: params.newValue }
  return true;
}

const columns = [
  { field: 'position', checkboxSelection: true, headerCheckboxSelection: true, rowDrag: true, resizable: true, cellRendererFramework: MyRenderer, width: '100px' },
  { field: 'index', resizable: true, editable: true, width: '80px' },
  { field: 'make', sortable: true, editable: true, filter: true, resizable: true, width: '180px' },
  { field: 'model', resizable: true, editable: true, width: '180px' },
  { field: 'price', resizable: true, editable: true, width: '180px' },
  { field: 'demo', resizable: true, editable: true, cellStyle: (p) => { return p.value.used === false ? { backgroundColor: 'black', color: 'white' } : {} }, valueGetter: (p) => p.data.demo.value, valueSetter: newValueSetter, width: '180px' },
  // { displayName: 'new', valueGetter: (params) => params.data.articles[0].value, resizable: true, },
];

const App = () => {
  const [rowData, setRowsData] = useState(data);
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
    const arr = rowData[0] && rowData[0].articles && rowData[0].articles
      .map((j) => ({
        headerName: `${j.name} (${j.unit})`,
        field: j.name,
        editable: true,
        valueGetter: newValueGetter
      }));
    setColumnsData(prevColumns => prevColumns.length === columns.length ? [...prevColumns, ...arr] : [...prevColumns]);
  }, [rowData]);

  const getTableState = (tableData, selectedRows, unSelectedRows) => {
    console.log(tableData, selectedRows, unSelectedRows, 'tableAData');
  };

  const cellStyle = { borderBottom: '1px solid black', borderRight: '1px solid black', };
  const rowStyle = { margin: '0px', padding: '0px' };
  console.log(columnsData, 'arr123');

  const editHandler = (id) => {
    console.log(id);
  };

  const deleteHandler = (id) => {
    console.log(id);
    setRowsData([...rowData.filter((i) => i.id !== id)])
  };

  return (
    <div>
      <AgGrid data={rowData} columns={columnsData} getTableState={getTableState} editHandler={editHandler} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;
