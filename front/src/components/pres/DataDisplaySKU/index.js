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

const getCSVVersion = (filterSKUData, isYoY, totalOfData) => {
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
  header.push("Short Product Title");
  header.push(...getHeaderColumn(false, "Sales"));
  header.push(...getHeaderColumn(false, "Shipped COGS"));
  header.push(...getHeaderColumn(true, 'Orders'));
  header.push(...getHeaderColumn(false, "Units Sold"));
  header.push(...getHeaderColumn(true, 'Units Per Order'));
  header.push(...getHeaderColumn(true, 'ASP'));
  header.push(...getHeaderColumn(true, "Ad Impressions"));
  header.push(...getHeaderColumn(true, "Ad Clicks"));
  header.push(...getHeaderColumn(true, "Avg CPC"));
  header.push(...getHeaderColumn(false, "Ad Spend"));
  header.push(...getHeaderColumn(true, "Ad Orders"));
  header.push(...getHeaderColumn(true, "Ad Sales"));
  header.push(...getHeaderColumn(true, "% of Total Sales"));
  header.push(...getHeaderColumn(true, "Conv Rate"));
  header.push(...getHeaderColumn(true, "ACoS"));


  headerOfComparison.push("");
  headerOfComparison.push("");
  headerOfComparison.push("");
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
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
  filterSKUData.map(({ current, previous, change, charge, yoy, yoyCharge, yoySKU }) => {
    const temp = [];

    temp.push(current.item_number || "N/A");
    temp.push(current.asin || "N/A");
    temp.push(current.short_product_title || "N/A");
    temp.push(current.sales ? "$" + numberWithCommas(current.sales) : "N/A");
    temp.push(previous?.sales ? "$" + numberWithCommas(previous?.sales) : "N/A");
    temp.push(
      change.sales !== 0
        ? "$" + numberWithCommas(change.sales)
        : current.sales > 0 && previous?.sales > 0
          ? "$0.00"
          : "N/A"
    );
    temp.push(
      charge.sales !== 0
        ? charge.sales + "%"
        : current.sales > 0 && previous?.sales > 0
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

    temp.push(current.shipped_cogs ? "$" + numberWithCommas(current.shipped_cogs) : "N/A");
    temp.push(previous?.shipped_cogs ? "$" + numberWithCommas(previous?.shipped_cogs) : "N/A");
    temp.push(
      change.shipped_cogs !== 0
        ? "$" + numberWithCommas(change.shipped_cogs)
        : current.shipped_cogs > 0 && previous?.shipped_cogs > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.shipped_cogs
        ? charge.shipped_cogs + "%"
        : current.shipped_cogs > 0 && previous?.shipped_cogs > 0
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

    temp.push(current.orders ? numberWithCommas(current.orders) : "N/A");
    temp.push(previous?.orders ? numberWithCommas(previous?.orders) : "N/A");
    temp.push(
      change.orders !== 0
        ? numberWithCommas(change.orders)
        : current.orders > 0 && previous?.orders > 0
          ? "$0.00"
          : "N/A"
    );
    temp.push(
      charge.orders !== 0
        ? charge.orders + "%"
        : current.orders > 0 && previous?.orders > 0
          ? "0%"
          : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.orders !== 0
          ? numberWithCommas(yoy.orders)
          : current.orders > 0 && yoySKU.orders > 0
            ? "$0.00"
            : "N/A"
      );
      temp.push(
        yoyCharge.orders !== 0
          ? yoyCharge.orders + "%"
          : current.orders > 0 && yoySKU.orders > 0
            ? "0%"
            : "N/A"
      );
    }

    // units_sold
    temp.push(current.units_sold ? numberWithCommas(current.units_sold) : "N/A");
    temp.push(previous?.units_sold ? numberWithCommas(previous?.units_sold) : "N/A");
    temp.push(
      change.units_sold !== 0
        ? numberWithCommas(change.units_sold)
        : current.units_sold > 0 && previous?.units_sold > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.units_sold !== 0
        ? charge.units_sold + "%"
        : current.units_sold > 0 && previous?.units_sold > 0
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

    temp.push(current.units_per_order ? numberWithCommas(current.units_per_order) : "N/A");
    temp.push(previous?.units_per_order ? numberWithCommas(previous?.units_per_order) : "N/A");
    temp.push(
      change.units_per_order !== 0
        ? numberWithCommas(change.units_per_order)
        : current.units_per_order > 0 && previous?.units_per_order > 0
          ? "$0.00"
          : "N/A"
    );
    temp.push(
      charge.units_per_order !== 0
        ? charge.units_per_order + "%"
        : current.units_per_order > 0 && previous?.units_per_order > 0
          ? "0%"
          : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.units_per_order !== 0
          ? numberWithCommas(yoy.units_per_order)
          : current.units_per_order > 0 && yoySKU.units_per_order > 0
            ? "$0.00"
            : "N/A"
      );
      temp.push(
        yoyCharge.units_per_order !== 0
          ? yoyCharge.units_per_order + "%"
          : current.units_per_order > 0 && yoySKU.units_per_order > 0
            ? "0%"
            : "N/A"
      );
    }

    temp.push(current.asp ? "$" + numberWithCommas(current.asp) : "N/A");
    temp.push(previous?.asp ? "$" + numberWithCommas(previous?.asp) : "N/A");
    temp.push(
      change.asp !== 0
        ? "$" + numberWithCommas(change.asp)
        : current.asp > 0 && previous?.asp > 0
          ? "$0.00"
          : "N/A"
    );
    temp.push(
      charge.asp !== 0
        ? charge.asp + "%"
        : current.asp > 0 && previous?.asp > 0
          ? "0%"
          : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.asp !== 0
          ? "$" + numberWithCommas(yoy.asp)
          : current.asp > 0 && yoySKU.asp > 0
            ? "$0.00"
            : "N/A"
      );
      temp.push(
        yoyCharge.asp !== 0
          ? yoyCharge.asp + "%"
          : current.asp > 0 && yoySKU.asp > 0
            ? "0%"
            : "N/A"
      );
    }

    temp.push(current.ad_impressions ? numberWithCommas(current.ad_impressions) : "N/A");
    temp.push(
      previous?.ad_impressions
        ? numberWithCommas(previous?.ad_impressions)
        : "N/A"
    );
    temp.push(
      change.ad_impressions !== 0
        ? numberWithCommas(change.ad_impressions)
        : current.ad_impressions > 0 && previous?.ad_impressions > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.ad_impressions
        ? charge.ad_impressions + "%"
        : current.ad_impressions > 0 && previous?.ad_impressions > 0
          ? "0%"
          : "N/A"
    );

    temp.push(current.ad_clicks ? numberWithCommas(current.ad_clicks) : "N/A");
    temp.push(previous?.ad_clicks ? numberWithCommas(previous?.ad_clicks) : "N/A");
    temp.push(
      change.ad_clicks !== 0
        ? numberWithCommas(change.ad_clicks)
        : current.ad_clicks > 0 && previous?.ad_clicks > 0
          ? "0.00"
          : "N/A"
    );
    temp.push(
      current.ad_clicks !== 0
        ? charge.ad_clicks + "%"
        : current.ad_clicks > 0 && previous?.ad_clicks > 0
          ? "0%"
          : "N/A"
    );

    temp.push(current.average_cpc ? "$" + numberWithCommas(current.average_cpc) : "N/A");
    temp.push(previous?.average_cpc ? "$" + numberWithCommas(previous?.average_cpc) : "N/A");
    temp.push(
      change.average_cpc !== 0
        ? "$" + numberWithCommas(change.average_cpc)
        : current.average_cpc > 0 && previous?.average_cpc > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.average_cpc !== 0
        ? charge.average_cpc + "%"
        : current.average_cpc > 0 && previous?.average_cpc > 0
          ? "0%"
          : "N/A"
    );

    temp.push(current.ad_spend ? "$" + numberWithCommas(current.ad_spend) : "N/A");
    temp.push(previous?.ad_spend ? "$" + numberWithCommas(previous?.ad_spend) : "N/A");
    temp.push(
      change.ad_spend !== 0
        ? "$" + numberWithCommas(change.ad_spend)
        : current.ad_spend > 0 && previous?.ad_spend > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.ad_spend !== 0
        ? charge.ad_spend + "%"
        : current.ad_spend > 0 && previous?.ad_spend > 0
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

    temp.push(!!current.ad_orders ? numberWithCommas(current.ad_orders) : "N/A");
    temp.push(!!previous?.ad_orders ? numberWithCommas(previous?.ad_orders) : "N/A");
    temp.push(
      change.ad_orders !== 0
        ? numberWithCommas(change.ad_orders)
        : current.ad_orders > 0 && previous?.ad_orders > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.ad_orders !== 0
        ? charge.ad_orders + "%"
        : current.ad_orders > 0 && previous?.ad_orders > 0
          ? "0%"
          : "N/A"
    );

    temp.push(current.ad_sales ? "$" + numberWithCommas(current.ad_sales) : "N/A");
    temp.push(previous?.ad_sales ? "$" + numberWithCommas(previous?.ad_sales) : "N/A");
    temp.push(
      change.ad_sales !== 0
        ? "$" + numberWithCommas(change.ad_sales)
        : current.ad_sales > 0 && previous?.ad_sales > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.ad_sales !== 0
        ? charge.ad_sales + "%"
        : current.ad_sales > 0 && previous?.ad_sales > 0
          ? "0%"
          : "N/A"
    );

    temp.push(
      !!current.percent_total_sales
        ? Number(current.percent_total_sales).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      !!previous?.percent_total_sales
        ? Number(previous?.percent_total_sales).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      change.percent_total_sales !== 0
        ? change.percent_total_sales + "%"
        : current.percent_total_sales > 0 && previous?.percent_total_sales > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      !!charge.percent_total_sales
        ? charge.percent_total_sales + "%"
        : current.percent_total_sales > 0 && previous?.percent_total_sales > 0
          ? "0%"
          : "N/A"
    );
    temp.push(
      current.conversion_rate !== 0
        ? Number(current.conversion_rate).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      previous?.conversion_rate !== 0
        ? Number(previous?.conversion_rate).toFixed(2) + "%"
        : "N/A"
    );
    temp.push(
      change.conversion_rate !== 0
        ? change.conversion_rate + "%"
        : current.conversion_rate > 0 && previous?.conversion_rate > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.conversion_rate !== 0
        ? charge.conversion_rate + "%"
        : current.conversion_rate > 0 && previous?.conversion_rate > 0
          ? "0%"
          : "N/A"
    );

    temp.push(current.acos ? current.acos.toFixed(2) + "%" : "N/A");
    temp.push(previous?.acos ? previous?.acos.toFixed(2) + "%" : "N/A");
    temp.push(
      change.acos !== 0
        ? change.acos + "%"
        : current.acos > 0 && previous?.acos > 0
          ? "0"
          : "N/A"
    );
    temp.push(
      charge.acos !== 0
        ? charge.acos + "%"
        : current.acos > 0 && previous?.acos > 0
          ? "0%"
          : "N/A"
    );

    finalData.push(temp);

    return false;
  });
  let total = [];
  total.push("Total");
  total.push("");
  total.push('')

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
      : 'N/A'
  );
  total.push(
    totalOfData.orders.previous
      ? numberWithCommas(totalOfData.orders.previous)
      : 'N/A'
  )
  total.push(
    totalOfData.orders.change !== 0
      ? numberWithCommas(totalOfData.orders.change)
      : totalOfData.orders.current > 0 && totalOfData.orders.previous > 0
        ? '$0.00'
        : 'N/A'
  )
  total.push(
    totalOfData.orders.charge !== 0
      ? Number(totalOfData.orders.charge).toFixed(2) + '%'
      : totalOfData.orders.current > 0 && totalOfData.orders.previous > 0
        ? '0%'
        : 'N/A'
  )

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
      : 'N/A'
  );
  total.push(
    totalOfData.units_per_order.previous
      ? numberWithCommas(totalOfData.units_per_order.previous)
      : 'N/A'
  )
  total.push(
    totalOfData.units_per_order.change !== 0
      ? numberWithCommas(totalOfData.units_per_order.change)
      : totalOfData.units_per_order.current > 0 && totalOfData.units_per_order.previous > 0
        ? '$0.00'
        : 'N/A'
  )
  total.push(
    totalOfData.units_per_order.charge !== 0
      ? Number(totalOfData.units_per_order.charge).toFixed(2) + '%'
      : totalOfData.units_per_order.current > 0 && totalOfData.units_per_order.previous > 0
        ? '0%'
        : 'N/A'
  )

  total.push(
    totalOfData.asp.current
      ? numberWithCommas(totalOfData.asp.current)
      : 'N/A'
  );
  total.push(
    totalOfData.asp.previous
      ? numberWithCommas(totalOfData.asp.previous)
      : 'N/A'
  )
  total.push(
    totalOfData.asp.change !== 0
      ? numberWithCommas(totalOfData.asp.change)
      : totalOfData.asp.current > 0 && totalOfData.asp.previous > 0
        ? '$0.00'
        : 'N/A'
  )
  total.push(
    totalOfData.asp.charge !== 0
      ? Number(totalOfData.asp.charge).toFixed(2) + '%'
      : totalOfData.asp.current > 0 && totalOfData.asp.previous > 0
        ? '0%'
        : 'N/A'
  )

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
      ? totalOfData.acos.previous?.toFixed(2) + "%"
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

const convertToFrontendReadyFormat = (current = [], previous = [], yoy = [], firstPop, firstYoy) => {
  let allSKU = [];
  current.map((d) => allSKU.push(d.sku));
  previous.map((d) => allSKU.push(d.sku));

  allSKU = allSKU.filter((value, index, self) => self.indexOf(value) === index);
  return allSKU
    .map((sku, i) => {
      let temp = {
        asp: 0,
        units_per_order: 0,
        orders: 0,
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

      let previousSKU = previous.find((d) => d.sku === sku) || JSON.parse(JSON.stringify(temp));
      let yoySKU = yoy[0]

      let change = {
        asp: firstPop?.itemized[i]?.asp?.number?.toFixed(2),
        units_per_order: firstPop?.itemized[i]?.units_per_order?.number?.toFixed(2),
        orders: firstPop?.itemized[i]?.orders?.number?.toFixed(2),
        ad_spend: firstPop?.itemized[i]?.ad_spend?.number?.toFixed(2),
        ad_orders: firstPop?.itemized[i]?.ad_orders?.number?.toFixed(2),
        conversion_rate: firstPop?.itemized[i]?.conversion_rate?.number?.toFixed(2),
        acos: firstPop?.itemized[i]?.acos?.number?.toFixed(2),
        ad_sales: firstPop?.itemized[i]?.ad_sales?.number?.toFixed(2),
        sales: firstPop?.itemized[i]?.sales?.number?.toFixed(2),
        units_sold: firstPop?.itemized[i]?.units_sold?.number?.toFixed(2),
        shipped_cogs: firstPop?.itemized[i]?.shipped_cogs?.number?.toFixed(2),
        ad_clicks: firstPop?.itemized[i]?.ad_clicks?.number?.toFixed(2),
        ad_impressions: firstPop?.itemized[i]?.ad_impressions?.number?.toFixed(2),
        average_cpc: firstPop?.itemized[i]?.average_cpc?.number?.toFixed(2),
        percent_total_sales: firstPop?.itemized[i]?.percent_total_sales?.number?.toFixed(2),
      };
      let charge = {
        orders: firstPop?.itemized[i]?.orders?.percentage?.toFixed(2),
        units_per_order: firstPop?.itemized[i]?.units_per_order?.percentage?.toFixed(2),
        asp: firstPop?.itemized[i]?.asp?.percentage?.toFixed(2),
        ad_spend: firstPop?.itemized[i]?.ad_spend?.percentage?.toFixed(2),
        ad_orders: firstPop?.itemized[i]?.ad_orders?.percentage?.toFixed(2),
        conversion_rate: firstPop?.itemized[i]?.conversion_rate?.percentage?.toFixed(2),
        acos: firstPop?.itemized[i]?.acos?.percentage?.toFixed(2),
        ad_sales: firstPop?.itemized[i]?.ad_sales?.percentage?.toFixed(2),
        sales: firstPop?.itemized[i]?.sales?.percentage?.toFixed(2),
        units_sold: firstPop?.itemized[i]?.units_sold?.percentage?.toFixed(2),
        shipped_cogs: firstPop?.itemized[i]?.shipped_cogs?.percentage?.toFixed(2),
        ad_clicks: firstPop?.itemized[i]?.ad_clicks?.percentage?.toFixed(2),
        ad_impressions: firstPop?.itemized[i]?.ad_impressions?.percentage?.toFixed(2),
        average_cpc: firstPop?.itemized[i]?.average_cpc?.percentage?.toFixed(2),
        percent_total_sales: firstPop?.itemized[i]?.percent_total_sales?.percentage?.toFixed(2),
      };

      let yoyChange = {
        orders: firstYoy?.itemized[i]?.orders?.number.toFixed(2),
        units_per_order: firstYoy?.itemized[i]?.units_per_order?.number.toFixed(2),
        asp: firstYoy?.itemized[i]?.asp?.number.toFixed(2),
        ad_spend: firstYoy?.itemized[i]?.ad_spend?.number.toFixed(2),
        ad_orders: firstYoy?.itemized[i]?.ad_orders?.number.toFixed(2),
        conversion_rate: firstYoy?.itemized[i]?.conversion_rate?.number.toFixed(2),
        acos: firstYoy?.itemized[i]?.acos?.number.toFixed(2),
        ad_sales: firstYoy?.itemized[i]?.ad_sales?.number.toFixed(2),
        sales: firstYoy?.itemized[i]?.sales?.number.toFixed(2),
        units_sold: firstYoy?.itemized[i]?.units_sold?.number.toFixed(2),
        shipped_cogs: firstYoy?.itemized[i]?.shipped_cogs?.number.toFixed(2),
        ad_clicks: firstYoy?.itemized[i]?.ad_clicks?.number.toFixed(2),
        ad_impressions: firstYoy?.itemized[i]?.ad_impressions?.number.toFixed(2),
        average_cpc: firstYoy?.itemized[i]?.average_cpc?.number.toFixed(2),
        percent_total_sales: firstYoy?.itemized[i]?.percent_total_sales?.number.toFixed(2),
      };
      let yoyCharge = {
        orders: firstYoy?.itemized[i]?.orders?.percentage.toFixed(2),
        units_per_order: firstYoy?.itemized[i]?.units_per_order?.percentage.toFixed(2),
        asp: firstYoy?.itemized[i]?.asp?.percentage.toFixed(2),
        ad_spend: firstYoy?.itemized[i]?.ad_spend?.percentage.toFixed(2),
        ad_orders: firstYoy?.itemized[i]?.ad_orders?.percentage.toFixed(2),
        conversion_rate: firstYoy?.itemized[i]?.conversion_rate?.percentage.toFixed(2),
        acos: firstYoy?.itemized[i]?.acos?.percentage.toFixed(2),
        ad_sales: firstYoy?.itemized[i]?.ad_sales?.percentage.toFixed(2),
        sales: firstYoy?.itemized[i]?.sales?.percentage.toFixed(2),
        units_sold: firstYoy?.itemized[i]?.units_sold?.percentage.toFixed(2),
        shipped_cogs: firstYoy?.itemized[i]?.shipped_cogs?.percentage.toFixed(2),
        ad_clicks: firstYoy?.itemized[i]?.ad_clicks?.percentage.toFixed(2),
        ad_impressions: firstYoy?.itemized[i]?.ad_impressions?.percentage.toFixed(2),
        average_cpc: firstYoy?.itemized[i]?.average_cpc?.percentage.toFixed(2),
        percent_total_sales: firstYoy?.itemized[i]?.percent_total_sales?.percentage.toFixed(2),
      };
      return {
        current: currentSKU,
        previous: previousSKU,
        change,
        charge,
        yoy: yoyChange,
        yoyCharge,
        yoySKU,
      };
    })
    .filter((d) => d);
};

const getFrontendFormattedTotal = (props, yoyTotal, currentTotal) => {

  const temp = {
    orders: {
      current: currentTotal.orders,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.orders.number,
      yoyCharge: yoyTotal.orders.percentage,
    },
    units_per_order: {
      current: currentTotal.units_per_order,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.units_per_order.number,
      yoyCharge: yoyTotal.units_per_order.percentage,
    },
    asp: {
      current: currentTotal.asp,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.asp.number,
      yoyCharge: yoyTotal.asp.percentage,
    },
    sales: {
      current: currentTotal.sales,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.sales.number,
      yoyCharge: yoyTotal.sales.percentage,
    },
    units_sold: {
      current: currentTotal.units_sold,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.units_sold.number,
      yoyCharge: yoyTotal.units_sold.percentage,
    },

    shipped_cogs: {
      current: currentTotal.shipped_cogs,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.shipped_cogs.number,
      yoyCharge: yoyTotal.shipped_cogs.percentage,
    },

    average_cpc: {
      current: currentTotal.average_cpc,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.average_cpc.number,
      yoyCharge: yoyTotal.average_cpc.percentage,
    },
    ad_impressions: {
      current: currentTotal.ad_impressions,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.ad_impressions.number,
      yoyCharge: yoyTotal.ad_impressions.percentage,
    },
    ad_clicks: {
      current: currentTotal.ad_clicks,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.ad_clicks.number,
      yoyCharge: yoyTotal.ad_clicks.percentage,
    },
    ad_spend: {
      current: currentTotal.ad_spend,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.ad_spend.number,
      yoyCharge: yoyTotal.ad_spend.percentage,
    },
    ad_orders: {
      current: currentTotal.ad_orders,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.ad_orders.number,
      yoyCharge: yoyTotal.ad_orders.percentage,
    },
    ad_sales: {
      current: currentTotal.ad_sales,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.ad_sales.number,
      yoyCharge: yoyTotal.ad_sales.percentage,
    },
    percent_total_sales: {
      current: currentTotal.percent_total_sales,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.percent_total_sales.number,
      yoyCharge: yoyTotal.percent_total_sales.percentage,
    },
    conversion_rate: {
      current: currentTotal.conversion_rate,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.conversion_rate.number,
      yoyCharge: yoyTotal.conversion_rate.percentage,
    },
    acos: {
      current: currentTotal.acos,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.acos.number,
      yoyCharge: yoyTotal.acos.percentage,
    },
  };

  return temp;
};

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
  const { pop, yoy } = comparisons

  let isYoY = !!comparisons.yoy.length;

  const allSKUData = convertToFrontendReadyFormat(
    currentData?.itemized,
    previousData?.itemized,
    !!comparisons.yoy.length ? comparisons.yoy[0].itemized : [],
    pop[0],
    yoy[0]
  );

  const filterSKUData = allSKUData.sort((a, b) => {
    let tempSortBy = "asin";
    if (sortBy === 0) {
      tempSortBy = "item_number";
    } else if (sortBy === 1) {
      tempSortBy = "asin";
    } else if (sortBy === 2) {
      tempSortBy = "short_product_title";
    } else if (sortBy === 3) {
      tempSortBy = "sales";
    } else if (sortBy === 4) {
      tempSortBy = "shipped_cogs";
    } else if (sortBy === 5) {
      tempSortBy = "orders";
    } else if (sortBy === 6) {
      tempSortBy = "units_sold";
    } else if (sortBy === 7) {
      tempSortBy = "units_per_order";
    } else if (sortBy === 8) {
      tempSortBy = "asp";
    } else if (sortBy === 9) {
      tempSortBy = "ad_impressions";
    } else if (sortBy === 10) {
      tempSortBy = "ad_clicks";
    } else if (sortBy === 11) {
      tempSortBy = "average_cpc";
    } else if (sortBy === 12) {
      tempSortBy = "ad_spend";
    } else if (sortBy === 13) {
      tempSortBy = "ad_orders";
    } else if (sortBy === 14) {
      tempSortBy = "ad_sales";
    } else if (sortBy === 15) {
      tempSortBy = "percent_total_sales";
    } else if (sortBy === 16) {
      tempSortBy = "conversion_rate";
    } else if (sortBy === 17) {
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
                <TableTotalRowCell cellData={totalOfData.sales} isComparisons={isComparisons} isActive={active === 3} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.shipped_cogs} isComparisons={isComparisons} isActive={active === 4} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.orders} isComparisons={isComparisons} isActive={active === 5} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.units_sold} isComparisons={isComparisons} isActive={active === 6} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.units_per_order} isComparisons={isComparisons} isActive={active === 7} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.asp} isComparisons={isComparisons} isActive={active === 8} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_impressions} isComparisons={isComparisons} isActive={active === 9} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_clicks} isComparisons={isComparisons} isActive={active === 10} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.average_cpc} isComparisons={isComparisons} isActive={active === 11} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_spend} isComparisons={isComparisons} isActive={active === 12} isYoY={isYoY}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_orders} isComparisons={isComparisons} isActive={active === 13} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.ad_sales} isComparisons={isComparisons} isActive={active === 14} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.percent_total_sales} isComparisons={isComparisons} isActive={active === 15} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.conversion_rate} isComparisons={isComparisons} isActive={active === 16} isYoY={false}></TableTotalRowCell>
                <TableTotalRowCell cellData={totalOfData.acos} isComparisons={isComparisons} isActive={active === 17} isYoY={false}></TableTotalRowCell>

              </tr>
            </tfoot>
          )}{" "}
        </table>
      </div>
    </>
  );
};

export default DataDisplaySKUTable;
