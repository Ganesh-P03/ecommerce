/*

    props will be

    [
    {
        "pId": 6,
        "totalQuantity": "11",
        "pName": "Apple Watch",
        "revenue": "548900.00"
    },
    {
        "pId": 9,
        "totalQuantity": "2",
        "pName": "Airpods Pro ",
        "revenue": "53800.00"
    },
    {
        "pId": 10,
        "totalQuantity": "1",
        "pName": "HomePod mini",
        "revenue": "10900.00"
    }
]

*/

import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Chart = (props) => {
  // const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   const sales = props.sales;

  //   const chartData = sales.map((item) => ({
  //     name: item.pName,
  //     value: item.totalQuantity,
  //   }));
  //   setChartData(chartData);
  // }, [props.sales]);

  return (
    <>
      {/* { flex of barchart and linechart} */}
      <div className="flex flex-row justify-between">
        {/* {barchart} */}
        <div className="w-1/2">
          <BarChart width={600} height={300} data={props.sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalQuantity" fill="#8884d8" />
          </BarChart>
        </div>
        {/* {linechart} */}
        <div className="w-1/2">
          {/* some are missed adjust scale to show every thing*/}
          <LineChart
            width={600}
            height={300}
            data={props.sales}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default Chart;
