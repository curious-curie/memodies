const postReducer = (

    state = {
        posts: [],
        loading: true,
        editing: -1,
        error: '',
    }, action

) => 
{
    switch(action.type){
        case('GET_POSTS'):
        return {
            ...state,
            loading: false,
        }
        case ('REFRESH_LIST_SUCCESS'):
            return {
                ...state,
                editing: -1,
                loading: false,
                posts: action.posts,
            }
        case('REFRESH_LIST_ERROR'):
        return {
            ...state,
            loading: false, 
            posts: [],
            error: action.error,
        }
        case('POST_DELETE_START'):
        return {
            ...state,
            loading: true,
        }
        case('POST_DELETE_SUCCESS'):
        return {
            ...state,
            loading: false,
            posts:  state.posts.filter(post => post.id !== action.id)
        }
        case('POST_DELETE_ERROR'):
        return{
            ...state,
            loading: false,
            error: action.error,
        }
        case('POST_EDIT_OPEN'):
        return {
            ...state,
            loading: false,
            editing: action.id,
        }
        case('CANCEL_EDIT'):
        return {
            ...state,
            loading: false,
            editing: -1,
        }
        case('POST_EDIT_START'):
        return {
            ...state,
            loading: true,
            editing: action.id,
        }
        case('POST_EDIT_SUCCESS'):
        return {
            ...state,
            loading: false,
            editing: -1,
            posts: state.posts.map(post => action.id === post.id? { ...post, "memo": action.updatedMemo} : post ),
        }

        case('POST_EDIT_ERROR'):
    
        return {
            ...state,
            loading: false,
            editing: -1,
            posts: state.posts,
            error: action.error,
        }
        

        default: return state;
    }
}

export default postReducer;