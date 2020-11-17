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
      },
    };
  }

  componentDidMount() {
    this.formatDataForChart();
  }

  async componentWillReceiveProps() {
    await this.props.daysToFilter
    this.formatDataForChart();
  }

  formatDataForChart() {
    // --- filter by Date (i.e. "last 7 days", "last 30 days").
    let date = new Date();
    date.setDate(date.getDate() - `${this.props.daysToFilter}`);
    const endDate = date.toLocaleDateString("en-US");

    const filteredByDate = this.props.firestoreActivities.filter((activity) =>
      new Date(activity.date) >= new Date(endDate) ? activity : null
    );

    const filterList = ["Productive", "Neutral / Necessary", "Unproductive"];

    const result = [];
    filterList.forEach((filterListEntry) => {
      let durationOfFilterListEntry = 0; // init

      //  --> for each filter/category, add up all the durations for that category
      //      result: { [name: "Productive", duration: 3830], [...] }
      filteredByDate.forEach((activity) => {
        if (activity.productiveness === filterListEntry) {
          let currentDuration = parseInt(activity.duration);
          durationOfFilterListEntry += currentDuration;
        }
      });

      // sort direction = filterList = Labels (no further sorting necessary)
      result.push(durationOfFilterListEntry);
    });
    this.setState({ series: result });
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="350"
        />
      </div>
    );
  }
}

export default withFirebase(SmallDonutChart);
