import React, { Component } from "react";
import AuthUserContext from "./Session/Context";
import { withFirebase } from "../components/Firebase/context";

class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendActivity = () => {
    this.props.firebase.db
      .collection("activities")
      .add({
        //test values
        category: "productive",
        date: "09162020",
        duration: "120",
        name: "Sport",
      })
      .then((documentReference) => {
        console.log("document reference ID", documentReference.id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  render() {
    const { activities, loading } = this.state;

    return (
      <div>
        <button onClick={this.sendActivity}>click here to send</button>
      </div>
    );
  }
}

export default withFirebase(AllActivities);
