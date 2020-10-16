import React, { Component } from "react";
import Navigation from "../components/Navigation";
import withAuthorization from "../components/Session/withAuthorization";
import LiveActivityModal from "../components/Activities/LiveActivityModal";
import ManualActivityModal from "../components/Activities/ManualActivityModal";
import SmallBarChart from "../components/Activities/SmallBarChart";
import SmallDonutChart from "../components/Activities/SmallDonutChart";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Label, Select } from "@windmill/react-ui";
import QuickActivity from "../components/Activities/QuickActivity";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      firestoreActivities: null,
      username: null,
      loading: true,
      randomQuote: "",
      daysToDisplay: 7,
    };
  }

  componentDidMount = async () => {
    // Get random quote
    this.getQuote();

    // Get user activities, user data and (if available) QuickActivities.
    // Several calls, can't be combined. Firestore doesn't support
    // fetching multiple collections in the same document
    this.getActivityData();
    this.getUserData();
    this.getQuickActivities();
  };

  getActivityData = async () => {
    const response = await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .collection("activities")
      .get()
      .then(function (querySnapshot) {
        const activityData = [];

        querySnapshot.forEach(function (doc) {
          activityData.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            duration: doc.data().duration,
            productiveness: doc.data().productiveness,
            category: doc.data().category,
            notes: doc.data().notes,
          });
        });
        return activityData;
      });
    this.setState({ firestoreActivities: response });
  };

  getUserData = async () => {
    await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .get()
      .then((response) => {
        this.setState({
          username: response.data().name,
          bannerURL: response.data().bannerURL,
        });
      });
  };

  getQuickActivities = async () => {
    const response = await this.props.firebase.db
      .collection("users")
      .doc(`${this.state.authUser.uid}`)
      .collection("quickActivities")
      .get()
      .then(function (querySnapshot) {
        const quickActivityData = [];

        querySnapshot.forEach(function (doc) {
          quickActivityData.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            duration: doc.data().duration,
            productiveness: doc.data().productiveness,
            category: doc.data().category,
            activityPictureURL: doc.data().activityPictureURL,
          });
        });
        return quickActivityData;
      });
    this.setState({ quickActivities: response, loading: false });
  };

  getQuote = async function () {
    const random = Math.floor(Math.random() * 500);

    await fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => this.setState({ randomQuote: data[random].text }));
  };

  handleChartChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      this.handleSubmit
    );
  };

  handleSubmit() {
    this.forceUpdate();
  }

  render() {
    const {
      loading,
      bannerURL,
      username,
      randomQuote,
      quickActivities,
      daysToDisplay,
      firestoreActivities,
    } = this.state;

    return (
      <>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Navigation />
            <div
              className="w-full bg-cover bg-center shadow-xl"
              style={{
                height: "32rem",
                backgroundImage: bannerURL
                  ? `url("${bannerURL}")`
                  : `url("https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")`,
              }}
            >
              <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 bg-opacity-50 py-4">
                <div className="w-2/3 text-center">
                  <h1 className="text-white text-3xl font-semibold uppercase">
                    Welcome back,{" "}
                    <span className="underline text-blue-400">{username}</span>
                  </h1>
                  <div className="mt-10 flex flex-row flex-wrap items-center justify-around w-auto mx-auto">
                    <Link to="/all-activities">
                      <button
                        className="w-48 m-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150"
                        type="button"
                      >
                        Show All
                      </button>
                    </Link>

                    <LiveActivityModal />

                    <ManualActivityModal />
                  </div>
                </div>
                <h2 className="mt-10 p-4 italic text-white text-center text-xl font-serif md:text-2xl">
                  &quot;{randomQuote}&quot;
                </h2>
              </div>
              <div className="flex flex-col items-center">
                {/* ------------- QUICK ACTIVITIES ------------- */}

                {quickActivities.length > 0 ? (
                  <div>
                    <h1 className="mt-8 font-bold text-4xl md:text-5xl text-gray-900">
                      Quick Activities
                    </h1>
                  </div>
                ) : null}
                <div className="mb-8">
                  <div className="flex flex-row flex-wrap justify-around p-12">
                    {quickActivities
                      ? quickActivities.map((activity) => (
                          <QuickActivity
                            name={activity.name}
                            id={activity.id}
                            category={activity.category}
                            picture={activity.activityPictureURL}
                            duration={activity.duration}
                            productiveness={activity.productiveness}
                            key={activity.id}
                          />
                        ))
                      : null}
                  </div>
                </div>

                {/* ------------- APEXCHARTS ------------- */}

                <h1 className="mb-2 font-bold text-4xl md:text-5xl max-w-xl text-gray-900">
                  Overview
                </h1>
                <span className="mb-8 w-24 h-1 bg-blue-400 rounded-full" />
                <Label className="mb-6">
                  <span className="sm:text-3xl text-2xl text-center my-1">
                    Show last
                  </span>
                  <Select
                    name="daysToDisplay"
                    className="my-2"
                    onChange={this.handleChartChange}
                  >
                    <option value={7} key={7}>
                      7 days
                    </option>
                    <option value={30} key={30}>
                      30 days
                    </option>
                    <option value={90} key={90}>
                      90 days
                    </option>
                    <option value={365} key={365}>
                      Year
                    </option>
                  </Select>
                </Label>

                <div className="flex flex-wrap justify-center w-auto mb-32">
                  {/* ------------- CHART CONTAINER ------------- */}
                  <div className="mx-2 mb-4 shadow-xl rounded-lg border border-gray-100 overflow-hidden p-5">
                    {/* ------------- CHART HEADER ------------- */}
                    <div className="inline-flex">
                      <div className="flex-1 h-4 w-4 m rounded-full m-1 bg-purple-100">
                        <div className="h-2 w-2 rounded-full m-1 bg-purple-500 "></div>
                      </div>
                      <div className="flex-1 text-sm">Summary</div>
                    </div>
                    {/* ------------- CHART  ------------- */}
                    <div>
                      <SmallDonutChart
                        daysToFilter={parseInt(daysToDisplay)}
                        categoryToDisplay={"Productive"}
                        firestoreActivities={firestoreActivities}
                      />
                    </div>
                  </div>

                  {/* ------------- CHART CONTAINER ------------- */}
                  <div className="mx-2 mb-4 shadow-xl rounded-lg border border-gray-100 overflow-hidden p-5">
                    {/* ------------- CHART HEADER ------------- */}
                    <div className="inline-flex">
                      <div className="flex-1 h-4 w-4 m rounded-full m-1 bg-green-100">
                        <div className="h-2 w-2 rounded-full m-1 bg-green-500 "></div>
                      </div>
                      <div className="text-sm">Top Productive</div>
                    </div>
                    {/* ------------- CHART  ------------- */}
                    <div>
                      <SmallBarChart
                        daysToFilter={parseInt(daysToDisplay)}
                        categoryToDisplay={"Productive"}
                        firestoreActivities={firestoreActivities}
                      />
                    </div>
                  </div>

                  {/* ------------- CHART CONTAINER ------------- */}
                  <div className="mx-2 mb-4 shadow-xl rounded-lg border border-gray-100 overflow-hidden p-5">
                    {/* ------------- CHART HEADER ------------- */}
                    <div className="inline-flex">
                      <div className="flex-1 h-4 w-4 m rounded-full m-1 bg-yellow-200">
                        <div className="h-2 w-2 rounded-full m-1 bg-yellow-500 "></div>
                      </div>
                      <div className="text-sm">Top Necessary</div>
                    </div>
                    {/* ------------- CHART  ------------- */}
                    <div>
                      <SmallBarChart
                        daysToFilter={parseInt(daysToDisplay)}
                        categoryToDisplay={"Neutral / Necessary"}
                        firestoreActivities={firestoreActivities}
                      />
                    </div>
                  </div>

                  {/* ------------- CHART CONTAINER ------------- */}
                  <div className="mx-2 mb-4 shadow-xl rounded-lg border border-gray-100 p-5">
                    {/* ------------- CHART HEADER ------------- */}
                    <div className="inline-flex">
                      <div className="flex-1 h-4 w-4 m rounded-full m-1 bg-red-100">
                        <div className="h-2 w-2 rounded-full m-1 bg-red-500 "></div>
                      </div>
                      <div className="text-sm">Top Unproductive</div>
                    </div>
                    {/* ------------- CHART  ------------- */}
                    <div>
                      <SmallBarChart
                        daysToFilter={parseInt(daysToDisplay)}
                        categoryToDisplay={"Unproductive"}
                        firestoreActivities={firestoreActivities}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </>
        )}
      </>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Overview);
