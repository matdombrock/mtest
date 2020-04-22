import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
} from "recharts";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";
import { connect } from "react-redux";

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxValue: 0,
    };
    this.formatMoney = this.formatMoney.bind(this);
  }

  formatMoney(value) {
    return "$" + numberWithCommas(value);
  }

  render() {
    const { sales } = this.props;
    let periods = this.props.data.periods;
    if (!sales.isComparison) {
      periods = periods.slice(0, periods.length - 1);
    }
    let maxRevenue = 0.0,
      maxAdSales = 0.0,
      maxCvr = 0.0,
      maxSellingPrice = 0.0,
      totalSales = 0,
      totalAdSales = 0;

    const allSummaries = periods
      .map((d) => ({
        ...d.summary,
        // date: `$`
      }))
      .reverse();
    console.log("Charts -> render -> allSummaries", allSummaries);
    totalAdSales = periods[0].summary.ad_sales || 0;
    totalSales =
      Number(periods[0].summary.sales) > 0
        ? Number(periods[0].summary.sales) - Number(totalAdSales)
        : 0;
    console.log("Charts -> render -> totalAdSales", totalAdSales);
    console.log("Charts -> render -> totalSales", totalSales);
    if (allSummaries) {
      for (let i = 0; i < allSummaries.length; i++) {
        if (parseFloat(allSummaries[i].sales) > maxRevenue) {
          maxRevenue = allSummaries[i].sales;
        }

        if (parseFloat(allSummaries[i].ad_sales) > maxAdSales) {
          maxAdSales = allSummaries[i].ad_sales;
        }

        if (parseFloat(allSummaries[i].conversion_rate) > maxCvr) {
          maxCvr = allSummaries[i].conversion_rate;
        }

        if (
          parseFloat(allSummaries[i].average_selling_price) > maxSellingPrice
        ) {
          maxSellingPrice = allSummaries[i].average_selling_price;
        }
      }
    }

    return (
      <div className={s.canvas}>
        <Grid container>
          <Grid item xs={4}>
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                margin={{ left: 50, top: 20, right: 5 }}
                data={allSummaries ? allSummaries : null}
              >
                <Line
                  name={"Total Sales"}
                  type="monotone"
                  dataKey="sales"
                  stroke="blue"
                />
                <XAxis
                  dataKey="date"
                  // tick={{
                  //   angle: 90,
                  //   textAnchor: "start"
                  //   // dominantBaseline: "ideographic"
                  // }}
                  // height={160}
                />
                <YAxis
                  domain={[0, parseFloat(maxRevenue)]}
                  tickFormatter={this.formatMoney}
                />
                <Legend verticalAlign="top" height={36} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={4}>
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                margin={{ left: 50, top: 20, right: 5 }}
                data={
                  allSummaries
                    ? allSummaries.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                      )
                    : null
                }
              >
                <Line
                  name={"Ad Sales"}
                  type="monotone"
                  dataKey="ad_sales"
                  stroke="blue"
                />
                <Line
                  name={"Ad Spend"}
                  type="monotone"
                  dataKey="ad_spend"
                  stroke="red"
                />
                <XAxis
                  dataKey="date"
                  // tick={{
                  //   angle: 90,
                  //   textAnchor: "start",
                  //   dominantBaseline: "ideographic"
                  // }}
                  // height={160}
                />
                <Legend verticalAlign="top" height={36} />
                <YAxis
                  domain={[0, parseFloat(maxAdSales)]}
                  tickFormatter={this.formatMoney}
                />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={4}>
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                data={
                  allSummaries
                    ? allSummaries.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                      )
                    : null
                }
                margin={{ left: 20, top: 20, right: 5 }}
              >
                <XAxis
                  dataKey="date"
                  // tick={{
                  //   angle: 90,
                  //   textAnchor: "start",
                  //   dominantBaseline: "ideographic"
                  // }}
                  // height={160}
                />
                <YAxis yAxisId="left" domain={[0, parseFloat(maxCvr)]} />
                <YAxis yAxisId="right" orientation="right" />
                <Legend verticalAlign="top" height={36} />
                <Line
                  yAxisId="left"
                  name="Conversion Rate"
                  type="monotone"
                  dataKey="conversion_rate"
                  stroke="blue"
                />
                <Line
                  yAxisId="right"
                  name="Average CPC"
                  type="monotone"
                  dataKey="average_cpc"
                  stroke="red"
                />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                margin={{ left: 20, top: 20, right: 5 }}
                data={allSummaries || null}
              >
                <Line
                  name={"Average Selling Price"}
                  type="monotone"
                  dataKey="average_selling_price"
                  stroke="blue"
                />
                <XAxis
                  dataKey="date"
                  // tick={{
                  //   angle: 90,
                  //   textAnchor: "start",
                  //   dominantBaseline: "ideographic"
                  // }}
                  // height={160}
                />
                <Legend verticalAlign="top" height={36} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <YAxis
                  domain={[0, parseFloat(maxSellingPrice || 0)]}
                  tickFormatter={this.formatMoney}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={4}>
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                margin={{ left: 20, top: 20, right: 5 }}
                data={
                  allSummaries
                    ? allSummaries.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                      )
                    : null
                }
              >
                <Line
                  name={"ACOS"}
                  type="monotone"
                  dataKey="acos"
                  stroke="blue"
                />
                <XAxis
                  dataKey="date"
                  // tick={{
                  //   angle: 90,
                  //   textAnchor: "start",
                  //   dominantBaseline: "ideographic"
                  // }}
                  // height={160}
                />
                <Legend verticalAlign="top" height={36} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={4}>
            <ResponsiveContainer width={"100%"} height={300}>
              <PieChart>
                <Legend verticalAlign="top" height={36} />
                <Pie
                  data={[
                    {
                      value: totalAdSales || 0,
                      fill: "blue",
                      name: "Ad Sales",
                    },
                    {
                      value: totalSales || 0,
                      fill: "green",
                      name: "Total Sales (not including ad sales)",
                    },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#82ca9d"
                  label={(data) => "$" + numberWithCommas(data.payload.value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sales: state.sales,
  brands: state.brands,
});

export default connect(mapStateToProps, null)(Charts);
