import React from "react";
import Grid from "@material-ui/core/Grid";
import s from "./style.module.scss";
import SingleLineChart from "./SingleLineChart";
import MultipleLinesChart from "./MultipleLinesChart";
import MultipleLinesYaxisChart from "./MultipleLinesYaxisChart";
import DonutChart from './DonutChart'

const ChartsV2 = (report) => {

  let periods = report.report.periods;
  if (periods.length > 2) {
    periods = periods.slice(0, periods.length - 1);
  }

  const summaries = periods
    .map((d) => ({
      ...d.summary
    }))
    .reverse();

  const colorOrangeDark = getComputedStyle(document.body).getPropertyValue('--orange-dark');;
  const colorTealMedium = getComputedStyle(document.body).getPropertyValue('--teal-medium');;

  const getAdSalesAndAdSpendData = () => {
    return {
      datasets: [
        {
          name: 'Ad Sales ($)',
          key: 'ad_sales',
          color: colorOrangeDark
        },
        {
          name: 'Ad Spend ($)',
          key: 'ad_spend',
          color: colorTealMedium
        }
      ]
    }
  }

  const getConversionRateAndAvgPPCData = () => {
    return {
      datasets: [
        {
          name: 'Conversion Rate (%)',
          key: 'conversion_rate',
          color: colorOrangeDark,
          position: 'left'
        },
        {
          name: 'Average CPC ($)',
          key: 'average_cpc',
          color: colorTealMedium,
          position: 'right'
        }
      ]
    }
  }

  return (
    <div className={s.canvas}>
      <Grid container>
        <Grid item xs={4}>
          <SingleLineChart sign='$' name='Total Sales ($)' chartLabels={summaries.map((x, i) => i)} chartDataValues={summaries.map(x => x.sales.toFixed(2))} />
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
          <SingleLineChart sign='$' name='Average Selling Price ($)' chartLabels={summaries.map((x, i) => i)} chartDataValues={summaries.map(x => x.average_selling_price.toFixed(2))} />
        </Grid>
        <Grid item xs={4}>
          <SingleLineChart sign='%' name='ACOS (%)' chartLabels={summaries.map((x, i) => i)} chartDataValues={summaries.map(x => x.acos.toFixed(2))} />
        </Grid>
        <Grid item xs={4}>
          <DonutChart chartDataValues={summaries} />
        </Grid>
      </Grid>
    </div>
  );

}

export default ChartsV2;