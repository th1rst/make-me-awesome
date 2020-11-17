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

  async componentWillReceiveProps() {
    this.formatDataForChart(`${await this.props.categoryToDisplay}`);
  }

  formatDataForChart(productivityParam) {
    // --- filter by Date (i.e. "last 7 days", "last 30 days").
    let date = new Date();
    date.setDate(date.getDate() - `${this.props.daysToFilter}`);
    const endDate = date.toLocaleDateString("en-US");

    const filteredByDate = this.props.firestoreActivities.filter((activity) =>
      new Date(activity.date) >= new Date(endDate) ? activity : null
    );

    // --- get all activities of (function parameter), i.e. "productive"
    const filteredByProductiveness = filteredByDate.filter((entry) =>
      entry.productiveness === productivityParam ? entry : null
    );

    // --- get names in list, remove uppercase letters, remove multiple entries
    //      result: (8 x "Workout" + 3 x "workout") will result in "workout"
    const uniqueNames = Array.from(
      new Set(filteredByProductiveness.map((entry) => entry.name.toLowerCase()))
    );

    // --- iterate over unique names
    const combinedDurationsOfUniqueActivity = [];
    uniqueNames.forEach((uniqueName) => {
      let durationOfUniqueName = 0; // init

      //  --> for each unique name, search "filteredByProductiveness" and add up all the durations
      //      result: 10x "workout" at 60 minutes each results in: { name: workout, duration: 600 }
      filteredByProductiveness.forEach((activity) => {
        if (activity.name.toLowerCase() === uniqueName) {
          let currentDuration = parseInt(activity.duration);
          durationOfUniqueName += currentDuration;
        }
      });
      combinedDurationsOfUniqueActivity.push({
        name: uniqueName,
        duration: durationOfUniqueName,
      });
    });

    // --- sort activities from highest to lowest duration, get the top 5 entries
    const top5HighestToLowest = combinedDurationsOfUniqueActivity
      .sort((activity1, activity2) => activity1.duration < activity2.duration)
      .slice(0, 5);

    // --- make it look pretty again (Capitalize First Letters)
    //      push result in two seperate arrays (Apexcharts wants seperate Labels and Data)
    const labels = top5HighestToLowest.map((activity) =>
      activity.name.replace(
        /\w\S*/g,
        (string) =>
          string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
      )
    );

    const data = top5HighestToLowest.map((activity) =>
      // display time spent in hours + one decimal).
      //   ---> result: values before: "194" (minutes), after: "3.2" (hours)
      (Math.round((activity.duration / 60) * 100) / 100).toFixed(1)
    );

    // --- set state
    this.setState({
      options: {
        ...this.state.options,
        xaxis: { ...this.state.options.xaxis, categories: labels },
      },
      series: [
        {
          data: data,
        },
      ],
    });
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
              width="350"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(SmallBarChart);
