import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import CustomDataTable from "./RDTC"
import AgGrid from './agGrid'
import Recharts from './Recharts'

ReactDOM.render(
  // <App />
  <>
    {/* <CustomDataTable /> */}
    {/* <AgGrid /> */}
    <Recharts />
  </>
  ,
  document.getElementById('root')
);
