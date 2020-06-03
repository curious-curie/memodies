import React, { Component } from "react";
import { SearchAlt } from "styled-icons/boxicons-regular/SearchAlt";
import styled from "styled-components";

const BigWrapper = styled.div`
  text-align: center;
  height: 60px;
`;

const SearchWrapper = styled.div`
display:inline-block
margin-right: 50px;
width: 60%;
@media (min-width: 900px) {
    width: 330px;
}
height: 45px;
padding: 5px;
font-size: 1.2rem;
border: none;

outline: none;
`;

const SearchInput = styled.input`
  display: inline-block;
  text-align: left;
  font-size: 1.1rem;
  padding-left: 10px;
  border-bottom: 1px solid black;
  width: 80%;
  @media (min-width: 900px) {
    width: 220px;
  }
  height: 40px;
  border: none;
  outline: none;
`;
const SearchButton = styled.button`
  position: relative;
  float: right;
  display: inline-block;
  @media (max-width: 1000px) {
    top: -44px;
  }
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  background-color: white;
`;

const SearchButtonClosed = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  background-color: white;
`;
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleKeyDown = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) this.searchOpen();
  };

  render() {
    return (
      <BigWrapper>
        {this.props.isOpen && (
          <SearchWrapper>
            <SearchInput
              autoFocus="autoFocus"
              placeholder="Search..."
              type="text"
              onKeyDown={this.props.onChange}
            />
            <SearchButton
              type="button"
              onKeyDown={this.handleKeyDown}
              onClick={this.props.searchToggle}
            >
              {" "}
              <SearchAlt />
            </SearchButton>
          </SearchWrapper>
        )}

        {!this.props.isOpen && (
          <SearchButtonClosed type="button" onClick={this.props.searchToggle}>
            {" "}
            <SearchAlt />
          </SearchButtonClosed>
        )}
      </BigWrapper>
    );
  }
}
