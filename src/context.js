import React, { Component } from "react";

const ActivityContext = React.createContext();

export default class ActivityProvider extends Component {
  state = {
    activities: [],
    fetched: false,
  };

   render() {
    return (
      <ActivityContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ActivityContext.Provider>
    );
  }
}

const ActivityConsumer = ActivityContext.Consumer;

export { ActivityProvider, ActivityConsumer, ActivityContext };