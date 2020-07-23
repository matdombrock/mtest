import numberWithCommas from "../../services/numberWithCommas";

const convertToFrontendReadyFormat = (
  current,
  previous,
  yoy = {},
  pop = {}
) => {
  let allSKU = [];
  Object.keys(current).map((d) => allSKU.push(d));

  return allSKU
    .map((sku) => {
      let temp = {
        sales: { number: 0, percentage: 0 },
        shipped_cogs: { number: 0, percentage: 0 },
        orders: { number: 0, percentage: 0 },
        units_sold: { number: 0, percentage: 0 },
        asp: { number: 0, percentage: 0 },
        ad_impressions: { number: 0, percentage: 0 },
        ad_clicks: { number: 0, percentage: 0 },
        ad_spend: { number: 0, percentage: 0 },
        ad_orders: { number: 0, percentage: 0 },
        ad_sales: { number: 0, percentage: 0 },
        percent_total_sales: { number: 0, percentage: 0 },
        conversion_rate: { number: 0, percentage: 0 },
        acos: { number: 0, percentage: 0 },
        average_cpc: { number: 0, percentage: 0 },
        units_per_order: { number: 0, percentage: 0 },
      };

      let currentSKU = current[sku];
      if (!currentSKU) return false;

      let previousSKU = previous[sku] || JSON.parse(JSON.stringify(temp));

      let currentYoy = yoy[sku] || JSON.parse(JSON.stringify(temp));
      let currentPop = pop[sku] || JSON.parse(JSON.stringify(temp));
      console.log("convertToFrontendReadyFormat -> currentPop", currentPop);
      let change = {
        asp: currentPop?.asp?.number?.toFixed(2),
        units_per_order: currentPop?.units_per_order?.number?.toFixed(2),
        orders: currentPop?.orders?.number?.toFixed(2),
        ad_spend: currentPop?.ad_spend?.number?.toFixed(2),
        ad_orders: currentPop?.ad_orders?.number?.toFixed(2),
        conversion_rate: currentPop?.conversion_rate?.number?.toFixed(2),
        acos: currentPop?.acos?.number?.toFixed(2),
        ad_sales: currentPop?.ad_sales?.number?.toFixed(2),
        sales: currentPop?.sales?.number?.toFixed(2),
        units_sold: currentPop?.units_sold?.number?.toFixed(2),
        shipped_cogs: currentPop?.shipped_cogs?.number?.toFixed(2),
        ad_clicks: currentPop?.ad_clicks?.number?.toFixed(2),
        ad_impressions: currentPop?.ad_impressions?.number?.toFixed(2),
        average_cpc: currentPop?.average_cpc?.number?.toFixed(2),
        percent_total_sales: currentPop?.percent_total_sales?.number?.toFixed(
          2
        ),
      };
      let charge = {
        orders: currentPop?.orders?.percentage?.toFixed(2),
        units_per_order: currentPop?.units_per_order?.percentage?.toFixed(2),
        asp: currentPop?.asp?.percentage?.toFixed(2),
        ad_spend: currentPop?.ad_spend?.percentage?.toFixed(2),
        ad_orders: currentPop?.ad_orders?.percentage?.toFixed(2),
        conversion_rate: currentPop?.conversion_rate?.percentage?.toFixed(2),
        acos: currentPop?.acos?.percentage?.toFixed(2),
        ad_sales: currentPop?.ad_sales?.percentage?.toFixed(2),
        sales: currentPop?.sales?.percentage?.toFixed(2),
        units_sold: currentPop?.units_sold?.percentage?.toFixed(2),
        shipped_cogs: currentPop?.shipped_cogs?.percentage?.toFixed(2),
        ad_clicks: currentPop?.ad_clicks?.percentage?.toFixed(2),
        ad_impressions: currentPop?.ad_impressions?.percentage?.toFixed(2),
        average_cpc: currentPop?.average_cpc?.percentage?.toFixed(2),
        percent_total_sales: currentPop?.percent_total_sales?.percentage?.toFixed(
          2
        ),
      };

      let yoyChange = {
        orders: currentYoy?.orders?.number?.toFixed(2),
        units_per_order: currentYoy?.units_per_order?.number?.toFixed(2),
        asp: currentYoy?.asp?.number?.toFixed(2),
        ad_spend: currentYoy?.ad_spend?.number?.toFixed(2),
        ad_orders: currentYoy?.ad_orders?.number?.toFixed(2),
        conversion_rate: currentYoy?.conversion_rate?.number?.toFixed(2),
        acos: currentYoy?.acos?.number?.toFixed(2),
        ad_sales: currentYoy?.ad_sales?.number?.toFixed(2),
        sales: currentYoy?.sales?.number?.toFixed(2),
        units_sold: currentYoy?.units_sold?.number?.toFixed(2),
        shipped_cogs: currentYoy?.shipped_cogs?.number?.toFixed(2),
        ad_clicks: currentYoy?.ad_clicks?.number?.toFixed(2),
        ad_impressions: currentYoy?.ad_impressions?.number?.toFixed(2),
        average_cpc: currentYoy?.average_cpc?.number?.toFixed(2),
        percent_total_sales: currentYoy?.percent_total_sales?.number?.toFixed(
          2
        ),
      };
      let yoyCharge = {
        orders: currentYoy?.orders?.percentage?.toFixed(2),
        units_per_order: currentYoy?.units_per_order?.percentage?.toFixed(2),
        asp: currentYoy?.asp?.percentage?.toFixed(2),
        ad_spend: currentYoy?.ad_spend?.percentage?.toFixed(2),
        ad_orders: currentYoy?.ad_orders?.percentage?.toFixed(2),
        conversion_rate: currentYoy?.conversion_rate?.percentage?.toFixed(2),
        acos: currentYoy?.acos?.percentage?.toFixed(2),
        ad_sales: currentYoy?.ad_sales?.percentage?.toFixed(2),
        sales: currentYoy?.sales?.percentage?.toFixed(2),
        units_sold: currentYoy?.units_sold?.percentage?.toFixed(2),
        shipped_cogs: currentYoy?.shipped_cogs?.percentage?.toFixed(2),
        ad_clicks: currentYoy?.ad_clicks?.percentage?.toFixed(2),
        ad_impressions: currentYoy?.ad_impressions?.percentage?.toFixed(2),
        average_cpc: currentYoy?.average_cpc?.percentage?.toFixed(2),
        percent_total_sales: currentYoy?.percent_total_sales?.percentage?.toFixed(
          2
        ),
      };
      return {
        current: currentSKU,
        previous: previousSKU,
        change,
        charge,
        yoy: yoyChange,
        yoyCharge,
        yoySKU: currentYoy,
      };
    })
    .filter((d) => d);
};

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
    charge !== 0 ? charge + "%" : current > 0 && previous > 0 ? "0%" : "N/A"
  );

  if (isYoY) {
    temp.push(
      yoy !== 0
        ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(yoy)}`
        : "N/A"
    );
    temp.push(yoyCharge !== 0 ? yoyCharge + "%" : "N/A");
  }
  return temp;
};

const filerDataAndConvertToFrontendReadyFormat = (
  current,
  previous,
  yoy,
  firstPop,
  // firstYoy,
  sortBy,
  sortByInner,
  sortAscendingBy
) => {
  const allSKUData = convertToFrontendReadyFormat(
    current,
    previous,
    yoy,
    firstPop
    // firstYoy
  );
  return allSKUData.sort((a, b) => {
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
};

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

  headerOfComparison.push("");
  headerOfComparison.push("");
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
  filterSKUData.map(
    ({ current, previous, change, charge, yoy, yoyCharge, yoySKU }) => {
      const temp = [];

      temp.push(current.item_number || "N/A");
      temp.push(current.asin || "N/A");
      temp.push(current.short_product_title || "N/A");

      //
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
        "$"
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
    }
  );
  let total = [];
  total.push("Total");
  total.push("");
  total.push("");

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
    "$"
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
export {
  filerDataAndConvertToFrontendReadyFormat,
  getCSVVersion,
  getFrontendFormattedTotal,
};
