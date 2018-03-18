import React, { Timeout } from "react";
import { Button, Spin, Rate, Card, Avatar } from "antd";
import { createCache, createResource } from "simple-cache-provider";
import { Grid, Main, Map } from "../components";
import { getReviews, getDetails } from "../api";
import { StoreConsumer } from "../Store";

const cache = createCache();

const readDetails = createResource(getDetails, id => `detail-${id}`);
const readReviews = createResource(getReviews, id => `review-${id}`);

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "2rem",
        justifyContent: "center"
      }}
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
        {({ showDetails }) => (
          <Button
            onClick={() => showDetails(null)}
            type="primary"
            icon="arrow-left"
          >
            Back
          </Button>
        )}
      </StoreConsumer>
    </div>
  );
};

/**
 * Using image suspence blocks whole page because of nested promise throws
 * I'm not sure how this should work at the moment
 */
const readImg = createResource(src => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.src = src;
  });
});

const Img = props => {
  const src = props.src; // readImg(cache, props.src);
  return <img src={src} alt={props.alt} />;
};

const Details = props => {
  const details = readDetails(cache, props.id);
  const { name, avatar, position } = details;
  return (
    <div style={{ display: "flex", justifyContent: "between" }}>
      <Img src={avatar} alt={`${name} avatar`} />
      <div style={{ padding: "0 1rem" }}>
        <h3>Name:</h3>
        <p>{name}</p>
        <h3>Positon:</h3>
        <p>{position}</p>
      </div>
    </div>
  );
};

const Review = props => {
  return (
    <Card style={{ width: "100%", marginBottom: "1.5rem" }}>
      <Card.Meta
        avatar={<Avatar style={{ backgroundColor: props.color }} icon="user" />}
        title={props.author}
      />
      <p>{props.message}</p>
      <Rate value={props.rate} />
    </Card>
  );
};

const Reviews = props => {
  const reviews = readReviews(cache, props.id);
  return (
    <div style={{ marginTop: "1rem" }}>
      <Map collection={reviews}>
        {review => <Review key={review.id} {...review} />}
      </Map>
    </div>
  );
};

const PersonPage = props => {
  return (
    <Loader ms={1000}>
      <Details id={props.id} />
      <Loader ms={1500}>
        <Reviews id={props.id} />
      </Loader>
    </Loader>
  );
};

const DetailsPage = props => {
  return (
    <Grid>
      <Main>
        <BackButton />
        <PersonPage id={props.id} />
      </Main>
    </Grid>
  );
};

export default DetailsPage;
