import React from 'react';
import Plot from 'react-plotly.js';

class Plotly extends React.Component {

  render() {
    const plotlyBarChart = (
      <Plot
        data={[
          {
            x: ['OP', 'DI', 'TR'],
            y: [210, 270, 330],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
            name: 'Average',
          },
          { type: 'bar', x: ['OP', 'DI', 'TR'], y: [330, 120, 120], marker: { color: '#8884d8' }, name: 'Value', },
        ]}
        layout={{ title: 'Bar Chart', dragmode: false, hovermode: false, }}
      />
    );

    const plotlyStackedBarChart = (
      <Plot
        data={[
          {
            x: [0, 4],
            y: ['m1', 'h1'],
            name: 'IW',
            orientation: 'h',
            width: 0.4,
            text: '10',
            textposition: 'inside',
            insidetextanchor: 'middle',
            marker: {
              color: '#40ee86',
              line: {
                width: 1
              }
            },
            type: 'bar'
          },
          {
            x: [0, 8],
            y: ['m1', 'h1'],
            name: 'OW',
            orientation: 'h',
            width: 0.4,
            text: '20',
            textposition: 'inside',
            insidetextanchor: 'middle',
            type: 'bar',
            marker: {
              color: '#67d6c0',
              line: {
                width: 1
              }
            }
          },
          {
            x: [0, 2],
            y: ['m1', 'h1'],
            name: 'M',
            orientation: 'h',
            width: 0.4,
            text: '30',
            textposition: 'inside',
            insidetextanchor: 'middle',
            type: 'bar',
            marker: {
              color: '#e96d8d',
              line: {
                width: 1
              }
            }
          },
          {
            x: [0, 4],
            y: ['m1', 'h1'],
            name: 'IW',
            orientation: 'h',
            width: 0.4,
            showlegend: false,
            text: '40',
            textposition: 'inside',
            insidetextanchor: 'middle',
            marker: {
              color: '#40ee86',
              line: {
                width: 1
              }
            },
            type: 'bar'
          },
          {
            x: [12, 0],
            y: ['m1', 'h1'],
            name: 'IR',
            // showlegend: false,
            orientation: 'h',
            text: '50',
            textposition: 'inside',
            insidetextanchor: 'middle',
            width: 0.4,
            base: 4,
            marker: {
              color: '#127197',
              line: {
                width: 1
              },
            },
            type: 'bar'
          },
        ]}
        layout={{
          title: 'Stacked Bar Chart',
          barmode: 'stack',
          bargap: 0.5,
          dragmode: false,
          hovermode: false,
          legend: { "orientation": "h" },
          xaxis: {
            showgrid: false,
            visible: false,
          },
        }}
      />
    );

    return (
      <div style={{ margin: '50px 100px' }}>

        {plotlyBarChart}
        {' '}
        {plotlyStackedBarChart}
      </div>
    );
  }
};
export default Plotly;