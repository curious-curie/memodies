import React from "react";
import styled from "styled-components";

const Title = styled.span`
  font-size: 1.5em;
  font-weight: bold;
`;

const SearchListItem = ({ artist, track, album, image, onClick }) => {
  const Frame = styled.div`
    margin: 10px;
    padding-top: 5px;
    padding-bottom: 15px;

    margin: 0 auto;
    width: 80%;
    @media (min-width: 800px) {
      width: 500px;
    }
  `;

  return (
    <Frame onClick={onClick}>
      <Title>{track}</Title>
      <div>{artist}</div>
    </Frame>
  );
};

export default SearchListItem;
