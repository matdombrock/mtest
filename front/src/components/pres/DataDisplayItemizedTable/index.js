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
import SortIcon from "@material-ui/icons/Sort";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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
      charge,
      period: d.period
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
  const [sortBy, setSortBy] = useState(false);
  const [sortByInner, setSortByInner] = useState(false);
  const [sortAscendingBy, setSortAscendingBy] = useState(false);
  let currentData = props.data;
  const data = currentDataFormate(currentData);
  if (!currentData) return null;

  const filterData = data.sort((a, b) => {
    let tempSortBy = "asin";
    if (sortBy === 0) {
      tempSortBy = "date";
    } else if (sortBy === 1) {
      tempSortBy = "sales";
    } else if (sortBy === 2) {
      tempSortBy = "units_sold";
    } else if (sortBy === 3) {
      tempSortBy = "shipped_cogs";
    } else if (sortBy === 4) {
      tempSortBy = "percent_total_sales";
    } else if (sortBy === 5) {
      tempSortBy = "ad_clicks";
    } else if (sortBy === 6) {
      tempSortBy = "ad_impressions";
    } else if (sortBy === 7) {
      tempSortBy = "average_cpc";
    } else if (sortBy === 8) {
      tempSortBy = "ad_spend";
    } else if (sortBy === 9) {
      tempSortBy = "ad_orders";
    } else if (sortBy === 10) {
      tempSortBy = "ad_sales";
    } else if (sortBy === 11) {
      tempSortBy = "conversion_rate";
    } else if (sortBy === 12) {
      tempSortBy = "acos";
    }
    let tempFirst =
      sortByInner === 0
        ? "current"
        : sortByInner === 1
        ? "previous"
        : sortByInner === 2
        ? "change"
        : sortByInner === 3
        ? "charge"
        : "current";
    if (tempSortBy === "date")
      return !sortAscendingBy
        ? new Date(a.period.start).getTime() -
            new Date(b.period.start).getTime()
        : new Date(b.period.start).getTime() -
            new Date(a.period.start).getTime();
    return !sortAscendingBy
      ? a[tempFirst][tempSortBy] - b[tempFirst][tempSortBy]
      : b[tempFirst][tempSortBy] - a[tempFirst][tempSortBy];
  });

  const headerClick = index => {
    isComparisons && setActive(active === index ? false : index);
    setSortByInner(false);
  };
  const handleSort = columnId => {
    if (columnId === sortBy) {
      setSortAscendingBy(!sortAscendingBy);
    } else {
      setSortAscendingBy(false);
    }
    setSortBy(columnId);
    setSortByInner(false);
  };
  const handleSortInner = columnId => {
    if (columnId === sortByInner) {
      setSortAscendingBy(!sortAscendingBy);
    } else {
      setSortAscendingBy(false);
    }
    setSortByInner(columnId);
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
              <div>
                <span>
                  <span>Date Range</span>
                  <span onClick={() => handleSort(0)}>
                    {" "}
                    {active !== 0 &&
                      (sortBy === 0 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 1 && "4"}
            >
              <div>
                <span onClick={() => headerClick(1)}>
                  {isComparisons &&
                    (active === 1 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Sales</span>
                  <span onClick={() => handleSort(1)}>
                    {active !== 1 &&
                      (sortBy === 1 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 2 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(2)}>
                  {isComparisons &&
                    (active === 2 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Units Sold </span>
                  <span onClick={() => handleSort(2)}>
                    {active !== 2 &&
                      (sortBy === 2 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 3 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(3)}>
                  {isComparisons &&
                    (active === 3 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Shipped COGS </span>
                  <span onClick={() => handleSort(3)}>
                    {active !== 3 &&
                      (sortBy === 3 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 4 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(4)}>
                  {isComparisons &&
                    (active === 4 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>% of Total Sales </span>
                  <span onClick={() => handleSort(4)}>
                    {active !== 4 &&
                      (sortBy === 4 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 5 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(5)}>
                  {isComparisons &&
                    (active === 5 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Ad Clicks </span>
                  <span onClick={() => handleSort(5)}>
                    {active !== 5 &&
                      (sortBy === 5 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 6 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(6)}>
                  {isComparisons &&
                    (active === 6 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Ad Impressions </span>
                  <span onClick={() => handleSort(6)}>
                    {active !== 6 &&
                      (sortBy === 6 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 7 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(7)}>
                  {isComparisons &&
                    (active === 7 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Avg CPC </span>
                  <span onClick={() => handleSort(7)}>
                    {active !== 7 &&
                      (sortBy === 7 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 8 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(8)}>
                  {isComparisons &&
                    (active === 8 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Ad Spend </span>

                  <span onClick={() => handleSort(8)}>
                    {active !== 8 &&
                      (sortBy === 8 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>{" "}
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 9 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(9)}>
                  {isComparisons &&
                    (active === 9 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Ad Orders </span>
                  <span onClick={() => handleSort(9)}>
                    {active !== 9 &&
                      (sortBy === 9 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>{" "}
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 10 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(10)}>
                  {isComparisons &&
                    (active === 10 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Ad Sales </span>
                  <span onClick={() => handleSort(10)}>
                    {active !== 1 &&
                      (sortBy === 10 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>{" "}
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 11 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(11)}>
                  {isComparisons &&
                    (active === 11 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>Conv Rate </span>
                  <span onClick={() => handleSort(11)}>
                    {active !== 1 &&
                      (sortBy === 11 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>{" "}
                <span />
              </div>
            </th>
            <th
              className={s.tableHead}
              colSpan={isComparisons && active === 12 && "4"}
              align="right"
            >
              <div>
                <span onClick={() => headerClick(12)}>
                  {isComparisons &&
                    (active === 12 ? <RemoveIcon /> : <AddIcon />)}
                </span>
                <span>
                  <span>ACoS </span>
                  <span onClick={() => handleSort(12)}>
                    {active !== 1 &&
                      (sortBy === 12 ? (
                        sortAscendingBy ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )
                      ) : (
                        <SortIcon />
                      ))}
                  </span>
                </span>{" "}
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
                      <div>
                        <span>Current</span>
                        <span onClick={() => handleSortInner(0)}>
                          {" "}
                          {sortByInner === 0 ? (
                            sortAscendingBy ? (
                              <ArrowDropUpIcon />
                            ) : (
                              <ArrowDropDownIcon />
                            )
                          ) : (
                            <SortIcon />
                          )}
                        </span>
                      </div>
                    </th>
                    <th className={s.tableHead} align="right">
                      <div>
                        <span>Previous</span>
                        <span onClick={() => handleSortInner(1)}>
                          {" "}
                          {sortByInner === 1 ? (
                            sortAscendingBy ? (
                              <ArrowDropUpIcon />
                            ) : (
                              <ArrowDropDownIcon />
                            )
                          ) : (
                            <SortIcon />
                          )}
                        </span>
                      </div>
                    </th>
                    <th className={s.tableHead} align="right">
                      <div>
                        <span>Change #</span>
                        <span onClick={() => handleSortInner(2)}>
                          {" "}
                          {sortByInner === 2 ? (
                            sortAscendingBy ? (
                              <ArrowDropUpIcon />
                            ) : (
                              <ArrowDropDownIcon />
                            )
                          ) : (
                            <SortIcon />
                          )}
                        </span>
                      </div>
                    </th>
                    <th className={s.tableHead} align="right">
                      <div>
                        <span>Change %</span>
                        <span onClick={() => handleSortInner(3)}>
                          {" "}
                          {sortByInner === 3 ? (
                            sortAscendingBy ? (
                              <ArrowDropUpIcon />
                            ) : (
                              <ArrowDropDownIcon />
                            )
                          ) : (
                            <SortIcon />
                          )}
                        </span>
                      </div>
                    </th>{" "}
                  </>
                )}
              </tr>
            </>
          )}
          {filterData
            ? filterData.map((row, i, array) => {
                const { current, previous, change, charge } = row;
                return (
                  <tr key={i}>
                    {active === 0 ? (
                      <>
                        <td component="th" className="w-date">
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
                      <td component="th" className="w-date">
                        <b>
                          {moment(row.period.start)
                            .utc()
                            .format("MM/DD/YYYY")}{" "}
                          -{" "}
                          {moment(row.period.end)
                            .utc()
                            .format("MM/DD/YYYY")}
                        </b>
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
                          {change.ad_clicks !== 0
                            ? numberWithCommas(change.ad_clicks)
                            : "N/A"}
                        </td>

                        <td
                          align="right"
                          className={isNegative(charge.ad_clicks)}
                        >
                          {charge.ad_clicks !== 0
                            ? charge.ad_clicks + "%"
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
                            ? Number(charge.acos).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                      </>
                    ) : (
                      <td align="right">
                        {current.acos !== 0
                          ? Number(current.acos).toFixed(2) + "%"
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
