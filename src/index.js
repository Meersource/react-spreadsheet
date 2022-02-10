import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactSpreadSheet from './react-spreadsheet';
import CustomDataTable from "./RDTC"
import AgGrid from './agGrid'
import Recharts from './Recharts'
import Plotly from './Plotly'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import ReactTable from './react-table'
import Study from './StudyTable'
import VideoConverter from './convert-video';

ReactDOM.render(
  <div style={{ margin: '10px' }}>
    {/* <App /> */}
    <VideoConverter />
    {/* <Study /> */}
    {/* <ReactSpreadSheet /> */}
    {/* <CustomDataTable /> */}
    {/* <AgGrid /> */}
    {/* <h1>Recharts Demo</h1> */}
    {/* <Recharts /> */}
    {/* <h1>Plotly Demo</h1> */}
    {/* <Plotly /> */}
    {/* <ComponentA /> */}
    {/* <ComponentB /> */}
    {/* <ReactTable /> */}
  </div>
  ,
  document.getElementById('root')
);
