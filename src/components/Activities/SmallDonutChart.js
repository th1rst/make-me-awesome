import React, { Component } from "react";
import Chart from "react-apexcharts";
import { withFirebase } from "../Firebase/context";

class SmallDonutChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [55, 41, 17],
      options: {
        labels: ["Productive", "Necessary", "Unproductive"],
        colors: ["#00E396", "#FEB019", "#FF4560"],
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.formatDataForChart();
  }

  formatDataForChart() {
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

    const filterList = ["Productive", "Neutral / Necessary", "Unproductive"];

    const dataArray = [];
    filterList.forEach((filter) => {
      let durationOfFilter = 0; // init

      //  --> for each filter, search all activities and add up all the durations for that category
      //      result: { [name: "Productive", duration: 3830], [...] }
      filteredByDateArray.forEach((activity) => {
        if (activity.productiveness === filter) {
          let currentDuration = parseInt(activity.duration);
          durationOfFilter += currentDuration;
        }
      });

      // sort direction = filterList = Labels (no further sorting necessary)
      dataArray.push(durationOfFilter);
    });

    console.log(dataArray);
    this.setState({ series: dataArray });
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default withFirebase(SmallDonutChart);
