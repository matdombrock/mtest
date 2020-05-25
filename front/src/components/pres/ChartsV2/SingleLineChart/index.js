import React from 'react';
import { Line } from 'react-chartjs-2'

const SingleLineChart = ({ name, chartLabels, chartDataValues }) => {

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: name,
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#F1996B',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#fff',
        pointBackgroundColor: '#F1996B',
        pointBorderWidth: 3,
        pointHoverRadius: 3,
        pointHoverBackgroundColor: '#F1996B',
        pointHoverBorderColor: '#F1996B',
        pointHoverBorderWidth: 3,
        pointRadius: 4,
        pointHitRadius: 4,
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
              return '$ ' + value
            }
          },
          gridLines: {
            display: false
          }
        }
      ],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        fontColor: '#F1996B',
        usePointStyle: true,
      }
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  }

  return (
    <Line data={chartData} options={options} />
  );

}

export default SingleLineChart;