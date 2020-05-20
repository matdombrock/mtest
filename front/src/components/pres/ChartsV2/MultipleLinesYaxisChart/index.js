import React from "react";
import { Line } from 'react-chartjs-2';

const MultipleLinesYaxisChart = ({ summaries, chartDataProp }) => {
  const chartData = {
    labels: summaries.map((x, i) => i),
    datasets: []
  };

  const chartDataOptions = {
    scales: {
      yAxes: []
    }
  };

  const getChartDataset = (summariesData, chartDatasetProp) => {
    return {
      label: chartDatasetProp.name,
      yAxisID: chartDatasetProp.name,
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: chartDatasetProp.color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: chartDatasetProp.color,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: chartDatasetProp.color,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: summariesData
    }
  }

  const getYAxesScale = (summariesData, chartDatasetProp) => {
    return {
      id: chartDatasetProp.name,
      type: 'linear',
      position: chartDatasetProp.position,
      ticks: {
        max: chartDatasetProp.ticksMax ?? Math.max(...summariesData),
        min: 0,
        callback: function (value, index, values) {
          return chartDatasetProp.position === 'right' ? '$ ' + value : value + ' %'
        }
      }
    };
  }

  chartDataProp.datasets.forEach(x => {
    const summariesData = summaries.map(s => s[x.key].toFixed(2));

    chartData.datasets.push(getChartDataset(summariesData, x));
    chartDataOptions.scales.yAxes.push(getYAxesScale(summariesData, x));
  });

  return (
    <Line data={chartData} options={chartDataOptions} />
  );

}

export default MultipleLinesYaxisChart;