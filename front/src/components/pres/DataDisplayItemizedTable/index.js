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
import Button from "@material-ui/core/Button";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { CSVLink } from "react-csv";
import DownloadCSVButton from "./../../common/downloadCSVButton";
import TableTotalRowCell from "./../Table/table-totalrow-cell";
import TableCell from "./../Table/table-cell";
import {
  filterDataAndFormat,
  getFrontendFormattedTotal,
  getCSVVersion,
} from "../../common/helperBrandDashboard";

const DataDisplayItemizedTable = (props) => {
  const isComparisons = true;

  const [active, setActive] = useState(false);
  const [sortBy, setSortBy] = useState(false);

  const [sortByInner, setSortByInner] = useState(false);
  const [sortAscendingBy, setSortAscendingBy] = useState(false);

  let currentData = props.data.data;
  let isYoY = !!currentData.comparisons.yoy.length;

  const {
    comparisons: { yoy, pop },
  } = currentData;

  if (!currentData) return null;

  const filterData = filterDataAndFormat(
    currentData,
    yoy,
    pop,
    sortBy,
    sortByInner,
    sortAscendingBy
  );

  const headerClick = (index) => {
    isComparisons && setActive(active === index ? false : index);
    setSortByInner(false);
  };
  const handleSort = (columnId) => {
    if (columnId === sortBy) {
      setSortAscendingBy(!sortAscendingBy);
    } else {
      setSortAscendingBy(false);
    }
    setSortBy(columnId);
    setSortByInner(false);
  };
  const handleSortInner = (columnId) => {
    if (columnId === sortByInner) {
      setSortAscendingBy(!sortAscendingBy);
    } else {
      setSortAscendingBy(false);
    }
    setSortBy(sortBy || active);
    setSortByInner(columnId);
  };

  const yoyTotal = currentData.comparisons.totals;
  const currentTotal = currentData.totals.periods;
  const totalOfData = getFrontendFormattedTotal(
    filterData,
    yoyTotal,
    currentTotal
  );

  return (
    <>
      <CSVLink
        className="link-download"
        data={getCSVVersion(filterData, isYoY, totalOfData)}
        filename={"brand.csv"}
      >
        <DownloadCSVButton />
      </CSVLink>
      <div className={s.noBoxShadow + " fixed-header-table table-scroll"}>
        <table aria-label="simple table">
          <thead>
            <tr>
              <th
                className={s.tableHead}
                colSpan={isComparisons && active === 0 && (isYoY ? "6" : "4")}
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
                colSpan={isComparisons && active === 1 && (isYoY ? "6" : "4")}
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
                colSpan={isComparisons && active === 2 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(2)}>
                    {isComparisons &&
                      (active === 2 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Shipped COGS </span>
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
                colSpan={isComparisons && active === 3 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(3)}>
                    {isComparisons &&
                      (active === 3 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Orders</span>
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
                colSpan={isComparisons && active === 4 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(4)}>
                    {isComparisons &&
                      (active === 4 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Units Sold </span>
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
                colSpan={isComparisons && active === 5 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(5)}>
                    {isComparisons &&
                      (active === 5 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Units Per Order</span>
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
                colSpan={isComparisons && active === 6 && (isYoY ? "6" : "4")}
              >
                <div>
                  <span onClick={() => headerClick(6)}>
                    {isComparisons &&
                      (active === 6 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>ASP</span>
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
                colSpan={isComparisons && active === 7 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(7)}>
                    {isComparisons &&
                      (active === 7 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Ad Impressions </span>
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
                colSpan={isComparisons && active === 8 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(8)}>
                    {isComparisons &&
                      (active === 8 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Ad Clicks </span>
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
                  </span>
                  <span />
                </div>
              </th>
              <th
                className={s.tableHead}
                colSpan={isComparisons && active === 9 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(9)}>
                    {isComparisons &&
                      (active === 9 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Avg CPC </span>
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
                  </span>
                  <span />
                </div>
              </th>
              <th
                className={s.tableHead}
                colSpan={isComparisons && active === 10 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(10)}>
                    {isComparisons &&
                      (active === 10 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Ad Spend </span>

                    <span onClick={() => handleSort(10)}>
                      {active !== 10 &&
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
                colSpan={isComparisons && active === 11 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(11)}>
                    {isComparisons &&
                      (active === 11 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Ad Orders </span>
                    <span onClick={() => handleSort(11)}>
                      {active !== 11 &&
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
                colSpan={isComparisons && active === 12 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(12)}>
                    {isComparisons &&
                      (active === 12 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Ad Sales </span>
                    <span onClick={() => handleSort(12)}>
                      {active !== 12 &&
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
              <th
                className={s.tableHead}
                colSpan={isComparisons && active === 13 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(13)}>
                    {isComparisons &&
                      (active === 13 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>% of Total Sales </span>
                    <span onClick={() => handleSort(13)}>
                      {active !== 13 &&
                        (sortBy === 13 ? (
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
                colSpan={isComparisons && active === 14 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(14)}>
                    {isComparisons &&
                      (active === 14 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Conv Rate </span>
                    <span onClick={() => handleSort(14)}>
                      {active !== 14 &&
                        (sortBy === 14 ? (
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
                colSpan={isComparisons && active === 15 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(15)}>
                    {isComparisons &&
                      (active === 15 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>ACoS </span>
                    <span onClick={() => handleSort(15)}>
                      {active !== 15 &&
                        (sortBy === 15 ? (
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
                      </th>
                      {isYoY && (
                        <th className={s.tableHead} align="right">
                          <div>
                            <span>Change # YOY</span>
                            <span onClick={() => handleSortInner(4)}>
                              {" "}
                              {sortByInner === 4 ? (
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
                      )}
                      {isYoY && (
                        <th className={s.tableHead} align="right">
                          <div>
                            <span>Change % YOY</span>
                            <span onClick={() => handleSortInner(5)}>
                              {" "}
                              {sortByInner === 5 ? (
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
                      )}
                    </>
                  )}
                </tr>
              </>
            )}
            {filterData
              ? filterData.map((row, i, array) => {
                  const {
                    current,
                    previous,
                    change,
                    charge,
                    yoy,
                    yoyCharge,
                  } = row;
                  return (
                    <tr key={i}>
                      {active === 0 ? (
                        <>
                          <td component="th" className="w-date">
                            <b>{i + 1}</b>
                          </td>
                        </>
                      ) : (
                        <td component="th" className="w-date">
                          <b>
                            {moment(row.period.start)
                              .utc()
                              .format("MM/DD/YYYY")}{" "}
                            -{" "}
                            {moment(row.period.end).utc().format("MM/DD/YYYY")}
                          </b>
                        </td>
                      )}

                      <TableCell
                        current={current.sales}
                        previous={previous.sales}
                        change={change.sales}
                        charge={charge.sales}
                        yoy={yoy.sales}
                        yoyCharge={yoyCharge.sales}
                        isComparisons={isComparisons}
                        isActive={active === 1}
                        isYoY={isYoY}
                        symbol="$"
                      ></TableCell>
                      <TableCell
                        current={current.shipped_cogs}
                        previous={previous.shipped_cogs}
                        change={change.shipped_cogs}
                        charge={charge.shipped_cogs}
                        yoy={yoy.shipped_cogs}
                        yoyCharge={yoyCharge.shipped_cogs}
                        isComparisons={isComparisons}
                        isActive={active === 2}
                        isYoY={isYoY}
                        symbol="$"
                      ></TableCell>
                      <TableCell
                        current={current.orders}
                        previous={previous.orders}
                        change={change.orders}
                        charge={charge.orders}
                        yoy={yoy.orders}
                        yoyCharge={yoyCharge.orders}
                        isComparisons={isComparisons}
                        isActive={active === 3}
                        isYoY={isYoY}
                        symbol=""
                      ></TableCell>
                      <TableCell
                        current={current.units_sold}
                        previous={previous.units_sold}
                        change={change.units_sold}
                        charge={charge.units_sold}
                        yoy={yoy.units_sold}
                        yoyCharge={yoyCharge.units_sold}
                        isComparisons={isComparisons}
                        isActive={active === 4}
                        symbol=""
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.units_per_order}
                        previous={previous.units_per_order}
                        change={change.units_per_order}
                        charge={charge.units_per_order}
                        yoy={yoy.units_per_order}
                        yoyCharge={yoyCharge.units_per_order}
                        isComparisons={isComparisons}
                        isActive={active === 5}
                        isYoY={isYoY}
                        symbol=""
                      ></TableCell>
                      <TableCell
                        current={current.asp}
                        previous={previous.asp}
                        change={change.asp}
                        charge={charge.asp}
                        yoy={yoy.asp}
                        yoyCharge={yoyCharge.asp}
                        isComparisons={isComparisons}
                        isActive={active === 6}
                        isYoY={isYoY}
                        symbol="$"
                      ></TableCell>
                      <TableCell
                        current={current.ad_impressions}
                        previous={previous.ad_impressions}
                        change={change.ad_impressions}
                        charge={charge.ad_impressions}
                        yoy={yoy.ad_impressions}
                        yoyCharge={yoyCharge.ad_impressions}
                        isComparisons={isComparisons}
                        isActive={active === 7}
                        symbol=""
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.ad_clicks}
                        previous={previous.ad_clicks}
                        change={change.ad_clicks}
                        charge={charge.ad_clicks}
                        yoy={yoy.ad_clicks}
                        yoyCharge={yoyCharge.ad_clicks}
                        isComparisons={isComparisons}
                        isActive={active === 8}
                        isYoY={isYoY}
                        symbol=""
                      ></TableCell>
                      <TableCell
                        current={current.average_cpc}
                        previous={previous.average_cpc}
                        change={change.average_cpc}
                        charge={charge.average_cpc}
                        yoy={yoy.average_cpc}
                        yoyCharge={yoyCharge.average_cpc}
                        isComparisons={isComparisons}
                        isActive={active === 9}
                        symbol="$"
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.ad_spend}
                        previous={previous.ad_spend}
                        change={change.ad_spend}
                        charge={charge.ad_spend}
                        yoy={yoy.ad_spend}
                        yoyCharge={yoyCharge.ad_spend}
                        isComparisons={isComparisons}
                        symbol="$"
                        isActive={active === 10}
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.ad_orders}
                        previous={previous.ad_orders}
                        change={change.ad_orders}
                        charge={charge.ad_orders}
                        yoy={yoy.ad_orders}
                        yoyCharge={yoyCharge.ad_orders}
                        isComparisons={isComparisons}
                        symbol=""
                        isActive={active === 11}
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.ad_sales}
                        previous={previous.ad_sales}
                        change={change.ad_sales}
                        charge={charge.ad_sales}
                        yoy={yoy.ad_sales}
                        yoyCharge={yoyCharge.ad_sales}
                        isComparisons={isComparisons}
                        isActive={active === 12}
                        symbol="$"
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.percent_total_sales}
                        previous={previous.percent_total_sales}
                        change={change.percent_total_sales}
                        charge={charge.percent_total_sales}
                        yoy={yoy.percent_total_sales}
                        yoyCharge={yoyCharge.percent_total_sales}
                        symbol="%"
                        isComparisons={isComparisons}
                        isActive={active === 13}
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.conversion_rate}
                        previous={previous.conversion_rate}
                        change={change.conversion_rate}
                        charge={charge.conversion_rate}
                        yoy={yoy.conversion_rate}
                        yoyCharge={yoyCharge.conversion_rate}
                        isComparisons={isComparisons}
                        isActive={active === 14}
                        symbol="%"
                        isYoY={isYoY}
                      ></TableCell>
                      <TableCell
                        current={current.acos}
                        previous={previous.acos}
                        change={change.acos}
                        charge={charge.acos}
                        yoy={yoy.acos}
                        yoyCharge={yoyCharge.acos}
                        isComparisons={isComparisons}
                        symbol="$"
                        isActive={active === 15}
                        isYoY={isYoY}
                      ></TableCell>
                    </tr>
                  );
                })
              : ""}
          </tbody>

          <tfoot>
            <tr>
              <td component="th">
                <b>Total</b>
              </td>

              <TableTotalRowCell
                cellData={totalOfData.sales}
                isComparisons={isComparisons}
                isActive={active === 1}
                isYoY={isYoY}
                symbol="$"
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.shipped_cogs}
                isComparisons={isComparisons}
                isActive={active === 2}
                symbol="$"
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.orders}
                isComparisons={isComparisons}
                symbol=""
                isActive={active === 3}
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.units_sold}
                isComparisons={isComparisons}
                isActive={active === 4}
                symbol=""
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.units_per_order}
                isComparisons={isComparisons}
                isActive={active === 5}
                symbol=""
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.asp}
                isComparisons={isComparisons}
                isActive={active === 6}
                symbol="$"
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.ad_impressions}
                isComparisons={isComparisons}
                isActive={active === 7}
                symbol=""
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.ad_clicks}
                isComparisons={isComparisons}
                isActive={active === 8}
                symbol=""
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.average_cpc}
                isComparisons={isComparisons}
                isActive={active === 9}
                symbol="$"
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.ad_spend}
                isComparisons={isComparisons}
                isActive={active === 10}
                symbol="$"
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.ad_orders}
                isComparisons={isComparisons}
                isActive={active === 11}
                symbol=""
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.ad_sales}
                isComparisons={isComparisons}
                symbol="$"
                isActive={active === 12}
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.percent_total_sales}
                isComparisons={isComparisons}
                symbol="%"
                isActive={active === 13}
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.conversion_rate}
                isComparisons={isComparisons}
                isActive={active === 14}
                symbol="%"
                isYoY={isYoY}
              ></TableTotalRowCell>
              <TableTotalRowCell
                cellData={totalOfData.acos}
                isComparisons={isComparisons}
                isActive={active === 15}
                symbol="$"
                isYoY={isYoY}
              ></TableTotalRowCell>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default DataDisplayItemizedTable;
