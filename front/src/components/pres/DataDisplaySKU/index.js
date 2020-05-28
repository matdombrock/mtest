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
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { CSVLink } from "react-csv";

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
  const headerOfComparison = [];
  header.push("Item #");
  header.push("ASIN");
  header.push("Short Product Title");
  header.push(...getHeaderColumn(true, 'ASP'));
  header.push(...getHeaderColumn(true, 'Units Per Order'));
  header.push(...getHeaderColumn(true, 'Orders'));
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
  headerOfComparison.push("");
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
  headerOfComparison.push(...getHeaderColumn());
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

    temp.push(current.short_product_title || "N/A");

    temp.push(current.asp ? "$" + numberWithCommas(current.asp) : "N/A");
    temp.push(previous.asp ? "$" + numberWithCommas(previous.asp) : "N/A");
    temp.push(
      change.asp !== 0
        ? "$" + numberWithCommas(change.asp)
        : current.asp > 0 && previous.asp > 0
          ? "$0.00"
          : "N/A"
    );
    temp.push(
      charge.asp !== 0
        ? charge.asp + "%"
        : current.asp > 0 && previous.asp > 0
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

    temp.push(current.units_per_order ? "$" + numberWithCommas(current.units_per_order) : "N/A");
    temp.push(previous.units_per_order ? "$" + numberWithCommas(previous.units_per_order) : "N/A");
    temp.push(
      change.units_per_order !== 0
        ? "$" + numberWithCommas(change.units_per_order)
        : current.units_per_order > 0 && previous.units_per_order > 0
          ? "$0.00"
          : "N/A"
    );
    temp.push(
      charge.units_per_order !== 0
        ? charge.units_per_order + "%"
        : current.units_per_order > 0 && previous.units_per_order > 0
          ? "0%"
          : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.units_per_order !== 0
          ? "$" + numberWithCommas(yoy.units_per_order)
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

    temp.push(current.orders ? "$" + numberWithCommas(current.orders) : "N/A");
    temp.push(previous.orders ? "$" + numberWithCommas(previous.orders) : "N/A");
    temp.push(
      change.orders !== 0
        ? "$" + numberWithCommas(change.orders)
        : current.orders > 0 && previous.orders > 0
          ? "$0.00"
          : "N/A"
    );
    temp.push(
      charge.orders !== 0
        ? charge.orders + "%"
        : current.orders > 0 && previous.orders > 0
          ? "0%"
          : "N/A"
    );
    if (isYoY) {
      temp.push(
        yoy.orders !== 0
          ? "$" + numberWithCommas(yoy.orders)
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
    return false;
  });
  let total = [];
  total.push("Total");
  total.push("");
  total.push('')
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
      ? '$' + numberWithCommas(totalOfData.asp.change)
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
      ? '$' + numberWithCommas(totalOfData.units_per_order.change)
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
      ? '$' + numberWithCommas(totalOfData.orders.change)
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

const currentDataFormate = (current = [], previous = [], yoy = []) => {
  let allSKU = [];
  current.map((d) => allSKU.push(d.sku));
  previous.map((d) => allSKU.push(d.sku));
  allSKU = allSKU.filter((value, index, self) => self.indexOf(value) === index);
  return allSKU
    .map((sku) => {
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
      let previousSKU =
        previous.find((d) => d.sku === sku) || JSON.parse(JSON.stringify(temp));
      let yoySKU =
        yoy.find((d) => d.sku === sku) || JSON.parse(JSON.stringify(temp));
      let change = {
        asp: getDifferenceInNumber(
          currentSKU.asp,
          previousSKU.asp
        ),
        units_per_order: getDifferenceInNumber(
          currentSKU.units_per_order,
          previousSKU.units_per_order
        ),
        orders: getDifferenceInNumber(
          currentSKU.orders,
          previousSKU.orders
        ),
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
        orders: getDifferenceInPercentage(
          currentSKU.orders,
          previousSKU.orders
        ),
        units_per_order: getDifferenceInPercentage(
          currentSKU.units_per_order,
          previousSKU.units_per_order
        ),
        asp: getDifferenceInPercentage(
          currentSKU.asp,
          previousSKU.asp
        ),
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
        orders: getDifferenceInNumber(currentSKU.orders, yoySKU.orders),
        units_per_order: getDifferenceInNumber(currentSKU.units_per_order, yoySKU.units_per_order),
        asp: getDifferenceInNumber(currentSKU.asp, yoySKU.asp),
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
        orders: getDifferenceInPercentage(
          currentSKU.orders,
          yoySKU.orders
        ),
        units_per_order: getDifferenceInPercentage(
          currentSKU.units_per_order,
          yoySKU.units_per_order
        ),
        asp: getDifferenceInPercentage(
          currentSKU.asp,
          yoySKU.asp
        ),
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
    orders: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    units_per_order: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    asp: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    sales: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    units_sold: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },

    shipped_cogs: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },

    average_cpc: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    ad_impressions: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    ad_clicks: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    ad_spend: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    ad_orders: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    ad_sales: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    percent_total_sales: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    conversion_rate: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
    acos: {
      current: 0,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: 0,
      yoyCharge: 0,
    },
  };

  props.map(({ current, previous, change, charge, yoy, yoyCharge, yoySKU }) => {
    temp.orders = {
      current: temp.orders.current + (current?.orders || 0),
      previous: temp.orders.previous + (previous?.orders || 0),
      change: temp.orders.change + (change?.orders || 0),
      charge: Number(temp.orders.charge) + Number(charge?.orders || 0),
      yoy: temp.orders.yoy + (yoy?.orders || 0),
      yoyCharge: temp.orders.yoyCharge + (yoyCharge?.orders || 0),
    };
    temp.units_per_order = {
      current: temp.units_per_order.current + (current?.units_per_order || 0),
      previous: temp.units_per_order.previous + (previous?.units_per_order || 0),
      change: temp.units_per_order.change + (change?.units_per_order || 0),
      charge: Number(temp.units_per_order.charge) + Number(charge?.units_per_order || 0),
      yoy: temp.units_per_order.yoy + (yoy?.units_per_order || 0),
      yoyCharge: temp.units_per_order.yoyCharge + (yoyCharge?.units_per_order || 0),
    };
    temp.asp = {
      current: temp.asp.current + (current?.asp || 0),
      previous: temp.asp.previous + (previous?.asp || 0),
      change: temp.asp.change + (change?.asp || 0),
      charge: Number(temp.asp.charge) + Number(charge?.asp || 0),
      yoy: temp.asp.yoy + (yoy?.asp || 0),
      yoyCharge: temp.asp.yoyCharge + (yoyCharge?.asp || 0),
    };
    temp.ad_spend = {
      current: temp.ad_spend.current + (current?.ad_spend || 0),
      previous: temp.ad_spend.previous + (previous?.ad_spend || 0),
      change: temp.ad_spend.change + (change?.ad_spend || 0),
      charge: Number(temp.ad_spend.charge) + Number(charge?.ad_spend || 0),
      yoy: temp.ad_spend.yoy + (yoy?.ad_spend || 0),
      yoyCharge: temp.ad_spend.yoyCharge + (yoyCharge?.ad_spend || 0),
    };
    temp.ad_orders = {
      current: temp.ad_orders.current + (current?.ad_orders || 0),
      previous: temp.ad_orders.previous + (previous?.ad_orders || 0),
      change: temp.ad_orders.change + (change?.ad_orders || 0),
      charge: Number(temp.ad_orders.charge) + Number(charge?.ad_orders || 0),
      yoy: temp.ad_orders.yoy + (yoy?.ad_orders || 0),
      yoyCharge: temp.ad_orders.yoyCharge + (yoyCharge?.ad_orders || 0),
    };
    temp.conversion_rate = {
      current: temp.conversion_rate.current + (current?.conversion_rate || 0),
      previous:
        temp.conversion_rate.previous + (previous?.conversion_rate || 0),
      change: temp.conversion_rate.change + (change?.conversion_rate || 0),
      charge:
        Number(temp.conversion_rate.charge) +
        Number(charge?.conversion_rate || 0),
      yoy: temp.conversion_rate.yoy + (yoy?.conversion_rate || 0),
      yoyCharge:
        temp.conversion_rate.yoyCharge + (yoyCharge?.conversion_rate || 0),
    };
    temp.acos = {
      current: temp.acos.current + (current?.acos || 0),
      previous: temp.acos.previous + (previous?.acos || 0),
      change: temp.acos.change + (change?.acos || 0),
      charge: Number(temp.acos.charge) + Number(charge?.acos || 0),
      yoy: temp.acos.yoy + (yoy?.acos || 0),
      yoyCharge: temp.acos.yoyCharge + (yoyCharge?.acos || 0),
    };
    temp.ad_sales = {
      current: temp.ad_sales.current + (current?.ad_sales || 0),
      previous: temp.ad_sales.previous + (previous?.ad_sales || 0),
      change: temp.ad_sales.change + (change?.ad_sales || 0),
      charge: Number(temp.ad_sales.charge) + Number(charge?.ad_sales || 0),
      yoy: temp.ad_sales.yoy + (yoy?.ad_sales || 0),
      yoyCharge: temp.ad_sales.yoyCharge + (yoyCharge?.ad_sales || 0),
    };
    temp.sales = {
      current: temp.sales.current + (current?.sales || 0),
      previous: temp.sales.previous + (previous?.sales || 0),
      change: temp.sales.change + (change?.sales || 0),
      charge: Number(temp.sales.charge) + Number(charge?.sales || 0),
      yoy: temp.sales.yoy + (yoy?.sales || 0),
      yoyCharge: temp.sales.yoyCharge + (yoyCharge?.sales || 0),
    };
    temp.units_sold = {
      current: temp.units_sold.current + (current?.units_sold || 0),
      previous: temp.units_sold.previous + (previous?.units_sold || 0),
      change: temp.units_sold.change + (change?.units_sold || 0),
      charge: Number(temp.units_sold.charge) + Number(charge?.units_sold || 0),
      yoy: temp.units_sold.yoy + (yoy?.units_sold || 0),
      yoyCharge: temp.units_sold.yoyCharge + (yoyCharge?.units_sold || 0),
    };
    temp.shipped_cogs = {
      current: temp.shipped_cogs.current + (current?.shipped_cogs || 0),
      previous: temp.shipped_cogs.previous + (previous?.shipped_cogs || 0),
      change: temp.shipped_cogs.change + (change?.shipped_cogs || 0),
      charge:
        Number(temp.shipped_cogs.charge) + Number(charge?.shipped_cogs || 0),
      yoy: temp.shipped_cogs.yoy + (yoy?.shipped_cogs || 0),
      yoyCharge: temp.shipped_cogs.yoyCharge + (yoyCharge?.shipped_cogs || 0),
    };
    temp.ad_clicks = {
      current: temp.ad_clicks.current + (current?.ad_clicks || 0),
      previous: temp.ad_clicks.previous + (previous?.ad_clicks || 0),
      change: temp.ad_clicks.change + (change?.ad_clicks || 0),
      charge: Number(temp.ad_clicks.charge) + Number(charge?.ad_clicks || 0),
      yoy: temp.ad_clicks.yoy + (yoy?.ad_clicks || 0),
      yoyCharge: temp.ad_clicks.yoyCharge + (yoyCharge?.ad_clicks || 0),
    };
    temp.ad_impressions = {
      current: temp.ad_impressions.current + (current?.ad_impressions || 0),
      previous: temp.ad_impressions.previous + (previous?.ad_impressions || 0),
      change: temp.ad_impressions.change + (change?.ad_impressions || 0),
      charge:
        Number(temp.ad_impressions.charge) +
        Number(charge?.ad_impressions || 0),
      yoy: temp.ad_impressions.yoy + (yoy?.ad_impressions || 0),
      yoyCharge:
        temp.ad_impressions.yoyCharge + (yoyCharge?.ad_impressions || 0),
    };
    temp.average_cpc = {
      current: temp.average_cpc.current + (current?.average_cpc || 0),
      previous: temp.average_cpc.previous + (previous?.average_cpc || 0),
      change: temp.average_cpc.change + (change?.average_cpc || 0),
      charge:
        Number(temp.average_cpc.charge) + Number(charge?.average_cpc || 0),
      yoy: temp.average_cpc.yoy + (yoy?.average_cpc || 0),
      yoyCharge: temp.average_cpc.yoyCharge + (yoyCharge?.average_cpc || 0),
    };
    temp.percent_total_sales = {
      current:
        temp.percent_total_sales.current + (current?.percent_total_sales || 0),
      previous:
        temp.percent_total_sales.previous +
        (previous?.percent_total_sales || 0),
      change:
        temp.percent_total_sales.change + (change?.percent_total_sales || 0),
      charge:
        Number(temp.percent_total_sales.charge) +
        Number(charge?.percent_total_sales || 0),
      yoy: temp.percent_total_sales.yoy + (yoy?.percent_total_sales || 0),
      yoyCharge:
        temp.percent_total_sales.yoyCharge +
        (yoyCharge?.percent_total_sales || 0),
    };
    return false;
  });

  const { length: _length } = props
  const { asp: _asp, units_per_order: _units_per_order, orders: _orders } = temp

  temp.asp.charge = _asp.charge / _length;
  temp.asp.yoyCharge = _asp.yoyCharge / _length;

  temp.units_per_order.charge = _units_per_order.charge / _length;
  temp.units_per_order.yoyCharge = _units_per_order.yoyCharge / _length;

  temp.orders.charge = _orders.charge / _length;
  temp.orders.yoyCharge = _orders.yoyCharge / _length;

  temp.ad_spend.charge = temp.ad_spend.charge / props.length;
  temp.ad_spend.yoyCharge = temp.ad_spend.yoyCharge / props.length;

  temp.ad_orders.charge = temp.ad_orders.charge / props.length;
  temp.ad_orders.yoyCharge = temp.ad_orders.yoyCharge / props.length;

  temp.conversion_rate.current = temp.conversion_rate.current / props.length;
  temp.conversion_rate.previous = temp.conversion_rate.previous / props.length;
  temp.conversion_rate.change = temp.conversion_rate.change / props.length;
  temp.conversion_rate.yoy = temp.conversion_rate.yoy / props.length;
  temp.conversion_rate.charge = temp.conversion_rate.charge / props.length;
  temp.conversion_rate.yoyCharge =
    temp.conversion_rate.yoyCharge / props.length;

  temp.acos.current = temp.acos.current / props.length;
  temp.acos.previous = temp.acos.previous / props.length;
  temp.acos.change = temp.acos.change / props.length;
  temp.acos.yoy = temp.acos.yoy / props.length;
  temp.acos.charge = temp.acos.charge / props.length;
  temp.acos.yoyCharge = temp.acos.yoyCharge / props.length;

  temp.ad_sales.charge = temp.ad_sales.charge / props.length;
  temp.ad_sales.yoyCharge = temp.ad_sales.yoyCharge / props.length;

  temp.sales.charge = temp.sales.charge / props.length;
  temp.sales.yoyCharge = temp.sales.yoyCharge / props.length;

  temp.units_sold.charge = temp.units_sold.charge / props.length;
  temp.units_sold.yoyCharge = temp.units_sold.yoyCharge / props.length;

  temp.shipped_cogs.charge = temp.shipped_cogs.charge / props.length;
  temp.shipped_cogs.yoyCharge = temp.shipped_cogs.yoyCharge / props.length;

  temp.ad_clicks.charge = temp.ad_clicks.charge / props.length;
  temp.ad_clicks.yoyCharge = temp.ad_clicks.yoyCharge / props.length;

  temp.ad_impressions.charge = temp.ad_impressions.charge / props.length;
  temp.ad_impressions.yoyCharge = temp.ad_impressions.yoyCharge / props.length;

  temp.average_cpc.current = temp.average_cpc.current / props.length;
  temp.average_cpc.previous = temp.average_cpc.previous / props.length;
  temp.average_cpc.change = temp.average_cpc.change / props.length;
  temp.average_cpc.yoy = temp.average_cpc.yoy / props.length;
  temp.average_cpc.charge = temp.average_cpc.charge / props.length;
  temp.average_cpc.yoyCharge = temp.average_cpc.yoyCharge / props.length;

  temp.percent_total_sales.current =
    temp.percent_total_sales.current / props.length;
  temp.percent_total_sales.previous =
    temp.percent_total_sales.previous / props.length;
  temp.percent_total_sales.change =
    temp.percent_total_sales.change / props.length;
  temp.percent_total_sales.yoy = temp.percent_total_sales.yoy / props.length;
  temp.percent_total_sales.charge =
    temp.percent_total_sales.charge / props.length;
  temp.percent_total_sales.yoyCharge =
    temp.percent_total_sales.yoyCharge / props.length;

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
      tempSortBy = "short_product_title";
    } else if (sortBy === 3) {
      tempSortBy = "asp";
    } else if (sortBy === 4) {
      tempSortBy = "units_per_order";
    } else if (sortBy === 5) {
      tempSortBy = "orders";
    } else if (sortBy === 6) {
      tempSortBy = "sales";
    } else if (sortBy === 7) {
      tempSortBy = "units_sold";
    } else if (sortBy === 8) {
      tempSortBy = "shipped_cogs";
    } else if (sortBy === 9) {
      tempSortBy = "ad_clicks";
    } else if (sortBy === 10) {
      tempSortBy = "ad_impressions";
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
  const totalOfData = getSummaryInTotal(filterSKUData);
  console.log("DataDisplaySKUTable -> totalOfData", totalOfData);
  return (
    <>
      <CSVLink
        data={getCSVVersion(filterSKUData, isYoY, totalOfData)}
        filename={"sku.csv"}
      >
        Download me
      </CSVLink>{" "}
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
                    <span>ASP</span>
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
                    <span>Units Per Order</span>
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
              >
                <div>
                  <span onClick={() => headerClick(6)}>
                    {isComparisons &&
                      (active === 6 ? <RemoveIcon /> : <AddIcon />)}
                  </span>
                  <span>
                    <span> Sales</span>
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
                    <span> Units Sold</span>
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
                    <span> Shipped COGS</span>
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
                    <span> Ad Clicks</span>
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
                    <span> Ad Impressions</span>
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
                          {current.asp
                            ? "$" + numberWithCommas(current.asp)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.asp
                            ? "$" + numberWithCommas(previous.asp)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.asp)}
                        >
                          {change.asp !== 0
                            ? "$" + numberWithCommas(change.asp)
                            : current.asp > 0 && previous.asp > 0
                              ? "$0.00"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.asp)}
                        >
                          {charge.asp !== 0
                            ? charge.asp + "%"
                            : current.asp > 0 && previous.asp > 0
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

                    {isComparisons && active === 4 ? (
                      <>
                        <td align="right">
                          {current.units_per_order
                            ? "$" + numberWithCommas(current.units_per_order)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.units_per_order
                            ? "$" + numberWithCommas(previous.units_per_order)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.units_per_order)}
                        >
                          {change.units_per_order !== 0
                            ? "$" + numberWithCommas(change.units_per_order)
                            : current.units_per_order > 0 && previous.units_per_order > 0
                              ? "$0.00"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.units_per_order)}
                        >
                          {charge.units_per_order !== 0
                            ? charge.units_per_order + "%"
                            : current.units_per_order > 0 && previous.units_per_order > 0
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
                                ? "$" + numberWithCommas(yoy.units_per_order)
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
                            ? "$" + numberWithCommas(current.units_per_order)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 5 ? (
                      <>
                        <td align="right">
                          {current.orders
                            ? "$" + numberWithCommas(current.orders)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {previous.orders
                            ? "$" + numberWithCommas(previous.orders)
                            : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(change.orders)}
                        >
                          {change.orders !== 0
                            ? "$" + numberWithCommas(change.orders)
                            : current.orders > 0 && previous.orders > 0
                              ? "$0.00"
                              : "N/A"}
                        </td>
                        <td
                          align="right"
                          className={isNegative(charge.orders)}
                        >
                          {charge.orders !== 0
                            ? charge.orders + "%"
                            : current.orders > 0 && previous.orders > 0
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
                                ? "$" + numberWithCommas(yoy.orders)
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
                            ? "$" + numberWithCommas(current.orders)
                            : "N/A"}
                        </td>
                      )}

                    {isComparisons && active === 6 ? (
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

                    {isComparisons && active === 7 ? (
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

                    {isComparisons && active === 8 ? (
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

                    {isComparisons && active === 9 ? (
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

                    {isComparisons && active === 10 ? (
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

                    {isComparisons && active === 11 ? (
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

                    {isComparisons && active === 12 ? (
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

                    {isComparisons && active === 13 ? (
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

                    {isComparisons && active === 14 ? (
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

                    {isComparisons && active === 15 ? (
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

                    {isComparisons && active === 16 ? (
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

                    {isComparisons && active === 17 ? (
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
          {filterSKUData.length > 1 && (
            <tfoot>
              <tr>
                <td component="th">
                  <b>Total</b>
                </td>

                <td align="right"></td>
                <td align="right"></td>

                {isComparisons && active === 3 ? (
                  <>
                    <td align="right">
                      {totalOfData.asp.current
                        ? "$" + numberWithCommas(totalOfData.asp.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.asp.previous
                        ? "$" + numberWithCommas(totalOfData.asp.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.asp.change
                        ? "$" + numberWithCommas(totalOfData.asp.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.asp.charge
                        ? numberWithCommas(totalOfData.asp.charge) + "%"
                        : "N/A"}
                    </td>
                    {isYoY && (
                      <>
                        {" "}
                        <td align="right">
                          {totalOfData.asp.yoy
                            ? "$" + numberWithCommas(totalOfData.asp.yoy)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {totalOfData.asp.yoyCharge
                            ? "$" +
                            numberWithCommas(totalOfData.asp.yoyCharge)
                            : "N/A"}
                        </td>
                      </>
                    )}
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.asp.current
                        ? "$" + numberWithCommas(totalOfData.asp.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 4 ? (
                  <>
                    <td align="right">
                      {totalOfData.units_per_order.current
                        ? "$" + numberWithCommas(totalOfData.units_per_order.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.units_per_order.previous
                        ? "$" + numberWithCommas(totalOfData.units_per_order.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.units_per_order.change
                        ? "$" + numberWithCommas(totalOfData.units_per_order.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.units_per_order.charge
                        ? numberWithCommas(totalOfData.units_per_order.charge) + "%"
                        : "N/A"}
                    </td>
                    {isYoY && (
                      <>
                        {" "}
                        <td align="right">
                          {totalOfData.units_per_order.yoy
                            ? "$" + numberWithCommas(totalOfData.units_per_order.yoy)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {totalOfData.units_per_order.yoyCharge
                            ? "$" +
                            numberWithCommas(totalOfData.units_per_order.yoyCharge)
                            : "N/A"}
                        </td>
                      </>
                    )}
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.units_per_order.current
                        ? "$" + numberWithCommas(totalOfData.units_per_order.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 5 ? (
                  <>
                    <td align="right">
                      {totalOfData.orders.current
                        ? "$" + numberWithCommas(totalOfData.orders.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.orders.previous
                        ? "$" + numberWithCommas(totalOfData.orders.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.orders.change
                        ? "$" + numberWithCommas(totalOfData.orders.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.orders.charge
                        ? numberWithCommas(totalOfData.orders.charge) + "%"
                        : "N/A"}
                    </td>
                    {isYoY && (
                      <>
                        {" "}
                        <td align="right">
                          {totalOfData.orders.yoy
                            ? "$" + numberWithCommas(totalOfData.orders.yoy)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {totalOfData.orders.yoyCharge
                            ? "$" +
                            numberWithCommas(totalOfData.orders.yoyCharge)
                            : "N/A"}
                        </td>
                      </>
                    )}
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.orders.current
                        ? "$" + numberWithCommas(totalOfData.orders.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 6 ? (
                  <>
                    <td align="right">
                      {totalOfData.sales.current
                        ? "$" + numberWithCommas(totalOfData.sales.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.sales.previous
                        ? "$" + numberWithCommas(totalOfData.sales.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.sales.change
                        ? "$" + numberWithCommas(totalOfData.sales.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.sales.charge
                        ? numberWithCommas(totalOfData.sales.charge) + "%"
                        : "N/A"}
                    </td>
                    {isYoY && (
                      <>
                        {" "}
                        <td align="right">
                          {totalOfData.sales.yoy
                            ? "$" + numberWithCommas(totalOfData.sales.yoy)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {totalOfData.sales.yoyCharge
                            ? "$" +
                            numberWithCommas(totalOfData.sales.yoyCharge)
                            : "N/A"}
                        </td>
                      </>
                    )}
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.sales.current
                        ? "$" + numberWithCommas(totalOfData.sales.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 7 ? (
                  <>
                    <td align="right">
                      {totalOfData.units_sold.current
                        ? numberWithCommas(totalOfData.units_sold.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.units_sold.previous
                        ? numberWithCommas(totalOfData.units_sold.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.units_sold.change
                        ? numberWithCommas(totalOfData.units_sold.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.units_sold.charge
                        ? numberWithCommas(totalOfData.units_sold.charge) + "%"
                        : "N/A"}
                    </td>
                    {isYoY && (
                      <>
                        {" "}
                        <td align="right">
                          {totalOfData.units_sold.yoy
                            ? numberWithCommas(totalOfData.units_sold.yoy)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {totalOfData.units_sold.yoyCharge
                            ? numberWithCommas(totalOfData.units_sold.yoyCharge)
                            : "N/A"}
                        </td>
                      </>
                    )}
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.units_sold.current
                        ? numberWithCommas(totalOfData.units_sold.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 8 ? (
                  <>
                    <td align="right">
                      {totalOfData.shipped_cogs.current
                        ? "$" +
                        numberWithCommas(totalOfData.shipped_cogs.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.shipped_cogs.previous
                        ? "$" +
                        numberWithCommas(totalOfData.shipped_cogs.previous)
                        : "N/A"}
                    </td>

                    <td align="right">
                      {" "}
                      {totalOfData.shipped_cogs.change
                        ? "$" +
                        numberWithCommas(totalOfData.shipped_cogs.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {" "}
                      {totalOfData.shipped_cogs.charge
                        ? numberWithCommas(totalOfData.shipped_cogs.charge) +
                        "%"
                        : "N/A"}
                    </td>
                    {isYoY && (
                      <>
                        {" "}
                        <td align="right">
                          {" "}
                          {totalOfData.shipped_cogs.yoy
                            ? "$" +
                            numberWithCommas(totalOfData.shipped_cogs.yoy)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {" "}
                          {totalOfData.shipped_cogs.yoyCharge
                            ? "$" +
                            numberWithCommas(
                              totalOfData.shipped_cogs.yoyCharge
                            )
                            : "N/A"}
                        </td>
                      </>
                    )}
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.shipped_cogs.current
                        ? "$" + numberWithCommas(totalOfData.shipped_cogs.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 9 ? (
                  <>
                    <td align="right">
                      {totalOfData.ad_clicks.current
                        ? numberWithCommas(totalOfData.ad_clicks.current)
                        : "N/A"}
                    </td>

                    <td align="right">
                      {totalOfData.ad_clicks.previous
                        ? numberWithCommas(totalOfData.ad_clicks.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_clicks.change
                        ? numberWithCommas(totalOfData.ad_clicks.change)
                        : "N/A"}
                    </td>

                    <td align="right">
                      {totalOfData.ad_clicks.charge
                        ? numberWithCommas(totalOfData.ad_clicks.charge) + "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.ad_clicks.current
                        ? numberWithCommas(totalOfData.ad_clicks.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 10 ? (
                  <>
                    <td align="right">
                      {totalOfData.ad_impressions.current
                        ? numberWithCommas(totalOfData.ad_impressions.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_impressions.previous
                        ? numberWithCommas(totalOfData.ad_impressions.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_impressions.change
                        ? numberWithCommas(totalOfData.ad_impressions.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_impressions.charge
                        ? numberWithCommas(totalOfData.ad_impressions.charge) +
                        "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.ad_impressions.current
                        ? numberWithCommas(totalOfData.ad_impressions.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 11 ? (
                  <>
                    <td align="right">
                      {totalOfData.average_cpc.current
                        ? "$" +
                        numberWithCommas(totalOfData.average_cpc.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.average_cpc.previous
                        ? "$" +
                        numberWithCommas(totalOfData.average_cpc.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.average_cpc.change
                        ? "$" + numberWithCommas(totalOfData.average_cpc.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.average_cpc.charge
                        ? numberWithCommas(totalOfData.average_cpc.charge) + "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.average_cpc.current !== 0
                        ? "$" + numberWithCommas(totalOfData.average_cpc.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 12 ? (
                  <>
                    <td align="right">
                      {totalOfData.ad_spend.current
                        ? "$" + numberWithCommas(totalOfData.ad_spend.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_spend.previous
                        ? "$" + numberWithCommas(totalOfData.ad_spend.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_spend.change
                        ? "$" + numberWithCommas(totalOfData.ad_spend.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_spend.charge
                        ? numberWithCommas(totalOfData.ad_spend.charge) + "%"
                        : "N/A"}
                    </td>
                    {isYoY && (
                      <>
                        <td align="right">
                          {totalOfData.ad_spend.yoy
                            ? "$" + numberWithCommas(totalOfData.ad_spend.yoy)
                            : "N/A"}
                        </td>
                        <td align="right">
                          {totalOfData.ad_spend.yoyCharge
                            ? "$" +
                            numberWithCommas(totalOfData.ad_spend.yoyCharge)
                            : "N/A"}
                        </td>
                      </>
                    )}
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.ad_spend.current !== 0
                        ? "$" + numberWithCommas(totalOfData.ad_spend.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 13 ? (
                  <>
                    <td align="right">
                      {!!totalOfData.ad_orders.current
                        ? numberWithCommas(totalOfData.ad_orders.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {!!totalOfData.ad_orders.previous
                        ? numberWithCommas(totalOfData.ad_orders.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {!!totalOfData.ad_orders.change
                        ? numberWithCommas(totalOfData.ad_orders.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {!!totalOfData.ad_orders.charge
                        ? numberWithCommas(totalOfData.ad_orders.charge) + "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.ad_orders.current !== 0
                        ? numberWithCommas(totalOfData.ad_orders.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 14 ? (
                  <>
                    <td align="right">
                      {totalOfData.ad_sales.current
                        ? "$" + numberWithCommas(totalOfData.ad_sales.current)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_sales.previous
                        ? "$" + numberWithCommas(totalOfData.ad_sales.previous)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_sales.change
                        ? "$" + numberWithCommas(totalOfData.ad_sales.change)
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.ad_sales.charge
                        ? numberWithCommas(totalOfData.ad_sales.charge) + "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.ad_sales.current !== 0
                        ? "$" + numberWithCommas(totalOfData.ad_sales.current)
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 15 ? (
                  <>
                    <td align="right">
                      {!!totalOfData.percent_total_sales.current
                        ? Number(
                          totalOfData.percent_total_sales.current
                        ).toFixed(2) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {!!totalOfData.percent_total_sales.previous
                        ? Number(
                          totalOfData.percent_total_sales.previous
                        ).toFixed(2) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {!!totalOfData.percent_total_sales.change
                        ? Number(
                          totalOfData.percent_total_sales.change
                        ).toFixed(2) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {!!totalOfData.percent_total_sales.charge
                        ? Number(
                          totalOfData.percent_total_sales.charge
                        ).toFixed(2) + "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {!!totalOfData.percent_total_sales.current
                        ? Number(totalOfData.percent_total_sales.current).toFixed(
                          2
                        ) + "%"
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 16 ? (
                  <>
                    <td align="right">
                      {totalOfData.conversion_rate.current !== 0
                        ? Number(totalOfData.conversion_rate.current).toFixed(
                          2
                        ) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.conversion_rate.previous !== 0
                        ? Number(totalOfData.conversion_rate.previous).toFixed(
                          2
                        ) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.conversion_rate.change !== 0
                        ? Number(totalOfData.conversion_rate.change).toFixed(
                          2
                        ) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.conversion_rate.charge !== 0
                        ? Number(totalOfData.conversion_rate.charge).toFixed(
                          2
                        ) + "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.conversion_rate.current !== 0
                        ? Number(totalOfData.conversion_rate.current).toFixed(2) +
                        "%"
                        : "N/A"}
                    </td>
                  )}

                {isComparisons && active === 17 ? (
                  <>
                    <td align="right">
                      {totalOfData.acos.current
                        ? totalOfData.acos.current.toFixed(2) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.acos.previous
                        ? totalOfData.acos.previous.toFixed(2) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.acos.change
                        ? totalOfData.acos.change.toFixed(2) + "%"
                        : "N/A"}
                    </td>
                    <td align="right">
                      {totalOfData.acos.charge
                        ? totalOfData.acos.charge.toFixed(2) + "%"
                        : "N/A"}
                    </td>
                  </>
                ) : (
                    <td align="right">
                      {totalOfData.acos.current !== 0
                        ? totalOfData.acos.current.toFixed(2) + "%"
                        : "N/A"}
                    </td>
                  )}
              </tr>
            </tfoot>
          )}{" "}
        </table>
      </div>
    </>
  );
};

export default DataDisplaySKUTable;
