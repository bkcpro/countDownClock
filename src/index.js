import React from "react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

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
      isClicked: true,
      toggleStart: false
    };

    this.intervalHandle;
    this.remainingSeconds;

    this.setTime = this.setTime.bind(this);
    this.startCounter = this.startCounter.bind(this);
    this.wetherDisabled = this.wetherDisabled.bind(this);
    this.tick = this.tick.bind(this);
    this.pauseCounter = this.pauseCounter.bind(this);
    this.stopCounter = this.stopCounter.bind(this);
  }

  // intervalHandle = '';
  // remainingSeconds = 0;
  // secondsCounter = 0;

  wetherDisabled() {
    return this.state.hours || this.state.mins || this.state.secs;
  }

  setTime(e) {
    const clockNotation = e.target.getAttribute("clocknotation");
    // console.log(clockNotation);

    if (clockNotation === "h") {
      this.setState({ hours: Number(e.target.value) });
    } else if (clockNotation === "m") {
      this.setState({ mins: Number(e.target.value) });
    } else if (clockNotation === "s") {
      this.setState({ secs: Number(e.target.value) });
    }
  }

  tick() {
    // console.log(this.remainingSeconds);

    if (this.remainingSeconds > 0) {
      if (!this.state.secs) {
        // console.log("mins", this.state.mins * 2, this.state.mins + 1 === 1);

        if (!this.state.mins) {
          // console.log("hours", this.state.hours);
          if (this.state.hours) {
            this.setState({
              hours: this.state.hours - 1,
              mins: 59,
              secs: 59
            });
          }
        } else {
          this.setState({
            mins: this.state.mins - 1,
            secs: 59
          });
        }
      } else {
        this.setState({ secs: this.state.secs - 1 });
      }

      this.remainingSeconds--;
    } else {
      clearInterval(this.intervalHandle);
    }
  }

  startCounter() {
    this.setState({
      isClicked: false,
      toggleStart: true
    });
    this.remainingSeconds =
      this.state.hours * 3600 + this.state.mins * 60 + this.state.secs;
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  pauseCounter() {
    clearInterval(this.intervalHandle);
    this.setState({ toggleStart: false });
  }

  stopCounter() {
    clearInterval(this.intervalHandle);
    this.setState({
      hours: 0,
      mins: 0,
      secs: 0,
      toggleStart: false
    });
  }

  render() {
    return (
      <div className="container main">
        <div className="row mt-4">Input time below:</div>

        <div className="row mt-4 input">
          <input clocknotation="h" onChange={this.setTime} />

          <input clocknotation="m" onChange={this.setTime} />

          <input clocknotation="s" onChange={this.setTime} />
        </div>

        <div className="row mt-4 output">
          <span>{this.state.hours}</span>
          <span>{this.state.mins}</span>
          <span>{this.state.secs}</span>
        </div>

        <div className="row mt-4 control-buttons">
          <button
            id="startButton"
            onClick={this.startCounter}
            disabled={!this.wetherDisabled() || this.state.toggleStart}
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
