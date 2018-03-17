import faker from "faker";
import _ from "lodash";

const personImage = faker.image.people();

function getResource(fn, ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(_.range(0, 10).map(() => ({ key: _.uniqueId(), ...fn() })));
    }, ms);
  });
}

function fakeName() {
  return faker.fake("{{name.firstName}} {{name.lastName}}");
}

function createDetails() {
  return {
    name: fakeName(),
    avatar: faker.image.people(200, 300),
    position: faker.name.jobTitle()
  };
}

function createMessages() {
  return [
    "Great!",
    "Amazing",
    "Unbelivable",
    "Polecam tego alegrowicza",
    "2/10"
  ].map(message => ({
    message,
    rate: _.random(1, 5),
    author: fakeName(),
    id: _.uniqueId()
  }));
}

function createPerson() {
  return {
    type: "person",
    name: faker.fake("{{name.firstName}} {{name.lastName}}"),
    avatar: personImage,
    position: faker.name.jobTitle(),
    count: _.random(0, 20)
  };
}

export function fetchPeople(ms = 1000) {
  return getResource(createPerson, ms);
}

export function getDetails() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(createDetails());
    }, 2000);
  });
}

export function getReviews() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(createMessages());
    }, 5000);
  });
}
