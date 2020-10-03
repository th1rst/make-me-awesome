import React, { Component } from "react";
import { withFirebase } from "../components/Firebase/context";
import Navigation from "../components/Navigation";
import TimerActivity from "../components/Activities/TimerActivity";
import CounterActivity from "../components/Activities/CounterActivity";
import { Badge } from "@windmill/react-ui";

class SingleActivity extends Component {
  constructor(props) {
    super(props);
  }

  checkProductivity(type) {
    switch (type) {
      case "Productive":
        return <Badge type="success">{type}</Badge>;
      case "Neutral / Necessary":
        return <Badge type="neutral">{type}</Badge>;
      case "Unproductive":
        return <Badge type="danger">{type}</Badge>;
      default:
        break;
    }
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
            <h1 className="mt-3 text-4xl md:text-3xl underline font-semibold uppercase text-center">
              {activityName}
            </h1>
            <div className="my-3 text-center">
              {this.checkProductivity(productivityType)}
            </div>

            <p className="text-center">Category: {categoryName}</p>

            <div className="flex justify-center">
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
