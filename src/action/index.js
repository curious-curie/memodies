import axios from 'axios';

export const SEARCH_TRACKS_START = 'SEARCH_TRACKS_START';
// export const SEARCH_TRACKS_LOADING = 'SEARCH_TRACKS_LOADING';
export const SEARCH_TRACKS_ERROR = 'SEARCH_TRACKS_ERROR';
export const SEARCH_TRACKS_SUCCESS = 'SEARCH_TRACKS_SUCCESS';
export const SELECT_TRACK = 'SELECT_TRACK';
export const POST_START = 'POST_START';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';


const searchTracksStart = () => {
    return {
        type: 'SEARCH_TRACKS_START'
    }
};

export const searchReset = () => {
    return {
        type: 'SEARCH_RESET'
    }
}


const searchTracksSuccess = tracks => {
    console.log(tracks)
    
    return {
        type: 'SEARCH_TRACKS_SUCCESS',
        tracks
    }
};

const searchTracksError = err => {
    return {
        type: 'SEARCH_TRACKS_ERROR',
        err
    }
};

export const selectTrack = item => {
    console.log(item);
    return {
        type: 'SELECT_TRACK',
        item
    }
};

const postStart = () => {
    return {
        type: 'POST_START',
    }
}
const postSuccess = (history) => {
    
    console.log("KK")
    
    return {
        type: 'POST_SUCCESS',
    }
};

const postError = () => {
    return {
        type: 'POST_ERROR',
    }
};

export const postSubmit = (selected, memo, history) => {
 
    return (dispatch, getState) => {
        console.log(memo);
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        console.log(token)
         if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
    console.log(headers)
       dispatch(postStart());
       axios.post(`http://localhost:8000/api/posts/`, {
        artist: selected['artistName'],
        title : selected['trackName'],
        artwork : selected['artwork'],
        album : selected['collectionName'],
        memo: memo,
        preview: selected['previewUrl'],
       }, { headers: headers }).then( res => {
        if (res.status === 401 || res.status === 403) {
            alert("AUTHENTICATION ERROR!");
            throw res.data;}

          else alert("Post Submitted Successfully!");
           dispatch(postSuccess(history));
       })
       .catch(err => {
           alert(err);
           console.log(err);
           dispatch(postError());
       });
    }
    
  }

export const searchTracks = (searchWord) => {

    let searchResults = []
    let eachItem = {}
    return (dispatch) => {

        dispatch(searchTracksStart());
        console.log(searchWord);
        searchWord = searchWord.replace('%20', ' ');

        axios.get(`https://itunes.apple.com/search?term=${searchWord}&entity=musicTrack`)
        .then( data => { 
           
            console.log(data.data.results);
            console.log(data.data.results.length);
            data.data.results.forEach(item => {
                eachItem = {
                    id: '',
                    artistName: '',
                    trackName: '',
                    collectionName: '',
                    artwork: '',

                }
                eachItem['id'] = item.trackId
                eachItem['artistName'] = item.artistName
                eachItem['trackName'] = item.trackName
                eachItem['collectionName'] = item.collectionName
                eachItem['artwork'] = item.artworkUrl100
                eachItem['previewUrl'] = item.previewUrl

                console.log(eachItem['trackName'])
                searchResults.push(eachItem);
                
                
            
        })
        console.log(searchResults)
        dispatch(searchTracksSuccess(searchResults));
    })
    .catch(err => alert("ERROR!"));
}
}
