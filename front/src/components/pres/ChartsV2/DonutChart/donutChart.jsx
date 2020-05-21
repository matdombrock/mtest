import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const DonutChart = (props) => {
    const { chartDataValues } = props

    const getAdSales = () => {
        if (!chartDataValues.length) return 0
        const { ad_sales } = chartDataValues[1]
        if (!ad_sales) return 0
        return ad_sales
    }

    const getTotalSales = () => {
        if (!chartDataValues.length) return 0

        const { ad_sales, sales } = chartDataValues[1]
        if (!ad_sales || !sales) return 0

        const totalSales = sales && sales - ad_sales
        return totalSales
    }

    const data = {
        labels: [
            'Ad Sales ($)',
            'Total Sales ($) (not including ad sales)'
        ],
        datasets: [{
            data: [getAdSales(), getTotalSales()],
            backgroundColor: [
                '#36A2EB',
                '#1fc22a'
            ],
            hoverBackgroundColor: [
                '#36A2EB',
                '#1fc22a'
            ]
        }]
    };

    return <Doughnut data={data} />
}

export default DonutChart