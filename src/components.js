import styled from "styled-components";

export const Title = styled.h4`
  margin: 10px auto;
`;

export const Item = styled.div`
  padding: 10px;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  &:hover {
    background-color: lightpink;
    color: navy;
    cursor: pointer;
  }
  > .ant-badge {
    margin-right: 15px;
  }
`;

export const Grid = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: auto;
`;

export const Main = styled.div`
  grid-column: 2 / 3;
  grid-row: 1;
`;

export const Sidebar = styled.div`
  grid-column: 3 / 3;
  grid-row: 1;
`;

export const Map = props => {
  return props.collection.map(props.children);
};
