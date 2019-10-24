import React, { Component } from 'react'
import SearchListItem from './SearchListItem';
import PostForm from './PostForm';


export default class Search extends Component {

    constructor(){
        super();
        this.state = {
            searchTerm: '',
            results: [
            
            ],
            selected: [],
            isSearching: true,
        }
       
    }



    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value,
        });

    }

   handleClick(i){
       this.setState( (state) => ({
           isSearching: !state.isSearching,
           selected: i
       }));
   }

 
 
  
    search = () => {

        let searchTerm = JSON.stringify(this.state.searchTerm);
    
        console.log(searchTerm)
        const api = `https://itunes.apple.com/search?term=${searchTerm}&entity=musicTrack`;
        
        let eachItem = {
            id: '',
            artistName: '',
            trackName: '',
            collectionName: '',
            artwork: '',
            selected: [],
            isSearching: true,
        }

        this.setState(prevState => ({
            searchTerm: '',
            results: [],
            isSearching: true,
        }));

        
       
     
        fetch(`${api}`)
        .then(results =>{
            return results.json();
        }).then(data => {
            data.results.forEach(item => {
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
                
                this.setState(prevState => ({
                    results: [...prevState.results, eachItem]
                })
                   
                )
            })
            
    });
    
    }

    searchAgain = () => {
        this.setState( (state) => ({
            searchTerm: '',
            results: [],
            isSearching: true,
            selected: [],
        }));
    }

   

    

    render() {
       
        return (
            <div>

                { this.state.isSearching && <div>
                <form >
                    <input type="text"  onChange={this.handleChange} value={this.state.searchTerm} placeholder="Search A Song"></input>
                </form> 

                <button type="button" onClick={()=>this.search()}>search</button>
                    
            
                { this.state.results.map( item => <SearchListItem onClick={() => this.handleClick(item)} key={item.trackId} artist = {item.artistName} track = {item.trackName} album = {item.collectionName} image = {item.artwork}/>)}
                </div> }

                { !this.state.isSearching &&
                    <button type = "button" onClick={this.searchAgain}>search again</button> }

                { !this.state.isSearching && 
                  <PostForm 
                  artist={this.state.selected['artistName']} 
                  track = {this.state.selected['trackName']}
                  artwork = {this.state.selected['artwork']}
                  album = {this.state.selected['collectionName']} />
                }

                  
            </div>
        )
    }
}
