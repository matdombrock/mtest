import React from "react";
import Grid from "@material-ui/core/Grid";
import s from "./style.module.scss";
import SingleLineChart from "./SingleLineChart";
import MultipleLinesChart from "./MultipleLinesChart";
import MultipleLinesYaxisChart from "./MultipleLinesYaxisChart";

const ChartsV2 = (report) =>{

    let periods = report.report.periods;
    periods = periods.slice(0, periods.length - 1);
    const summaries = periods
      .map((d) => ({
        ...d.summary
      }))
      .reverse();
    
    const getAdSalesAndAdSpendData = () =>{
      return {
        datasets:[
          {
            name : 'Ad Sales',
            key : 'ad_sales',
            color:'rgba(0,176,240,1)'
          },
          {
            name : 'Ad Spend',
            key : 'ad_spend',
            color: 'rgba(244,115,120,1)'  
          }
        ]
      }
    }

    const getConversionRateAndAvgPPCData = () =>{
      return {
        datasets:[
          {
            name : 'Conversion Rate',
            key : 'conversion_rate',
            color:'rgba(0,176,240,1)',
            position : 'left',
            ticksMax : 35
          },
          {
            name : 'Average CPC',
            key : 'average_cpc',
            color: 'rgba(244,115,120,1)',
            position : 'right',
            ticksMax : 0.8
          }
        ]
      }
    }
    
    return(
        <div className={s.canvas}>
        <Grid container>
          <Grid item xs={4}>
            <SingleLineChart name='Total Sales' chartLabels={summaries.map((x,i) => i)} chartDataValues={summaries.map(x => x.sales)} />
          </Grid>
          <Grid item xs={4}>
            <MultipleLinesChart summaries={summaries} chartDataProp={getAdSalesAndAdSpendData()} />
          </Grid>
          <Grid item xs={4}>
            <MultipleLinesYaxisChart summaries={summaries} chartDataProp={getConversionRateAndAvgPPCData()} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <SingleLineChart name='Average Selling Price' chartLabels={summaries.map((x,i) => i)} chartDataValues={summaries.map(x => x.average_selling_price)} />
          </Grid>
          <Grid item xs={4}>
            <SingleLineChart name='ACOS' chartLabels={summaries.map((x,i) => i)} chartDataValues={summaries.map(x => x.acos)} />
          </Grid>
        </Grid>
        </div>
    );

}

export default ChartsV2;