import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

// const BarChart = (props) => {
//   return <Bar data={props.charData}/>
// }

function LineChart({ chartData }) {
  return <Line data={chartData} />;
}

export default LineChart;
