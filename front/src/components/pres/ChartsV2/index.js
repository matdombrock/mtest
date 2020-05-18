import React from "react";
import Grid from "@material-ui/core/Grid";
import {Line} from 'react-chartjs-2';
import s from "./style.module.scss";

const ChartsV2 = (report) =>{
    
    let periods = report.report.data.periods;
    periods = periods.slice(0, periods.length - 1);
    const allSummaries = periods
      .map((d) => ({
        ...d.summary
      }))
      .reverse();
      
    const data = {
        labels: allSummaries.map((x,i) => i),
        datasets: [
          {
            label: 'Total Sales',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: allSummaries.map(x => x.sales)
          }
        ]
      };
    return(
        <div className={s.canvas}>
        <Grid container>
          <Grid item xs={4}>
            <Line data={data} />
          </Grid>
        </Grid>
        </div>
    );

}

export default ChartsV2;