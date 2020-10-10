import React, { Component } from "react";
import Chart from "react-apexcharts";
import { withFirebase } from "../Firebase/context";

class SmallBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          categories: ["1.", "2.", "3.", "4.", "5."],
          reversed: true,
        },
      },
      series: [
        {
          name: "Count",
          data: [91, 70, 60, 49, 23],
        },
      ],
    };
  }

  componentDidMount() {
    this.filterActivitiesByProductivity("Productive");
  }

  filterActivitiesByProductivity(productiveness) {
    const sortedArray = [];

    this.props.firestoreActivities.map((entry) =>
      entry.productiveness === productiveness
        ? sortedArray.push(entry.name)
        : null
    );
    console.log(sortedArray)
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
