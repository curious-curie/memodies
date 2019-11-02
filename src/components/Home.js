import React, { Component } from 'react'
import styled from 'styled-components';
import Post from './Post'
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const PostsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 800px) {
        flex-direction: row;
      }
`

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
                { console.log(this.state.posts) }
                {this.state.posts.map((post) => {
              return (
                <Post key = {post.id} artist = {post.artist} album = {post.album} track = {post.track} artwork = {post.artwork} memo = {post.memo}/>
                  )})}
            </PostsWrapper>
        )
    }
}
