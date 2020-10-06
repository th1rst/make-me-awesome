import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../components/Firebase/context";
import Navigation from "../components/Navigation";
import Timer from "react-compound-timer";
import { Badge } from "@windmill/react-ui";
import {
  FiPlayCircle,
  FiPauseCircle,
  FiTrash2,
  FiSave,
  FiMinusSquare,
  FiPlusSquare,
} from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";

class SingleActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      showWarningModal: false,
      timeOfActivity: 0,
      activityCount: 0,
      timePerCount: 5,
    };
    this.handleShowWarningModal = this.handleShowWarningModal.bind(this);
  }

  checkProductivity(type) {
    switch (type) {
      case "Productive":
        return <Badge type="success">{type}</Badge>;
      case "Neutral / Necessary":
        return <Badge type="neutral">{type}</Badge>;
      case "Unproductive":
        return <Badge type="danger">{type}</Badge>;
      default:
        break;
    }
  }

  handleShowWarningModal() {
    this.setState({ showWarningModal: !this.state.showWarningModal });
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveActivityTime(time) {
    //compound Timer's "getTime()" function returns in milliseconds, that's too detailed
    const stringOfTime = time.toString();
    const formattedTimeInMinutes = Math.floor(
      stringOfTime.substring(0, stringOfTime.length - 3) / 60
    );

    this.setState({ timeOfActivity: formattedTimeInMinutes });
  }

  calculateCounterTime = () =>
    this.state.activityCount * this.state.timePerCount;

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
    const { activityName, categoryName, activityType, productivityType } = {
      ...this.props.location.state,
    };

    return (
      <div>
        {activityName ? (
          <div>
            <Navigation />
            <div className="mx-auto h-screen p-4 lg:p-24 bg-gray-200">
              <div
                className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-md"
                style={{ minHeight: "19rem" }}
              >
                <div
                  className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                  style={{ minHeight: "19rem" }}
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1505027492977-1037f14c46fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1473&q=80"
                    alt="tree motivation"
                  ></img>
                  <div className="absolute inset-0 w-full h-full bg-indigo-900 opacity-75"></div>
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
                    <div className="flex flex-col justify-evenly text-center">
                      <h1 className="my-3 text-4xl font-semibold uppercase text-center">
                        {activityName}
                      </h1>
                      {activityType === "Timer" ? (
                        <>
                          <FaRegClock className="w-20 h-20 self-center" />
                          <h1 className="mt-2 text-2xl font-semibold uppercase text-center">
                            {activityType}
                          </h1>
                        </>
                      ) : (
                        <>
                          <FiPlusSquare className="w-20 h-20 self-center" />
                          <h1 className="mt-2 text-2xl font-semibold uppercase text-center">
                            {activityType}
                          </h1>
                        </>
                      )}

                      <div className="my-3">
                        {this.checkProductivity(productivityType)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
                  <div className="flex flex-col mx-auto items-center text-center pb-4 md:pr-12 md:pl-6 md:py-6">
                    <p className="absolute top-0 mt-2 text-white text-xl font-semibold text-center md:text-gray-600">
                      Category: {categoryName}
                    </p>

                    {/* ---------- TIMER ----------*/}

                    {activityType === "Timer" ? (
                      <Timer
                        initialTime={0}
                        startImmediately={false}
                        formatValue={(value) =>
                          `${value < 10 ? `0${value}` : value}`
                        }
                      >
                        {({ start, stop, reset, getTime }) => (
                          <>
                            <div className="flex items-center justify-center text-white text-5xl w-64 h-20 my-5 rounded-lg bg-indigo-900">
                              <Timer.Hours />:
                              <Timer.Minutes />:
                              <Timer.Seconds />
                            </div>
                            <div className="flex flex-row flex-wrap justify-evenly">
                              <button
                                className="w-28 h-12 flex items-center justify-center pl-2 m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                                onClick={start}
                              >
                                <FiPlayCircle className="w-10 h-6" />
                                Start
                              </button>

                              <button
                                className="w-28 h-12 flex items-center justify-center pl-2 m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                                onClick={stop}
                              >
                                <FiPauseCircle className="w-10 h-6" />
                                Pause
                              </button>
                              <button
                                className="w-28 h-12 flex items-center justify-center pl-2 m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                                onClick={() => {
                                  stop();
                                  reset();
                                }}
                              >
                                <FiTrash2 className="w-10 h-6" />
                                Reset
                              </button>
                              <button
                                className="w-28 h-12 flex items-center justify-center pl-2 m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                                onClick={() => {
                                  stop();
                                  this.saveActivityTime(getTime());
                                }}
                              >
                                <FiSave className="w-10 h-6" />
                                Save
                              </button>
                            </div>
                          </>
                        )}
                      </Timer>
                    ) : (
                      <>
                        {/* ---------- COUNTER ----------*/}

                        <div className="flex flex-row items-center justify-evenly mx-auto">
                          <button
                            className="w-16 h-14 flex items-center justify-center pl-2 m-1 bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                            onClick={() => {
                              this.calculateCounterTime();
                              this.setState({
                                activityCount: this.state.activityCount - 1,
                              });
                            }}
                          >
                            <FiMinusSquare className="ml-2 w-16 h-10" />
                          </button>

                          <div className="flex items-center justify-center text-white text-4xl w-48 sm:w-64 h-20 my-2 mt-4 rounded-lg bg-indigo-900">
                            Count: {this.state.activityCount}
                          </div>
                          <button
                            className="w-16 h-14 flex items-center justify-center pl-2 m-1 bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                            onClick={() => {
                              this.calculateCounterTime();
                              this.setState({
                                activityCount: this.state.activityCount + 1,
                              });
                            }}
                          >
                            <FiPlusSquare className="ml-2 w-16 h-10" />
                          </button>
                        </div>
                        <div className="flex flex-row items-center justify-evenly">
                          <button
                            className="w-16 h-14 flex items-center justify-center pl-2 m-1 bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                            onClick={() => {
                              this.calculateCounterTime();
                              this.setState({
                                timePerCount: this.state.timePerCount - 1,
                              });
                            }}
                          >
                            <FiMinusSquare className="ml-2 w-16 h-10" />
                          </button>

                          <div className="flex items-center justify-center text-white text-2xl w-48 sm:w-64 h-20 my-2 rounded-lg bg-indigo-900">
                            Time per count: <br />
                            {this.state.timePerCount} Minutes
                          </div>

                          <button
                            className="w-16 h-14 flex items-center justify-center pl-2 m-1 bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-100"
                            onClick={() => {
                              this.calculateCounterTime();
                              this.setState({
                                timePerCount: this.state.timePerCount + 1,
                              });
                            }}
                          >
                            <FiPlusSquare className="ml-2 w-16 h-10" />
                          </button>
                        </div>
                        <p className="font-semibold mt-4">
                          Total time spent on {activityName}:{" "}
                          {this.calculateCounterTime()} Minutes
                        </p>
                      </>
                    )}
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

              <div className="flex mx-auto items-center justify-center bg-gray-100 rounded-lg mt-1 shadow-xl mx-8 mb-4">
                <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 bg-gray-100">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <h2 className="px-4 pt-3 pb-2 text-xl font-semibold text-gray-600">
                      Add a Note:
                    </h2>
                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                      <textarea
                        className="rounded border border-gray-200 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        placeholder="Share your thoughts."
                        name="notesInput"
                        value={this.state.notesInput}
                        onChange={() => this.handleInput}
                      ></textarea>
                    </div>
                    <div className="w-full md:w-full flex items-start md:w-full px-3"></div>
                  </div>
                  <div className="mt-2 flex flex-row justify-evenly flex-wrap">
                    <button
                      type="button"
                      className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition duration-100"
                      onClick={() => this.handleShowWarningModal()}
                    >
                      <span className="mr-2">Close</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentcolor"
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        />
                      </svg>
                    </button>

                    <button
                      className="w-26 h-12 m-2 bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition duration-100"
                      onClick={this.sendActivity}
                    >
                      <span className="mr-2">Save Activity</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentcolor"
                          d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              {/* ---------- WARNING MODAL ON CLOSE ----------*/}

              {this.state.showWarningModal ? (
                <div
                  className="absolute top-0 flex items-center justify-center w-screen h-screen"
                  onClick={this.handleShowWarningModal}
                >
                  <div className="z-50 md:w-1/3 sm:w-full rounded-lg shadow-lg bg-white border-2 border-orange-200">
                    <div className="flex justify-between border-b border-gray-100 px-5 py-4">
                      <div className="inline-flex">
                        <FaExclamationTriangle className="mt-1 text-orange-500" />
                        <span className="ml-1 font-bold text-gray-700 text-lg">
                          Warning
                        </span>
                      </div>
                      <div>
                        <button onClick={this.handleShowWarningModal}>
                          <AiFillCloseCircle className="text-red-500 hover:text-red-600 transition duration-150" />
                        </button>
                      </div>
                    </div>

                    <div className="px-10 py-5 text-gray-600">
                      Are you sure you want to close your currently running
                      Activity?
                    </div>

                    <div className="px-5 py-4 flex justify-end">
                      <button
                        type="button"
                        className="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150"
                        onClick={this.handleShowWarningModal}
                      >
                        Don't Close
                      </button>
                      <Link to="/overview">
                        <button className="bg-orange-500 mr-1 rounded text-sm py-2 px-3 text-white hover:bg-orange-600 transition duration-150">
                          Yes, Close
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <h1>Please start your activity correctly.</h1>
        )}
      </div>
    );
  }
}

export default withFirebase(SingleActivity);
