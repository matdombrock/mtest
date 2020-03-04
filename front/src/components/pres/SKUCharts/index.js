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
  Pie
} from "recharts";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./style.module.scss";

class SKUCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxValue: 0
    };
    this.formatMoney = this.formatMoney.bind(this);
  }

  formatMoney(value) {
    return "$" + numberWithCommas(value);
  }

  render() {
    let maxRevenue = 0.0,
      maxAdSales = 0.0,
      maxCvr = 0.0,
      maxSellingPrice = 0.0,
      totalSales;
    if (this.props.data.itemized) {
      totalSales = (
        parseFloat(this.props.data.summary.totalRevenue) -
        parseFloat(this.props.data.summary.totalAdSales)
      ).toFixed(2);
      for (let i = 0; i < this.props.data.itemized.length; i++) {
        if (parseFloat(this.props.data.itemized[i].sales) > maxRevenue) {
          maxRevenue = this.props.data.itemized[i].sales;
        }

        if (parseFloat(this.props.data.itemized[i].ad_sales) > maxAdSales) {
          maxAdSales = this.props.data.itemized[i].ad_sales;
        }

        if (parseFloat(this.props.data.itemized[i].conversion_rate) > maxCvr) {
          maxCvr = this.props.data.itemized[i].conversion_rate;
        }

        if (
          parseFloat(this.props.data.itemized[i].ad_orders) > maxSellingPrice
        ) {
          maxSellingPrice = this.props.data.itemized[i].ad_orders;
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
                data={
                  this.props.data.itemized
                    ? this.props.data.itemized.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                      )
                    : null
                }
              >
                <Line
                  name={"Total Sales"}
                  type="monotone"
                  dataKey="sales"
                  stroke="blue"
                />
                <XAxis dataKey="date" />{" "}
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
                  this.props.data.itemized
                    ? this.props.data.itemized.sort(
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
                <Legend verticalAlign="top" height={36} />
                <XAxis dataKey="date" />{" "}
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
                  this.props.data.itemized
                    ? this.props.data.itemized.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                      )
                    : null
                }
                margin={{ left: 20, top: 20, right: 5 }}
              >
                <YAxis yAxisId="left" domain={[0, parseFloat(maxCvr)]} />
                <YAxis yAxisId="right" orientation="right" />
                <XAxis dataKey="date" />{" "}
                <Legend verticalAlign="top" height={36} />
                <Line
                  yAxisId="left"
                  name="Conversion Rate"
                  type="monotone"
                  dataKey="cvr"
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
              alignItems: "center"
            }}
          >
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                margin={{ left: 20, top: 20, right: 5 }}
                data={
                  this.props.data.itemized
                    ? this.props.data.itemized.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                      )
                    : null
                }
              >
                <Line
                  name={"Total Orders"}
                  type="monotone"
                  dataKey="ad_orders"
                  stroke="blue"
                />
                <XAxis dataKey="date" />
                <Legend verticalAlign="top" height={36} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <YAxis
                  domain={[0, parseFloat(maxSellingPrice)]}
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
                  this.props.data.itemized
                    ? this.props.data.itemized.sort(
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
                <XAxis dataKey="date" />
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
                      value: this.props.data.summary
                        ? parseFloat(this.props.data.summary.totalAdSales)
                        : 0,
                      fill: "blue",
                      name: "Ad Sales"
                    },
                    {
                      value: this.props.data.summary
                        ? parseFloat(totalSales)
                        : 0,
                      fill: "green",
                      name: "Total Sales (not including ad sales)"
                    }
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#82ca9d"
                  label={data => "$" + numberWithCommas(data.payload.value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SKUCharts;
