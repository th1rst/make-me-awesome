import React, { Component } from "react";
import Navigation from "../components/Navigation";
import withAuthorization from "../components/Session/withAuthorization";
import LiveActivityModal from "../components/Activities/LiveActivityModal";
import ManualActivityModal from "../components/Activities/ManualActivityModal";
import SmallBarChart from "../components/Activities/SmallBarChart";
import SmallDonutChart from "../components/Activities/SmallDonutChart";
import LoadingSpinner from "../components/LoadingSpinner";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      userData: null,
      username: null,
      activities: [],
      loading: true,
      randomQuote: "",
    };
  }
  componentDidMount() {
    this.getQuote();

    this.listener = this.props.firebase
      .user(this.state.authUser.uid)
      .onSnapshot((snapshot) => {
        this.setState({
          userData: snapshot.data(),
          username: snapshot.data().name,
          activities: snapshot.data().activities,
          loading: false,
        });
      });
  }

  getQuote = async function () {
    const random = Math.floor(Math.random() * 500);

    await fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => this.setState({ randomQuote: data[random].text }));
  };

  render() {
    return (
      <div>
        <Navigation />

        {this.state.loading ? (
          <LoadingSpinner />
        ) : (
          <div
            className="w-full bg-cover bg-center shadow-xl"
            style={{
              height: "32rem",
              backgroundImage: `url("https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")`,
            }}
          >
            <div className="flex flex-col items-center justify-evenly h-full w-full bg-gray-900 bg-opacity-50">
              <div className="text-center">
                <h1 className="text-white text-3xl font-semibold uppercase md:text-3xl">
                  Welcome back,{" "}
                  <span className="underline text-blue-400">
                    {this.state.username}
                  </span>
                </h1>
                <div className="flex flex-col w-48 mx-auto">
                  <LiveActivityModal />
                  <ManualActivityModal />
                </div>
              </div>
              <h2 className="mx-4 italic text-white text-center text-xl font-serif md:text-2xl">
                &quot;{this.state.randomQuote}&quot;
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mt-4 font-bold text-4xl md:text-5xl max-w-xl text-gray-900">
                Overview
              </h1>
              <span className="my-4 w-24 h-1 bg-blue-400 rounded-full" />
              <div className="px-5 py-6 mx-auto">
                <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                    Last 7 Days
                  </h1>
                </div>
                <div className="flex justify-center flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Overview);
