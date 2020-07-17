import React, { useState } from "react";
import table from "@material-ui/core/Table";
// import TableBody from '@material-ui/core/TableBody';
// import tr from '@material-ui/core/tr';
import th from "@material-ui/core/TableHead";
import tr from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";
// import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SortIcon from "@material-ui/icons/Sort";
import Button from '@material-ui/core/Button'
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { CSVLink } from "react-csv";
import moment from 'moment'
import DownloadCSVButton from './../../common/downloadCSVButton'
import TableTotalRowCell from './../Table/table-totalrow-cell';
import {filerDataAndConvertToFrontendReadyFormat,getCSVVersion,getFrontendFormattedTotal} from "../../common/helperSKUDashboard"


const isNegative = (value) =>
  Number(value) !== 0 && (Number(value) <= 0 ? s.red : s.green);


const DataDisplaySKUTable = (props) => {

  const [active, setActive] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const [sortByInner, setSortByInner] = useState(false);
  const [sortAscendingBy, setSortAscendingBy] = useState(false);

  const isComparisons = true;
  let currentData = props.data.data.periods[0];
  let previousData = props.data.data.periods[1];

  if (!currentData) return null;

  const { comparisons } = props.data.data

  const { pop } = comparisons
  let isYoY = !!comparisons.yoy.length;

  

  const filterSKUData = filerDataAndConvertToFrontendReadyFormat(
    currentData?.itemized,
    previousData?.itemized,
    !!comparisons.yoy.length ? comparisons.yoy[0].itemized : [],
    pop[0]?.summary,
    comparisons.yoy[0] ? comparisons.yoy[0]?.summary : null,
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

  const yoyTotal = comparisons.totals[0];
  const currentTotal = props.data.data.totals.periods;
  const totalOfData = getFrontendFormattedTotal(filterSKUData, yoyTotal, currentTotal);

  return (
    <>
      <h3 style={{ width: '100%', marginLeft: '450px' }}>
        Current Period Summary:{" "}
        {moment(props.data.data.periods[0].period.start).utc().format("MM/DD/YYYY")} -{" "}
        {moment(props.data.data.periods[0].period.end).utc().format("MM/DD/YYYY")}
      </h3>
      <CSVLink
        className='link-download'
        data={getCSVVersion(filterSKUData, isYoY, totalOfData)}
        filename={"sku.csv"}
      >
        <DownloadCSVButton />
      </CSVLink>
      <div className={s.noBoxShadow + " fixed-header-table table-scroll"}>
        <table aria-label="simple table main-table">
          <thead>
            <tr>
              <th className={s.tableHead}>
                <div>
                  <span>
                    <span>Item #</span>
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

              <th className={s.tableHead} align="right">
                <div>
                  <span>
                    <span>ASIN</span>
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
                </div>
              </th>

              <th className={s.tableHead} align="right">
                <div>
                  <span>
                    <span>Short Product Title</span>
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
                </div>
              </th>

              <th
                className={s.tableHead}
                colSpan={active === 3 && (isYoY ? "6" : "4")}
              >
                <div>
                  <span onClick={() => headerClick(3)}>
                    {isComparisons &&
                      (active === 3 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Sales</span>
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
                colSpan={active === 4 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(4)}>
                    {isComparisons &&
                      (active === 4 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Shipped COGS</span>
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
                colSpan={active === 5 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(5)}>
                    {isComparisons &&
                      (active === 5 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Orders</span>
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
                colSpan={active === 6 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(6)}>
                    {isComparisons &&
                      (active === 6 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Units Sold</span>
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
                colSpan={active === 7 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(7)}>
                    {isComparisons &&
                      (active === 7 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>Units Per Order</span>
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
                colSpan={active === 8 && (isYoY ? "6" : "4")}
              >
                <div>
                  <span onClick={() => headerClick(8)}>
                    {isComparisons &&
                      (active === 8 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span>ASP</span>
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
                colSpan={active === 9 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(9)}>
                    {isComparisons &&
                      (active === 9 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Impressions</span>
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
                colSpan={active === 10 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(10)}>
                    {isComparisons &&
                      (active === 10 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Clicks</span>
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
                  </span>
                  <span />
                </div>
              </th>

              <th
                className={s.tableHead}
                colSpan={active === 11 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(11)}>
                    {isComparisons &&
                      (active === 11 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Avg CPC</span>
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
                  </span>
                  <span />
                </div>
              </th>

              <th
                className={s.tableHead}
                colSpan={active === 12 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(12)}>
                    {isComparisons &&
                      (active === 12 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Spend</span>
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
                  </span>
                  <span />
                </div>
              </th>
              <th
                className={s.tableHead}
                colSpan={active === 13 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(13)}>
                    {isComparisons &&
                      (active === 13 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Orders</span>
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
                colSpan={active === 14 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(14)}>
                    {isComparisons &&
                      (active === 14 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Sales</span>
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
                  </span>
                  <span />
                </div>
              </th>
              <th
                className={s.tableHead}
                colSpan={active === 15 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(15)}>
                    {isComparisons &&
                      (active === 15 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> % of Total Sales</span>
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
                  </span>
                  <span />
                </div>
              </th>
              <th
                className={s.tableHead}
                colSpan={active === 16 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(16)}>
                    {isComparisons &&
                      (active === 16 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Conv Rate</span>
                    <span onClick={() => handleSort(16)}>
                      {active !== 16 &&
                        (sortBy === 16 ? (
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
                colSpan={active === 17 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(17)}>
                    {isComparisons &&
                      (active === 17 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> ACoS</span>
                    <span onClick={() => handleSort(17)}>
                      {active !== 17 &&
                        (sortBy === 17 ? (
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
            </tr>
          </thead>
          <tbody>
            {isComparisons && active && (
              <>
                <tr>
                  {active > 0 && (
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
                      {(active === 3 ||
                        active === 4 ||
                        active === 5 ||
                        active === 9) &&
                        isYoY && (
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
                      {(active === 3 ||
                        active === 4 ||
                        active === 5 ||
                        active === 9) &&
                        isYoY && (
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
            {filterSKUData
              ? filterSKUData.map((row, i, array) => {
                const {
                  current,
                  previous,
                  change,
                  charge,
                  yoy,
                  yoyCharge,
                  yoySKU,
                } = row;

                return (
                  <tr key={i}>
                    <td component="th">
                      <b>{current.item_number || "N/A"}</b>
                    </td>

                    <td align="right">{current.asin || "N/A"}</td>

                    <td align="right">{current.short_product_title || "N/A"}</td>

                    {isComparisons && active === 3 ? (
                      <>
                        <td align="right">
                          {current.sales
                            ? "$" + numberWithCommas(current.sales)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.sales
                            ? "$" + numberWithCommas(previous?.sales)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.sales)}
                        >
                          {change.sales !== 0
                            ? "$" + numberWithCommas(change.sales)
                            : current.sales > 0 && previous?.sales > 0
                              ? "$0.00"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.sales)}
                        >
                          {charge.sales !== 0
                            ? charge.sales + "%"
                            : current.sales > 0 && previous?.sales > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                        {isYoY && (
                          <>
                            {" "}
                            <td
                              align="right"
                              className={isNegative(yoy.sales)}
                            >
                              {yoy.sales !== 0
                                ? "$" + numberWithCommas(yoy.sales)
                                : current.sales > 0 && yoySKU.sales > 0
                                  ? "$0.00"
                                  : "N/A"}
                            </td>
                            <td
                              align="right"
                              className={isNegative(yoyCharge.sales)}
                            >
                              {yoyCharge.sales !== 0
                                ? yoyCharge.sales + "%"
                                : current.sales > 0 && yoySKU.sales > 0
                                  ? "0%"
                                  : "N/A"}
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                        <td align="right">
                          {current.sales
                            ? "$" + numberWithCommas(current.sales)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 4 ? (
                      <>
                        <td align="right">
                          {current.shipped_cogs
                            ? "$" + numberWithCommas(current.shipped_cogs)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.shipped_cogs
                            ? "$" + numberWithCommas(previous?.shipped_cogs)
                            : "N/A"}
                        </td>

                        <td
                          align="right"
                          className={isNegative(change.shipped_cogs)}
                        >
                          {change.shipped_cogs !== 0
                            ? "$" + numberWithCommas(change.shipped_cogs)
                            : current.shipped_cogs > 0 &&
                              previous?.shipped_cogs > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.shipped_cogs)}
                        >
                          {charge.shipped_cogs
                            ? charge.shipped_cogs + "%"
                            : current.shipped_cogs > 0 &&
                              previous?.shipped_cogs > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                        {isYoY && (
                          <>
                            {" "}
                            <td
                              align="right"
                              className={isNegative(yoy.shipped_cogs)}
                            >
                              {yoy.shipped_cogs !== 0
                                ? "$" + numberWithCommas(yoy.shipped_cogs)
                                : current.shipped_cogs > 0 &&
                                  yoySKU.shipped_cogs > 0
                                  ? "0"
                                  : "N/A"}
                            </td>
                            <td
                              align="right"
                              className={isNegative(yoyCharge.shipped_cogs)}
                            >
                              {yoyCharge.shipped_cogs
                                ? yoyCharge.shipped_cogs + "%"
                                : current.shipped_cogs > 0 &&
                                  yoySKU.shipped_cogs > 0
                                  ? "0%"
                                  : "N/A"}
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                        <td align="right">
                          {current.shipped_cogs
                            ? "$" + numberWithCommas(current.shipped_cogs)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 5 ? (
                      <>
                        <td align="right">
                          {current.orders
                            ? numberWithCommas(current.orders)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.orders
                            ? numberWithCommas(previous?.orders)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.orders)}
                        >
                          {change.orders !== 0
                            ? numberWithCommas(change.orders)
                            : current.orders > 0 && previous?.orders > 0
                              ? "$0.00"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.orders)}
                        >
                          {charge.orders !== 0
                            ? charge.orders + "%"
                            : current.orders > 0 && previous?.orders > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                        {isYoY && (
                          <>
                            {" "}
                            <td
                              align="right"
                              className={isNegative(yoy.orders)}
                            >
                              {yoy.orders !== 0
                                ? numberWithCommas(yoy.orders)
                                : current.orders > 0 && yoySKU.orders > 0
                                  ? "$0.00"
                                  : "N/A"}
                            </td>
                            <td
                              align="right"
                              className={isNegative(yoyCharge.orders)}
                            >
                              {yoyCharge.orders !== 0
                                ? yoyCharge.orders + "%"
                                : current.orders > 0 && yoySKU.orders > 0
                                  ? "0%"
                                  : "N/A"}
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                        <td align="right">
                          {current.orders
                            ? numberWithCommas(current.orders)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 6 ? (
                      <>
                        <td align="right">
                          {current.units_sold
                            ? numberWithCommas(current.units_sold)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.units_sold
                            ? numberWithCommas(previous?.units_sold)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.units_sold)}
                        >
                          {change.units_sold !== 0
                            ? numberWithCommas(change.units_sold)
                            : current.units_sold > 0 &&
                              previous?.units_sold > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.units_sold)}
                        >
                          {charge.units_sold !== 0
                            ? charge.units_sold + "%"
                            : current.units_sold > 0 &&
                              previous?.units_sold > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                        {isYoY && (
                          <>
                            {" "}
                            <td
                              align="right"
                              className={isNegative(yoy.units_sold)}
                            >
                              {yoy.units_sold !== 0
                                ? numberWithCommas(yoy.units_sold)
                                : current.units_sold > 0 &&
                                  yoySKU.units_sold > 0
                                  ? "0"
                                  : "N/A"}
                            </td>
                            <td
                              align="right"
                              className={isNegative(yoyCharge.units_sold)}
                            >
                              {yoyCharge.units_sold !== 0
                                ? yoyCharge.units_sold + "%"
                                : current.units_sold > 0 &&
                                  yoySKU.units_sold > 0
                                  ? "0%"
                                  : "N/A"}
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                        <td align="right">
                          {current.units_sold
                            ? numberWithCommas(current.units_sold)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 7 ? (
                      <>
                        <td align="right">
                          {current.units_per_order
                            ? numberWithCommas(current.units_per_order)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.units_per_order
                            ? numberWithCommas(previous?.units_per_order)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.units_per_order)}
                        >
                          {change.units_per_order !== 0
                            ? numberWithCommas(change.units_per_order)
                            : current.units_per_order > 0 && previous?.units_per_order > 0
                              ? "$0.00"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.units_per_order)}
                        >
                          {charge.units_per_order !== 0
                            ? charge.units_per_order + "%"
                            : current.units_per_order > 0 && previous?.units_per_order > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                        {isYoY && (
                          <>
                            {" "}
                            <td
                              align="right"
                              className={isNegative(yoy.units_per_order)}
                            >
                              {yoy.units_per_order !== 0
                                ? numberWithCommas(yoy.units_per_order)
                                : current.units_per_order > 0 && yoySKU.units_per_order > 0
                                  ? "$0.00"
                                  : "N/A"}
                            </td>
                            <td
                              align="right"
                              className={isNegative(yoyCharge.units_per_order)}
                            >
                              {yoyCharge.units_per_order !== 0
                                ? yoyCharge.units_per_order + "%"
                                : current.units_per_order > 0 && yoySKU.units_per_order > 0
                                  ? "0%"
                                  : "N/A"}
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                        <td align="right">
                          {current.units_per_order
                            ? numberWithCommas(current.units_per_order)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 8 ? (
                      <>
                        <td align="right">
                          {current.asp
                            ? "$" + numberWithCommas(current.asp)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.asp
                            ? "$" + numberWithCommas(previous?.asp)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.asp)}
                        >
                          {change.asp !== 0
                            ? "$" + numberWithCommas(change.asp)
                            : current.asp > 0 && previous?.asp > 0
                              ? "$0.00"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.asp)}
                        >
                          {charge.asp !== 0
                            ? charge.asp + "%"
                            : current.asp > 0 && previous?.asp > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                        {isYoY && (
                          <>
                            {" "}
                            <td
                              align="right"
                              className={isNegative(yoy.asp)}
                            >
                              {yoy.asp !== 0
                                ? "$" + numberWithCommas(yoy.asp)
                                : current.asp > 0 && yoySKU.asp > 0
                                  ? "$0.00"
                                  : "N/A"}
                            </td>
                            <td
                              align="right"
                              className={isNegative(yoyCharge.asp)}
                            >
                              {yoyCharge.asp !== 0
                                ? yoyCharge.asp + "%"
                                : current.asp > 0 && yoySKU.asp > 0
                                  ? "0%"
                                  : "N/A"}
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                        <td align="right">
                          {current.asp
                            ? "$" + numberWithCommas(current.asp)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 9 ? (
                      <>
                        <td align="right">
                          {current.ad_impressions
                            ? numberWithCommas(current.ad_impressions)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.ad_impressions
                            ? numberWithCommas(previous?.ad_impressions)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_impressions)}
                        >
                          {change.ad_impressions !== 0
                            ? numberWithCommas(change.ad_impressions)
                            : current.ad_impressions > 0 &&
                              previous?.ad_impressions > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_impressions)}
                        >
                          {charge.ad_impressions
                            ? charge.ad_impressions + "%"
                            : current.ad_impressions > 0 &&
                              previous?.ad_impressions > 0
                              ? "0%"
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

                    {isComparisons && active === 10 ? (
                      <>
                        <td align="right">
                          {current.ad_clicks
                            ? numberWithCommas(current.ad_clicks)
                            : "N/A"}
                        </td>

                        <td align="right">
                          {previous?.ad_clicks
                            ? numberWithCommas(previous?.ad_clicks)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_clicks)}
                        >
                          {change.ad_clicks !== 0
                            ? numberWithCommas(change.ad_clicks)
                            : current.ad_clicks > 0 && previous?.ad_clicks > 0
                              ? "0.00"
                              : "N/A"}
                        </td>

                        <td
                          align="right"
                          className={isNegative(charge.ad_clicks)}
                        >
                          {current.ad_clicks !== 0
                            ? charge.ad_clicks + "%"
                            : current.ad_clicks > 0 && previous?.ad_clicks > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                      </>
                    ) : (
                        <td align="right">
                          {current.ad_clicks
                            ? numberWithCommas(current.ad_clicks)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 11 ? (
                      <>
                        <td align="right">
                          {current.average_cpc
                            ? "$" + numberWithCommas(current.average_cpc)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.average_cpc
                            ? "$" + numberWithCommas(previous?.average_cpc)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.average_cpc)}
                        >
                          {change.average_cpc !== 0
                            ? "$" + numberWithCommas(change.average_cpc)
                            : current.average_cpc > 0 &&
                              previous?.average_cpc > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.average_cpc)}
                        >
                          {charge.average_cpc !== 0
                            ? charge.average_cpc + "%"
                            : current.average_cpc > 0 &&
                              previous?.average_cpc > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                      </>
                    ) : (
                        <td align="right">
                          {current.average_cpc !== 0
                            ? "$" + numberWithCommas(current.average_cpc)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 12 ? (
                      <>
                        <td align="right">
                          {current.ad_spend
                            ? "$" + numberWithCommas(current.ad_spend)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.ad_spend
                            ? "$" + numberWithCommas(previous?.ad_spend)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_spend)}
                        >
                          {change.ad_spend !== 0
                            ? "$" + numberWithCommas(change.ad_spend)
                            : current.ad_spend > 0 && previous?.ad_spend > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_spend)}
                        >
                          {charge.ad_spend !== 0
                            ? charge.ad_spend + "%"
                            : current.ad_spend > 0 && previous?.ad_spend > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                        {isYoY && (
                          <>
                            <td
                              align="right"
                              className={isNegative(yoy.ad_spend)}
                            >
                              {yoy.ad_spend !== 0
                                ? "$" + numberWithCommas(yoy.ad_spend)
                                : current.ad_spend > 0 && yoySKU.ad_spend > 0
                                  ? "0"
                                  : "N/A"}
                            </td>
                            <td
                              align="right"
                              className={isNegative(yoyCharge.ad_spend)}
                            >
                              {yoyCharge.ad_spend !== 0
                                ? yoyCharge.ad_spend + "%"
                                : current.ad_spend > 0 && yoySKU.ad_spend > 0
                                  ? "0%"
                                  : "N/A"}
                            </td>
                          </>
                        )}
                      </>
                    ) : (
                        <td align="right">
                          {current.ad_spend !== 0
                            ? "$" + numberWithCommas(current.ad_spend)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 13 ? (
                      <>
                        <td align="right">
                          {!!current.ad_orders
                            ? numberWithCommas(current.ad_orders)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {!!previous?.ad_orders
                            ? numberWithCommas(previous?.ad_orders)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_orders)}
                        >
                          {change.ad_orders !== 0
                            ? numberWithCommas(change.ad_orders)
                            : current.ad_orders > 0 && previous?.ad_orders > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_orders)}
                        >
                          {charge.ad_orders !== 0
                            ? charge.ad_orders + "%"
                            : current.ad_orders > 0 && previous?.ad_orders > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                      </>
                    ) : (
                        <td align="right">
                          {current.ad_orders !== 0
                            ? numberWithCommas(current.ad_orders)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 14 ? (
                      <>
                        <td align="right">
                          {current.ad_sales
                            ? "$" + numberWithCommas(current.ad_sales)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.ad_sales
                            ? "$" + numberWithCommas(previous?.ad_sales)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.ad_sales)}
                        >
                          {change.ad_sales !== 0
                            ? "$" + numberWithCommas(change.ad_sales)
                            : current.ad_sales > 0 && previous?.ad_sales > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.ad_sales)}
                        >
                          {charge.ad_sales !== 0
                            ? charge.ad_sales + "%"
                            : current.ad_sales > 0 && previous?.ad_sales > 0
                              ? "0%"
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

                    {isComparisons && active === 15 ? (
                      <>
                        <td align="right">
                          {!!current.percent_total_sales
                            ? Number(current.percent_total_sales).toFixed(2) +
                            "%"
                            : "N/A"}
                        </td>
                        <td align="right">
                          {!!previous?.percent_total_sales
                            ? Number(previous?.percent_total_sales).toFixed(
                              2
                            ) + "%"
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.percent_total_sales)}
                        >
                          {change.percent_total_sales !== 0
                            ? change.percent_total_sales + "%"
                            : current.percent_total_sales > 0 &&
                              previous?.percent_total_sales > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.percent_total_sales)}
                        >
                          {!!charge.percent_total_sales
                            ? charge.percent_total_sales + "%"
                            : current.percent_total_sales > 0 &&
                              previous?.percent_total_sales > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                      </>
                    ) : (
                        <td align="right">
                          {!!current.percent_total_sales
                            ? Number(current.percent_total_sales).toFixed(2) +
                            "%"
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 16 ? (
                      <>
                        <td align="right">
                          {current.conversion_rate !== 0
                            ? Number(current.conversion_rate).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.conversion_rate !== 0
                            ? Number(previous?.conversion_rate).toFixed(2) +
                            "%"
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.conversion_rate)}
                        >
                          {change.conversion_rate !== 0
                            ? change.conversion_rate + "%"
                            : current.conversion_rate > 0 &&
                              previous?.conversion_rate > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.conversion_rate)}
                        >
                          {charge.conversion_rate !== 0
                            ? charge.conversion_rate + "%"
                            : current.conversion_rate > 0 &&
                              previous?.conversion_rate > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                      </>
                    ) : (
                        <td align="right">
                          {current.conversion_rate !== 0
                            ? Number(current.conversion_rate).toFixed(2) + "%"
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 17 ? (
                      <>
                        <td align="right">
                          {current.acos
                            ? current.acos.toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous?.acos
                            ? previous?.acos.toFixed(2) + "%"
                            : "N/A"}
                        </td>
                        <td align="right" className={isNegative(change.acos)}>
                          {change.acos !== 0
                            ? change.acos + "%"
                            : current.acos > 0 && previous?.acos > 0
                              ? "0"
                              : "N/A"}
                        </td>
                        <td align="right" className={isNegative(charge.acos)}>
                          {charge.acos !== 0
                            ? charge.acos + "%"
                            : current.acos > 0 && previous?.acos > 0
                              ? "0%"
                              : "N/A"}
                        </td>
                      </>
                    ) : (
                        <td align="right">
                          {current.acos !== 0
                            ? current.acos.toFixed(2) + "%"
                            : current.ad_orders > 0 && previous?.ad_orders > 0
                              ? "0"
                              : "N/A"}
                        </td>
                      )}
                  </tr>
                );
              })
              : ""}
          </tbody>
          {filterSKUData.length > 1 && (
            <tfoot>
              <tr>
                <td component="th">
                  <b>Total</b>
                </td>

                <td align="right"></td>
                <td align="right"></td>
                <TableTotalRowCell cellData={totalOfData.sales} isComparisons={isComparisons} isActive={active===3} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.shipped_cogs} isComparisons={isComparisons} isActive={active===4} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.orders} isComparisons={isComparisons} isActive={active===5} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.units_sold} isComparisons={isComparisons} isActive={active===6} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.units_per_order} isComparisons={isComparisons} isActive={active===7} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.asp} isComparisons={isComparisons} isActive={active===8} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_impressions} isComparisons={isComparisons} isActive={active===9} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_clicks} isComparisons={isComparisons} isActive={active===10} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.average_cpc} isComparisons={isComparisons} isActive={active===11} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_spend} isComparisons={isComparisons} isActive={active===12} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_orders} isComparisons={isComparisons} isActive={active===13} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_sales} isComparisons={isComparisons} isActive={active===14} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.percent_total_sales} isComparisons={isComparisons} isActive={active===15} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.conversion_rate} isComparisons={isComparisons} isActive={active===16} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.acos} isComparisons={isComparisons} isActive={active===17} isYoY={false}></TableTotalRowCell>

              </tr>
            </tfoot>
          )}{" "}
        </table>
      </div>
    </>
  );
};

export default DataDisplaySKUTable;
