import React, { Component } from 'react'
import styled from 'styled-components';
import Post from './Post'
import axios from 'axios';
import { connect } from 'react-redux'
import Search from './Search'
import { postEditOpen, postEdit, postDelete, getPosts } from '../action/post'
import Loader from './Loader'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const LoaderWrapper = styled.div`
position: relative;
text-align: center;
top: 100px; `;

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
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            searchOpen: false,
            editText: '',
            error: '',
            filteredPosts: [],
            posts: [],
        }
    }

    componentDidMount() {
        this.props.dispatch(getPosts());
      }
   

    refreshList = () => {
        axios.get("posts/")
        .then(res => this.setState({ posts: res.data}))
        .catch(err => console.log(err));
    }
    
    search = (e) => {
    
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


    // handleRemove  = (id) => event => {
        
    //     if (window.confirm('Are you sure you wish to delete this item?')) {
    //         const url = `http://localhost:8000/api/posts/${id}/`;
            
    //         console.log(id);
    //         axios.delete(url).then(res => 
    //             {this.setState({
    //                 posts: this.state.posts.filter(post => post.id !== id)
    //             })} )
    
    //         .catch(err => console.log(err));}

        
    // }

 
    submitEdit = (id) => event => {
     
        const updatedMemo = this.state.editText
        this.props.dispatch(postEdit(id, updatedMemo));
     
    }

    handleEditText = e => {
        this.setState(
            {editText: e.target.value,}
        )
    }

    render() {

    

        let filteredPosts = this.props.posts.filter(post => {
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
            { this.props.loading && <LoaderWrapper><Loader/></LoaderWrapper>}
           
            { !this.props.loading && <PostsWrapper>
                {filteredPosts.map((post) => {
              return (
                <Item>
                <Post 
                key = {post.id} 
                editing = {this.props.editing} handleEditText = {this.handleEditText} 
                onEdit = {() => this.props.dispatch(postEditOpen(post.id))} submitEdit = {this.submitEdit(post.id)}
                onRemove = {() => this.props.dispatch(postDelete(post.id))} 
                id = {post.id} artist = {post.artist} album = {post.album} track = {post.title} artwork = {post.artwork} preview={post.preview} memo = {post.memo}
                author = {post.owner}
                isAuthor= {this.props.user.username === post.owner} />
                </Item> )})} 
                
            </PostsWrapper>} 
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        loading: state.post.loading,
        editing: state.post.editing,
        user: state.auth.user,

    }
}




export default connect(mapStateToProps)(Home);