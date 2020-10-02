import React, { Component } from "react";
import Timer from "react-compound-timer";

export default class TimerActivity extends Component {
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
      </div>
    );
  }
}
