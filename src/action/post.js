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


export const postEdit = (id, updatedMemo) => {
    const url = `http://localhost:8000/api/posts/${id}/`
    return (dispatch ) => { 
       dispatch(postEditStart(id));
        axios.patch(url, {"memo": updatedMemo})
    .then(  res => {
            alert("Post Updated Successfully!");
            dispatch(postEditSuccess(id, updatedMemo));
        }).catch( err => {
            alert("Something Went Wrong... Try Again");
            dispatch(postEditError(err));
        })
    }

}

export const getPosts = () => {
    const url = `http://localhost:8000/api/posts/`
    axios.get(url).then(res => {
        console.log(res.data);
    })
    return (dispatch) => {
        axios.get(url)
        .then(res => {
            console.log(res.data);
            dispatch(refreshListSuccess(res.data))})
        .catch(err => dispatch(refreshListError(err)));
    }
}

export const postDelete = (id) => {
    const url = `http://localhost:8000/api/posts/${id}/`
    return (dispatch) => {if (window.confirm('Are you sure you wish to delete this item?')){
        dispatch(postDeleteStart());
        axios.delete(url).then(res => {
            alert("Post Deleted Successfully!");
            dispatch(postDeleteSuccess(id));
        }).catch(err => {
            alert("Something Went Wrong... Try Again");
            dispatch(postDeleteError(err));
        })

    }
}}