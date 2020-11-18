import React, { useEffect, useState } from "react";
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

function Overview(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [loading, setLoading] = useState(true);
  const [firestoreActivities, setFirestoreActivities] = useState(null);
  const [randomQuote, setRandomQuote] = useState("");
  const [username, setUsername] = useState(null);
  const [daysToDisplay, setDaysToDisplay] = useState(7);
  const [bannerURL, setBannerURL] = useState(null);
  const [quickActivities, setQuickActivities] = useState(null);

  useEffect(() => {
    getQuote();
    getActivityData();
    getUserData();
    getQuickActivities();
  }, []);

  const getActivityData = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
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
    setFirestoreActivities(response);
  };

  const getUserData = async () => {
    await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .get()
      .then((response) => {
        setUsername(response.data().name);
        setBannerURL(response.data().bannerURL);
      });
  };

  const getQuickActivities = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
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
    setQuickActivities(response);
    setLoading(false);
  };

  const getQuote = async () => {
    const random = Math.floor(Math.random() * 500);

    await fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => setRandomQuote(data[random].text));
  };

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
                : `url("https://images.unsplash.com/photo-1500856056008-859079534e9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80")`,
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
              <h2 className="mt-10 p-4 italic text-white text-center text-md font-serif md:text-2xl">
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
                  className="my-2"
                  onChange={(e) => setDaysToDisplay(e.target.value)}
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

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Overview);
