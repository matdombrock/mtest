import React, { useState } from "react";
import table from "@material-ui/core/Table";
// import TableBody from '@material-ui/core/TableBody';
// import tr from '@material-ui/core/tr';
import th from "@material-ui/core/TableHead";
import tr from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const currentDataFormate = data => {
  let payload = [];
  data.map((d, i, arr) => {
    const current = d.summary;
    const previous =
      i < arr.length - 1
        ? arr[i + 1].summary
        : {
            acos: 0,
            average_cpc: 0,
            ad_clicks: 0,
            ad_impressions: 0,
            ad_orders: 0,
            ad_sales: 0,
            ad_spend: 0,
            conversion_rate: 0,
            sales: 0,
            shipped_cogs: 0,
            units_sold: 0,
            asin: "N/A",
            sku: "N/A",
            percent_total_sales: 0,
            item_number: "N/A"
          };
    const change = {
      acos: getDifferenceInNumber(current.acos, previous.acos),
      ad_clicks: getDifferenceInNumber(current.ad_clicks, previous.ad_clicks),
      ad_impressions: getDifferenceInNumber(
        current.ad_impressions,
        previous.ad_impressions
      ),
      ad_orders: getDifferenceInNumber(current.ad_orders, previous.ad_orders),
      ad_sales: getDifferenceInNumber(current.ad_sales, previous.ad_sales),
      ad_spend: getDifferenceInNumber(current.ad_spend, previous.ad_spend),
      asin: "N/A",
      average_cpc: getDifferenceInNumber(
        current.average_cpc,
        previous.average_cpc
      ),
      conversion_rate: getDifferenceInNumber(
        current.conversion_rate,
        previous.conversion_rate
      ),
      item_number: "N/A",
      percent_total_sales: getDifferenceInNumber(
        current.percent_total_sales,
        previous.percent_total_sales
      ),
      sales: getDifferenceInNumber(current.sales, previous.sales),
      shipped_cogs: getDifferenceInNumber(
        current.shipped_cogs,
        previous.shipped_cogs
      ),
      sku: "N/A",
      units_sold: getDifferenceInNumber(current.units_sold, previous.units_sold)
    };
    const charge = {
      acos: getDifferenceInPercentage(current.acos, previous.acos),
      ad_clicks: getDifferenceInPercentage(
        current.ad_clicks,
        previous.ad_clicks
      ),
      ad_impressions: getDifferenceInPercentage(
        current.ad_impressions,
        previous.ad_impressions
      ),
      ad_orders: getDifferenceInPercentage(
        current.ad_orders,
        previous.ad_orders
      ),
      ad_sales: getDifferenceInPercentage(current.ad_sales, previous.ad_sales),
      ad_spend: getDifferenceInPercentage(current.ad_spend, previous.ad_spend),
      asin: "N/A",
      average_cpc: getDifferenceInPercentage(
        current.average_cpc,
        previous.average_cpc
      ),
      conversion_rate: getDifferenceInPercentage(
        current.conversion_rate,
        previous.conversion_rate
      ),
      item_number: "N/A",
      percent_total_sales: getDifferenceInPercentage(
        current.percent_total_sales,
        previous.percent_total_sales
      ),
      sales: getDifferenceInPercentage(current.sales, previous.sales),
      shipped_cogs: getDifferenceInPercentage(
        current.shipped_cogs,
        previous.shipped_cogs
      ),
      sku: "N/A",
      units_sold: getDifferenceInPercentage(
        current.units_sold,
        previous.units_sold
      )
    };

    payload.push({
      current,
      previous,
      change,
      charge
    });
  });
  return payload;
};

const getDifferenceInNumber = (current, previous) => {
  let payload = Number(current - previous).toFixed(2);
  return isNaN(payload) ? 0 : Number(payload);
};

const getDifferenceInPercentage = (current, previous) => {
  const totalDifference = getDifferenceInNumber(current, previous);
  if (previous === 0 && current === 0) return 0;
  if (previous === 0) return 100;
  const payload =
    totalDifference === 0
      ? 0
      : Number((totalDifference / Number(previous)) * 100).toFixed(2);
  return isNaN(payload) ? 0 : Number(payload);
};

const isNegative = value => (Number(value) <= 0 ? s.red : s.green);

const DataDisplayItemizedTable = props => {
  const isComparisons = true;
  const [active, setActive] = useState(false);
  let currentData = props.data;
  const data = currentDataFormate(currentData);
  if (!currentData) return null;

  const headerClick = index => {
    isComparisons && setActive(active === index ? false : index);
  };

  return (
    <div className={s.noBoxShadow + " fixed-header-table"}>
      <table aria-label="simple table">
        <thead>
          <tr>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 0 && "4"}
            >
              # No
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 1 && "4"}
              onClick={() => headerClick(1)}
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 1 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Sales</span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 2 && "4"}
              onClick={() => headerClick(2)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 2 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Units Sold </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 3 && "4"}
              onClick={() => headerClick(3)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 3 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Shipped COGS </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 4 && "4"}
              onClick={() => headerClick(4)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 4 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>% of Total Sales </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 5 && "4"}
              onClick={() => headerClick(5)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 5 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Ad Clicks </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 6 && "4"}
              onClick={() => headerClick(6)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 6 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Ad Impressions </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 7 && "4"}
              onClick={() => headerClick(7)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 7 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Avg CPC </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 8 && "4"}
              onClick={() => headerClick(8)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 8 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Ad Spend </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 9 && "4"}
              onClick={() => headerClick(9)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 9 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>Ad Orders </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 10 && "4"}
              onClick={() => headerClick(10)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 10 ? <RemoveIcon /> : <AddIcon />)}
                </span>

                <span>Ad Sales </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 11 && "4"}
              onClick={() => headerClick(11)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 11 ? <RemoveIcon /> : <AddIcon />)}
                </span>

                <span>Conv Rate </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 12 && "4"}
              onClick={() => headerClick(12)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 12 ? <RemoveIcon /> : <AddIcon />)}
                </span>

                <span>ACoS </span>
                <span />
              </div>
            </th>
            {/* <th
              className={s.tableHead}
              colSpan={isComparisons && active === 13 && "4"}
              onClick={() => headerClick(13)}
              align="right"
            >
              <div>
                <span>
                  {isComparisons &&
                    (active === 13 ? <RemoveIcon /> : <AddIcon />)}
                </span>

                <span>
                  {props.data.period === "weekly" ? "WoW" : "MoM"} (sales){" "}
                </span>
                <span />
              </div>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {isComparisons && active && (
            <>
              <tr>
                {active !== 0 && (
                  <th
                    colSpan={active}
                    className={s.tableHead}
                    align="right"
                  ></th>
                )}

                {active !== false && (
                  <>
                    {" "}
                    <th className={s.tableHead} align="right">
                      Current
                    </th>
                    <th className={s.tableHead} align="right">
                      Previous
                    </th>
                    <th className={s.tableHead} align="right">
                      Change #
                    </th>
                    <th className={s.tableHead} align="right">
                      Change %
                    </th>
                  </>
                )}
              </tr>
            </>
          )}
          {data
            ? data.map((row, i, array) => {
                const { current, previous, change, charge } = row;
                return (
                  <tr key={i}>
                    {active === 0 ? (
                      <>
                        <td component="th">
                          <b>{i + 1}</b>
                        </td>
                        {/* <td component="th">
                            <b>{i}</b>
                          </td>
                          <td component="th">
                            <b>{i}</b>
                          </td>
                          <td component="th">
                            <b>{i}</b>
                          </td>
                        */}
                      </>
                    ) : (
                      <td component="th">
                        <b>{i + 1}</b>
                      </td>
                    )}
                    {isComparisons && active === 1 ? (
                      <>
                        <td align="right">
                          {current.sales !== 0
                            ? "$" + numberWithCommas(current.sales)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.sales !== 0
                            ? "$" + numberWithCommas(previous.sales)
                            : "N/A"}
                        </td>
                        <td align="right" className={isNegative(change.sales)}>
                          {change.sales !== 0 ? "$" + change.sales : "N/A"}
                        </td>
                        <td align="right" className={isNegative(charge.sales)}>
                          {charge.sales !== 0 ? charge.sales + "%" : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.sales !== 0
                          ? "$" + numberWithCommas(current.sales)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 2 ? (
                      <>
                        <td align="right">
                          {current.units_sold !== 0
                            ? numberWithCommas(current.units_sold)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.units_sold !== 0
                            ? numberWithCommas(previous.units_sold)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.units_sold)}
                        >
                          {change.units_sold !== 0
                            ? numberWithCommas(change.units_sold)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.units_sold)}
                        >
                          {current.units_sold !== 0
                            ? charge.units_sold + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.units_sold !== 0
                          ? numberWithCommas(current.units_sold)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 3 ? (
                      <>
                        <td align="right">
                          {current.shipped_cogs !== 0
                            ? "$" + numberWithCommas(current.shipped_cogs)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.shipped_cogs !== 0
                            ? "$" + numberWithCommas(previous.shipped_cogs)
                            : "N/A"}
                        </td>

                        <td
                          align="right"
                          className={isNegative(change.shipped_cogs)}
                        >
                          {current.shipped_cogs !== 0
                            ? "$" + numberWithCommas(change.shipped_cogs)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.shipped_cogs)}
                        >
                          {charge.shipped_cogs !== 0
                            ? charge.shipped_cogs + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.shipped_cogs !== 0
                          ? "$" + numberWithCommas(current.shipped_cogs)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 4 ? (
                      <>
                        <td align="right">
                          {current.percent_total_sales !== 0
                            ? Number(current.percent_total_sales).toFixed(2) +
                              "%"
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.percent_total_sales !== 0
                            ? Number(previous.percent_total_sales).toFixed(2) +
                              "%"
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.percent_total_sales)}
                        >
                          {change.percent_total_sales !== 0
                            ? change.percent_total_sales
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.percent_total_sales)}
                        >
                          {charge.percent_total_sales !== 0
                            ? Number(charge.percent_total_sales).toFixed(2) +
                              "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.percent_total_sales !== 0
                          ? Number(current.percent_total_sales).toFixed(2) + "%"
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 5 ? (
                      <>
                        <td align="right">
                          {current.ad_clicks !== 0
                            ? numberWithCommas(current.ad_clicks)
                            : "N/A"}
                        </td>

                        <td align="right">
                          {previous.ad_clicks !== 0
                            ? numberWithCommas(previous.ad_clicks)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_clicks)}
                        >
                          {(change.ad_clicks !== 0) !== 0
                            ? numberWithCommas(charge.ad_clicks)
                            : "N/A"}
                        </td>

                        <td
                          align="right"
                          className={isNegative(charge.ad_clicks)}
                        >
                          {(charge.ad_clicks !== 0) !== 0
                            ? getDifferenceInPercentage(charge.ad_clicks) + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.ad_clicks !== 0
                          ? numberWithCommas(current.ad_clicks)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 6 ? (
                      <>
                        <td align="right">
                          {current.ad_impressions !== 0
                            ? numberWithCommas(current.ad_impressions)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.ad_impressions !== 0
                            ? numberWithCommas(previous.ad_impressions)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_impressions)}
                        >
                          {change.ad_impressions !== 0
                            ? numberWithCommas(change.ad_impressions)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_impressions)}
                        >
                          {charge.ad_impressions !== 0
                            ? charge.ad_impressions + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.ad_impressions
                          ? numberWithCommas(current.ad_impressions)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 7 ? (
                      <>
                        <td align="right">
                          {current.average_cpc
                            ? "$" + numberWithCommas(current.average_cpc)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.average_cpc
                            ? "$" + numberWithCommas(previous.average_cpc)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.average_cpc)}
                        >
                          {change.average_cpc !== 0
                            ? "$" + numberWithCommas(change.average_cpc)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.average_cpc)}
                        >
                          {charge.average_cpc !== 0
                            ? charge.average_cpc + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.average_cpc
                          ? "$" + numberWithCommas(current.average_cpc)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 8 ? (
                      <>
                        <td align="right">
                          {current.ad_spend
                            ? "$" + numberWithCommas(current.ad_spend)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.ad_spend
                            ? "$" + numberWithCommas(previous.ad_spend)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_spend)}
                        >
                          {change.ad_spend !== 0
                            ? "$" + numberWithCommas(change.ad_spend)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_spend)}
                        >
                          {current.ad_spend !== 0
                            ? charge.ad_spend + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.ad_spend
                          ? "$" + numberWithCommas(current.ad_spend)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 9 ? (
                      <>
                        <td align="right">
                          {current.ad_orders
                            ? numberWithCommas(current.ad_orders)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.ad_orders
                            ? numberWithCommas(previous.ad_orders)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_orders)}
                        >
                          {change.ad_orders !== 0
                            ? numberWithCommas(change.ad_orders)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_orders)}
                        >
                          {charge.ad_orders !== 0
                            ? charge.ad_orders + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.ad_orders
                          ? numberWithCommas(current.ad_orders)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 10 ? (
                      <>
                        <td align="right">
                          {current.ad_sales
                            ? "$" + numberWithCommas(current.ad_sales)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.ad_sales
                            ? "$" + numberWithCommas(previous.ad_sales)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_sales)}
                        >
                          {change.ad_sales !== 0
                            ? "$" + numberWithCommas(change.ad_sales)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_sales)}
                        >
                          {charge.ad_sales !== 0
                            ? charge.ad_sales + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.ad_sales !== 0
                          ? "$" + numberWithCommas(current.ad_sales)
                          : "N/A"}
                      </td>
                    )}

                    {isComparisons && active === 11 ? (
                      <>
                        <td align="right">
                          {current.conversion_rate !== 0
                            ? Number(current.conversion_rate).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.conversion_rate !== 0
                            ? Number(previous.conversion_rate).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.conversion_rate)}
                        >
                          {change.conversion_rate !== 0
                            ? Number(change.conversion_rate).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.conversion_rate)}
                        >
                          {charge.conversion_rate !== 0
                            ? Number(charge.conversion_rate).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {Number(current.conversion_rate).toFixed(2) + "%"}
                      </td>
                    )}

                    {isComparisons && active === 12 ? (
                      <>
                        <td align="right">
                          {current.acos !== 0
                            ? Number(current.acos).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.acos !== 0
                            ? Number(previous.acos).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td align="right" className={isNegative(change.acos)}>
                          {change.acos !== 0
                            ? Number(change.acos).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td align="right" className={isNegative(charge.acos)}>
                          {charge.acos !== 0
                            ? Number(charge.acos).toFixed() + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.acos !== 0
                          ? Number(current.acos).toFixed() + "%"
                          : "N/A"}
                      </td>
                    )}

                    {/* {isComparisons && active === 13 ? (
                        <>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < props.comparisons.itemized.length - 1
                              ? (
                                  ((parseInt(previous.revenue) -
                                    parseInt(
                                      props.comparisons.itemized[i + 1].revenue
                                    )) /
                                    parseInt(
                                      props.comparisons.itemized[i + 1].revenue
                                    )) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < array.length - 1
                              ? (
                                  ((parseInt(current.revenue) -
                                    parseInt(array[i + 1].revenue)) /
                                    parseInt(array[i + 1].revenue)) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < array.length - 1
                              ? (
                                  ((parseInt(current.revenue) -
                                    parseInt(array[i + 1].revenue)) /
                                    parseInt(array[i + 1].revenue)) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={
                              i < array.length - 1
                                ? Math.sign(
                                    (
                                      ((parseInt(current.revenue) -
                                        parseInt(array[i + 1].revenue)) /
                                        parseInt(array[i + 1].revenue)) *
                                      100
                                    ).toFixed(2)
                                  ) === -1
                                  ? s.red
                                  : s.green
                                : ""
                            }
                          >
                            {i < array.length - 1
                              ? (
                                  ((parseInt(current.revenue) -
                                    parseInt(array[i + 1].revenue)) /
                                    parseInt(array[i + 1].revenue)) *
                                  100
                                ).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td
                          align="right"
                          className={
                            i < array.length - 1
                              ? Math.sign(
                                  (
                                    ((parseInt(current.revenue) -
                                      parseInt(array[i + 1].revenue)) /
                                      parseInt(array[i + 1].revenue)) *
                                    100
                                  ).toFixed(2)
                                ) === -1
                                ? s.red
                                : s.green
                              : ""
                          }
                        >
                          {i < array.length - 1
                            ? (
                                ((parseInt(current.revenue) -
                                  parseInt(array[i + 1].revenue)) /
                                  parseInt(array[i + 1].revenue)) *
                                100
                              ).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                      )} */}
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplayItemizedTable;
