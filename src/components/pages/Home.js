import React, { Component } from 'react'
import styled from 'styled-components';
import Post from '../Post'
import axios from 'axios';
import { connect } from 'react-redux'
import Search from '../Search'
import { addToPlaylist, postEditOpen, cancelEdit, postEdit, postDelete, getPosts } from '../../action/post'
import { getPlaylist, deleteFromPlaylist } from '../../action/playlist'
import Loader from '../Loader'
import ReactTooltip from 'react-tooltip'

import { UserCircle } from 'styled-icons/boxicons-solid/UserCircle';
import { QueueMusic } from 'styled-icons/material/QueueMusic';
import { Home2 } from 'styled-icons/icomoon/Home2';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';


const HomeButton = styled(Home2)`
    margin: 10px;
    margin-left: 30px;
    background: none;
    border: none;
    color: ${props => props.selected === true? 'hotpink' : 'black'}
`;

const MyPostsButton = styled(UserCircle)`
    margin: 10px;
    background: none;
    border: none;
    color: ${props => props.selected === true? 'hotpink' : 'black'}
`;

const PlaylistButton = styled(QueueMusic)`
    background: none;
    border: none;
    color: ${props => props.selected === true? 'hotpink' : 'black'}
`;


export const LoaderWrapper = styled.div`
position: relative;
text-align: center;
top: 100px; `;

const PostsWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    @media(max-width: 799px){
        margin-top: 20px;
        flex-direction: column;
    }
    text-align: center;
    @media (min-width: 800px) {
        flex-wrap: wrap;
    }
    @media (min-width: 1200px){
        width: 1200px;
    }
`;
const Item = styled.li`
    list-style: none;
    flex: 0 0 20%;
`;

const SearchWrapper = styled.div`


// @media (min-width: 800px) {
//     position: absolute;
//     right: 0px;
// }


`;
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            searchOpen: false,
            editText: '',
            error: '',
            playlist: false,
            myPosts: false,
        }
    }

    componentDidMount() {
        this.props.dispatch(getPosts());
        this.props.dispatch(getPlaylist(this.props.user.id));
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
        this.setState({
            searchOpen: !this.state.searchOpen,
            searchWord: '',
        })
      }



 
    submitEdit = (id) => event => {
     
        const updatedMemo = this.state.editText
        this.props.dispatch(postEdit(id, updatedMemo));
     
    }

    handleEditText = e => {
        this.setState(
            {editText: e.target.value,}
        )
    }

    loadPlaylist = userId => {
        this.props.dispatch(getPlaylist(userId));
    
        this.setState({
            playlist: true,
            myPosts: false,
        })
    }

    togglePlaylist = (userId) => {
        if(this.state.playlist){
            this.setState({ playlist: false })
        }
        else {
            this.loadPlaylist(userId);
        }
    }

    goToHome = () =>  {
        this.setState({
            playlist: false,
            myPosts: false,
        })
    }

    toggleMyPosts = (userId) => {
            if(!this.state.myPosts) this.setState({myPosts: true, playlist: false})
            else this.setState({myPosts: false})}

    render() {


        let filteredPosts = this.props.posts.filter(post => {
            const query = this.state.searchWord.trim().toLowerCase();
            if(this.state.myPosts)
            { return (
                (post.title.toLowerCase().includes(query) ||
                post.album.toLowerCase().includes(query) ||
                post.artist.toLowerCase().includes(query) )
                && ( post.owner === this.props.user.username)
                // || post.owner.toLowerCase().includes(query)
            )}
            else {
                return (
                (post.title.toLowerCase().includes(query) ||
                post.album.toLowerCase().includes(query) ||
                post.artist.toLowerCase().includes(query) )
                )
            }
        });
        
        

        return (
            <>
            
            <HomeButton data-tip="home" size="27px" selected = {!this.state.playlist && !this.state.myPosts} onClick= {() => this.goToHome()}/>
         
            <PlaylistButton data-tip="my playlist" size="30px" selected = {this.state.playlist} onClick= {() => this.togglePlaylist(this.props.user.id)} />
            <MyPostsButton data-tip="my posts" size="30px" selected = {this.state.myPosts} onClick = {() => this.toggleMyPosts(this.props.user.id)}/>
            <ReactTooltip place="top" effect="solid"/>

            { !this.state.playlist && !this.state.my && 
             <SearchWrapper><Search type="text" searchToggle = {this.searchToggle} isOpen = {this.state.searchOpen} onChange = {this.search}/></SearchWrapper>}
            { this.props.loading && <LoaderWrapper><Loader/></LoaderWrapper>}
            


                    

            { !this.props.loading && this.state.playlist && <PostsWrapper>
                { this.props.playlist.map((post) => {
              return (
                <Item key = {post.track.id}>
                <Post 
                key = {post.track.id} 
                playlistId = {post.id}
                playlist = {true}
                editing = {this.props.editing} handleEditText = {this.handleEditText} 
                onEdit = {() => this.props.dispatch(postEditOpen(post.track.id))} submitEdit = {this.submitEdit(post.track.id)}
                cancelEdit = {() => this.props.dispatch(cancelEdit(post.track.id))}
                onRemove = {() => this.props.dispatch(postDelete(post.track.id))} 
                id = {post.track.id} artist = {post.track.artist} album = {post.track.album} track = {post.track.title} artwork = {post.track.artwork} preview={post.track.preview} memo = {post.track.memo}
                author = {post.track.owner}
                isAuthor= {false}
                addToPlaylist = {() => this.props.dispatch((addToPlaylist(post.track.id)))} 
                deleteFromPlaylist = {() => this.props.dispatch(deleteFromPlaylist(post.id, post.track.id))}/>
                </Item> )})} 
                { this.props.playlist.length === 0? <div>Your playlist is empty!</div> : <></>}
                
            </PostsWrapper>} 
            
            
    
            { !this.props.loading && !this.state.playlist && <PostsWrapper>
                {filteredPosts.map((post) => {
              return (
                <Item key = {post.id}>
                <Post 
                key = {post.id} 
                playlist = {false}
                editing = {this.props.editing} handleEditText = {this.handleEditText} 
                onEdit = {() => this.props.dispatch(postEditOpen(post.id))} submitEdit = {this.submitEdit(post.id)}
                cancelEdit = {() => this.props.dispatch(cancelEdit(post.id))}
                onRemove = {() => this.props.dispatch(postDelete(post.id))} 
                id = {post.id} artist = {post.artist} album = {post.album} track = {post.title} artwork = {post.artwork} preview={post.preview} memo = {post.memo}
                author = {post.owner}
                isAuthor= {this.props.user.username === post.owner} 
                addToPlaylist = {() => this.props.dispatch((addToPlaylist(post.id)))} 
                />
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
        playlist: state.playlist.posts,
    }
}




export default connect(mapStateToProps)(Home);