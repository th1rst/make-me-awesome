import React, { Component } from "react";
import Login from "../components/Login"

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="font-sans text-center text-3xl border-2 border-black">Make Me Awesome</h1>
        <Login />
      </div>
    );
  }
}
