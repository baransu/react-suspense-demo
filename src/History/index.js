import React from "react";
import styled from "styled-components";

import { StoreConsumer } from "../Store";

import { Map, Title } from "../components";

const History = () => {
  return (
    <div style={{ pading: "2rem" }}>
      <Title>History</Title>
      <StoreConsumer>
        {({ state }) => (
          <Map collection={state.history}>
            {(item, key) => <div key={key}>{item}</div>}
          </Map>
        )}
      </StoreConsumer>
    </div>
  );
};

export default History;
