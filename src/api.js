import faker from "faker";
import _ from "lodash/fp";

function fakeName() {
  return faker.fake("{{name.firstName}} {{name.lastName}}");
}

function createDetails() {
  return {
    name: fakeName(),
    avatar: "http://via.placeholder.com/200x300", // faker.image.people(200, 300),
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
    color: faker.commerce.color,
    message,
    rate: _.random(1, 5),
    author: fakeName(),
    id: _.uniqueId()
  }));
}

function createPerson() {
  return {
    type: "person",
    name: fakeName(),
    position: faker.name.jobTitle(),
    count: _.random(0, 20)
  };
}

export function fetchPeople(count) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        _.range(0, count).map(id => ({
          key: _.uniqueId(),
          id: id.toString(),
          ...createPerson()
        }))
      );
    }, 0);
  });
}

export function getDetails() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(createDetails());
    }, 1500);
  });
}

export function getReviews() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(createMessages());
    }, 3000);
  });
}
