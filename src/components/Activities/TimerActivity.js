import React, { Component } from "react";
import Timer from "react-compound-timer";
import { withFirebase } from "../Firebase/context";
import { Button } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import { FiPlayCircle, FiPauseCircle, FiTrash2 } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";

class TimerActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendActivity = () => {
    /*
    
    commented out to not bloat the database. code is working


    this.props.firebase.db
      .collection("activities")
      .add({
        //test values
        category: "productive",
        date: "09162020",
        duration: "120",
        name: "Sport",
      })
      .then((documentReference) => {
        console.log("document reference ID", documentReference.id);
      })
      .catch((error) => {
        console.log(error.message);
      });
    
    */
    console.log("activity saved!");
  };

  render() {
    return (
      <div>
        <Timer
          startImmediately={false}
          formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
        >
          {({ start, stop, reset }) => (
            <>
            
              <div className="m-10 mx-auto p-16 sm:p-24 lg:p-48 bg-gray-200">
                <div
                  className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl"
                  style={{ minHeight: "19rem" }}
                >
                  <div
                    className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                    style={{ minHeight: "19rem" }}
                  >
                    <img
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      src="https://images.unsplash.com/photo-1505027492977-1037f14c46fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1473&q=80"
                      alt=""
                    ></img>
                    <div className="absolute inset-0 w-full h-full bg-indigo-900 opacity-75"></div>
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
                      <FaRegClock className="w-24 h-24" />
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
                    <div className="p-12 md:pr-24 md:pl-16 md:py-12">
                      <p className="text-gray-600">
                        asdfsdf sdfjgnfghdsfg döfjg hödfgj hdöfgj hdfgj döfg 
                        asdfsdf sdfjgndsfg döfjg höretfgddfgj hdöfgj hdfgj döfg 
                        asdfsdf sdfjgndfghsfg döfjg hödfgj hdgfhöfgj hdfgj döfg 
                        asdfsdf sdfjgndhdghsfg döfjg hödfgj hdöfgj hdfgj döfg 
                        asdfsdf sdfjgndsfg döfghfjg hödfgj hdöfgj hdfgj döfg 
                      </p>
                      <a
                        className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                        href=""
                      >
                        <span>Learn more about our users</span>
                        <span className="text-xs ml-1">&#x279c;</span>
                      </a>
                    </div>
                    <svg
                      className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center text-center text-white text-5xl w-full h-40 bg-blue-500 rounded-full">
                <Timer.Hours />:
                <Timer.Minutes />:
                <Timer.Seconds />
              </div>
              <br />
              <div>
                <button
                  className="mx-2 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={start}
                >
                  <FiPlayCircle className="w-8 h-6" />
                </button>
                <button
                  className="mx-2 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={stop}
                >
                  <FiPauseCircle className="w-8 h-6" />
                </button>
                <button
                  className="mx-2 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={reset}
                >
                  <FiTrash2 className="w-8 h-6" />
                </button>
              </div>
            </>
          )}
        </Timer>
        <Link to="/overview">
          <Button
            className="font-bold mr-1 mb-1"
            style={{ backgroundColor: "#cc0000" }}
          >
            Cancel
          </Button>
        </Link>

        <Button
          className="font-bold outline-none focus:outline-none mr-1 mb-1"
          onClick={this.sendActivity}
        >
          Save Activity
        </Button>
      </div>
    );
  }
}

export default withFirebase(TimerActivity);
