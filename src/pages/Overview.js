import React, { Component } from "react";
import Navigation from "../components/Navigation";
import withAuthorization from "../components/Session/withAuthorization";
import NewActivityModal from "../components/NewActivityModal";
import AllActivities from "../components/AllActivities";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      username: null,
      activities: [],
      loading: true,
    };
  }
  componentDidMount() {
    if (this.state.userData) {
      return;
    }

    this.unsubscribe = this.props.firebase
      .user(this.props.firebase.authUser.uid)
      .onSnapshot((snapshot) => {
        this.setState({
          userData: snapshot.data(),
          username: snapshot.data().name,
          activities: snapshot.data().activities,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Navigation />

        <div
          className="w-full bg-cover bg-center shadow-xl"
          style={{
            height: "32rem",
            backgroundImage: `url("https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80")`,
          }}
        >
          <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
              <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
                Welcome back,{" "}
                <span className="underline text-blue-400">
                  {this.state.username}
                </span>
              </h1>

              <NewActivityModal />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl md:text-5xl max-w-xl text-gray-900">
              Overview
            </h1>
            <span className="my-4 w-24 h-1 bg-blue-400 rounded-full" />
            <div>
              All Activities so far: {this.state.activities}
              <AllActivities />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Overview);
