import React, { Component } from "react";
import Timer from "react-compound-timer";
import { withFirebase } from "../Firebase/context";
import { Button } from "@windmill/react-ui";
import { Link } from "react-router-dom";

class TimerActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendActivity = () => {
    /*
    
    commented out to not bloat the database. code is working


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
    
    */
    console.log("activity saved!");
  };

  render() {
    return (
      <div>
        <h1 className="mx-auto mt-5 font-bold font-3xl">
          hello from TIMERActivity!
        </h1>
        <Timer startImmediately={false}>
          {({ start, resume, pause, stop, reset, timerState }) => (
            <>
              <div>
                <Timer.Days /> days
                <Timer.Hours /> hours
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
              </div>
              <div>{timerState}</div>
              <br />
              <div>
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={resume}>Resume</button>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button>
              </div>
            </>
          )}
        </Timer>
        <Link to="/overview">
          <Button
            className="font-bold mr-1 mb-1"
            style={{ backgroundColor: "#cc0000" }}
          >
            Cancel
          </Button>
        </Link>

        <Button
          className="font-bold outline-none focus:outline-none mr-1 mb-1"
          onClick={this.sendActivity}
        >
          Save Activity
        </Button>
      </div>
    );
  }
}

export default withFirebase(TimerActivity);