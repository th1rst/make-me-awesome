import React, { Component } from "react";
import AuthUserContext from "./Session/Context";
import FirebaseContext, { withFirebase } from "../components/Firebase/context";

class AllActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendActivity = () => {
    this.props.firebase.db
      .collection("activities")
      .add({ title: "first activity", description: "new activity!" })
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
      <FirebaseContext.Consumer>
        {(firebase) => (
          <div>
            <button onClick={this.sendActivity}>click here to send</button>
          </div>
        )}
      </FirebaseContext.Consumer>
    );
  }
}

export default withFirebase(AllActivities);
