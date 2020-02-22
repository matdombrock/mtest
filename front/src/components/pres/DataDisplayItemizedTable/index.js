import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import numberWithCommas from '../../../services/numberWithCommas';
import s from './style.module.scss';

const DataDisplayItemizedTable = (props) => {
    return(
        <Paper className={s.noBoxShadow}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={s.tableHead}>Date</TableCell>
                        <TableCell className={s.tableHead}>Sales</TableCell>
                        <TableCell className={s.tableHead} align="right">Units Sold</TableCell>
                        <TableCell className={s.tableHead} align="right">Shipped COGS</TableCell>
                        <TableCell className={s.tableHead} align="right">% of Total Sales</TableCell>
                        <TableCell className={s.tableHead} align="right">Ad Clicks</TableCell>
                        <TableCell className={s.tableHead} align="right">Ad Impressions</TableCell>
                        <TableCell className={s.tableHead} align="right">Avg CPC</TableCell>
                        <TableCell className={s.tableHead} align="right">Ad Spend</TableCell>
                        <TableCell className={s.tableHead} align="right">Ad Orders</TableCell>
                        <TableCell className={s.tableHead} align="right">Ad Sales</TableCell>
                        <TableCell className={s.tableHead} align="right">Conv Rate</TableCell>
                        <TableCell className={s.tableHead} align="right">ACoS</TableCell>
                        <TableCell className={s.tableHead} align="right">{props.data.period === "weekly" ? "WoW" : "MoM"} (sales)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.data.itemized ? props.data.itemized.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse().map((row, i, array) => (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                        <b>{row.date}</b>
                        </TableCell>
                        <TableCell align="right">{row.revenue ? ('$' + numberWithCommas(row.revenue)) : '$0.00'}</TableCell>
                        <TableCell align="right">{row.units_sold ? numberWithCommas(row.units_sold) : 0}</TableCell>
                        <TableCell align="right">{row.wholesale_cost ? ('$' + numberWithCommas(row.wholesale_cost)) : '$0.00'}</TableCell>
                        <TableCell align="right">{!isNaN(parseFloat(row.revenue)) ? (parseFloat(row.revenue) / parseFloat(props.data.summary.totalRevenue) * 100).toFixed(2) + '%' : '0%' }</TableCell>
                        <TableCell align="right">{row.clicks ? numberWithCommas(row.clicks) : 0}</TableCell>
                        <TableCell align="right">{row.impressions? numberWithCommas(row.impressions) : 0}</TableCell>
                        <TableCell align="right">{row.average_cpc ? ('$' + numberWithCommas(row.average_cpc)) : '$0.00'}</TableCell>
                        <TableCell align="right">{row.spend ? ('$' + numberWithCommas(row.spend)) : '$0.00'}</TableCell>
                        <TableCell align="right">{row.orders ? numberWithCommas(row.orders) : 0}</TableCell>
                        <TableCell align="right">{row.adSales ? ('$' + numberWithCommas(row.adSales)) : '$0.00'}</TableCell>
                        <TableCell align="right">{row.cvr + '%'}</TableCell>
                        <TableCell align="right">{row.acos ? (row.acos * 100).toFixed(2) + '%' : '0%'}</TableCell>
                        <TableCell align="right" className={i < array.length -1 ? Math.sign(((parseInt(row.revenue) - parseInt(array[i +1].revenue)) / parseInt(array[i +1].revenue) * 100).toFixed(2)) === -1 ? s.red : s.green : ''}>{i < array.length -1 ? ((parseInt(row.revenue) - parseInt(array[i +1].revenue)) / parseInt(array[i +1].revenue) * 100).toFixed(2) + '%' : 'N/A'}</TableCell>
                    </TableRow>
                )) : ''}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default DataDisplayItemizedTable;