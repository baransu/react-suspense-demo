import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Input, Checkbox, Avatar, Badge } from "antd";
import { fetchPeople } from "../api";
import History from "../History/index";
import { Item, Main, Grid, Title, Map, Sidebar } from "../components";
import { StoreConsumer } from "../Store";

class First extends Component {
  state = { input: "", data: [], async: false };

  handleChange = e => {
    this.setState({ input: e.target.value });
    this.search();
  };

  deferSetState(...args) {
    ReactDOM.unstable_deferredUpdates(() => {
      this.setState(...args);
    });
  }

  search() {
    fetchPeople().then(this.update);
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
    const { data, input, async } = this.state;

    return (
      <Grid>
        <Main>
          <Input
            style={{ marginTop: "1rem" }}
            placeholder="Type something..."
            value={input}
            onChange={this.handleChange}
          />
          <Settings>
            <Checkbox
              value={async}
              onChange={async => this.setState({ async })}
            >
              Async
            </Checkbox>
          </Settings>

          <If cond={data.length > 0}>
            <Title>People</Title>
          </If>

          <Map collection={data}>{item => <Person {...item} />}</Map>
        </Main>
        <Sidebar>
          <History />
        </Sidebar>
      </Grid>
    );
  }
}

const Settings = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: row-reverse;
  border-bottom: 1px solid lightgray;
`;

const If = props => {
  if (props.cond) {
    return props.children;
  } else {
    return null;
  }
};

const Person = props => {
  return (
    <StoreConsumer>
      {({ push }) => {
        const onClick = () => {
          push(`/details`);
        };

        return (
          <Item onClick={onClick}>
            <Badge count={props.count} overflowCount={9}>
              <Avatar src={props.avatar} shape="square" />
            </Badge>
            {props.name}
          </Item>
        );
      }}
    </StoreConsumer>
  );
};

export default First;
