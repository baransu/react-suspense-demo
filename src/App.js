import React from "react";
import { IfElse } from "./components";
import Search from "./Search";
import Details from "./Details";
import { StoreProvider, StoreConsumer } from "./Store";

const App = () => {
  return (
    <StoreProvider>
      <StoreConsumer>
        {({ state }) => (
          <IfElse
            cond={!!state.details}
            true={<Details id={state.details} />}
            false={<Search />}
          />
        )}
      </StoreConsumer>
    </StoreProvider>
  );
};

export default App;
