import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";

class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        hi from ALL activities, summary will be here
      </div>
    );
  }
}

export default withFirebase(AllActivities);
