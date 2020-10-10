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
    this.formatDataForChart("Productive");
  }

  formatDataForChart(productiveness) {
    // --- get all activities of (function parameter), i.e. "productive"
    const sortedByProcutivenessArray = [];

    this.props.firestoreActivities.map((entry) =>
      entry.productiveness === productiveness
        ? sortedByProcutivenessArray.push(entry)
        : null
    );

    // --- get names in list, remove uppercase letters, remove multiple entries
    //      result: (8 * "Workout" + 3 * "workout") will result in "workout"
    const uniqueNames = Array.from(
      new Set(
        sortedByProcutivenessArray.map((entry) => entry.name.toLowerCase())
      )
    );

    // --- iterate over unique names
    const combinedDurationsArray = [];
    uniqueNames.forEach((uniqueName) => {
      let durationOfUniqueName = 0; // init

      //  --> for each unique name, search "sortedByProcutivenessArray" and add up all the durations for that activity
      //      result: 10x "workout" at 60 minutes each results in 1 entry in array: { name: workout, duration: 600 }
      sortedByProcutivenessArray.forEach((activity) => {
        if (activity.name.toLowerCase() === uniqueName) {
          let currentDuration = parseInt(activity.duration);
          durationOfUniqueName += currentDuration;
        }
      });
      combinedDurationsArray.push({
        name: uniqueName,
        duration: durationOfUniqueName,
      });
    });

    // --- sort activities from highest to lowest duration, get the top 5 entries
    const result = combinedDurationsArray
      .sort((activity1, activity2) => activity1.duration < activity2.duration)
      .slice(0, 5);

    console.log(result);
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
