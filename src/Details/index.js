import React, { Timeout, Fragment } from "react";
import _ from "lodash";
import { Button, Spin } from "antd";
import History from "../History/index";
import { createCache, createResource } from "simple-cache-provider";
import { Grid, Main, Sidebar } from "../components";
import { getReviews, getDetails } from "../api";
import { StoreConsumer } from "../Store";

const cache = createCache();

const readDetails = createResource(getDetails);
const readReviews = createResource(getReviews);

const Spinner = () => {
  return (
    <div
      style={{ display: "flex", marginTop: "2rem", justifyContent: "center" }}
    >
      <Spin size="small" />
    </div>
  );
};

const Loader = props => {
  return (
    <Timeout ms={props.ms}>
      {didTimeout => (didTimeout ? <Spinner /> : props.children)}
    </Timeout>
  );
};

const BackButton = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <StoreConsumer>
        {({ push }) => (
          <Button onClick={() => push("/")} type="primary" icon="arrow-left">
            Back
          </Button>
        )}
      </StoreConsumer>
    </div>
  );
};

const Details = props => {
  const details = readDetails(cache, "1");
  return <div>{JSON.stringify(details)}</div>;
};

const Reviews = () => {
  const reviews = readReviews(cache, "2");
  return <div>{JSON.stringify(reviews)}</div>;
};

const DetailsPage = () => {
  return (
    <Grid>
      <Main>
        <BackButton />
        <Loader ms={1500}>
          <Details />
        </Loader>
        <Loader ms={1500}>
          <Reviews />
        </Loader>
      </Main>
      <Sidebar>
        <History />
      </Sidebar>
    </Grid>
  );
};

export default DetailsPage;
