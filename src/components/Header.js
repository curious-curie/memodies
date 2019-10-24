import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
@import url('https://fonts.googleapis.com/css?family=Caveat|Mansalva|Quicksand|Satisfy&display=swap');
font-family:  'Mansalva', cursive; 
font-size: 3rem;
text-align: center;
margin: 50px;

`;
const Header = () => {
    return (
        <Title>Memodies</Title>
    );
};

export default Header;

// font-family: 'Quicksand', sans-serif;
// font-family: 'Satisfy', cursive;
// font-family: 'Caveat', cursive;
// font-family: 'Mansalva', cursive; 