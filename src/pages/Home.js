import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SignInPage from "../components/Login";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: null,
    };
  }

  render() {
    return (
      <div>
        {this.state.loggedIn === true ? (
          <Redirect to="/overview" />
        ) : (
          <div>
            <h1 className="mt-10 font-bold text-center text-3xl">
              <span role="img" aria-label="trophy">
                🏆
              </span>
              Make Me Awesome
              <span role="img" aria-label="trophy">
                🏆
              </span>
            </h1>
            <SignInPage />
          </div>
        )}
      </div>
    );
  }
}
