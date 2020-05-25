import React from 'react'
import { Bar } from 'react-chartjs-2'

const MultipleLinesChartV2 = ({ summaries, chartDataProp }) => {
  const chartData = {
    labels: summaries.map((x, i) => i),
    datasets: []
  };

  chartDataProp.datasets.forEach(x => {
    chartData.datasets.push({
      label: x.name,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,0.4)',
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
      data: summaries.map(s => s[x.key].toFixed(2)),
    })
  });

  chartData.datasets[0].type = 'line'
  chartData.datasets[0].fill = 'start'
  chartData.datasets[0].borderColor = '#F1996B'
  chartData.datasets[0].pointBorderColor = '#fff'
  chartData.datasets[0].pointBackgroundColor = '#F1996B'
  chartData.datasets[0].pointHoverBackgroundColor = '#F1996B'
  chartData.datasets[0].pointHoverBorderColor = '#F1996B'
  chartData.datasets[0].pointBorderWidth = 3
  chartData.datasets[0].pointHoverRadius = 3
  chartData.datasets[0].pointHoverBorderWidth = 3
  chartData.datasets[0].pointRadius = 4
  chartData.datasets[0].pointHitRadius = 4

  chartData.datasets[1].type = 'bar'
  chartData.datasets[1].borderColor = '#a3dadd'

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
    plugins: {
      datalabels: {
        display: false
      }
    }
  }

  return <Bar data={chartData} options={options} />
}

export default MultipleLinesChartV2