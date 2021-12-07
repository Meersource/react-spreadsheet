import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import CustomDataTable from "./RDTC"
import AgGrid from './agGrid'
import Recharts from './Recharts'
import Plotly from './Plotly'

ReactDOM.render(
  // <App />
  <>
    {/* <CustomDataTable /> */}
    {/* <AgGrid /> */}
    {/* <h1>Recharts Demo</h1>
    <Recharts /> */}
    <h1>Plotly Demo</h1>
    <Plotly />
  </>
  ,
  document.getElementById('root')
);
