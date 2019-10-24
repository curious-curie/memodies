import React from 'react';
import styled from 'styled-components';

const Title = styled.span`
    font-size: 1.5em;
    font-weight: bold;
`;


const SearchListItem = ({artist, track, album, image, onClick }) => {



    const Frame = styled.div`
    margin: 10px;
    padding-top: 5px;
    padding-bottom: 15px;
    `;

    return (
        <Frame onClick = {onClick}>
            <Title>{track}</Title>
            <div>{ artist }</div> 
        </Frame>
    );
};

export default SearchListItem;