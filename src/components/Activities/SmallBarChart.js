import React, { Component } from "react";
import Chart from "react-apexcharts";
import { withFirebase } from "../Firebase/context";

class SmallBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        xaxis: {
          categories: [1996, 1997, 1998, 1999],
          reversed: true,
        },
      },
      series: [
        {
          name: "series-1",
          data: [49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="380"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(SmallBarChart);