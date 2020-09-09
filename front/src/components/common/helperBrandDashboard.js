import numberWithCommas from "../../services/numberWithCommas";
import moment from "moment";

const getSingleColumForCSV = (
  current,
  previous,
  change,
  charge,
  yoy,
  yoyCharge,
  isYoY,
  symbol = ""
) => {
  const symbolIsRight = symbol === "%";
  const temp = [];
  temp.push(current ? symbol + numberWithCommas(current) : "N/A");
  temp.push(previous ? symbol + numberWithCommas(previous) : "N/A");
  temp.push(
    change !== 0
      ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(change)}`
      : current > 0 && previous > 0
      ? "$0.00"
      : "N/A"
  );
  temp.push(
    charge ? charge + "%" : current > 0 && previous > 0 ? "0%" : "N/A"
  );

  if (isYoY) {
    temp.push(
      yoy !== 0
        ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(yoy)}`
        : "N/A"
    );
    temp.push(yoyCharge ? yoyCharge + "%" : "N/A");
  }
  return temp;
};

const convertToFrontendReadyFormat = ({ periods }, yoy, pop) => {
  let payload = [];
  periods.map((d, i, arr) => {
    if (i === arr.length - 1) return false;
    const _pop = pop[i]?.summary;
    const _yoy = yoy[i]?.summary;

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
      asp: _pop?.asp?.number?.toFixed(2) ?? 0,
      units_per_order: _pop?.units_per_order?.number?.toFixed(2) ?? 0,
      orders: _pop?.orders?.number?.toFixed(2) ?? 0,
      acos: _pop?.acos?.number?.toFixed(2) ?? 0,
      ad_clicks: _pop?.ad_clicks?.number?.toFixed(2) ?? 0,
      ad_impressions: _pop?.ad_impressions?.number?.toFixed(2) ?? 0,
      ad_orders: _pop?.ad_orders?.number?.toFixed(2) ?? 0,
      ad_sales: _pop?.ad_sales?.number?.toFixed(2) ?? 0,
      ad_spend: _pop?.ad_spend?.number?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _pop?.average_cpc?.number?.toFixed(2) ?? 0,
      conversion_rate: _pop?.conversion_rate?.number?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales: _pop?.percent_total_sales?.number?.toFixed(2) ?? 0,
      sales: _pop?.sales?.number?.toFixed(2) ?? 0,
      shipped_cogs: _pop?.shipped_cogs?.number?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _pop?.units_sold?.number?.toFixed(2) ?? 0,
    };

    const charge = {
      asp: _pop?.asp?.percentage?.toFixed(2) ?? 0,
      units_per_order: _pop?.units_per_order?.percentage?.toFixed(2) ?? 0,
      orders: _pop?.orders?.percentage?.toFixed(2) ?? 0,
      acos: _pop?.acos?.percentage?.toFixed(2) ?? 0,
      ad_clicks: _pop?.ad_clicks?.percentage?.toFixed(2) ?? 0,
      ad_impressions: _pop?.ad_impressions?.percentage?.toFixed(2) ?? 0,
      ad_orders: _pop?.ad_orders?.percentage?.toFixed(2) ?? 0,
      ad_sales: _pop?.ad_sales?.percentage?.toFixed(2) ?? 0,
      ad_spend: _pop?.ad_spend?.percentage?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _pop?.average_cpc?.percentage?.toFixed(2) ?? 0,
      conversion_rate: _pop?.conversion_rate?.percentage?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales:
        _pop?.percent_total_sales?.percentage?.toFixed(2) ?? 0,
      sales: _pop?.sales?.percentage?.toFixed(2) ?? 0,
      shipped_cogs: _pop?.shipped_cogs?.percentage?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _pop?.units_sold?.percentage?.toFixed(2) ?? 0,
    };

    const yoyChange = {
      asp: _yoy?.asp?.number?.toFixed(2) ?? 0,
      units_per_order: _yoy?.units_per_order?.number?.toFixed(2) ?? 0,
      orders: _yoy?.orders?.number?.toFixed(2) ?? 0,
      acos: _yoy?.acos?.number?.toFixed(2) ?? 0,
      ad_clicks: _yoy?.ad_clicks?.number?.toFixed(2) ?? 0,
      ad_impressions: _yoy?.ad_impressions?.number?.toFixed(2) ?? 0,
      ad_orders: _yoy?.ad_orders?.number?.toFixed(2) ?? 0,
      ad_sales: _yoy?.ad_sales?.number?.toFixed(2) ?? 0,
      ad_spend: _yoy?.ad_spend?.number?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _yoy?.average_cpc?.number?.toFixed(2) ?? 0,
      conversion_rate: _yoy?.conversion_rate?.number?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales: _yoy?.percent_total_sales?.number?.toFixed(2) ?? 0,
      sales: _yoy?.sales?.number?.toFixed(2) ?? 0,
      shipped_cogs: _yoy?.shipped_cogs?.number?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _yoy?.units_sold?.number?.toFixed(2) ?? 0,
    };

    const yoyCharge = {
      asp: _yoy?.asp?.percentage?.toFixed(2) ?? 0,
      units_per_order: _yoy?.units_per_order?.percentage?.toFixed(2) ?? 0,
      orders: _yoy?.orders?.percentage?.toFixed(2) ?? 0,
      acos: _yoy?.acos?.percentage?.toFixed(2) ?? 0,
      ad_clicks: _yoy?.ad_clicks?.percentage?.toFixed(2) ?? 0,
      ad_impressions: _yoy?.ad_impressions?.percentage?.toFixed(2) ?? 0,
      ad_orders: _yoy?.ad_orders?.percentage?.toFixed(2) ?? 0,
      ad_sales: _yoy?.ad_sales?.percentage?.toFixed(2) ?? 0,
      ad_spend: _yoy?.ad_spend?.percentage?.toFixed(2) ?? 0,
      asin: "N/A",
      average_cpc: _yoy?.average_cpc?.percentage?.toFixed(2) ?? 0,
      conversion_rate: _yoy?.conversion_rate?.percentage?.toFixed(2) ?? 0,
      item_number: "N/A",
      percent_total_sales:
        _yoy?.percent_total_sales?.percentage?.toFixed(2) ?? 0,
      sales: _yoy?.sales?.percentage?.toFixed(2) ?? 0,
      shipped_cogs: _yoy?.shipped_cogs?.percentage?.toFixed(2) ?? 0,
      sku: "N/A",
      units_sold: _yoy?.units_sold?.percentage?.toFixed(2) ?? 0,
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

const filterDataAndFormat = (
  currentData,
  yoy,
  pop,
  sortBy,
  sortByInner,
  sortAscendingBy
) => {
  const frontendReadyFormat = convertToFrontendReadyFormat(
    currentData,
    yoy,
    pop
  );

  return frontendReadyFormat.sort((a, b) => {
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
};

const getFrontendFormattedTotal = (props, yoyTotal, currentTotal) => {
  const temp = {
    asp: {
      current: currentTotal.asp,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.asp.number,
      yoyCharge: yoyTotal.asp.percentage,
    },
    units_per_order: {
      current: currentTotal.units_per_order,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.units_per_order.number,
      yoyCharge: yoyTotal.units_per_order.percentage,
    },
    orders: {
      current: currentTotal.orders,
      previous: 0,
      change: 0,
      charge: 0,
      yoy: yoyTotal.orders.number,
      yoyCharge: yoyTotal.orders.percentage,
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
  header.push(...getHeaderColumn(false, "Orders"));
  header.push(...getHeaderColumn(false, "Units Sold"));
  header.push(...getHeaderColumn(false, "Units Per Order"));
  header.push(...getHeaderColumn(false, "ASP"));
  header.push(...getHeaderColumn(false, "Ad Impressions"));
  header.push(...getHeaderColumn(false, "Ad Clicks"));
  header.push(...getHeaderColumn(false, "Avg CPC"));
  header.push(...getHeaderColumn(false, "Ad Spend"));
  header.push(...getHeaderColumn(false, "Ad Orders"));
  header.push(...getHeaderColumn(false, "Ad Sales"));
  header.push(...getHeaderColumn(false, "% of Total Sales"));
  header.push(...getHeaderColumn(false, "Conv Rate"));
  header.push(...getHeaderColumn(false, "ACoS"));
  const headerOfComparison = [];

  headerOfComparison.push("");
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  headerOfComparison.push(...getHeaderColumn(false));
  finalData.push(header);
  finalData.push(headerOfComparison);
  data.map(({ current, period, previous, change, yoy, charge, yoyCharge }) => {
    const temp = [];
    temp.push(
      `${moment(period.start).utc().format("MM/DD/YYYY")} - ${moment(period.end)
        .utc()
        .format("MM/DD/YYYY")}`
    );
    const sales = getSingleColumForCSV(
      current.sales,
      previous.sales,
      change.sales,
      charge.sales,
      yoy.sales,
      yoyCharge.sales,
      isYoY,
      "$"
    );

    const shipped_cogs = getSingleColumForCSV(
      current.shipped_cogs,
      previous.shipped_cogs,
      change.shipped_cogs,
      charge.shipped_cogs,
      yoy.shipped_cogs,
      yoyCharge.shipped_cogs,
      isYoY,
      "$"
    );

    const orders = getSingleColumForCSV(
      current.orders,
      previous.orders,
      change.orders,
      charge.orders,
      yoy.orders,
      yoyCharge.orders,
      isYoY,
      ""
    );

    const units_sold = getSingleColumForCSV(
      current.units_sold,
      previous.units_sold,
      change.units_sold,
      charge.units_sold,
      yoy.units_sold,
      yoyCharge.units_sold,
      isYoY,
      ""
    );

    const units_per_order = getSingleColumForCSV(
      current.units_per_order,
      previous.units_per_order,
      change.units_per_order,
      charge.units_per_order,
      yoy.units_per_order,
      yoyCharge.units_per_order,
      isYoY,
      ""
    );

    const asp = getSingleColumForCSV(
      current.asp,
      previous.asp,
      change.asp,
      charge.asp,
      yoy.asp,
      yoyCharge.asp,
      isYoY,
      "$"
    );

    const ad_impressions = getSingleColumForCSV(
      current.ad_impressions,
      previous.ad_impressions,
      change.ad_impressions,
      charge.ad_impressions,
      yoy.ad_impressions,
      yoyCharge.ad_impressions,
      isYoY,
      ""
    );

    const ad_clicks = getSingleColumForCSV(
      current.ad_clicks,
      previous.ad_clicks,
      change.ad_clicks,
      charge.ad_clicks,
      yoy.ad_clicks,
      yoyCharge.ad_clicks,
      isYoY,
      ""
    );

    const average_cpc = getSingleColumForCSV(
      current.average_cpc,
      previous.average_cpc,
      change.average_cpc,
      charge.average_cpc,
      yoy.average_cpc,
      yoyCharge.average_cpc,
      isYoY,
      "$"
    );

    const ad_spend = getSingleColumForCSV(
      current.ad_spend,
      previous.ad_spend,
      change.ad_spend,
      charge.ad_spend,
      yoy.ad_spend,
      yoyCharge.ad_spend,
      isYoY,
      "$"
    );

    const ad_orders = getSingleColumForCSV(
      current.ad_orders,
      previous.ad_orders,
      change.ad_orders,
      charge.ad_orders,
      yoy.ad_orders,
      yoyCharge.ad_orders,
      isYoY,
      ""
    );
    const ad_sales = getSingleColumForCSV(
      current.ad_sales,
      previous.ad_sales,
      change.ad_sales,
      charge.ad_sales,
      yoy.ad_sales,
      yoyCharge.ad_sales,
      isYoY,
      "$"
    );
    const percent_total_sales = getSingleColumForCSV(
      current.percent_total_sales,
      previous.percent_total_sales,
      change.percent_total_sales,
      charge.percent_total_sales,
      yoy.percent_total_sales,
      yoyCharge.percent_total_sales,
      isYoY,
      "%"
    );
    const conversion_rate = getSingleColumForCSV(
      current.conversion_rate,
      previous.conversion_rate,
      change.conversion_rate,
      charge.conversion_rate,
      yoy.conversion_rate,
      yoyCharge.conversion_rate,
      isYoY,
      "%"
    );
    const acos = getSingleColumForCSV(
      current.acos,
      previous.acos,
      change.acos,
      charge.acos,
      yoy.acos,
      yoyCharge.acos,
      isYoY,
      "%"
    );

    temp.push(
      ...sales,
      ...shipped_cogs,
      ...orders,
      ...units_sold,
      ...units_per_order,
      ...asp,
      ...ad_impressions,
      ...ad_clicks,
      ...average_cpc,
      ...ad_spend,
      ...ad_orders,
      ...ad_sales,
      ...percent_total_sales,
      ...conversion_rate,
      ...acos
    );
    finalData.push(temp);

    return false;
  });
  let total = [];

  total.push("Total");

  // total.push("");

  const sales = getSingleColumForCSV(
    totalOfData.sales.current,
    totalOfData.sales.previous,
    totalOfData.sales.change,
    totalOfData.sales.charge,
    totalOfData.sales.yoy,
    totalOfData.sales.yoyCharge,
    isYoY,
    "$"
  );
  const shipped_cogs = getSingleColumForCSV(
    totalOfData.shipped_cogs.current,
    totalOfData.shipped_cogs.previous,
    totalOfData.shipped_cogs.change,
    totalOfData.shipped_cogs.charge,
    totalOfData.shipped_cogs.yoy,
    totalOfData.shipped_cogs.yoyCharge,
    isYoY,
    "$"
  );
  const orders = getSingleColumForCSV(
    totalOfData.orders.current,
    totalOfData.orders.previous,
    totalOfData.orders.change,
    totalOfData.orders.charge,
    totalOfData.orders.yoy,
    totalOfData.orders.yoyCharge,
    isYoY,
    ""
  );
  const units_sold = getSingleColumForCSV(
    totalOfData.units_sold.current,
    totalOfData.units_sold.previous,
    totalOfData.units_sold.change,
    totalOfData.units_sold.charge,
    totalOfData.units_sold.yoy,
    totalOfData.units_sold.yoyCharge,
    isYoY,
    ""
  );
  const units_per_order = getSingleColumForCSV(
    totalOfData.units_per_order.current,
    totalOfData.units_per_order.previous,
    totalOfData.units_per_order.change,
    totalOfData.units_per_order.charge,
    totalOfData.units_per_order.yoy,
    totalOfData.units_per_order.yoyCharge,
    isYoY,
    ""
  );

  const asp = getSingleColumForCSV(
    totalOfData.asp.current,
    totalOfData.asp.previous,
    totalOfData.asp.change,
    totalOfData.asp.charge,
    totalOfData.asp.yoy,
    totalOfData.asp.yoyCharge,
    isYoY,
    "$"
  );
  const ad_impressions = getSingleColumForCSV(
    totalOfData.ad_impressions.current,
    totalOfData.ad_impressions.previous,
    totalOfData.ad_impressions.change,
    totalOfData.ad_impressions.charge,
    totalOfData.ad_impressions.yoy,
    totalOfData.ad_impressions.yoyCharge,
    isYoY,
    ""
  );
  const ad_clicks = getSingleColumForCSV(
    totalOfData.ad_clicks.current,
    totalOfData.ad_clicks.previous,
    totalOfData.ad_clicks.change,
    totalOfData.ad_clicks.charge,
    totalOfData.ad_clicks.yoy,
    totalOfData.ad_clicks.yoyCharge,
    isYoY,
    ""
  );
  const average_cpc = getSingleColumForCSV(
    totalOfData.average_cpc.current,
    totalOfData.average_cpc.previous,
    totalOfData.average_cpc.change,
    totalOfData.average_cpc.charge,
    totalOfData.average_cpc.yoy,
    totalOfData.average_cpc.yoyCharge,
    isYoY,
    "$"
  );
  const ad_spend = getSingleColumForCSV(
    totalOfData.ad_spend.current,
    totalOfData.ad_spend.previous,
    totalOfData.ad_spend.change,
    totalOfData.ad_spend.charge,
    totalOfData.ad_spend.yoy,
    totalOfData.ad_spend.yoyCharge,
    isYoY,
    "$"
  );

  const ad_orders = getSingleColumForCSV(
    totalOfData.ad_orders.current,
    totalOfData.ad_orders.previous,
    totalOfData.ad_orders.change,
    totalOfData.ad_orders.charge,
    totalOfData.ad_orders.yoy,
    totalOfData.ad_orders.yoyCharge,
    isYoY,
    ""
  );
  const ad_sales = getSingleColumForCSV(
    totalOfData.ad_sales.current,
    totalOfData.ad_sales.previous,
    totalOfData.ad_sales.change,
    totalOfData.ad_sales.charge,
    totalOfData.ad_sales.yoy,
    totalOfData.ad_sales.yoyCharge,
    isYoY,
    "$"
  );
  const percent_total_sales = getSingleColumForCSV(
    totalOfData.percent_total_sales.current,
    totalOfData.percent_total_sales.previous,
    totalOfData.percent_total_sales.change,
    totalOfData.percent_total_sales.charge,
    totalOfData.percent_total_sales.yoy,
    totalOfData.percent_total_sales.yoyCharge,
    isYoY,
    "%"
  );

  const conversion_rate = getSingleColumForCSV(
    totalOfData.conversion_rate.current,
    totalOfData.conversion_rate.previous,
    totalOfData.conversion_rate.change,
    totalOfData.conversion_rate.charge,
    totalOfData.conversion_rate.yoy,
    totalOfData.conversion_rate.yoyCharge,
    isYoY,
    "%"
  );
  const acos = getSingleColumForCSV(
    totalOfData.acos.current,
    totalOfData.acos.previous,
    totalOfData.acos.change,
    totalOfData.acos.charge,
    totalOfData.acos.yoy,
    totalOfData.acos.yoyCharge,
    isYoY,
    "%"
  );

  total.push(
    ...sales,
    ...shipped_cogs,
    ...orders,
    ...units_sold,
    ...units_per_order,
    ...asp,
    ...ad_impressions,
    ...ad_clicks,
    ...average_cpc,
    ...ad_spend,
    ...ad_orders,
    ...ad_sales,
    ...percent_total_sales,
    ...conversion_rate,
    ...acos
  );
  finalData.push(total);
  return finalData;
};

export { filterDataAndFormat, getFrontendFormattedTotal, getCSVVersion };
