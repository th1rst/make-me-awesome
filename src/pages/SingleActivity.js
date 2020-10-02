import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/context";
import Navigation from "../components/Navigation";
import TimerActivity from "../components/Activities/TimerActivity";
import CounterActivity from "../components/Activities/CounterActivity";

class SingleActivity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { activityName, categoryName, activityType, productivityType } = {
      ...this.props.location.state,
    };

    return (
      <div>
        {activityName ? (
          <div>
            <Navigation />
            <h1>Hello from Activity Page!</h1>
            <p>Name: {activityName}</p>
            <p>Category: {categoryName}</p>
            <p>Type: {activityType}</p>
            <p>Productiveness: {productivityType}</p>

            <div>
              {activityType === "Timer" ? (
                <TimerActivity />
              ) : (
                <CounterActivity />
              )}
            </div>
          </div>
        ) : (
          <h1>Please start your activity correctly.</h1>
        )}
      </div>
    );
  }
}

export default withFirebase(SingleActivity);
