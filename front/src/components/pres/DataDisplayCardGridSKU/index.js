import React from 'react';
import s from './style.module.scss';
import Grid from '@material-ui/core/Grid';
import numberWithCommas from '../../../services/numberWithCommas';

const DataDisplayCardGridSKU = (props) => {

    let currentPeriodData,
        periodOverPeriodData,
        previousPeriodData;

    //an abstraction method to do the math for relative percentage between two #s
    const determineRelativePercentage = (number, previousNumber) => {
        return Math.sign((((previousNumber - number) / previousNumber) * 100).toFixed(2)) === -1 ? '+' + Math.abs((((previousNumber - number) / previousNumber) * 100).toFixed(2)) : '-'+(((previousNumber - number) / previousNumber) * 100).toFixed(2)
    }

    //this is for figuring out hte period over period data
    if(props.data.itemized){
        currentPeriodData = props.data.itemized.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()[0];
        previousPeriodData = props.data.itemized.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse()[1];
        
        if(currentPeriodData && previousPeriodData){
            periodOverPeriodData = {
                sales: determineRelativePercentage(currentPeriodData.sales, previousPeriodData.sales),
                units_sold: determineRelativePercentage(currentPeriodData.units_sold, previousPeriodData.units_sold),
                shipped_cogs: determineRelativePercentage(currentPeriodData.shipped_cogs, previousPeriodData.shipped_cogs),
                ad_spend: determineRelativePercentage(currentPeriodData.ad_spend, previousPeriodData.ad_spend),
                ad_sales: determineRelativePercentage(currentPeriodData.ad_sales, previousPeriodData.ad_sales),
                acos: determineRelativePercentage(currentPeriodData.acos, previousPeriodData.acos)
            }
        }

    }
if(!currentPeriodData) return <p>No Data Found</p>
    return(
        <div className={s.gridContainer}>
        <h3>Current Period Summary: {currentPeriodData ? currentPeriodData.date : ''}</h3>
            <Grid container spacing={4}>
                <Grid item className={s.gridItem} xs={2}>
                    <div className={s.gridInner}> 
                        <p className={s.title}>Sales</p>
                        <p className={s.data}>{currentPeriodData ? ('$' + numberWithCommas(currentPeriodData.sales)) : '$0.00'}</p>
                        <p className={s.data + ' ' + (periodOverPeriodData && Math.sign(periodOverPeriodData.sales) === 1 ? s.positive : s.negative)}>{periodOverPeriodData ? (numberWithCommas(periodOverPeriodData.sales)) + '%' : '0%'} </p>
                    </div>
                </Grid>
                <Grid item className={s.gridItem} xs={2}>
                    <div className={s.gridInner}> 
                        <p className={s.title}>Units Sold</p>
                        <p className={s.data}>{props.data.itemized ? numberWithCommas(currentPeriodData.units_sold) : '0'}</p>
                        <p className={s.data + ' ' + (periodOverPeriodData && Math.sign(periodOverPeriodData.units_sold) === 1 ? s.positive : s.negative)}>{periodOverPeriodData ? (numberWithCommas(periodOverPeriodData.units_sold)) + '%' : '0%'} </p>
                    </div>
                </Grid>
                <Grid item className={s.gridItem} xs={2}>
                    <div className={s.gridInner}> 
                        <p className={s.title}>Shipped COGS</p>
                        <p className={s.data}>{props.data.itemized ? ('$' + numberWithCommas(currentPeriodData.shipped_cogs)) : '$0.00'}</p>
                        <p className={s.data + ' ' + (periodOverPeriodData && Math.sign(periodOverPeriodData.shipped_cogs) === 1 ? s.positive : s.negative)}>{periodOverPeriodData ? (numberWithCommas(periodOverPeriodData.shipped_cogs)) + '%' : '0%'} </p>
                    </div>
                </Grid>
                <Grid item className={s.gridItem} xs={2}>
                    <div className={s.gridInner}> 
                        <p className={s.title}>Ad Spend</p>
                        <p className={s.data}>{props.data.itemized ? ('$' + numberWithCommas(currentPeriodData.ad_spend)) : '$0.00'}</p>
                        <p className={s.data + ' ' + (periodOverPeriodData && Math.sign(periodOverPeriodData.ad_spend) === -1 ? s.positive : s.negative)}>{periodOverPeriodData ? (numberWithCommas(periodOverPeriodData.ad_spend)) + '%' : '0%'} </p>
                    </div>
                </Grid>
                <Grid item className={s.gridItem} xs={2}>
                    <div className={s.gridInner}> 
                        <p className={s.title}>Ad Sales</p>
                        <p className={s.data}>{props.data.itemized ? ('$' + numberWithCommas(currentPeriodData.ad_sales)) : '$0.00'}</p>
                        <p className={s.data + ' ' + (periodOverPeriodData && Math.sign(periodOverPeriodData.ad_sales) === 1 ? s.positive : s.negative)}>{periodOverPeriodData ? (numberWithCommas(periodOverPeriodData.ad_sales)) + '%' : '0%'} </p>
                    </div>
                </Grid>
                <Grid item className={s.gridItem} xs={2}>
                    <div className={s.gridInner}> 
                        <p className={s.title}>ACoS</p>
                        <p className={s.data}>{props.data.itemized ? (numberWithCommas(currentPeriodData.acos)) + '%' : '0%'}</p>
                        <p className={s.data + ' ' + (periodOverPeriodData && Math.sign(periodOverPeriodData.acos) === 1 ? s.positive : s.negative)}>{periodOverPeriodData ? (numberWithCommas(periodOverPeriodData.acos)) + '%' : '0%'} </p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default DataDisplayCardGridSKU;