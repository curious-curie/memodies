import React, { Component } from 'react'
import SearchListItem from './SearchListItem';
import PostForm from './PostForm';
import styled from 'styled-components';
import {SearchAlt} from 'styled-icons/boxicons-regular/SearchAlt';
import Axios from 'axios';

const Wrapper = styled.div`
text-align: center;
`;

const SearchInput = styled.input`

    width: 80%;
    @media (min-width: 500px) {
        width: 400px;
    }
    padding: 5px;

    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid gray;
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

const Block = styled.div`
    display: inline;
`;

const BackButton = styled.button`
    float: left;
    border: none;
    width: 200px;
    color: gray;
    font-size: 1.2rem;
    @media (min-width: 500px) {
        margin-left: 2em;
        font-size: 1.4rem;
    }
    outline: none;
    background-color: white;

`;

const PostFormWrapper = styled.div`
    margin: 30px;
    padding-top: 80px;
`;



export default class Search extends Component {


    constructor(){
        super();
        this.state = {
            searchTerm: '',
            results: [

            ],
            selected: [],
            isSearching: true,
        }

    }


    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value,
        });

    }

   handleClick(i){
       this.setState( (state) => ({
           isSearching: !state.isSearching,
           selected: i
       }));
   }

   handleKey = (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
       this.search();
       // put the login here
    }};

    search = () => {

        let searchTerm = JSON.stringify(this.state.searchTerm).replace(/\s/g, '+')
        const api = `https://itunes.apple.com/search?term=${searchTerm}&entity=musicTrack`;

        let eachItem = {
            id: '',
            artistName: '',
            trackName: '',
            collectionName: '',
            artwork: '',
            selected: [],
            isSearching: true,
        }

        this.setState(prevState => ({
            searchTerm: '',
            results: [],
            isSearching: true,
        }));




        fetch(`${api}`)
        .then(results =>{
            return results.json();
        }).then(data => {
            console.log(searchTerm + ":" + data)
       
            data.results.forEach(item => {
                eachItem = {
                    id: '',
                    artistName: '',
                    trackName: '',
                    collectionName: '',
                    artwork: '',

                }
                eachItem['id'] = item.trackId
                eachItem['artistName'] = item.artistName
                eachItem['trackName'] = item.trackName
                eachItem['collectionName'] = item.collectionName
                eachItem['artwork'] = item.artworkUrl100

                this.setState(prevState => ({
                    results: [...prevState.results, eachItem]
                })

                )
            })

    });

    }

    searchAgain = () => {
        this.setState( (state) => ({
            searchTerm: '',
            results: [],
            isSearching: true,
            selected: [],
        }));
    }

 
    render() {

        return (
            <Wrapper>

                { !this.state.isSearching &&
                    <section><BackButton type = "button" onClick={this.searchAgain}>← Back To Search</BackButton></section> }
                { this.state.isSearching &&
                <div>
                <form >
                <Block> <SearchInput type="text"  onKeyDown = {this.handleKey} onChange={this.handleChange} value={this.state.searchTerm} placeholder="Search by title / artist"/>


                <SearchButton type="button" onClick={()=>this.search()}> <SearchAlt/></SearchButton> </Block> </form>


                { this.state.results.map( item => <SearchListItem key={item.trackId} onClick={() => this.handleClick(item)} artist = {item.artistName} track = {item.trackName} album = {item.collectionName} image = {item.artwork}/>)}

                </div>
                }


                { !this.state.isSearching &&
                <PostFormWrapper>
                  <PostForm
                  id ={this.state.selected['id']}
                  artist={this.state.selected['artistName']}
                  track = {this.state.selected['trackName']}
                  artwork = {this.state.selected['artwork']}
                  album = {this.state.selected['collectionName']} 
                  onCreate = {this.handleSubmit} />
                </PostFormWrapper>
                }


            </Wrapper>
        )
    }
}
