import React from "react";
import { Line } from 'react-chartjs-2';

const MultipleLinesChart = ({ summaries, chartDataProp }) => {

  const chartData = {
    labels: summaries.map((x, i) => i),
    datasets: []
  };

  chartDataProp.datasets.forEach(x => {
    chartData.datasets.push({
      label: x.name,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: x.color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: x.color,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: x.color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: summaries.map(s => s[x.key].toFixed(2))
    })
  });

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              return '$' + value.toFixed(2)
            }
          }
        }
      ]
    }
  }

  return (
    <Line data={chartData} options={options} />
  );

}

export default MultipleLinesChart;