import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import SmallBarChart from "./SmallBarChart";
import SmallDonutChart from "./SmallDonutChart";

class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="px-5 py-6 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Last 7 Days
          </h1>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="mx-5 mb-16 w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
            <div className="inline-flex">
              <div className="flex-1 h-4 w-4 m rounded-full m-1 bg-purple-100">
                <div className="h-2 w-2 rounded-full m-1 bg-purple-500 "></div>
              </div>
              <div className="flex-1 text-sm">Summary</div>
            </div>

            <div>
              <SmallDonutChart />
            </div>
          </div>

          <div className="mx-5 mb-16 w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
            <div className="inline-flex">
              <div className="flex-1 h-4 w-4 m rounded-full m-1 bg-green-100">
                <div className="h-2 w-2 rounded-full m-1 bg-green-500 "></div>
              </div>
              <div className="text-sm">Top Productive</div>
            </div>

            <div>
              <SmallBarChart />
            </div>
          </div>

          <div className="mx-5 mb-16 w-70 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5">
            <div className="inline-flex">
              <div className="flex-1 h-4 w-4 m rounded-full m-1 bg-red-100">
                <div className="h-2 w-2 rounded-full m-1 bg-red-500 "></div>
              </div>
              <div className="text-sm">Top Unproductive</div>
            </div>

            <div>
              <SmallBarChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(AllActivities);
