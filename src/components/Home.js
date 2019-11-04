import React, { Component } from 'react'
import styled from 'styled-components';
import Post from './Post'
import axios from 'axios';
import Search from './Search'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const PostsWrapper = styled.div`
    display: flex;
    justify-content: center;
    @media(max-width: 799px){
        flex-direction: column;
    }
    text-align: center;
    @media (min-width: 800px) {
        flex-wrap: wrap;
    }
`;
const Item = styled.li`
    list-style: none;
    flex: 0 0 20%;
`;

const SearchWrapper = styled.div`
position: absolute;
display: inline-block;
top: 80px;
`;
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            searchWord: '',
            searchOpen: false,
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList = () => {
        axios.get("posts/")
        .then(res => this.setState({ posts: res.data}))
        .catch(err => console.log(err));
    }
    
    search = (e) => {
        console.log(e)
        if(e.keyCode === 13){ 
            this.searchToggle();
        }
        else{
        this.setState({
            searchWord: e.target.value,
        })
        }
    }

    searchToggle = () => {
        console.log(this.state.searchOpen)
        this.setState({
            searchOpen: !this.state.searchOpen,
            searchWord: '',
        })
      }

    render() {

        let filteredPosts = this.state.posts.filter(post => {
            const query = this.state.searchWord.trim().toLowerCase();
            console.log(query)
            return (
                post.title.toLowerCase().includes(query) ||
                post.album.toLowerCase().includes(query) ||
                post.artist.toLowerCase().includes(query)
            )
        });

        return (
            <>
            <PostsWrapper>

                <SearchWrapper><Search type="text" searchToggle = {this.searchToggle} isOpen = {this.state.searchOpen} onChange = {this.search}/></SearchWrapper>
                
                {filteredPosts.map((post) => {
              return (
                <Item>
                <Post key = {post.id} artist = {post.artist} album = {post.album} track = {post.title} artwork = {post.artwork} memo = {post.memo}/>
                </Item> )})}
                
            </PostsWrapper>
            </>
        )
    }
}
