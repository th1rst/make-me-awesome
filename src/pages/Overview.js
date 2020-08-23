import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";

export default class Overview extends Component {


  render() {
    return (
      <div>
        <Navigation />
        <h1>hello from Overview Page!</h1>
      </div>
    );
  }
}
