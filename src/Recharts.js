import { ComposedChart, Bar, XAxis, YAxis, Line, Area, Tooltip, Legend, CartesianGrid, BarChart, ResponsiveContainer, LabelList } from "recharts";
import lodash from "lodash";

const data = [
    { quarter: 1, earnings: 13000, avg: 7000 },
    { quarter: 2, earnings: 5000, avg: 8500 },
    { quarter: 3, earnings: 5000, avg: 10000 },
];

const chartColors = {
    Test: "#ffffff",
    M: "#413ea0",
    OW: "#40ee86",
    IW: "#67d6c0",
    IR: "#127197",
    ER: "#e96d8d",
    Espera: "#ff7300",
    Pasos: "#8884d8",
};

const chartData = [
    { type: 'h1', OW: 146, IW: 364, IR: 200, ER: 296, Espera: 200, Pasos: 296 },
    { type: 'm1', Test: 200, M: 308 },
]
const realData = [
    { elementType: 'OW', value: 100, code: 10 },
    { elementType: 'IW', value: 100, code: 20 },
    { elementType: 'IR', value: 100, code: 30 },
    { elementType: 'M', value: 300, code: 40 },
    { elementType: 'ER', value: 100, code: 50 },
    { elementType: 'Espora', value: 100, code: 60 },
    { elementType: 'Pasos', value: 100, code: 70 },
];

const Recharts = () => {

    const composedChartDemo = (
        <ComposedChart width={800} height={300} data={data}>
            <XAxis dataKey="quarter" />
            <YAxis dataKey="earnings" />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="monotone" dataKey="quarter" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="earnings" barSize={50} fill="#413ea0" />
            <Line type="monotone" dataKey="avg" stroke="#ff7300" />
        </ComposedChart>
    );

    const renderCusomizedLegend = ({ payload }) => {
        return (
            <div>
                {payload.map(entry => {
                    const { dataKey, color } = entry;

                    return (
                        <span
                            style={{ marginRight: 10 }}
                        >   <span
                                style={{
                                    height: ' 15px',
                                    width: '15px',
                                    marginRight: 10,
                                    backgroundColor: color,
                                    // borderRadius: '50%',
                                    display: 'inline-block',
                                }}
                            />
                            <span>{dataKey}</span>
                        </span>
                    );
                })}
            </div>
        );
    };

    console.log(lodash.toPairs(chartColors))
    const stackedBarChart = (
        <ResponsiveContainer height={300} width={800}>
            <BarChart layout="vertical" data={chartData}>
                {lodash.toPairs(chartColors)
                    .map(pair => (
                        <Bar
                            stackId="a"
                            key={pair[0]}
                            dataKey={pair[0]}
                            fill={pair[1]}
                            barSize={40}
                        >
                            <LabelList dataKey={pair[0]} position="center" />
                        </Bar>
                    ))}
                <YAxis
                    domain={[0, 3]}
                    dataKey="type"
                    type="category"
                // interval="preserveStartEnd"
                // padding={{ top: 20, bottom: 20 }}
                // tickCount={10}
                />
                <XAxis type="number" hide={true} />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ marginLeft: '500px' }}
                    align="left"
                    payload={lodash.toPairs(chartColors).map(pair => ({
                        dataKey: pair[0],
                        color: pair[1]
                    }))}
                    content={renderCusomizedLegend}
                />
            </BarChart>
        </ResponsiveContainer>
    );

    const stackedBarChartWithRealData = (
        <ResponsiveContainer height={300} width={800}>
            <BarChart layout="vertical" data={chartData}>
                <Bar dataKey="type" barSize={40} fill="#413ea0" label="type" />
                <XAxis hide={true} />
                <YAxis type="category" dataKey='type' />
            </BarChart>
        </ResponsiveContainer >
    );

    return (
        <div style={{ margin: '50px 100px' }} >
            <h1>Recharts Demo</h1>
            <h2>Bar Chart</h2>
            {composedChartDemo}
            <br />

            <h2>Stacked Bar Chart</h2>
            {stackedBarChart}
            {/* {stackedBarChartWithRealData} */}
        </div >)
};
export default Recharts;