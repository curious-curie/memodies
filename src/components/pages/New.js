import React, { Component } from 'react'
import SearchListItem from '../SearchListItem';
import PostForm from '../PostForm';
import styled from 'styled-components';
import {SearchAlt} from 'styled-icons/boxicons-regular/SearchAlt';
import axios from 'axios';
import Loader from '../Loader'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { searchReset, searchTracks, selectTrack, postSubmit } from '../../action'

axios.defaults.withCredentials = true;



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



class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            memo: '',
        }
    }


   componentDidMount(){
       this.props.dispatch(searchReset());
   }
    
    handleSubmit = (selected, memo) => {
        console.log(memo);
        this.props.dispatch(postSubmit(selected,memo,this.props.history));
        this.props.history.push("/home");
    }

    getMemo = (e) => {
        this.setState({
            memo: e.target.value,
        })
    }


   handleKey = (e) => {
    if(e.keyCode === 13){
        e.preventDefault();
    //    this.search();
        console.log(e.target.value)
        this.search(e.target.value)
       // put the login here
    }};

    search = (input) => {

    this.props.dispatch(searchTracks(input));

    }


    
 
    render() {

        return (
            <Wrapper>
 

                { !this.props.isSearching &&
                    <section><BackButton type = "button" onClick={() => this.props.dispatch(searchTracks(''))}>← Back To Search</BackButton></section> } 
                { this.props.isSearching &&
                <div>
                <form >
                <Block> <SearchInput 
                ref={ref => {
                this.SearchInput = ref; }}
                 type="text" onKeyDown = {this.handleKey} 
                 placeholder="Search by title / artist"/>


                <SearchButton type="button" onClick={()=>this.search(this.SearchInput.value)}> <SearchAlt/></SearchButton> </Block> </form>

                {(this.props.loading) ? <Loader /> : null}
                { this.props.results.map( item => <SearchListItem key={item.id} onClick={() => this.props.dispatch(selectTrack(item))} artist = {item.artistName} track = {item.trackName} album = {item.collectionName} image = {item.artwork}/>)}

                </div>
                }


                { !this.props.isSearching &&
                <PostFormWrapper>
                  <PostForm
                  key = {this.props.selected['id']}
                  id ={this.props.selected['id']}
                  artist={this.props.selected['artistName']}
                  track = {this.props.selected['trackName']}
                  artwork = {this.props.selected['artwork']}
                  album = {this.props.selected['collectionName']} 
                  preview = {this.props.selected['previewUrl']}
                  handleSubmit = {() => this.handleSubmit(this.props.selected, this.state.memo)} 
                  getMemo = {this.getMemo} />
                </PostFormWrapper>
                } 


            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        results: state.search.results,
        err: state.search.err,
        selected: state.search.selected,
        memo: state.search.memo,
        loading: state.search.loading,
        isSearching: state.search.isSearching,
    }
}

export default withRouter(connect(mapStateToProps)(New));