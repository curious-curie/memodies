import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Title = styled.div`

@import url('https://fonts.googleapis.com/css?family=Caveat|Mansalva|Quicksand|Satisfy&display=swap');
font-family:  'Mansalva', cursive; 
font-size: 3rem;
text-align: center;

margin-top: 70px;
@media (max-width: 500px) {
  margin-bottom: 20px;
}
margin-bottom: 50px;
`;

const LinkWrapper = styled.div`
margin: 20px;
`;
const StyledLink = styled(Link)`
text-decoration: none;
color:black; 

  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }`;

const Wrapper = styled.span`
@import url('https://fonts.googleapis.com/css?family=Caveat|Mansalva|Quicksand|Satisfy&display=swap');
font-family:  'Mansalva', cursive; 
`;
const Header = ({user, logout}) => {
    return (
      
      <Wrapper>
      <LinkWrapper>
      { user === ''? <span><StyledLink to = "/login">login</StyledLink></span> : <span>Hello, {user} :) </span>}
      &nbsp;&nbsp; <span onClick = {logout}>logout</span>
      </LinkWrapper>
       <StyledLink to = "/"><Title>Memodies</Title></StyledLink>
       </Wrapper>
    );
};

export default Header;

// font-family: 'Quicksand', sans-serif;
// font-family: 'Satisfy', cursive;
// font-family: 'Caveat', cursive;
// font-family: 'Mansalva', cursive; 