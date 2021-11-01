import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import CustomDataTable from "./RDTC"
import AgGrid from './agGrid'


ReactDOM.render(
    // <App />
    <>
    {/* <CustomDataTable /> */}
    <AgGrid />
    </>
  ,
  document.getElementById('root')
);
