import React, { Component } from 'react'
import styled from 'styled-components';
import Post from './Post'
import axios from 'axios';

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
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
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
    
    render() {

        return (
            <PostsWrapper>
                
                {this.state.posts.map((post) => {
              return (
                <Item>
                <Post key = {post.id} artist = {post.artist} album = {post.album} track = {post.title} artwork = {post.artwork} memo = {post.memo}/>
                </Item> )})}
                
            </PostsWrapper>
        )
    }
}
