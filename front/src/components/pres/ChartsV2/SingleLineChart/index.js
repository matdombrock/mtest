import React from "react";
import { Line } from 'react-chartjs-2';

const SingleLineChart = ({ name, chartLabels, chartDataValues }) => {

  const colorOrangeDark = getComputedStyle(document.body).getPropertyValue('--orange-dark');

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: colorOrangeDark,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: colorOrangeDark,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colorOrangeDark,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartDataValues
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              return '$' + value
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

export default SingleLineChart;