import React, { Component } from 'react'
import styled from 'styled-components';
import Post from './Post'
import axios from 'axios';
import Search from './Search'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const PostsWrapper = styled.div`
    display: flex;
    float: center;
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

@media(max-width: 799px){
    float: center;
}
@media (min-width: 800px) {
    position: absolute;
    right: 0px;
}

top: 80px;
`;
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            searchWord: '',
            searchOpen: false,
            editing: false,
            editText: '',
        }
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
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


    handleRemove  = (id) => event => {
        
        if (window.confirm('Are you sure you wish to delete this item?')) {
            const url = `http://localhost:8000/api/posts/${id}/`;
            
            console.log(id);
            axios.delete(url).then(res => 
                 console.log(res) )
    
            .catch(err => console.log(err));}

        this.setState({
            posts: this.state.posts.filter(post => post.id !== id)
        })
    }

    onEdit = (id) => event => {
        this.setState(
            {editing: id,}
        )
    }

    submitEdit = (id) => event => {

        const url = `http://localhost:8000/api/posts/${id}/`;
        console.log(this.state.editText)
        axios.patch(url, {"memo": this.state.editText}).then(
            res => {console.log(res); 
                this.setState({
                    posts: this.state.posts.map(post => id === post.id? { ...post, "memo": this.state.editText} : post ),
                    editing: -1,
                    editText: '',
             });
            })
       .catch(err => console.log(err));
     
    }

    handleEditText = e => {
        this.setState(
            {editText: e.target.value,}
        )
    }

    render() {

        let filteredPosts = this.state.posts.filter(post => {
            const query = this.state.searchWord.trim().toLowerCase();
            return (
                post.title.toLowerCase().includes(query) ||
                post.album.toLowerCase().includes(query) ||
                post.artist.toLowerCase().includes(query)
            )
        });

        return (
            <>
                <SearchWrapper><Search type="text" searchToggle = {this.searchToggle} isOpen = {this.state.searchOpen} onChange = {this.search}/></SearchWrapper>

            <PostsWrapper>
                
                {filteredPosts.map((post) => {
              return (
                <Item>
                <Post editing = {this.state.editing} handleEditText = {this.handleEditText} 
                onEdit = {this.onEdit(post.id)} submitEdit = {this.submitEdit(post.id)}
                onRemove = {this.handleRemove(post.id)} 
                key = {post.id} id = {post.id} artist = {post.artist} album = {post.album} track = {post.title} artwork = {post.artwork} preview={post.preview} memo = {post.memo}/>
                </Item> )})}
                
            </PostsWrapper>
            </>
        )
    }
}
