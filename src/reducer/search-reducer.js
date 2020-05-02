// this.state = {
//     searchTerm: '',
//     results: [

//     ],
//     selected: [],
//     memo: '',
//     isSearching: true,
//     loading: false,
// }

const searchTracks = (
    state = {
        results: [],
        isSearching: true,
        err: '',
        selected: [],
        memo: '',
        loading: false,
    }, action ) =>
    {

        switch(action.type){
            case 'SEARCH_TRACKS_START':
                return {
                    results: [],
                    loading: true,
                    err: '',
                    isSearching: true,
                    selected: [],
                    memo: '',
                }
            case 'SEARCH_RESET':
                return {
                    results: [],
                    loading: false,
                    err: '',
                    isSearching: true,
                    selected: [],
                    memo: '',
                }
            case 'SEARCH_TRACKS_SUCCESS':
                return {
                    ...state,
                    isSearching: true,
                    loading: false,
                    results: action.tracks,
                    err: '',
                }
            case 'SEARCH_TRACKS_ERROR':
                return {
                    ...state,
                    loading: false,
                    isSearching: true,
                    err: action.err
                }
            case 'SELECT_TRACK':
                console.log(action.item);
                return {
                    ...state,
                    loading: false,
                    isSearching: false,
                    selected: action.item,
                }

            case 'POST_SUBMIT':
                return {
                    ...state,
                    memo: action.memo,
                }
            case 'POST_SUCCESS':
                return {
                    results: [],
                    isSearching: false,
                    err: '',
                    selected: [],
                    memo: '',
                    loading: false,
                }
            default: return state;

        }
    }

export default searchTracks;