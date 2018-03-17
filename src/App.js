import React from "react";
import { Router, Switch, Route } from "react-router";
import history from "./history";

import First from "./First";
import Details from "./Details";
import { StoreProvider } from "./Store";

const App = () => {
  return (
    <StoreProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={First} />
          <Route path="/details" component={Details} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
