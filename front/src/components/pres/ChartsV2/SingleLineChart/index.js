import React from "react";
import {Line} from 'react-chartjs-2';

const SingleLineChart = ({name, chartLabels, chartDataValues}) =>{
    console.log(chartDataValues);
    const chartData = {
        labels: chartLabels,
        datasets: [
          {
            label: name,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(0,176,240,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(0,176,240,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,176,240,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: chartDataValues
          }
        ]
      };
    return(
        <Line data={chartData} />
    );

}

export default SingleLineChart;