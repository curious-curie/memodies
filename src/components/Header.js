import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Title = styled.div`
@import url('https://fonts.googleapis.com/css?family=Caveat|Mansalva|Quicksand|Satisfy&display=swap');
font-family:  'Mansalva', cursive; 
font-size: 3rem;
text-align: center;
margin: 50px;
`;

const StyledLink = styled(Link)`
text-decoration: none;
color:black; 

  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }`;
const Header = () => {
    return (
      <>
     
       <StyledLink to = "/home"><Title>Memodies</Title></StyledLink>
      </>
    );
};

export default Header;

// font-family: 'Quicksand', sans-serif;
// font-family: 'Satisfy', cursive;
// font-family: 'Caveat', cursive;
// font-family: 'Mansalva', cursive; 