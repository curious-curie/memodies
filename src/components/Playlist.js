import Loader from './Loader'
import Post from './Post'
import React, { Component } from 'react'
import { getPlaylist } from '../action/playlist'
import { loadUser } from '../action/auth'
import { connect } from 'react-redux';
import styled from 'styled-components';

const Item = styled.li`
    list-style: none;
    flex: 0 0 20%;
`;

class Playlist extends Component {

    componentDidMount() {
        console.log(this.props.auth)
        this.props.loadUser();
        // this.props.dispatch(getPlaylist(this.props.auth.user.id));
      }
    
      loadPlaylist = (userId) => {
          this.props.getPlaylist(userId);
      }

    render() {
        return (
            <div>

                {this.props.auth.isAuthenticated? 
                <div>
                    {this.props.user.id}'s playlist
                    {/* {this.loadPlaylist(this.props.user.id)} */}
                    { console.log( this.props.posts)}
                    {/* { this.props.posts.track.map( (post) => {
                        return(
                            <Item key = {post.id}>
                            <Post 
                            key = {post.id} 
                            editing = {this.props.editing} handleEditText = {this.handleEditText} 
                            // onEdit = {() => this.props.dispatch(postEditOpen(post.id))} submitEdit = {this.submitEdit(post.id)}
                            // onRemove = {() => this.props.dispatch(postDelete(post.id))} 
                            id = {post.id} artist = {post.artist} album = {post.album} track = {post.title} artwork = {post.artwork} preview={post.preview} memo = {post.memo}
                            author = {post.owner}
                            isAuthor= {this.props.user.username === post.owner} 
                            // addToPlaylist = {() => this.props.dispatch((addToPlaylist(post.id)))}
                             />
                            </Item> )})} 
                    })} */}
                </div> 
                
                :<div>Please login first! </div>}


            </div>
        )
    }


   
   
}

const mapStateToProps = state => {
    return{
        auth: state.auth,
        user: state.auth.user,
        posts: state.playlist.posts,
        loading: state.playlist.loading,
        error: state.playlist.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(loadUser());
        },
        getPlaylist: (userId) => {
            return dispatch(getPlaylist(userId))
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);