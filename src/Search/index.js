import React from "react";
import _ from "lodash/fp";
import styled from "styled-components";
import { Input, Switch, Avatar, Badge } from "antd";
import { Item, Main, Grid, Map, If } from "../components";
import { StoreConsumer } from "../Store";

const Search = () => {
  return (
    <Grid>
      <StoreConsumer>
        {({ state, handleChange, setAsync }) => {
          const { input, async, data } = state;
          return (
            <Main>
              <Input
                style={{ marginTop: "1rem" }}
                placeholder="Type something..."
                value={input}
                onChange={handleChange}
              />
              <Settings>
                <Switch
                  checked={async}
                  onChange={setAsync}
                  checkedChildren="Async"
                  unCheckedChildren="Sync"
                />
              </Settings>

              <If cond={data.length > 0}>
                <h3>Results</h3>
                <Map collection={data}>{item => <Person {...item} />}</Map>
              </If>
            </Main>
          );
        }}
      </StoreConsumer>
    </Grid>
  );
};

const Person = props => {
  return (
    <StoreConsumer>
      {({ showDetails }) => {
        const onClick = () => {
          showDetails(props.id);
        };

        return (
          <Item onClick={onClick}>
            <Badge count={props.count} overflowCount={9}>
              <Avatar shape="square">{_.first(props.name)}</Avatar>
            </Badge>
            {props.name}
          </Item>
        );
      }}
    </StoreConsumer>
  );
};

const Settings = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row-reverse;
  border-bottom: 1px solid lightgray;
`;

export default Search;
