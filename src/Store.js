import React, { Component } from "react";
import history from "./history";

const StoreContext = React.createContext();

export class StoreProvider extends Component {
  state = { history: [] };

  push = path => {
    this.setState(state => ({ history: [...state.history, path] }));
    history.push(path);
  };

  render() {
    const value = { state: this.state, push: this.push };
    return (
      <StoreContext.Provider value={value}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export const StoreConsumer = StoreContext.Consumer;
