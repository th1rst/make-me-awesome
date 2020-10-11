import React, { Component } from "react";
import Chart from "react-apexcharts";
import { withFirebase } from "../Firebase/context";

class SmallBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "bar",
          height: 380,
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#fff"],
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: ["A", "B", "C", "D", "E"],
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        title: {
          text: "(in hours)",
          align: "center",
          floating: true,
        },
        tooltip: {
          theme: "dark",
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
        },
      },
      series: [
        {
          data: [91, 70, 60, 49, 23],
        },
      ],
    };
  }

  componentDidMount() {
    this.formatDataForChart(`${this.props.categoryToDisplay}`);
  }

  componentWillReceiveProps() {
    this.formatDataForChart(`${this.props.categoryToDisplay}`);
  }

  formatDataForChart(productiveness) {
    // --- filter by Date (i.e. "last 7 days", "last 30 days").
    //      parameter is given via props
    let date = new Date();
    date.setDate(date.getDate() - `${this.props.daysToFilter}`);
    const endDate = date.toLocaleDateString("en-US");

    const filteredByDateArray = [];
    this.props.firestoreActivities.forEach((activity) => {
      if (new Date(activity.date) >= new Date(endDate)) {
        filteredByDateArray.push(activity);
      }
    });

    // --- get all activities of (function parameter), i.e. "productive"
    const sortedByProcutivenessArray = [];
    filteredByDateArray.map((entry) =>
      entry.productiveness === productiveness
        ? sortedByProcutivenessArray.push(entry)
        : null
    );

    // --- get names in list, remove uppercase letters for better comparison, remove multiple entries
    //      result: (8 x "Workout" + 3 x "workout") will result in "workout"
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
    const top5HighestToLowest = combinedDurationsArray
      .sort((activity1, activity2) => activity1.duration < activity2.duration)
      .slice(0, 5);

    // --- make it look pretty again (Capitalize First Letters)
    const result = [];
    top5HighestToLowest.forEach((activity) => {
      result.push({
        name: activity.name.replace(/\w\S*/g, function (string) {
          return (
            string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
          );
        }),
        duration: activity.duration,
      });
    });

    // --- push result in two seperate arrays (Apexcharts wants seperate Labels and Data)
    const labelsArray = [];
    const dataArray = [];

    result.forEach((entry) => {
      labelsArray.push(entry.name);
      // display time spent in hours + one decimal).
      // this is done after calculations and sorting to get best results.
      //   ---> result: values before: "194" (minutes), after: "3.2" (hours)
      dataArray.push(
        (Math.round((entry.duration / 60) * 100) / 100).toFixed(1)
      );
    });

    // --- set state
    this.setState({
      options: {
        ...this.state.options,
        xaxis: { ...this.state.options.xaxis, categories: labelsArray },
      },
      series: [
        {
          data: dataArray,
        },
      ],
    });
  }

  render() {
    console.log("Chart props: ", this.props.daysToFilter)
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
