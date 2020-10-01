import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/context";
import Navigation from "../components/Navigation";

class SingleActivity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.location.state.activityName ? (
          <div>
            <Navigation />
            <h1>Hello from Activity Page!</h1>
            <p>Name: {this.props.location.state.activityName}</p>
            <p>Category: {this.props.location.state.categoryName}</p>
            <p>Type: {this.props.location.state.activityType}</p>
          </div>
        ) : (
          <h1>Please start your activity correctly.</h1>
        )}
      </div>
    );
  }
}

export default withFirebase(SingleActivity);
