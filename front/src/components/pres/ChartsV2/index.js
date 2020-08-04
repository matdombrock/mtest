import React from 'react'
import Grid from '@material-ui/core/Grid'
import s from './style.module.scss'
import SingleLineChart from './SingleLineChart'
import MultipleLinesChart from './MultipleLinesChart'
import MultipleLinesYaxisChart from './MultipleLinesYaxisChart'
import DonutChart from './DonutChart'

const ChartsV2 = (report) => {
  let _periods = report.report.data.periods
  if (_periods.length > 2) {
    _periods = _periods.slice(0, _periods.length - 1)
  }

  const summaries = _periods.map(d => {
    const temp ={ ...d.summary }
if(!temp.acos || temp.acos ==="N/A" ||temp.acos===Infinity)temp.acos = 0
if(!temp.ad_clicks || temp.ad_clicks ==="N/A" ||temp.ad_clicks===Infinity)temp.ad_clicks = 0
if(!temp.ad_impressions || temp.ad_impressions ==="N/A" ||temp.ad_impressions===Infinity)temp.ad_impressions = 0
if(!temp.ad_orders || temp.ad_orders ==="N/A" ||temp.ad_orders===Infinity)temp.ad_orders = 0
if(!temp.ad_sales || temp.ad_sales ==="N/A" ||temp.ad_sales===Infinity)temp.ad_sales = 0
if(!temp.ad_spend || temp.ad_spend ==="N/A" ||temp.ad_spend===Infinity)temp.ad_spend = 0
if(!temp.asin || temp.asin ==="N/A" ||temp.asin===Infinity)temp.asin = 0
if(!temp.asp || temp.asp ==="N/A" ||temp.asp===Infinity)temp.asp = 0
if(!temp.average_cpc || temp.average_cpc ==="N/A" ||temp.average_cpc===Infinity)temp.average_cpc = 0
if(!temp.conversion_rate || temp.conversion_rate ==="N/A" ||temp.conversion_rate===Infinity)temp.conversion_rate = 0
if(!temp.item_number || temp.item_number ==="N/A" ||temp.item_number===Infinity)temp.item_number = 0
if(!temp.orders || temp.orders ==="N/A" ||temp.orders===Infinity)temp.orders = 0
if(!temp.percent_total_sales || temp.percent_total_sales ==="N/A" ||temp.percent_total_sales===Infinity)temp.percent_total_sales = 0
if(!temp.sales || temp.sales ==="N/A" ||temp.sales===Infinity)temp.sales = 0
if(!temp.shipped_cogs || temp.shipped_cogs ==="N/A" ||temp.shipped_cogs===Infinity)temp.shipped_cogs = 0
if(!temp.sku || temp.sku ==="N/A" ||temp.sku===Infinity)temp.sku = 0
if(!temp.units_per_order || temp.units_per_order ==="N/A" ||temp.units_per_order===Infinity)temp.units_per_order = 0
if(!temp.units_sold || temp.units_sold ==="N/A" ||temp.units_sold===Infinity)temp.units_sold = 0
    return temp;
  }).reverse()


  const colorOrangeDark = getComputedStyle(document.body).getPropertyValue('--orange-dark')
  const colorTealMedium = getComputedStyle(document.body).getPropertyValue('--teal-medium')

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
          <SingleLineChart sign='$' name='Average Selling Price ($)' chartLabels={summaries.map((x, i) => i)} chartDataValues={summaries.map(x => x?.asp?.toFixed(2))} />
        </Grid>
        <Grid item xs={4}>
          <SingleLineChart sign='%' name='ACOS (%)' chartLabels={summaries.map((x, i) => i)} chartDataValues={summaries.map(x => x.acos.toFixed(2))} />
        </Grid>
        <Grid item xs={4}>
          <DonutChart chartDataValues={summaries} />
        </Grid>
      </Grid>
    </div>
  )

}

export default ChartsV2