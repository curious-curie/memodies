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

    
        const posts  = [
            {'artist' :'Taylor Swift', 'track': 'All Too Well', 'album': 'Red', 
            'artwork': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Taylor_Swift_-_Red.png/220px-Taylor_Swift_-_Red.png', 
            'preview': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/70/d3/b2/70d3b24c-c1a0-58f5-9701-c593e424da00/mzaf_3987167571246207975.plus.aac.p.m4a',
            'memo': 'My all-time favorite song.',
            'id': 1},

            {'artist' :'Taylor Swift', 'track': 'Daylight', 'album': 'Lover', 'artwork': 'https://www.udiscovermusic.com/wp-content/uploads/2019/08/Taylor-Swift-Lover-album-cover-820.jpg',
            'preview': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/f8/cf/70/f8cf706f-8c33-9f99-46d6-30574d03ea80/mzaf_12060394202627098724.plus.aac.p.m4a',
            'id': 21,
            'memo': 'I wanna be defined by the things that I love. Not the things I hate, not the things Im afraid of. The things that haunt me in the middle of the night, I just think that you are what you love.'},
        ]

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
