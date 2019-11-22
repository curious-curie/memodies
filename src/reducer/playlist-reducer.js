import { statements } from "@babel/template"

const playlistReducer = (
    state = {
        posts: [],
        loading: true,
        error: '',
    }, action
) => {
    switch(action.type){
        case('GET_PLAYLIST_START'):
        return {
            ...state,
            loading: true,
        }
        case('GET_PLAYLIST_SUCCESS'):
        return {
            ...state,
            loading: false,
            posts: action.posts,
        }
        case('GET_PLAYLIST_ERROR'):
        return{
            posts: [],
            loading: false,
            error: action.error
        }
        case('DELETE_FROM_PLAYLIST_START'):
        return {
            ...state,
            loading: true,
        }
        case('DELETE_FROM_PLAYLIST_SUCCESS'):
        return {
            ...state,
            loading: false,
            posts: state.posts.filter(post => post.id !== action.id)
        }
        case('DELETE_FROM_PLAYLIST_ERROR'):
        return {
            ...state,
            loading: false,
            error: action.error
        }
        default: return state;
    }
}

export default playlistReducer;