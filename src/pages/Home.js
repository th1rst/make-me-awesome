import React, { Component } from "react";
import Login from "../components/Login";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="mt-10 font-mono text-center text-3xl">
          <span role="img" aria-label="trophy">
            🏆{" "}
          </span>
          Make Me Awesome
          <span role="img" aria-label="trophy">
            {" "}
            🏆
          </span>
        </h1>
        <Login />
      </div>
    );
  }
}
