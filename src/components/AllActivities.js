import React, { Component } from "react";
import AuthUserContext from "./Session/Context";
import { withFirebase } from "../components/Firebase/context"

export default class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { activities, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <h1>Hi from All Activities</h1>
            <p>{activities}</p>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
