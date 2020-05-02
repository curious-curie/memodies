import axios from 'axios';

export const getPlaylistStart = () => {
    return {
        type: 'GET_PLAYLIST_START',
    }
}
export const getPlaylistSuccess = (posts) => {
    return {
        type: 'GET_PLAYLIST_SUCCESS',
        posts: posts,
    }
}

export const getPlaylistError = (err) => {
    return {
        type: 'GET_PLAYLIST_ERROR',
        error: err
    }
}

export const deleteFromPlaylistStart = () => {
    return {
        type: 'DELETE_FROM_PLAYLIST_START',
    }
}

export const deleteFromPlaylistSuccess = (id) => {
    return {
        type: 'DELETE_FROM_PLAYLIST_SUCCESS',
        id: id
    }
}

export const deleteFromPlaylistError = (err) => {
    return {
        type: 'DELETE_FROM_PLAYLIST_ERROR',
        error: err,
    }
}

export const getPlaylist = (userId) => {
    const url = `/api/pl/${userId}/`
    return (dispatch) => {
        dispatch(getPlaylistStart());
        axios.get(url)
        .then(res => 
            {dispatch(getPlaylistSuccess(res.data))})
        .catch(err => dispatch(getPlaylistError(err)));
    }
}

export const deleteFromPlaylist = (playlistId, postId) => {
    const url = `/api/playlists/${playlistId}/`
    return (dispatch) => {
        dispatch(deleteFromPlaylistStart());
        axios.delete(url).then(res => {
            dispatch(deleteFromPlaylistSuccess(playlistId));
            alert("deleted")
        }).catch(err => {
            alert("Something Went Wrong... Try Again");
            dispatch(deleteFromPlaylistError(err));
        })
    }
}