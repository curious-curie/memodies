/* eslint-disable no-undef */
import axios from 'axios';


export const refreshListSuccess = (posts) => {
    return {
        type: 'REFRESH_LIST_SUCCESS',
        posts: posts
    }
}

export const refreshListError = (err) => {
    return {
        type: 'REFRESH_LIST_ERROR',
        error: err 
    }
}

export const postEditOpen = (id) => {
    return {
        type: 'POST_EDIT_OPEN',
        id: id,
    }
}

export const cancelEdit = (id) => {
    return {
        type: 'CANCEL_EDIT',
        id: id,
    }
}
export const postEditStart = (id) => {
    return {
        type: 'POST_EDIT_START',
        id: id,
    };
}

export const postEditSuccess = (id, updatedMemo) => {
    return {
        type: 'POST_EDIT_SUCCESS',
        id: id,
        updatedMemo,
    };
}

export const postEditError = err => { 
    return {
        type: 'POST_EDIT_ERROR',
        error: err 
    };
}

export const postDeleteStart = () => {
    return {
        type: 'POST_DELETE_START',
    };
}

export const postDeleteSuccess = (id, memo) => {
    return {
        type: 'POST_DELETE_SUCCESS',
        id: id,
        updatedMemo: memo,
    };
}

export const postDeleteError = (err) => {
    return {
        type: 'POST_DELETE_ERROR',
        error: err,
    };
}

const playlistStart = () => {
    return {
        type: 'PLAYLIST_START',
    }
}

const playlistSuccess = () => {
    return {
        type: 'PLAYLIST_SUCCESS',
    }
}

const playlistError = () => {
    return {
        type: 'PLAYLIST_ERROR',
    }
}

export const postEdit = (id, updatedMemo) => {
    const url = `/api/posts/${id}/`
    return (dispatch, getState) => { 
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
         if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
       dispatch(postEditStart(id));
        axios.patch(url, {"memo": updatedMemo}, { headers: headers })
        .then(  res => {
            if (res.status === 401 || res.status === 403) {
                alert("AUTHENTICATION ERROR!");
                throw res.data;}

            alert("Post Updated Successfully!");
            dispatch(postEditSuccess(id, updatedMemo));
        }).catch( err => {
            alert("Something Went Wrong... Try Again");
            dispatch(postEditError(err));
        })
    }

}

export const getPosts = () => {
    
    const url = '/api/posts/'

    return (dispatch) => {
        axios.get(url)
        .then(res => {
            dispatch(refreshListSuccess(res.data))})
        .catch(err => dispatch(refreshListError(err)));
    }
}


export const postDelete = (id) => {
    const url = `/api/posts/${id}/`
    return (dispatch, getState) => {if (window.confirm('Are you sure you wish to delete this item?')){
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
         if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        dispatch(postDeleteStart());
        axios.delete(url, { headers: headers }).then(res => {
            if (res.status === 401 || res.status === 403) {
                alert("AUTHENTICATION ERROR!");
                throw res.data;}

            alert("Post Deleted Successfully!");
            dispatch(postDeleteSuccess(id));
        }).catch(err => {
            alert("Something Went Wrong... Try Again");
            dispatch(postDeleteError(err));
        })

    }
}}

export const addToPlaylist = (track) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
         if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        dispatch(playlistStart());
        axios.post(`/api/playlists/`, {
            track: track,
        }, {headers: headers}).then(res => {
            if (res.status === 401 || res.status === 403) {
                alert("AUTHENTICATION ERROR!");
                throw res.data;}
            
              else alert("Added To Playlist Successfully!");
               dispatch(playlistSuccess());
           })
           .catch(err => {
            alert("I think that song is already in your playlist!");
            dispatch(playlistError(err));
        });
    }
}