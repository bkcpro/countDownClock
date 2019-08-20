import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { tsImportEqualsDeclaration } from "@babel/types";

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>
//     </div>
//   );
// }

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      mins: 0,
      secs: 0,
      isClicked: true
    };

    this.intervalHandle;
    this.remainingSeconds;

    this.setTime = this.setTime.bind(this);
    this.startCounter = this.startCounter.bind(this);
    this.weatherDisabled = this.weatherDisabled.bind(this);
    this.tick = this.tick.bind(this);
    this.pauseCounter = this.pauseCounter.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
  }

  // intervalHandle = '';
  // remainingSeconds = 0;
  // secondsCounter = 0;

  weatherDisabled() {
    return this.state.hours && this.state.mins && this.state.secs;
  }

  setTime(e) {
    const clockNotation = e.target.getAttribute("clocknotation");
    // console.log(clockNotation);

    if (clockNotation === "h") {
      this.setState({ hours: e.target.value });
    } else if (clockNotation === "m") {
      this.setState({ mins: e.target.value });
    } else if (clockNotation === "s") {
      this.setState({ secs: e.target.value });
    }
  }

  tick() {
    console.log(this.remainingSeconds);

    if (this.remainingSeconds > 0) {
      this.remainingSeconds = this.remainingSeconds - 1;
      this.setState({ secs: this.state.secs - 1 });

      if (!this.state.secs && this.remainingSeconds > 0) {
        this.setState({
          mins: this.state.mins - 1,
          secs: 59
        });
        this.secondsCounter = 0;
        this.minutesCounter++;
      }

      if (!this.state.mins) {
        this.setState({
          hours: this.state.hours - 1,
          mins: 59
        });
        this.minutesCounter = 0;
      }

      // console.log(this.state.hours, this.state.mins, this.state.secs);
    } else clearInterval(this.intervalHandle);
  }

  startCounter() {
    this.setState({ isClicked: false });
    this.remainingSeconds =
      this.state.hours * 24 + this.state.mins * 60 + this.state.secs;
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  pauseCounter() {
    clearInterval(this.intervalHandle);
  }

  stopCounter() {
    clearInterval(this.intervalHandle);
    this.setState({
      hours: 0,
      mins: 0,
      secs: 0
    });
  }

  render() {
    return (
      <div>
        <div>Input time below:</div>

        <div>
          <input clocknotation="h" onChange={this.setTime} />

          <input clocknotation="m" onChange={this.setTime} />

          <input clocknotation="s" onChange={this.setTime} />

          <div>
            <span>{this.state.hours}</span>
            <span>{this.state.mins}</span>
            <span>{this.state.secs}</span>
          </div>

          <button
            id="startButton"
            onClick={this.startCounter}
            disabled={!this.weatherDisabled()}
          >
            Start!
          </button>

          <button onClick={this.pauseCounter} disabled={this.state.isClicked}>
            Pause
          </button>

          <button onClick={this.stopCounter} disabled={this.state.isClicked}>
            Stop
          </button>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Counter />, rootElement);
