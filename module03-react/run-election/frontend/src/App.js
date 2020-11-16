import React, { Component } from "react";
import Candidates from "./components/Candidates";
import Header from "./components/Header";
import Loader from "./components/Loader";

export default class App extends Component {
  // adding states
  constructor() {
    super();
    this.state = {
      candidates: [],
    };
    // add an object
    this.interval = null;
  }
  // add a did mount component to set an interval of time
  // then, the state will be updated according to this interval (every 3 secs)
  componentDidMount() {
    this.interval = setInterval(() => {
      // fetch data
      const url = "http://localhost:8080/votes";
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          // set state with data
          this.setState({ candidates: json.candidates });
          // console.log(this.state.candidates);
        });
    }, 4000);
  }

  render() {
    const { candidates } = this.state;
    // add an if statement to apply an loading page
    if (candidates.length === 0) {
      return <Loader />;
    }
    // else, return as usual
    // App will hold Header (title) and a Candidates container/display
    return (
      <div>
        <Header>Following Up Galaxy Election</Header>
        <Candidates candidates={candidates} />
      </div>
    );
  }
}
