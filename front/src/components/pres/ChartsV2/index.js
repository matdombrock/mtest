import React from "react";
import Grid from "@material-ui/core/Grid";
import {Line} from 'react-chartjs-2';
import s from "./style.module.scss";
import TotalSalesChart from "./TotalSalesChart";

const ChartsV2 = (report) =>{
    
    let periods = report.report.data.periods;
    periods = periods.slice(0, periods.length - 1);

    const summaries = periods
      .map((d) => ({
        ...d.summary
      }))
      .reverse();
      
    return(
        <div className={s.canvas}>
        <Grid container>
          <Grid item xs={4}>
            <TotalSalesChart summaries={summaries} />
          </Grid>
        </Grid>
        </div>
    );

}

export default ChartsV2;