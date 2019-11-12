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

export const getPlaylist = (userId) => {
    const url = `http://localhost:8000/api/pl/${userId}/`
    return (dispatch) => {
        console.log("getting")
        dispatch(getPlaylistStart());
        axios.get(url)
        .then(res => 
            {dispatch(getPlaylistSuccess(res.data))})
        .catch(err => dispatch(getPlaylistError(err)));
    }
}

