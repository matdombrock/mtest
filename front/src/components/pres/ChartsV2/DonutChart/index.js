import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'

const DonutChart = ({ chartDataValues }) => {
    const getAdSales = () => {
        if (!chartDataValues.length) return 0
        const { ad_sales } = chartDataValues[1]
        if (!ad_sales) return 0
        return ad_sales.toFixed(2)
    }

    const getTotalSales = () => {
        if (!chartDataValues.length) return 0

        const { ad_sales, sales } = chartDataValues[1]
        if (!ad_sales || !sales) return 0

        const totalSales = sales && sales - ad_sales
        return totalSales.toFixed(2)
    }

    const data = {
        labels: [
            'Ad Sales ($)',
            'Total Sales ($) (not including ad sales)'
        ],
        datasets: [{
            data: [getAdSales(), getTotalSales()],
            backgroundColor: [
                '#ff9662',
                '#4fbcc3'
            ],
            hoverBackgroundColor: [
                '#ff9662',
                '#4fbcc3'
            ]
        }]
    }

    const options = {
        cutoutPercentage: 85
    }

    return <Doughnut data={data} options={options} />
}

export default DonutChart