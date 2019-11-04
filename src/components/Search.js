import React, { Component } from 'react'
import {SearchAlt} from 'styled-icons/boxicons-regular/SearchAlt';
import styled from 'styled-components';

const BigWrapper = styled.div`
text-align:right;
`;

const SearchWrapper = styled.div`
display:inline-block
margin: 40px;
margin-right: 50px;
width: 80%;
@media (min-width: 500px) {
    width: 400px;
}
height: 46px;
padding: 5px;
font-size: 1.2rem;
border: none;
border-bottom: 1px solid black;
outline: none;
`;

const SearchInput = styled.input`
    display: inline-block;
    text-align: left;
    font-size: 1.2rem;
    width: 300px;
    height: 40px;
    border: none;
    outline: none;
    
    `;
const SearchButton = styled.button`
    position: relative;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    background-color: white;

`;


const SearchButtonClosed = styled.button`
    margin: 40px;
    margin-left: 50px;
    position: relative;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    background-color: white;
`;
export default class Search extends Component {


    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        }
    }

   
      
    

      handleKeyDown = (e) => {
        e.preventDefault();
        if(e.keyCode === 13) this.searchOpen();
      }
      
    render() {
        return (
            <BigWrapper>
            {this.props.isOpen && <SearchWrapper>
                <SearchInput autoFocus = "autoFocus" placeholder="Search..." type="text"  onKeyDown= {this.props.onChange}/><SearchButton type="button" onKeyDown = {this.handleKeyDown} onClick={this.props.searchToggle}> <SearchAlt/></SearchButton>
             </SearchWrapper>}

             {!this.props.isOpen &&  <SearchButtonClosed type="button" onClick={this.props.searchToggle}> <SearchAlt/></SearchButtonClosed>}
            </BigWrapper>
        )
    }
}
