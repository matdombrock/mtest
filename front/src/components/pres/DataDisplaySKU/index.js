import React, { useState, useEffect } from "react";
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
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { CSVDownload, CSVLink } from "react-csv";

const getCSVVersion = (data, isYoY) => {
  const finalData = [];
  const getHeaderColumn = (isFourColumn = true, title = false) => {
    const tempColumns = [
      !title ? "Current" : title,
      !title ? "Previous" : "",
      !title ? "Change #" : "",
      !title ? "Change %" : "",
      !title ? "Change # YOY" : "",
      !title ? "Change % YOY" : "",
    ];
    return isFourColumn || !isYoY ? tempColumns.slice(0, 4) : tempColumns;
  };
  const header = [];
  const headerOfComparison = [];
  header.push("Item #");
  header.push("ASIN");
  header.push(...getHeaderColumn(false, "Sales"));
  header.push(...getHeaderColumn(false, "Units Sold"));
  header.push(...getHeaderColumn(false, "Shipped COGS"));
  header.push(...getHeaderColumn(true, "Ad Clicks"));
  header.push(...getHeaderColumn(true, "Ad Impressions"));
  header.push(...getHeaderColumn(true, "Avg CPC"));
  header.push(...getHeaderColumn(false, "Ad Spend"));
  header.push(...getHeaderColumn(true, "Ad Orders"));
  header.push(...getHeaderColumn(true, "Ad Sales"));
  header.push(...getHeaderColumn(true, "% of Total Sales"));
  header.push(...getHeaderColumn(true, "Conv Rate"));
  header.push(...getHeaderColumn(true, "ACoS"));

  headerOfComparison.push("");
  headerOfComparison.push("");
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());

  finalData.push(header);
  finalData.push(headerOfComparison);
  data.map(({ current, previous, change, charge, yoy, yoyCharge, yoySKU }) => {
    const temp = [];

    temp.push(current.item_number || "N/A");

    temp.push(current.asin || "N/A");

    temp.push(current.sales ? "$" + numberWithCommas(current.sales) : "N/A");
    temp.push(previous.sales ? "$" + numberWithCommas(previous.sales) : "N/A");
    temp.push(
      change.sales !== 0
        ? "$" + numberWithCommas(change.sales)
        : current.sales > 0 && previous.sales > 0
        ? "$0.00"
        : "N/A"
    );
    temp.push(
      charge.sales !== 0
        ? charge.sales + "%"
        : current.sales > 0 && previous.sales > 0
        ? "0%"
        : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.sales !== 0
          ? "$" + numberWithCommas(yoy.sales)
          : current.sales > 0 && yoySKU.sales > 0
          ? "$0.00"
          : "N/A"
      );
      temp.push(
        yoyCharge.sales !== 0
          ? yoyCharge.sales + "%"
          : current.sales > 0 && yoySKU.sales > 0
          ? "0%"
          : "N/A"
      );
    }

    temp.push(
      current.units_sold ? numberWithCommas(current.units_sold) : "N/A"
    );
    temp.push(
      previous.units_sold ? numberWithCommas(previous.units_sold) : "N/A"
    );
    temp.push(
      change.units_sold !== 0
        ? numberWithCommas(change.units_sold)
        : current.units_sold > 0 && previous.units_sold > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.units_sold !== 0
        ? charge.units_sold + "%"
        : current.units_sold > 0 && previous.units_sold > 0
        ? "0%"
        : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.units_sold !== 0
          ? numberWithCommas(yoy.units_sold)
          : current.units_sold > 0 && yoySKU.units_sold > 0
          ? "0"
          : "N/A"
      );
      temp.push(
        yoyCharge.units_sold !== 0
          ? yoyCharge.units_sold + "%"
          : current.units_sold > 0 && yoySKU.units_sold > 0
          ? "0%"
          : "N/A"
      );
    }

    temp.push(
      current.shipped_cogs
        ? "$" + numberWithCommas(current.shipped_cogs)
        : "N/A"
    );
    temp.push(
      previous.shipped_cogs
        ? "$" + numberWithCommas(previous.shipped_cogs)
        : "N/A"
    );
    temp.push(
      change.shipped_cogs !== 0
        ? "$" + numberWithCommas(change.shipped_cogs)
        : current.shipped_cogs > 0 && previous.shipped_cogs > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.shipped_cogs
        ? charge.shipped_cogs + "%"
        : current.shipped_cogs > 0 && previous.shipped_cogs > 0
        ? "0%"
        : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.shipped_cogs !== 0
          ? "$" + numberWithCommas(yoy.shipped_cogs)
          : current.shipped_cogs > 0 && yoySKU.shipped_cogs > 0
          ? "0"
          : "N/A"
      );
      temp.push(
        yoyCharge.shipped_cogs
          ? yoyCharge.shipped_cogs + "%"
          : current.shipped_cogs > 0 && yoySKU.shipped_cogs > 0
          ? "0%"
          : "N/A"
      );
    }

    temp.push(current.ad_clicks ? numberWithCommas(current.ad_clicks) : "N/A");
    temp.push(
      previous.ad_clicks ? numberWithCommas(previous.ad_clicks) : "N/A"
    );
    temp.push(
      change.ad_clicks !== 0
        ? numberWithCommas(change.ad_clicks)
        : current.ad_clicks > 0 && previous.ad_clicks > 0
        ? "0.00"
        : "N/A"
    );
    temp.push(
      current.ad_clicks !== 0
        ? charge.ad_clicks + "%"
        : current.ad_clicks > 0 && previous.ad_clicks > 0
        ? "0%"
        : "N/A"
    );

    temp.push(
      current.ad_impressions ? numberWithCommas(current.ad_impressions) : "N/A"
    );
    temp.push(
      previous.ad_impressions
        ? numberWithCommas(previous.ad_impressions)
        : "N/A"
    );
    temp.push(
      change.ad_impressions !== 0
        ? numberWithCommas(change.ad_impressions)
        : current.ad_impressions > 0 && previous.ad_impressions > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.ad_impressions
        ? charge.ad_impressions + "%"
        : current.ad_impressions > 0 && previous.ad_impressions > 0
        ? "0%"
        : "N/A"
    );

    temp.push(
      current.average_cpc ? "$" + numberWithCommas(current.average_cpc) : "N/A"
    );
    temp.push(
      previous.average_cpc
        ? "$" + numberWithCommas(previous.average_cpc)
        : "N/A"
    );
    temp.push(
      change.average_cpc !== 0
        ? "$" + numberWithCommas(change.average_cpc)
        : current.average_cpc > 0 && previous.average_cpc > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.average_cpc !== 0
        ? charge.average_cpc + "%"
        : current.average_cpc > 0 && previous.average_cpc > 0
        ? "0%"
        : "N/A"
    );

    temp.push(
      current.ad_spend ? "$" + numberWithCommas(current.ad_spend) : "N/A"
    );
    temp.push(
      previous.ad_spend ? "$" + numberWithCommas(previous.ad_spend) : "N/A"
    );
    temp.push(
      change.ad_spend !== 0
        ? "$" + numberWithCommas(change.ad_spend)
        : current.ad_spend > 0 && previous.ad_spend > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.ad_spend !== 0
        ? charge.ad_spend + "%"
        : current.ad_spend > 0 && previous.ad_spend > 0
        ? "0%"
        : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.ad_spend !== 0
          ? "$" + numberWithCommas(yoy.ad_spend)
          : current.ad_spend > 0 && yoySKU.ad_spend > 0
          ? "0"
          : "N/A"
      );
      temp.push(
        yoyCharge.ad_spend !== 0
          ? yoyCharge.ad_spend + "%"
          : current.ad_spend > 0 && yoySKU.ad_spend > 0
          ? "0%"
          : "N/A"
      );
    }

    temp.push(
      !!current.ad_orders ? numberWithCommas(current.ad_orders) : "N/A"
    );
    temp.push(
      !!previous.ad_orders ? numberWithCommas(previous.ad_orders) : "N/A"
    );
    temp.push(
      change.ad_orders !== 0
        ? numberWithCommas(change.ad_orders)
        : current.ad_orders > 0 && previous.ad_orders > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.ad_orders !== 0
        ? charge.ad_orders + "%"
        : current.ad_orders > 0 && previous.ad_orders > 0
        ? "0%"
        : "N/A"
    );

    temp.push(
      current.ad_sales ? "$" + numberWithCommas(current.ad_sales) : "N/A"
    );
    temp.push(
      previous.ad_sales ? "$" + numberWithCommas(previous.ad_sales) : "N/A"
    );
    temp.push(
      change.ad_sales !== 0
        ? "$" + numberWithCommas(change.ad_sales)
        : current.ad_sales > 0 && previous.ad_sales > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.ad_sales !== 0
        ? charge.ad_sales + "%"
        : current.ad_sales > 0 && previous.ad_sales > 0
        ? "0%"
        : "N/A"
    );

    temp.push(
      !!current.percent_total_sales
        ? Number(current.percent_total_sales).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      !!previous.percent_total_sales
        ? Number(previous.percent_total_sales).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      change.percent_total_sales !== 0
        ? change.percent_total_sales + "%"
        : current.percent_total_sales > 0 && previous.percent_total_sales > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      !!charge.percent_total_sales
        ? charge.percent_total_sales + "%"
        : current.percent_total_sales > 0 && previous.percent_total_sales > 0
        ? "0%"
        : "N/A"
    );

    temp.push(
      current.conversion_rate !== 0
        ? Number(current.conversion_rate).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      previous.conversion_rate !== 0
        ? Number(previous.conversion_rate).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      change.conversion_rate !== 0
        ? change.conversion_rate + "%"
        : current.conversion_rate > 0 && previous.conversion_rate > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.conversion_rate !== 0
        ? charge.conversion_rate + "%"
        : current.conversion_rate > 0 && previous.conversion_rate > 0
        ? "0%"
        : "N/A"
    );

    temp.push(current.acos ? current.acos.toFixed(2) + "%" : "N/A");
    temp.push(previous.acos ? previous.acos.toFixed(2) + "%" : "N/A");
    temp.push(
      change.acos !== 0
        ? change.acos + "%"
        : current.acos > 0 && previous.acos > 0
        ? "0"
        : "N/A"
    );
    temp.push(
      charge.acos !== 0
        ? charge.acos + "%"
        : current.acos > 0 && previous.acos > 0
        ? "0%"
        : "N/A"
    );

    finalData.push(temp);
  });
  return finalData;
};

const currentDataFormate = (current = [], previous = [], yoy = []) => {
  let allSKU = [];
  current.map((d) => allSKU.push(d.sku));
  previous.map((d) => allSKU.push(d.sku));
  allSKU = allSKU.filter((value, index, self) => self.indexOf(value) === index);
  return allSKU
    .map((sku) => {
      let temp = {
        ad_spend: 0,
        ad_orders: 0,
        conversion_rate: 0,
        acos: 0,
        ad_sales: 0,
        sales: 0,
        units_sold: 0,
        shipped_cogs: 0,
        ad_clicks: 0,
        ad_impressions: 0,
        average_cpc: 0,
        wow_sales: 0,
        percent_total_sales: 0,
      };
      let currentSKU = current.find((d) => d.sku === sku);
      if (!currentSKU) return false;
      let previousSKU =
        previous.find((d) => d.sku === sku) || JSON.parse(JSON.stringify(temp));
      let yoySKU =
        yoy.find((d) => d.sku === sku) || JSON.parse(JSON.stringify(temp));
      let change = {
        ad_spend: getDifferenceInNumber(
          currentSKU.ad_spend,
          previousSKU.ad_spend
        ),
        ad_orders: getDifferenceInNumber(
          currentSKU.ad_orders,
          previousSKU.ad_orders
        ),
        conversion_rate: getDifferenceInNumber(
          currentSKU.conversion_rate,
          previousSKU.conversion_rate
        ),
        acos: getDifferenceInNumber(currentSKU.acos, previousSKU.acos),
        ad_sales: getDifferenceInNumber(
          currentSKU.ad_sales,
          previousSKU.ad_sales
        ),
        sales: getDifferenceInNumber(currentSKU.sales, previousSKU.sales),
        units_sold: getDifferenceInNumber(
          currentSKU.units_sold,
          previousSKU.units_sold
        ),
        shipped_cogs: getDifferenceInNumber(
          currentSKU.shipped_cogs,
          previousSKU.shipped_cogs
        ),
        ad_clicks: getDifferenceInNumber(
          currentSKU.ad_clicks,
          previousSKU.ad_clicks
        ),
        ad_impressions: getDifferenceInNumber(
          currentSKU.ad_impressions,
          previousSKU.ad_impressions
        ),
        average_cpc: getDifferenceInNumber(
          currentSKU.average_cpc,
          previousSKU.average_cpc
        ),
        percent_total_sales: getDifferenceInNumber(
          currentSKU.percent_total_sales,
          previousSKU.percent_total_sales
        ),
      };
      let charge = {
        ad_spend: getDifferenceInPercentage(
          currentSKU.ad_spend,
          previousSKU.ad_spend
        ),
        ad_orders: getDifferenceInPercentage(
          currentSKU.ad_orders,
          previousSKU.ad_orders
        ),
        conversion_rate: getDifferenceInPercentage(
          currentSKU.conversion_rate,
          previousSKU.conversion_rate
        ),
        acos: getDifferenceInPercentage(currentSKU.acos, previousSKU.acos),
        ad_sales: getDifferenceInPercentage(
          currentSKU.ad_sales,
          previousSKU.ad_sales
        ),
        sales: getDifferenceInPercentage(currentSKU.sales, previousSKU.sales),
        units_sold: getDifferenceInPercentage(
          currentSKU.units_sold,
          previousSKU.units_sold
        ),
        shipped_cogs: getDifferenceInPercentage(
          currentSKU.shipped_cogs,
          previousSKU.shipped_cogs
        ),
        ad_clicks: getDifferenceInPercentage(
          currentSKU.ad_clicks,
          previousSKU.ad_clicks
        ),
        ad_impressions: getDifferenceInPercentage(
          currentSKU.ad_impressions,
          previousSKU.ad_impressions
        ),
        average_cpc: getDifferenceInPercentage(
          currentSKU.average_cpc,
          previousSKU.average_cpc
        ),
        percent_total_sales: getDifferenceInPercentage(
          currentSKU.percent_total_sales,
          previousSKU.percent_total_sales
        ),
      };
      let tempYoy = {
        ad_spend: getDifferenceInNumber(currentSKU.ad_spend, yoySKU.ad_spend),
        ad_orders: getDifferenceInNumber(
          currentSKU.ad_orders,
          yoySKU.ad_orders
        ),
        conversion_rate: getDifferenceInNumber(
          currentSKU.conversion_rate,
          yoySKU.conversion_rate
        ),
        acos: getDifferenceInNumber(currentSKU.acos, yoySKU.acos),
        ad_sales: getDifferenceInNumber(currentSKU.ad_sales, yoySKU.ad_sales),
        sales: getDifferenceInNumber(currentSKU.sales, yoySKU.sales),
        units_sold: getDifferenceInNumber(
          currentSKU.units_sold,
          yoySKU.units_sold
        ),
        shipped_cogs: getDifferenceInNumber(
          currentSKU.shipped_cogs,
          yoySKU.shipped_cogs
        ),
        ad_clicks: getDifferenceInNumber(
          currentSKU.ad_clicks,
          yoySKU.ad_clicks
        ),
        ad_impressions: getDifferenceInNumber(
          currentSKU.ad_impressions,
          yoySKU.ad_impressions
        ),
        average_cpc: getDifferenceInNumber(
          currentSKU.average_cpc,
          yoySKU.average_cpc
        ),
        percent_total_sales: getDifferenceInNumber(
          currentSKU.percent_total_sales,
          yoySKU.percent_total_sales
        ),
      };
      let yoyCharge = {
        ad_spend: getDifferenceInPercentage(
          currentSKU.ad_spend,
          yoySKU.ad_spend
        ),
        ad_orders: getDifferenceInPercentage(
          currentSKU.ad_orders,
          yoySKU.ad_orders
        ),
        conversion_rate: getDifferenceInPercentage(
          currentSKU.conversion_rate,
          yoySKU.conversion_rate
        ),
        acos: getDifferenceInPercentage(currentSKU.acos, yoySKU.acos),
        ad_sales: getDifferenceInPercentage(
          currentSKU.ad_sales,
          yoySKU.ad_sales
        ),
        sales: getDifferenceInPercentage(currentSKU.sales, yoySKU.sales),
        units_sold: getDifferenceInPercentage(
          currentSKU.units_sold,
          yoySKU.units_sold
        ),
        shipped_cogs: getDifferenceInPercentage(
          currentSKU.shipped_cogs,
          yoySKU.shipped_cogs
        ),
        ad_clicks: getDifferenceInPercentage(
          currentSKU.ad_clicks,
          yoySKU.ad_clicks
        ),
        ad_impressions: getDifferenceInPercentage(
          currentSKU.ad_impressions,
          yoySKU.ad_impressions
        ),
        average_cpc: getDifferenceInPercentage(
          currentSKU.average_cpc,
          yoySKU.average_cpc
        ),
        percent_total_sales: getDifferenceInPercentage(
          currentSKU.percent_total_sales,
          yoySKU.percent_total_sales
        ),
      };
      return {
        current: currentSKU,
        previous: previousSKU,
        change,
        charge,
        yoy: tempYoy,
        yoyCharge,
        yoySKU,
      };
    })
    .filter((d) => d);

  // data.map(row => {
  //   temp.sales += Math.round(Number(row.sales));
  //   temp.units_sold += Math.round(Number(row.units_sold));
  //   temp.shipped_cogs += Math.round(Number(row.shipped_cogs));
  //   temp.ad_clicks += Math.round(Number(row.ad_clicks));
  //   temp.ad_impressions += Math.round(Number(row.ad_impressions));
  //   temp.average_cpc += Number(row.average_cpc);
  //   temp.ad_spend += Math.round(Number(row.ad_spend));
  //   temp.ad_orders += Math.round(Number(row.ad_orders));
  //   temp.ad_sales += Math.round(Number(row.ad_sales));
  //   temp.conversion_rate += Math.round(Number(row.conversion_rate));
  //   temp.acos += Math.round(Number(row.acos));
  //   temp.wow_sales += Math.round(
  //     Number(isNaN(row.wow_sales) ? 0 : row.wow_sales)
  //   );
  //   temp.percent_total_sales += Math.round(
  //     Number(isNaN(row.percent_total_sales) ? 0 : row.percent_total_sales)
  //   );
  //   return false;
  // });
  // temp.average_cpc = temp.average_cpc / data.length;
  // return [temp];
};

const getSummaryInTotal = (props) => {
  const temp = {
    ad_spend: 0,
    ad_orders: 0,
    conversion_rate: 0,
    acos: 0,
    ad_sales: 0,
    sales: 0,
    units_sold: 0,
    shipped_cogs: 0,
    ad_clicks: 0,
    ad_impressions: 0,
    average_cpc: 0,
    wow_sales: 0,
    percent_total_sales: 0,
  };

  props.map(({ current }) => {
    temp.ad_spend += current.ad_spend;
    temp.ad_orders += current.ad_orders;
    temp.conversion_rate += current.conversion_rate;
    temp.acos += current.acos;
    temp.ad_sales += current.ad_sales;
    temp.sales += current.sales;
    temp.units_sold += current.units_sold;
    temp.shipped_cogs += current.shipped_cogs;
    temp.ad_clicks += current.ad_clicks;
    temp.ad_impressions += current.ad_impressions;
    temp.average_cpc += current.average_cpc;
    temp.wow_sales += current.wow_sales;
    temp.percent_total_sales += current.percent_total_sales;
  });
  return temp;
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
  return isNaN(payload) ? 0 : payload;
};

const isNegative = (value) =>
  Number(value) !== 0 && (Number(value) <= 0 ? s.red : s.green);

const DataDisplaySKUTable = (props) => {
  const [active, setActive] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const [sortByInner, setSortByInner] = useState(false);
  const [sortAscendingBy, setSortAscendingBy] = useState(false);
  const isComparisons = true;
  let currentData = props.data.periods[0];
  let previousData = props.data.periods[1];
  if (!currentData) return null;
  let isYoY = !!props.data.yoy.length;
  const allSKUData = currentDataFormate(
    currentData.itemized,
    previousData.itemized,
    !!props.data.yoy.length ? props.data.yoy[0].itemized : []
  );
  const filterSKUData = allSKUData.sort((a, b) => {
    let tempSortBy = "asin";
    if (sortBy === 0) {
      tempSortBy = "item_number";
    } else if (sortBy === 1) {
      tempSortBy = "asin";
    } else if (sortBy === 2) {
      tempSortBy = "sales";
    } else if (sortBy === 3) {
      tempSortBy = "units_sold";
    } else if (sortBy === 4) {
      tempSortBy = "shipped_cogs";
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
      tempSortBy = "percent_total_sales";
    } else if (sortBy === 12) {
      tempSortBy = "conversion_rate";
    } else if (sortBy === 13) {
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
        : sortByInner === 4
        ? "yoy"
        : sortByInner === 5
        ? "yoyCharge"
        : "current";
    return sortAscendingBy
      ? a[tempFirst][tempSortBy] - b[tempFirst][tempSortBy]
      : b[tempFirst][tempSortBy] - a[tempFirst][tempSortBy];
  });

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
  const totalOfData = getSummaryInTotal(filterSKUData);
  console.log("DataDisplaySKUTable -> totalOfData", totalOfData);
  return (
    <>
      <CSVLink data={getCSVVersion(filterSKUData, isYoY)} filename={"sku.csv"}>
        Download me
      </CSVLink>{" "}
      <div className={s.noBoxShadow + " fixed-header-table"}>
        <table aria-label="simple table">
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
              <th
                className={s.tableHead}
                colSpan={active === 2 && (isYoY ? "6" : "4")}
              >
                <div>
                  <span onClick={() => headerClick(2)}>
                    {isComparisons &&
                      (active === 2 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Sales</span>
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
                colSpan={active === 3 && (isYoY ? "6" : "4")}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(3)}>
                    {isComparisons &&
                      (active === 3 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Units Sold</span>
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
                colSpan={active === 5 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(5)}>
                    {isComparisons &&
                      (active === 5 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Clicks</span>
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
                colSpan={active === 6 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(6)}>
                    {isComparisons &&
                      (active === 6 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Impressions</span>
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
                colSpan={active === 7 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(7)}>
                    {isComparisons &&
                      (active === 7 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Avg CPC</span>
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
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(8)}>
                    {isComparisons &&
                      (active === 8 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Ad Spend</span>
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
                    <span> Ad Orders</span>
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
                    <span> Ad Sales</span>
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
                    <span> % of Total Sales</span>
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
                colSpan={active === 12 && "4"}
                align="right"
              >
                <div>
                  <span onClick={() => headerClick(12)}>
                    {isComparisons &&
                      (active === 12 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Conv Rate</span>
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
                    <span> ACoS</span>
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
                      {(active === 2 ||
                        active === 3 ||
                        active === 4 ||
                        active === 8) &&
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
                      {(active === 2 ||
                        active === 3 ||
                        active === 4 ||
                        active === 8) &&
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
            <tr>
              <td component="th">
                <b>Total</b>
              </td>

              <td align="right"></td>
              {isComparisons && active === 2 ? (
                <>
                  <td align="right">
                    {totalOfData.sales
                      ? "$" + numberWithCommas(totalOfData.sales)
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                  {isYoY && (
                    <>
                      {" "}
                      <td align="right"></td>
                      <td align="right"></td>
                    </>
                  )}
                </>
              ) : (
                <td align="right">
                  {totalOfData.sales
                    ? "$" + numberWithCommas(totalOfData.sales)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 3 ? (
                <>
                  <td align="right">
                    {totalOfData.units_sold
                      ? numberWithCommas(totalOfData.units_sold)
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                  {isYoY && (
                    <>
                      {" "}
                      <td align="right"></td>
                      <td align="right"></td>
                    </>
                  )}
                </>
              ) : (
                <td align="right">
                  {totalOfData.units_sold
                    ? numberWithCommas(totalOfData.units_sold)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 4 ? (
                <>
                  <td align="right">
                    {totalOfData.shipped_cogs
                      ? "$" + numberWithCommas(totalOfData.shipped_cogs)
                      : "N/A"}
                  </td>
                  <td align="right"></td>

                  <td align="right"></td>
                  <td align="right"></td>
                  {isYoY && (
                    <>
                      {" "}
                      <td align="right"></td>
                      <td align="right"></td>
                    </>
                  )}
                </>
              ) : (
                <td align="right">
                  {totalOfData.shipped_cogs
                    ? "$" + numberWithCommas(totalOfData.shipped_cogs)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 5 ? (
                <>
                  <td align="right">
                    {totalOfData.ad_clicks
                      ? numberWithCommas(totalOfData.ad_clicks)
                      : "N/A"}
                  </td>

                  <td align="right"></td>
                  <td align="right"></td>

                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {totalOfData.ad_clicks
                    ? numberWithCommas(totalOfData.ad_clicks)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 6 ? (
                <>
                  <td align="right">
                    {totalOfData.ad_impressions
                      ? numberWithCommas(totalOfData.ad_impressions)
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {totalOfData.ad_impressions
                    ? numberWithCommas(totalOfData.ad_impressions)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 7 ? (
                <>
                  <td align="right">
                    {totalOfData.average_cpc
                      ? "$" + numberWithCommas(totalOfData.average_cpc)
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {totalOfData.average_cpc !== 0
                    ? "$" + numberWithCommas(totalOfData.average_cpc)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 8 ? (
                <>
                  <td align="right">
                    {totalOfData.ad_spend
                      ? "$" + numberWithCommas(totalOfData.ad_spend)
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                  {isYoY && (
                    <>
                      <td align="right"></td>
                      <td align="right"></td>
                    </>
                  )}
                </>
              ) : (
                <td align="right">
                  {totalOfData.ad_spend !== 0
                    ? "$" + numberWithCommas(totalOfData.ad_spend)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 9 ? (
                <>
                  <td align="right">
                    {!!totalOfData.ad_orders
                      ? numberWithCommas(totalOfData.ad_orders)
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {totalOfData.ad_orders !== 0
                    ? numberWithCommas(totalOfData.ad_orders)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 10 ? (
                <>
                  <td align="right">
                    {totalOfData.ad_sales
                      ? "$" + numberWithCommas(totalOfData.ad_sales)
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {totalOfData.ad_sales !== 0
                    ? "$" + numberWithCommas(totalOfData.ad_sales)
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 11 ? (
                <>
                  <td align="right">
                    {!!totalOfData.percent_total_sales
                      ? Number(totalOfData.percent_total_sales).toFixed(2) + "%"
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {!!totalOfData.percent_total_sales
                    ? Number(totalOfData.percent_total_sales).toFixed(2) + "%"
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 12 ? (
                <>
                  <td align="right">
                    {totalOfData.conversion_rate !== 0
                      ? Number(totalOfData.conversion_rate).toFixed(2) + "%"
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {totalOfData.conversion_rate !== 0
                    ? Number(totalOfData.conversion_rate).toFixed(2) + "%"
                    : "N/A"}
                </td>
              )}

              {isComparisons && active === 13 ? (
                <>
                  <td align="right">
                    {totalOfData.acos
                      ? totalOfData.acos.toFixed(2) + "%"
                      : "N/A"}
                  </td>
                  <td align="right"></td>
                  <td align="right"></td>
                  <td align="right"></td>
                </>
              ) : (
                <td align="right">
                  {totalOfData.acos !== 0
                    ? totalOfData.acos.toFixed(2) + "%"
                    : "N/A"}
                </td>
              )}
            </tr>
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
                      {isComparisons && active === 2 ? (
                        <>
                          <td align="right">
                            {current.sales
                              ? "$" + numberWithCommas(current.sales)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.sales
                              ? "$" + numberWithCommas(previous.sales)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.sales)}
                          >
                            {change.sales !== 0
                              ? "$" + numberWithCommas(change.sales)
                              : current.sales > 0 && previous.sales > 0
                              ? "$0.00"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.sales)}
                          >
                            {charge.sales !== 0
                              ? charge.sales + "%"
                              : current.sales > 0 && previous.sales > 0
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

                      {isComparisons && active === 3 ? (
                        <>
                          <td align="right">
                            {current.units_sold
                              ? numberWithCommas(current.units_sold)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.units_sold
                              ? numberWithCommas(previous.units_sold)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.units_sold)}
                          >
                            {change.units_sold !== 0
                              ? numberWithCommas(change.units_sold)
                              : current.units_sold > 0 &&
                                previous.units_sold > 0
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
                                previous.units_sold > 0
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

                      {isComparisons && active === 4 ? (
                        <>
                          <td align="right">
                            {current.shipped_cogs
                              ? "$" + numberWithCommas(current.shipped_cogs)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.shipped_cogs
                              ? "$" + numberWithCommas(previous.shipped_cogs)
                              : "N/A"}
                          </td>

                          <td
                            align="right"
                            className={isNegative(change.shipped_cogs)}
                          >
                            {change.shipped_cogs !== 0
                              ? "$" + numberWithCommas(change.shipped_cogs)
                              : current.shipped_cogs > 0 &&
                                previous.shipped_cogs > 0
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
                                previous.shipped_cogs > 0
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
                            {current.ad_clicks
                              ? numberWithCommas(current.ad_clicks)
                              : "N/A"}
                          </td>

                          <td align="right">
                            {previous.ad_clicks
                              ? numberWithCommas(previous.ad_clicks)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.ad_clicks)}
                          >
                            {change.ad_clicks !== 0
                              ? numberWithCommas(change.ad_clicks)
                              : current.ad_clicks > 0 && previous.ad_clicks > 0
                              ? "0.00"
                              : "N/A"}
                          </td>

                          <td
                            align="right"
                            className={isNegative(charge.ad_clicks)}
                          >
                            {current.ad_clicks !== 0
                              ? charge.ad_clicks + "%"
                              : current.ad_clicks > 0 && previous.ad_clicks > 0
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

                      {isComparisons && active === 6 ? (
                        <>
                          <td align="right">
                            {current.ad_impressions
                              ? numberWithCommas(current.ad_impressions)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.ad_impressions
                              ? numberWithCommas(previous.ad_impressions)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.ad_impressions)}
                          >
                            {change.ad_impressions !== 0
                              ? numberWithCommas(change.ad_impressions)
                              : current.ad_impressions > 0 &&
                                previous.ad_impressions > 0
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
                                previous.ad_impressions > 0
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
                              : current.average_cpc > 0 &&
                                previous.average_cpc > 0
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
                                previous.average_cpc > 0
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
                              : current.ad_spend > 0 && previous.ad_spend > 0
                              ? "0"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_spend)}
                          >
                            {charge.ad_spend !== 0
                              ? charge.ad_spend + "%"
                              : current.ad_spend > 0 && previous.ad_spend > 0
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

                      {isComparisons && active === 9 ? (
                        <>
                          <td align="right">
                            {!!current.ad_orders
                              ? numberWithCommas(current.ad_orders)
                              : "N/A"}
                          </td>
                          <td align="right">
                            {!!previous.ad_orders
                              ? numberWithCommas(previous.ad_orders)
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(change.ad_orders)}
                          >
                            {change.ad_orders !== 0
                              ? numberWithCommas(change.ad_orders)
                              : current.ad_orders > 0 && previous.ad_orders > 0
                              ? "0"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_orders)}
                          >
                            {charge.ad_orders !== 0
                              ? charge.ad_orders + "%"
                              : current.ad_orders > 0 && previous.ad_orders > 0
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
                              : current.ad_sales > 0 && previous.ad_sales > 0
                              ? "0"
                              : "N/A"}
                          </td>
                          <td
                            align="right"
                            className={isNegative(charge.ad_sales)}
                          >
                            {charge.ad_sales !== 0
                              ? charge.ad_sales + "%"
                              : current.ad_sales > 0 && previous.ad_sales > 0
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

                      {isComparisons && active === 11 ? (
                        <>
                          <td align="right">
                            {!!current.percent_total_sales
                              ? Number(current.percent_total_sales).toFixed(2) +
                                "%"
                              : "N/A"}
                          </td>
                          <td align="right">
                            {!!previous.percent_total_sales
                              ? Number(previous.percent_total_sales).toFixed(
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
                                previous.percent_total_sales > 0
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
                                previous.percent_total_sales > 0
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

                      {isComparisons && active === 12 ? (
                        <>
                          <td align="right">
                            {current.conversion_rate !== 0
                              ? Number(current.conversion_rate).toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.conversion_rate !== 0
                              ? Number(previous.conversion_rate).toFixed(2) +
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
                                previous.conversion_rate > 0
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
                                previous.conversion_rate > 0
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

                      {isComparisons && active === 13 ? (
                        <>
                          <td align="right">
                            {current.acos
                              ? current.acos.toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td align="right">
                            {previous.acos
                              ? previous.acos.toFixed(2) + "%"
                              : "N/A"}
                          </td>
                          <td align="right" className={isNegative(change.acos)}>
                            {change.acos !== 0
                              ? change.acos + "%"
                              : current.acos > 0 && previous.acos > 0
                              ? "0"
                              : "N/A"}
                          </td>
                          <td align="right" className={isNegative(charge.acos)}>
                            {charge.acos !== 0
                              ? charge.acos + "%"
                              : current.acos > 0 && previous.acos > 0
                              ? "0%"
                              : "N/A"}
                          </td>
                        </>
                      ) : (
                        <td align="right">
                          {current.acos !== 0
                            ? current.acos.toFixed(2) + "%"
                            : current.ad_orders > 0 && previous.ad_orders > 0
                            ? "0"
                            : "N/A"}
                        </td>
                      )}
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataDisplaySKUTable;
