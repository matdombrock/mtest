import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const DonutChart = (props) => {

    const { chartDataValues } = props
    const colorTealMedium = getComputedStyle(document.body).getPropertyValue('--teal-medium')
    const colorOrangeDark = getComputedStyle(document.body).getPropertyValue('--orange-dark')

    const getAdSales = () => {
        if (!chartDataValues.length) return 0
        const { ad_sales } = chartDataValues[1] || 0
        if (!ad_sales) return 0
        return ad_sales.toFixed(2)
    }

    const getTotalSales = () => {
        if (!chartDataValues.length) return 0

        const { ad_sales, sales } = chartDataValues[1] || 0
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
                colorOrangeDark,
                colorTealMedium
            ],
            hoverBackgroundColor: [
                colorOrangeDark,
                colorTealMedium
            ]
        }]
    }

    return <Doughnut data={data} />
}

export default DonutChart