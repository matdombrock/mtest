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
import Button from '@material-ui/core/Button'
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { CSVLink } from "react-csv";
import DownloadCSVButton from './../../common/downloadCSVButton'
import TableTotalRowCell from './../Table/table-totalrow-cell';
import TableCell from './../Table/table-cell';

const convertToFrontendReadyFormat = ({ periods }, yoy, pop) => {

  let payload = [];

  periods.map((d, i, arr) => {
    const _pop = pop[i];
    const _yoy = yoy[i];;

    const current = d.summary;

    const previous =
      i < arr.length - 1
        ? arr[i + 1].summary
        : {
          asp: 0,
          units_per_order: 0,
          orders: 0,
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
          item_number: "N/A",
        };

    const change = {
      asp: _pop?.summary?.asp?.number?.toFixed(2) ?? 0,
      units_per_order: _pop?.summary?.units_per_order?.number?.toFixed(2) ?? 0,
      orders: _pop?.summary?.orders?.number?.toFixed(2) ?? 0,
      acos: _pop?.summary?.acos?.number?.toFixed(2) ?? 0,
      ad_clicks: _pop?.summary?.ad_clicks?.number?.toFixed(2) ?? 0,
      ad_impressions: _pop?.summary?.ad_impressions?.number?.toFixed(2) ?? 0,
      ad_orders: _pop?.summary?.ad_orders?.number?.toFixed(2) ?? 0,
      ad_sales: _pop?.summary?.ad_sales?.number?.toFixed(2) ?? 0,
      ad_spend: _pop?.summary?.ad_spend?.number?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _pop?.summary?.average_cpc?.number?.toFixed(2) ?? 0,
      conversion_rate: _pop?.summary?.conversion_rate?.number?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales: _pop?.summary?.percent_total_sales?.number?.toFixed(2) ?? 0,
      sales: _pop?.summary?.sales?.number?.toFixed(2) ?? 0,
      shipped_cogs: _pop?.summary?.shipped_cogs?.number?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _pop?.summary?.units_sold?.number?.toFixed(2) ?? 0,
    };

    const charge = {
      asp: _pop?.summary?.asp?.percentage?.toFixed(2) ?? 0,
      units_per_order: _pop?.summary?.units_per_order?.percentage?.toFixed(2) ?? 0,
      orders: _pop?.summary?.orders?.percentage?.toFixed(2) ?? 0,
      acos: _pop?.summary?.acos?.percentage?.toFixed(2) ?? 0,
      ad_clicks: _pop?.summary?.ad_clicks?.percentage?.toFixed(2) ?? 0,
      ad_impressions: _pop?.summary?.ad_impressions?.percentage?.toFixed(2) ?? 0,
      ad_orders: _pop?.summary?.ad_orders?.percentage?.toFixed(2) ?? 0,
      ad_sales: _pop?.summary?.ad_sales?.percentage?.toFixed(2) ?? 0,
      ad_spend: _pop?.summary?.ad_spend?.percentage?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _pop?.summary?.average_cpc?.percentage?.toFixed(2) ?? 0,
      conversion_rate: _pop?.summary?.conversion_rate?.percentage?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales: _pop?.summary?.percent_total_sales?.percentage?.toFixed(2) ?? 0,
      sales: _pop?.summary?.sales?.percentage?.toFixed(2) ?? 0,
      shipped_cogs: _pop?.summary?.shipped_cogs?.percentage?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _pop?.summary?.units_sold?.percentage?.toFixed(2) ?? 0,
    };

    const yoyChange = {
      asp: _yoy?.summary?.asp?.number?.toFixed(2) ?? 0,
      units_per_order: _yoy?.summary?.units_per_order?.number?.toFixed(2) ?? 0,
      orders: _yoy?.summary?.orders?.number?.toFixed(2) ?? 0,
      acos: _yoy?.summary?.acos?.number?.toFixed(2) ?? 0,
      ad_clicks: _yoy?.summary?.ad_clicks?.number?.toFixed(2) ?? 0,
      ad_impressions: _yoy?.summary?.ad_impressions?.number?.toFixed(2) ?? 0,
      ad_orders: _yoy?.summary?.ad_orders?.number?.toFixed(2) ?? 0,
      ad_sales: _yoy?.summary?.ad_sales?.number?.toFixed(2) ?? 0,
      ad_spend: _yoy?.summary?.ad_spend?.number?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _yoy?.summary?.average_cpc?.number?.toFixed(2) ?? 0,
      conversion_rate: _yoy?.summary?.conversion_rate?.number?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales: _yoy?.summary?.percent_total_sales?.number?.toFixed(2) ?? 0,
      sales: _yoy?.summary?.sales?.number?.toFixed(2) ?? 0,
      shipped_cogs: _yoy?.summary?.shipped_cogs?.number?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _yoy?.summary?.units_sold?.number?.toFixed(2) ?? 0,
    };

    const yoyCharge = {
      asp: _yoy?.summary?.asp?.percentage?.toFixed(2) ?? 0,
      units_per_order: _yoy?.summary?.units_per_order?.percentage?.toFixed(2) ?? 0,
      orders: _yoy?.summary?.orders?.percentage?.toFixed(2) ?? 0,
      acos: _yoy?.summary?.acos?.percentage?.toFixed(2) ?? 0,
      ad_clicks: _yoy?.summary?.ad_clicks?.percentage?.toFixed(2) ?? 0,
      ad_impressions: _yoy?.summary?.ad_impressions?.percentage?.toFixed(2) ?? 0,
      ad_orders: _yoy?.summary?.ad_orders?.percentage?.toFixed(2) ?? 0,
      ad_sales: _yoy?.summary?.ad_sales?.percentage?.toFixed(2) ?? 0,
      ad_spend: _yoy?.summary?.ad_spend?.percentage?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _yoy?.summary?.average_cpc?.percentage?.toFixed(2) ?? 0,
      conversion_rate: _yoy?.summary?.conversion_rate?.percentage?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales: _yoy?.summary?.percent_total_sales?.percentage?.toFixed(2) ?? 0,
      sales: _yoy?.summary?.sales?.percentage?.toFixed(2) ?? 0,
      shipped_cogs: _yoy?.summary?.shipped_cogs?.percentage?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _yoy?.summary?.units_sold?.percentage?.toFixed(2) ?? 0,
    };
    payload.push({
      current,
      previous,
      change,
      charge,
      period: d.period,
      yoy: yoyChange,
      yoyCharge,
    });
    return false;
  });
  return payload;
};

const isNegative = (value) =>
  Number(value) !== 0 && (Number(value) <= 0 ? s.red : s.green);

const getCSVVersion = (data, isYoY, totalOfData) => {
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
  header.push("Date Range");
  header.push(...getHeaderColumn(false, "Sales"));
  header.push(...getHeaderColumn(false, "Shipped COGS"));
  header.push(...getHeaderColumn(false, 'Orders'));
  header.push(...getHeaderColumn(false, "Units Sold"));
  header.push(...getHeaderColumn(false, 'Units Per Order'));
  header.push(...getHeaderColumn(false, 'ASP'));
  header.push(...getHeaderColumn(true, "Ad Impressions"));
  header.push(...getHeaderColumn(true, "Ad Clicks"));
  header.push(...getHeaderColumn(true, "Avg CPC"));
  header.push(...getHeaderColumn(false, "Ad Spend"));
  header.push(...getHeaderColumn(true, "Ad Orders"));
  header.push(...getHeaderColumn(true, "Ad Sales"));
  header.push(...getHeaderColumn(true, "% of Total Sales"));
  header.push(...getHeaderColumn(true, "Conv Rate"));
  header.push(...getHeaderColumn(true, "ACoS"));
  const headerOfComparison = [];

  headerOfComparison.push("");
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
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
  data.map(({ current, period, previous, change, yoy, charge, yoyCharge }) => {
    const temp = [];
    temp.push(`${moment(period.start).utc().format("MM/DD/YYYY")} - ${moment(period.end).utc().format("MM/DD/YYYY")}`);

    temp.push(current.sales !== 0 ? "$" + numberWithCommas(current.sales) : "N/A");
    temp.push(previous.sales !== 0 ? "$" + numberWithCommas(previous.sales) : "N/A");
    temp.push(change.sales !== 0 ? "$" + change.sales : "N/A");
    temp.push(charge.sales !== 0 ? charge.sales + "%" : "N/A");

    if (isYoY) {
      temp.push(yoy.sales !== 0 ? numberWithCommas(yoy.sales) : "N/A");
      temp.push(yoyCharge.sales !== 0 ? yoyCharge.sales + "%" : "N/A");
    }

    temp.push(current.shipped_cogs !== 0 ? "$" + numberWithCommas(current.shipped_cogs) : "N/A");
    temp.push(previous.shipped_cogs !== 0 ? "$" + numberWithCommas(previous.shipped_cogs) : "N/A");
    temp.push(current.shipped_cogs !== 0 ? "$" + numberWithCommas(change.shipped_cogs) : "N/A");
    temp.push(charge.shipped_cogs !== 0 ? charge.shipped_cogs + "%" : "N/A");

    if (isYoY) {
      temp.push(yoy.shipped_cogs !== 0 ? numberWithCommas(yoy.shipped_cogs) : "N/A");
      temp.push(yoyCharge.shipped_cogs !== 0 ? yoyCharge.shipped_cogs + "%" : "N/A");
    }

    temp.push(current.orders !== 0 ? numberWithCommas(current.orders) : "N/A");
    temp.push(previous.orders !== 0 ? numberWithCommas(previous.orders) : "N/A");
    temp.push(change.orders !== 0 ? change.orders : "N/A");
    temp.push(charge.orders !== 0 ? charge.orders + "%" : "N/A");

    if (isYoY) {
      temp.push(yoy.orders !== 0 ? numberWithCommas(yoy.orders) : "N/A");
      temp.push(yoyCharge.orders !== 0 ? yoyCharge.orders + "%" : "N/A");
    }

    temp.push(current.units_sold !== 0 ? numberWithCommas(current.units_sold) : "N/A");
    temp.push(previous.units_sold !== 0 ? numberWithCommas(previous.units_sold) : "N/A");
    temp.push(change.units_sold !== 0 ? numberWithCommas(change.units_sold) : "N/A");
    temp.push(charge.units_sold !== 0 ? charge.units_sold + "%" : "N/A");

    if (isYoY) {
      temp.push(yoy.units_sold !== 0 ? numberWithCommas(yoy.units_sold) : "N/A");
      temp.push(yoyCharge.units_sold !== 0 ? yoyCharge.units_sold + "%" : "N/A");
    }

    temp.push(current.units_per_order !== 0 ? numberWithCommas(current.units_per_order) : "N/A");
    temp.push(previous.units_per_order !== 0 ? numberWithCommas(previous.units_per_order) : "N/A");
    temp.push(change.units_per_order !== 0 ? change.units_per_order : "N/A");
    temp.push(charge.units_per_order !== 0 ? charge.units_per_order + "%" : "N/A");

    if (isYoY) {
      temp.push(yoy.units_per_order !== 0 ? numberWithCommas(yoy.units_per_order) : "N/A");
      temp.push(yoyCharge.units_per_order !== 0 ? yoyCharge.units_per_order + "%" : "N/A");
    }

    temp.push(current.asp !== 0 ? "$" + numberWithCommas(current.asp) : "N/A");
    temp.push(previous.asp !== 0 ? "$" + numberWithCommas(previous.asp) : "N/A");
    temp.push(change.asp !== 0 ? "$" + change.asp : "N/A");
    temp.push(charge.asp !== 0 ? charge.asp + "%" : "N/A");

    if (isYoY) {
      temp.push(yoy.asp !== 0 ? numberWithCommas(yoy.asp) : "N/A");
      temp.push(yoyCharge.asp !== 0 ? yoyCharge.asp + "%" : "N/A");
    }

    temp.push(current.ad_impressions !== 0 ? numberWithCommas(current.ad_impressions) : "N/A");
    temp.push(previous.ad_impressions !== 0 ? numberWithCommas(previous.ad_impressions) : "N/A");
    temp.push(change.ad_impressions !== 0 ? numberWithCommas(change.ad_impressions) : "N/A");
    temp.push(charge.ad_impressions !== 0 ? charge.ad_impressions + "%" : "N/A");

    temp.push(current.ad_clicks !== 0 ? numberWithCommas(current.ad_clicks) : "N/A");
    temp.push(previous.ad_clicks !== 0 ? numberWithCommas(previous.ad_clicks) : "N/A");
    temp.push(change.ad_clicks !== 0 ? numberWithCommas(change.ad_clicks) : "N/A");
    temp.push(charge.ad_clicks !== 0 ? charge.ad_clicks + "%" : "N/A");

    temp.push(current.average_cpc ? "$" + numberWithCommas(current.average_cpc) : "N/A");
    temp.push(previous.average_cpc ? "$" + numberWithCommas(previous.average_cpc) : "N/A");
    temp.push(change.average_cpc !== 0 ? "$" + numberWithCommas(change.average_cpc) : "N/A");
    temp.push(charge.average_cpc !== 0 ? charge.average_cpc + "%" : "N/A");

    temp.push(current.ad_spend ? "$" + numberWithCommas(current.ad_spend) : "N/A");
    temp.push(previous.ad_spend ? "$" + numberWithCommas(previous.ad_spend) : "N/A");
    temp.push(change.ad_spend !== 0 ? "$" + numberWithCommas(change.ad_spend) : "N/A");
    temp.push(current.ad_spend !== 0 ? charge.ad_spend + "%" : "N/A");

    if (isYoY) {
      temp.push(yoy.ad_spend !== 0 ? "$" + numberWithCommas(yoy.ad_spend) : "N/A");
      temp.push(yoyCharge.ad_spend !== 0 ? yoyCharge.ad_spend + "%" : "N/A");
    }

    temp.push(current.ad_orders ? numberWithCommas(current.ad_orders) : "N/A");
    temp.push(previous.ad_orders ? numberWithCommas(previous.ad_orders) : "N/A");
    temp.push(change.ad_orders !== 0 ? numberWithCommas(change.ad_orders) : "N/A");
    temp.push(charge.ad_orders !== 0 ? charge.ad_orders + "%" : "N/A");

    temp.push(current.ad_sales ? "$" + numberWithCommas(current.ad_sales) : "N/A");
    temp.push(previous.ad_sales ? "$" + numberWithCommas(previous.ad_sales) : "N/A");
    temp.push(change.ad_sales !== 0 ? "$" + numberWithCommas(change.ad_sales) : "N/A");
    temp.push(charge.ad_sales !== 0 ? numberWithCommas(charge.ad_sales) + "%" : "N/A");

    temp.push(current.percent_total_sales !== 0 ? Number(current.percent_total_sales).toFixed(2) + "%" : "N/A");
    temp.push(previous.percent_total_sales !== 0 ? Number(previous.percent_total_sales).toFixed(2) + "%" : "N/A");
    temp.push(change.percent_total_sales !== 0 ? change.percent_total_sales + "%" : "N/A");
    temp.push(charge.percent_total_sales !== 0 ? Number(charge.percent_total_sales).toFixed(2) + "%" : "N/A");

    temp.push(current.conversion_rate !== 0 ? Number(current.conversion_rate).toFixed(2) + "%" : "N/A");
    temp.push(previous.conversion_rate !== 0 ? Number(previous.conversion_rate).toFixed(2) + "%" : "N/A");
    temp.push(change.conversion_rate !== 0 ? Number(change.conversion_rate).toFixed(2) + "%" : "N/A");
    temp.push(charge.conversion_rate !== 0 ? Number(charge.conversion_rate).toFixed(2) + "%" : "N/A");

    temp.push(current.acos !== 0 ? Number(current.acos).toFixed(2) + "%" : "N/A");
    temp.push(previous.acos !== 0 ? Number(previous.acos).toFixed(2) + "%" : "N/A");
    temp.push(change.acos !== 0 ? Number(change.acos).toFixed(2) + "%" : "N/A");
    temp.push(charge.acos !== 0 ? Number(charge.acos).toFixed(2) + "%" : "N/A");

    finalData.push(temp);

    return false;
  });
  let total = [];

  total.push("Total");

  // total.push("");

  total.push(
    totalOfData.sales.current
      ? "$" + numberWithCommas(totalOfData.sales.current)
      : "N/A"
  );
  total.push(
    totalOfData.sales.previous
      ? "$" + numberWithCommas(totalOfData.sales.previous)
      : "N/A"
  );
  total.push(
    totalOfData.sales.change !== 0
      ? "$" + numberWithCommas(totalOfData.sales.change)
      : totalOfData.sales.current > 0 && totalOfData.sales.previous > 0
        ? "$0.00"
        : "N/A"
  );
  total.push(
    totalOfData.sales.charge !== 0
      ? Number(totalOfData.sales.charge).toFixed(2) + "%"
      : totalOfData.sales.current > 0 && totalOfData.sales.previous > 0
        ? "0%"
        : "N/A"
  );
  if (isYoY) {
    total.push(
      totalOfData.sales.yoy !== 0
        ? "$" + numberWithCommas(totalOfData.sales.yoy)
        : totalOfData.sales.current > 0 && totalOfData.sales.yoySKU > 0
          ? "$0.00"
          : "N/A"
    );
    total.push(
      totalOfData.sales.yoyCharge !== 0
        ? Number(totalOfData.sales.yoyCharge).toFixed(2) + "%"
        : totalOfData.sales.current > 0 && totalOfData.sales.yoySKU > 0
          ? "0%"
          : "N/A"
    );
  }

  total.push(
    totalOfData.shipped_cogs.current
      ? "$" + numberWithCommas(totalOfData.shipped_cogs.current)
      : "N/A"
  );
  total.push(
    totalOfData.shipped_cogs.previous
      ? "$" + numberWithCommas(totalOfData.shipped_cogs.previous)
      : "N/A"
  );
  total.push(
    totalOfData.shipped_cogs.change !== 0
      ? "$" + numberWithCommas(totalOfData.shipped_cogs.change)
      : totalOfData.shipped_cogs.current > 0 &&
        totalOfData.shipped_cogs.previous
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.shipped_cogs.charge
      ? Number(totalOfData.shipped_cogs.charge).toFixed(2) + "%"
      : totalOfData.shipped_cogs.current > 0 &&
        totalOfData.shipped_cogs.previous
        ? "0%"
        : "N/A"
  );
  if (isYoY) {
    total.push(
      totalOfData.shipped_cogs.yoy !== 0
        ? "$" + numberWithCommas(totalOfData.shipped_cogs.yoy)
        : totalOfData.shipped_cogs.current > 0 &&
          totalOfData.shipped_cogs.previous
          ? "0"
          : "N/A"
    );
    total.push(
      totalOfData.shipped_cogs.yoyCharge
        ? Number(totalOfData.shipped_cogs.yoyCharge).toFixed(2) + "%"
        : totalOfData.shipped_cogs.current > 0 &&
          totalOfData.shipped_cogs.yoySKU > 0
          ? "0%"
          : "N/A"
    );
  }

  total.push(
    totalOfData.orders.current
      ? numberWithCommas(totalOfData.orders.current)
      : "N/A"
  );
  total.push(
    totalOfData.orders.previous
      ? numberWithCommas(totalOfData.orders.previous)
      : "N/A"
  );
  total.push(
    totalOfData.orders.change !== 0
      ? numberWithCommas(totalOfData.orders.change)
      : totalOfData.orders.current > 0 && totalOfData.orders.previous > 0
        ? "$0.00"
        : "N/A"
  );
  total.push(
    totalOfData.orders.charge !== 0
      ? Number(totalOfData.orders.charge).toFixed(2) + "%"
      : totalOfData.orders.current > 0 && totalOfData.orders.previous > 0
        ? "0%"
        : "N/A"
  );
  if (isYoY) {
    total.push(
      totalOfData.orders.yoy !== 0
        ? numberWithCommas(totalOfData.orders.yoy)
        : totalOfData.orders.current > 0 && totalOfData.orders.yoySKU > 0
          ? "$0.00"
          : "N/A"
    );
    total.push(
      totalOfData.orders.yoyCharge !== 0
        ? Number(totalOfData.orders.yoyCharge).toFixed(2) + "%"
        : totalOfData.orders.current > 0 && totalOfData.orders.yoySKU > 0
          ? "0%"
          : "N/A"
    );
  }

  total.push(
    totalOfData.units_sold.current
      ? numberWithCommas(totalOfData.units_sold.current)
      : "N/A"
  );
  total.push(
    totalOfData.units_sold.previous
      ? numberWithCommas(totalOfData.units_sold.previous)
      : "N/A"
  );
  total.push(
    totalOfData.units_sold.change !== 0
      ? numberWithCommas(totalOfData.units_sold.change)
      : totalOfData.units_sold.current > 0 &&
        totalOfData.units_sold.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.units_sold.charge !== 0
      ? Number(totalOfData.units_sold.charge).toFixed(2) + "%"
      : totalOfData.units_sold.current > 0 &&
        totalOfData.units_sold.previous > 0
        ? "0%"
        : "N/A"
  );
  if (isYoY) {
    total.push(
      totalOfData.units_sold.yoy !== 0
        ? numberWithCommas(totalOfData.units_sold.yoy)
        : totalOfData.units_sold.current > 0 &&
          totalOfData.units_sold.yoySKU > 0
          ? "0"
          : "N/A"
    );
    total.push(
      totalOfData.units_sold.yoyCharge !== 0
        ? Number(totalOfData.units_sold.yoyCharge).toFixed(2) + "%"
        : totalOfData.units_sold.current > 0 &&
          totalOfData.units_sold.yoySKU > 0
          ? "0%"
          : "N/A"
    );
  }

  total.push(
    totalOfData.units_per_order.current
      ? numberWithCommas(totalOfData.units_per_order.current)
      : "N/A"
  );
  total.push(
    totalOfData.units_per_order.previous
      ? numberWithCommas(totalOfData.units_per_order.previous)
      : "N/A"
  );
  total.push(
    totalOfData.units_per_order.change !== 0
      ? numberWithCommas(totalOfData.units_per_order.change)
      : totalOfData.units_per_order.current > 0 && totalOfData.units_per_order.previous > 0
        ? "$0.00"
        : "N/A"
  );
  total.push(
    totalOfData.units_per_order.charge !== 0
      ? Number(totalOfData.units_per_order.charge).toFixed(2) + "%"
      : totalOfData.units_per_order.current > 0 && totalOfData.units_per_order.previous > 0
        ? "0%"
        : "N/A"
  );
  if (isYoY) {
    total.push(
      totalOfData.units_per_order.yoy !== 0
        ? numberWithCommas(totalOfData.units_per_order.yoy)
        : totalOfData.units_per_order.current > 0 && totalOfData.units_per_order.yoySKU > 0
          ? "$0.00"
          : "N/A"
    );
    total.push(
      totalOfData.units_per_order.yoyCharge !== 0
        ? Number(totalOfData.units_per_order.yoyCharge).toFixed(2) + "%"
        : totalOfData.units_per_order.current > 0 && totalOfData.units_per_order.yoySKU > 0
          ? "0%"
          : "N/A"
    );
  }

  total.push(
    totalOfData.asp.current
      ? "$" + numberWithCommas(totalOfData.asp.current)
      : "N/A"
  );
  total.push(
    totalOfData.asp.previous
      ? "$" + numberWithCommas(totalOfData.asp.previous)
      : "N/A"
  );
  total.push(
    totalOfData.asp.change !== 0
      ? "$" + numberWithCommas(totalOfData.asp.change)
      : totalOfData.asp.current > 0 && totalOfData.asp.previous > 0
        ? "$0.00"
        : "N/A"
  );
  total.push(
    totalOfData.asp.charge !== 0
      ? Number(totalOfData.asp.charge).toFixed(2) + "%"
      : totalOfData.asp.current > 0 && totalOfData.asp.previous > 0
        ? "0%"
        : "N/A"
  );
  if (isYoY) {
    total.push(
      totalOfData.asp.yoy !== 0
        ? "$" + numberWithCommas(totalOfData.asp.yoy)
        : totalOfData.asp.current > 0 && totalOfData.asp.yoySKU > 0
          ? "$0.00"
          : "N/A"
    );
    total.push(
      totalOfData.asp.yoyCharge !== 0
        ? Number(totalOfData.asp.yoyCharge).toFixed(2) + "%"
        : totalOfData.asp.current > 0 && totalOfData.asp.yoySKU > 0
          ? "0%"
          : "N/A"
    );
  }

  total.push(
    totalOfData.ad_impressions.current
      ? numberWithCommas(totalOfData.ad_impressions.current)
      : "N/A"
  );
  total.push(
    totalOfData.ad_impressions.previous
      ? numberWithCommas(totalOfData.ad_impressions.previous)
      : "N/A"
  );
  total.push(
    totalOfData.ad_impressions.change !== 0
      ? numberWithCommas(totalOfData.ad_impressions.change)
      : totalOfData.ad_impressions.current > 0 &&
        totalOfData.ad_impressions.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.ad_impressions.charge
      ? Number(totalOfData.ad_impressions.charge).toFixed(2) + "%"
      : totalOfData.ad_impressions.current > 0 &&
        totalOfData.ad_impressions.previous > 0
        ? "0%"
        : "N/A"
  );

  total.push(
    totalOfData.ad_clicks.current
      ? numberWithCommas(totalOfData.ad_clicks.current)
      : "N/A"
  );
  total.push(
    totalOfData.ad_clicks.previous
      ? numberWithCommas(totalOfData.ad_clicks.previous)
      : "N/A"
  );
  total.push(
    totalOfData.ad_clicks.change !== 0
      ? numberWithCommas(totalOfData.ad_clicks.change)
      : totalOfData.ad_clicks.current > 0 && totalOfData.ad_clicks.previous > 0
        ? "0.00"
        : "N/A"
  );
  total.push(
    totalOfData.ad_clicks.current !== 0
      ? Number(totalOfData.ad_clicks.charge).toFixed(2) + "%"
      : totalOfData.ad_clicks.current > 0 && totalOfData.ad_clicks.previous > 0
        ? "0%"
        : "N/A"
  );

  total.push(
    totalOfData.average_cpc.current
      ? "$" + numberWithCommas(totalOfData.average_cpc.current)
      : "N/A"
  );
  total.push(
    totalOfData.average_cpc.previous
      ? "$" + numberWithCommas(totalOfData.average_cpc.previous)
      : "N/A"
  );
  total.push(
    totalOfData.average_cpc.change !== 0
      ? "$" + numberWithCommas(totalOfData.average_cpc.change)
      : totalOfData.average_cpc.current > 0 &&
        totalOfData.average_cpc.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.average_cpc.charge !== 0
      ? Number(totalOfData.average_cpc.charge).toFixed(2) + "%"
      : totalOfData.average_cpc.current > 0 &&
        totalOfData.average_cpc.previous > 0
        ? "0%"
        : "N/A"
  );

  total.push(
    totalOfData.ad_spend.current
      ? "$" + numberWithCommas(totalOfData.ad_spend.current)
      : "N/A"
  );
  total.push(
    totalOfData.ad_spend.previous
      ? "$" + numberWithCommas(totalOfData.ad_spend.previous)
      : "N/A"
  );
  total.push(
    totalOfData.ad_spend.change !== 0
      ? "$" + numberWithCommas(totalOfData.ad_spend.change)
      : totalOfData.ad_spend.current > 0 && totalOfData.ad_spend.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.ad_spend.charge !== 0
      ? Number(totalOfData.ad_spend.charge).toFixed(2) + "%"
      : totalOfData.ad_spend.current > 0 && totalOfData.ad_spend.previous > 0
        ? "0%"
        : "N/A"
  );
  if (isYoY) {
    total.push(
      totalOfData.ad_spend.yoy !== 0
        ? "$" + numberWithCommas(totalOfData.ad_spend.yoy)
        : totalOfData.ad_spend.current > 0 && totalOfData.ad_spend.yoySKU > 0
          ? "0"
          : "N/A"
    );
    total.push(
      totalOfData.ad_spend.yoyCharge !== 0
        ? Number(totalOfData.ad_spend.yoyCharge).toFixed(2) + "%"
        : totalOfData.ad_spend.current > 0 && totalOfData.ad_spend.yoySKU > 0
          ? "0%"
          : "N/A"
    );
  }

  total.push(
    !!totalOfData.ad_orders.current
      ? numberWithCommas(totalOfData.ad_orders.current)
      : "N/A"
  );
  total.push(
    !!totalOfData.ad_orders.previous
      ? numberWithCommas(totalOfData.ad_orders.previous)
      : "N/A"
  );
  total.push(
    totalOfData.ad_orders.change !== 0
      ? numberWithCommas(totalOfData.ad_orders.change)
      : totalOfData.ad_orders.current > 0 && totalOfData.ad_orders.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.ad_orders.charge !== 0
      ? Number(totalOfData.ad_orders.charge).toFixed(2) + "%"
      : totalOfData.ad_orders.current > 0 && totalOfData.ad_orders.previous > 0
        ? "0%"
        : "N/A"
  );

  total.push(
    totalOfData.ad_sales.current
      ? "$" + numberWithCommas(totalOfData.ad_sales.current)
      : "N/A"
  );
  total.push(
    totalOfData.ad_sales.previous
      ? "$" + numberWithCommas(totalOfData.ad_sales.previous)
      : "N/A"
  );
  total.push(
    totalOfData.ad_sales.change !== 0
      ? "$" + numberWithCommas(totalOfData.ad_sales.change)
      : totalOfData.ad_sales.current > 0 && totalOfData.ad_sales.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.ad_sales.charge !== 0
      ? Number(totalOfData.ad_sales.charge).toFixed(2) + "%"
      : totalOfData.ad_sales.current > 0 && totalOfData.ad_sales.previous > 0
        ? "0%"
        : "N/A"
  );

  total.push(
    !!totalOfData.percent_total_sales.current
      ? Number(totalOfData.percent_total_sales.current).toFixed(2) + "%"
      : "N/A"
  );
  total.push(
    !!totalOfData.percent_total_sales.previous
      ? Number(totalOfData.percent_total_sales.previous).toFixed(2) + "%"
      : "N/A"
  );
  total.push(
    totalOfData.percent_total_sales.change !== 0
      ? Number(totalOfData.percent_total_sales.change).toFixed(2) + "%"
      : totalOfData.percent_total_sales.current > 0 &&
        totalOfData.percent_total_sales.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    !!totalOfData.percent_total_sales.charge
      ? Number(totalOfData.percent_total_sales.charge).toFixed(2) + "%"
      : totalOfData.percent_total_sales.current > 0 &&
        totalOfData.percent_total_sales.previous > 0
        ? "0%"
        : "N/A"
  );

  total.push(
    totalOfData.conversion_rate.current !== 0
      ? Number(totalOfData.conversion_rate.current).toFixed(2) + "%"
      : "N/A"
  );
  total.push(
    totalOfData.conversion_rate.previous !== 0
      ? Number(totalOfData.conversion_rate.previous).toFixed(2) + "%"
      : "N/A"
  );
  total.push(
    totalOfData.conversion_rate.change !== 0
      ? Number(totalOfData.conversion_rate.change).toFixed(2) + "%"
      : totalOfData.conversion_rate.current > 0 &&
        totalOfData.conversion_rate.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.conversion_rate.charge !== 0
      ? Number(totalOfData.conversion_rate.charge).toFixed(2) + "%"
      : totalOfData.conversion_rate.current > 0 &&
        totalOfData.conversion_rate.previous > 0
        ? "0%"
        : "N/A"
  );

  total.push(
    totalOfData.acos.current ? totalOfData.acos.current.toFixed(2) + "%" : "N/A"
  );
  total.push(
    totalOfData.acos.previous
      ? totalOfData.acos.previous.toFixed(2) + "%"
      : "N/A"
  );
  total.push(
    totalOfData.acos.change !== 0
      ? Number(totalOfData.acos.change).toFixed(2) + "%"
      : totalOfData.acos.current > 0 && totalOfData.acos.previous > 0
        ? "0"
        : "N/A"
  );
  total.push(
    totalOfData.acos.charge !== 0
      ? Number(totalOfData.acos.charge).toFixed(2) + "%"
      : totalOfData.acos.current > 0 && totalOfData.acos.previous > 0
        ? "0%"
        : "N/A"
  );
  finalData.push(total);
  return finalData;
};

const getFrontendFormattedTotal = (props, yoyTotal, currentTotal) => {
  const temp = {
    asp: {
      current: currentTotal.asp,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    units_per_order: {
      current: currentTotal?.units_per_order,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.units_per_order?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.units_per_order?.percentage?.toFixed(2) ?? 0,
    },
    orders: {
      current: currentTotal?.orders,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    sales: {
      current: currentTotal?.sales,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    units_sold: {
      current: currentTotal?.units_sold,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },

    shipped_cogs: {
      current: currentTotal?.shipped_cogs,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },

    average_cpc: {
      current: currentTotal?.average_cpc,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    ad_impressions: {
      current: currentTotal?.ad_impressions,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    ad_clicks: {
      current: currentTotal?.ad_clicks,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    ad_spend: {
      current: currentTotal?.ad_spend,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    ad_orders: {
      current: currentTotal?.ad_orders,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.asp?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.asp?.percentage?.toFixed(2) ?? 0,
    },
    ad_sales: {
      current: currentTotal?.ad_sales,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.ad_sales?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.ad_sales?.percentage?.toFixed(2) ?? 0,
    },
    percent_total_sales: {
      current: currentTotal?.percent_total_sales,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.percent_total_sales?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.percent_total_sales?.percentage?.toFixed(2) ?? 0,
    },
    conversion_rate: {
      current: currentTotal?.conversion_rate,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.conversion_rate?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.conversion_rate?.percentage?.toFixed(2) ?? 0,
    },
    acos: {
      current: currentTotal?.acos,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal?.acos?.number?.toFixed(2) ?? 0,
      yoyCharge: yoyTotal?.acos?.percentage?.toFixed(2) ?? 0,
    },
  };

  return temp;
};

const DataDisplayItemizedTable = (props) => {
  console.log('DataDisplayItemizedTable', props)
  const isComparisons = true;
  const [active, setActive] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const [sortByInner, setSortByInner] = useState(false);
  const [sortAscendingBy, setSortAscendingBy] = useState(false);
  let currentData = props.data?.data;
  let isYoY = !!currentData.comparisons.yoy.length;
  const { comparisons: { yoy, pop } } = currentData

  const frontendReadyFormat = convertToFrontendReadyFormat(currentData, yoy, pop);
  if (!currentData) return null;

  const filterData = frontendReadyFormat.sort((a, b) => {
    let tempSortBy = "asin";
    if (sortBy === 0) {
      tempSortBy = "date";
    } else if (sortBy === 1) {
      tempSortBy = "sales";
    } else if (sortBy === 2) {
      tempSortBy = "shipped_cogs";
    } else if (sortBy === 3) {
      tempSortBy = "orders";
    } else if (sortBy === 4) {
      tempSortBy = "units_sold";
    } else if (sortBy === 5) {
      tempSortBy = "units_per_order";
    } else if (sortBy === 6) {
      tempSortBy = "asp";
    } else if (sortBy === 7) {
      tempSortBy = "ad_impressions";
    } else if (sortBy === 8) {
      tempSortBy = "ad_clicks";
    } else if (sortBy === 9) {
      tempSortBy = "average_cpc";
    } else if (sortBy === 10) {
      tempSortBy = "ad_spend";
    } else if (sortBy === 11) {
      tempSortBy = "ad_orders";
    } else if (sortBy === 12) {
      tempSortBy = "ad_sales";
    } else if (sortBy === 13) {
      tempSortBy = "percent_total_sales";
    } else if (sortBy === 14) {
      tempSortBy = "conversion_rate";
    } else if (sortBy === 15) {
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


  const yoyTotal = currentData.comparisons.totals[0]
  const currentTotal = currentData.totals.periods;
  const totalOfData = getFrontendFormattedTotal(filterData, yoyTotal, currentTotal);

  return (
    <>
      <CSVLink
        className='link-download'
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
                colSpan={isComparisons && active === 4 && "4"}
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
                colSpan={isComparisons && active === 5 && "4"}
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
                colSpan={isComparisons && active === 6 && "4"}
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
                colSpan={isComparisons && active === 8 && "4"}
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
                colSpan={isComparisons && active === 9 && "4"}
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
                colSpan={isComparisons && active === 10 && "4"}
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
                colSpan={isComparisons && active === 11 && "4"}
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
                colSpan={isComparisons && active === 12 && "4"}
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
                colSpan={isComparisons && active === 13 && "4"}
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
                colSpan={isComparisons && active === 14 && "4"}
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
                colSpan={isComparisons && active === 15 && "4"}
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
                      {(active === 1 ||
                        active === 2 ||
                        active === 3 ||
                        active === 7) &&
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
                      {(active === 1 ||
                        active === 2 ||
                        active === 3 ||
                        active === 7) &&
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
            {filterData
              ? filterData.map((row, i, array) => {
                const { current, previous, change, charge, yoy, yoyCharge } = row;
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

                    <TableCell current={current.sales} previous={previous.sales} change={change.sales} charge={charge.sales}
                      yoy={yoy.sales} yoyCharge={yoyCharge.sales}
                      isComparisons={isComparisons} isActive={active === 1} isYoY={isYoY}>
                    </TableCell>
                    <TableCell current={current.shipped_cogs} previous={previous.shipped_cogs} change={change.shipped_cogs} charge={charge.shipped_cogs}
                      yoy={yoy.shipped_cogs} yoyCharge={yoyCharge.shipped_cogs}
                      isComparisons={isComparisons} isActive={active === 2} isYoY={isYoY}>
                    </TableCell>
                    <TableCell current={current.orders} previous={previous.orders} change={change.orders} charge={charge.orders}
                      yoy={yoy.orders} yoyCharge={yoyCharge.orders}
                      isComparisons={isComparisons} isActive={active === 3} isYoY={isYoY}>
                    </TableCell>
                    <TableCell current={current.units_sold} previous={previous.units_sold} change={change.units_sold} charge={charge.units_sold}
                      yoy={yoy.units_sold} yoyCharge={yoyCharge.units_sold}
                      isComparisons={isComparisons} isActive={active === 4} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.units_per_order} previous={previous.units_per_order} change={change.units_per_order} charge={charge.units_per_order}
                      yoy={yoy.units_per_order} yoyCharge={yoyCharge.units_per_order}
                      isComparisons={isComparisons} isActive={active === 5} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.asp} previous={previous.asp} change={change.asp} charge={charge.asp}
                      yoy={yoy.asp} yoyCharge={yoyCharge.asp}
                      isComparisons={isComparisons} isActive={active === 6} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.ad_impressions} previous={previous.ad_impressions} change={change.ad_impressions} charge={charge.ad_impressions}
                      yoy={yoy.ad_impressions} yoyCharge={yoyCharge.ad_impressions}
                      isComparisons={isComparisons} isActive={active === 7} isYoY={isYoY}>
                    </TableCell>
                    <TableCell current={current.ad_clicks} previous={previous.ad_clicks} change={change.ad_clicks} charge={charge.ad_clicks}
                      yoy={yoy.ad_clicks} yoyCharge={yoyCharge.ad_clicks}
                      isComparisons={isComparisons} isActive={active === 8} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.average_cpc} previous={previous.average_cpc} change={change.average_cpc} charge={charge.average_cpc}
                      yoy={yoy.average_cpc} yoyCharge={yoyCharge.average_cpc}
                      isComparisons={isComparisons} isActive={active === 9} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.ad_spend} previous={previous.ad_spend} change={change.ad_spend} charge={charge.ad_spend}
                      yoy={yoy.ad_spend} yoyCharge={yoyCharge.ad_spend}
                      isComparisons={isComparisons} isActive={active === 10} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.ad_orders} previous={previous.ad_orders} change={change.ad_orders} charge={charge.ad_orders}
                      yoy={yoy.ad_orders} yoyCharge={yoyCharge.ad_orders}
                      isComparisons={isComparisons} isActive={active === 11} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.ad_sales} previous={previous.ad_sales} change={change.ad_sales} charge={charge.ad_sales}
                      yoy={yoy.ad_sales} yoyCharge={yoyCharge.ad_sales}
                      isComparisons={isComparisons} isActive={active === 12} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.percent_total_sales} previous={previous.percent_total_sales} change={change.percent_total_sales} charge={charge.percent_total_sales}
                      yoy={yoy.percent_total_sales} yoyCharge={yoyCharge.percent_total_sales}
                      isComparisons={isComparisons} isActive={active === 13} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.conversion_rate} previous={previous.conversion_rate} change={change.conversion_rate} charge={charge.conversion_rate}
                      yoy={yoy.conversion_rate} yoyCharge={yoyCharge.conversion_rate}
                      isComparisons={isComparisons} isActive={active === 14} isYoY={false}>
                    </TableCell>
                    <TableCell current={current.acos} previous={previous.acos} change={change.acos} charge={charge.acos}
                      yoy={yoy.acos} yoyCharge={yoyCharge.acos}
                      isComparisons={isComparisons} isActive={active === 15} isYoY={false}>
                    </TableCell>
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

              <TableTotalRowCell cellData={totalOfData.sales} isComparisons={isComparisons} isActive={active === 1} isYoY={isYoY}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.shipped_cogs} isComparisons={isComparisons} isActive={active === 2} isYoY={isYoY}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.orders} isComparisons={isComparisons} isActive={active === 3} isYoY={isYoY}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.units_sold} isComparisons={isComparisons} isActive={active === 4} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.units_per_order} isComparisons={isComparisons} isActive={active === 5} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.asp} isComparisons={isComparisons} isActive={active === 6} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.ad_impressions} isComparisons={isComparisons} isActive={active === 7} isYoY={isYoY}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.ad_clicks} isComparisons={isComparisons} isActive={active === 8} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.average_cpc} isComparisons={isComparisons} isActive={active === 9} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.ad_spend} isComparisons={isComparisons} isActive={active === 10} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.ad_orders} isComparisons={isComparisons} isActive={active === 11} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.ad_sales} isComparisons={isComparisons} isActive={active === 12} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.percent_total_sales} isComparisons={isComparisons} isActive={active === 13} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.conversion_rate} isComparisons={isComparisons} isActive={active === 14} isYoY={false}></TableTotalRowCell>
              <TableTotalRowCell cellData={totalOfData.acos} isComparisons={isComparisons} isActive={active === 15} isYoY={false}></TableTotalRowCell>

            </tr>
          </tfoot>

        </table>
      </div>
    </>
  );
};

export default DataDisplayItemizedTable;
