import React, { Component } from "react";
import ReactDOM from "react-dom";
import { fetchPeople } from "./api";

const StoreContext = React.createContext();

export class StoreProvider extends Component {
  state = { details: null, input: "", data: [], async: false };

  setAsync = async => {
    this.setState({ async });
  };

  showDetails = details => {
    this.deferSetState({ details });
  };

  handleChange = e => {
    const input = e.target.value;
    this.setState({ input: e.target.value });
    this.search(input.length);
  };

  search(count) {
    fetchPeople(count).then(this.update);
  }

  update = data => {
    const nextState = { data };
    if (this.state.async) {
      this.deferSetState(nextState);
    } else {
      this.setState(nextState);
    }
  };

  render() {
    const value = {
      state: this.state,
      handleChange: this.handleChange,
      setAsync: this.setAsync,
      showDetails: this.showDetails
    };

    return (
      <StoreContext.Provider value={value}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }

  deferSetState(...args) {
    // https://twitter.com/dan_abramov/status/971090711893377026
    setTimeout(() => {
      ReactDOM.unstable_deferredUpdates(() => {
        this.setState(...args);
      });
    }, 0);
  }
}

export const StoreConsumer = StoreContext.Consumer;
