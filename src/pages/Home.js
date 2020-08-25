import React, { Component } from "react";
import Login from "../components/Login";
import { Redirect } from "react-router-dom";

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
            <Login />
          </div>
        )}
      </div>
    );
  }
}
