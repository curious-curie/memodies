import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.input`
  margin: 5px;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  border: none;
  width: 100%;
  outline: none;
`;

const Sub = styled.input`
    text-align: center;
    border:none;
    font-size: 1.2em;
    width: 100%;
    outline: none;
`;

const Subsub = styled.input`
    text-align: center;
    border:none;
    font-size: 1em;
    color: gray;
    width: 100%;
    outline: none;
    margin-bottom: 30px;
`;

const Memo = styled.input`

    background-color: whitesmoke;
    font-size: 1.2em;
    border-radius: 30px;
    padding: 25px;
    border: none;
    width: 80%;
    @media (min-width: 700px) {
        width: 600px;
    }
    outline: none;
`;
const PostButton = styled.button`
    margin-top: 30px;
    margin-right: 20px;
    border-radius: 30px;
    border: 1px solid gray;
    padding: 10px;
    color: gray;
    font-size: 1.2rem;
    width: 150px;
`;



// const PostForm = ({track, artist, album, artwork, onCreate, onChange}) => {

    
//     return (
        // <div>
        //     <form autoComplete="off" onSubmit = {this.handleSubmit}>
        //         <input type="hidden" name="artwork" value ={artwork || ''}/>

        //         <img src = {artwork} alt="img"/>
    
        //         <Title type="text" name = "track" value={track || ''}  readOnly/>
        //         <Sub type="text" name = "artist" value={artist || ''} readOnly/>
        //         <Subsub type="text" name = "album" value={album || ''} readOnly/>
        //         <Memo type="text" name = "memo" onChange = {onChange} placeholder ="write your memo here"/>
        //         <div><PostButton className="add" type = "submit">Post</PostButton></div>
        //     </form>
            
        // </div>
//     );
// };

// export default PostForm;




export default class PostForm extends Component {
    
  
    render() {

        return (
        <div>
   
            <form autoComplete="off">
                <input type="hidden" name="artwork" value ={this.props.artwork || ''}/>
                <input type="hidden" name="preview" value ={this.props.preview || ''} readOnly/>

                <img src = {this.props.artwork} alt="img"/>
    
                <Title type="text" name = "track" value={this.props.track || ''}  readOnly/>
                <Sub type="text" name = "artist" value={this.props.artist || ''} readOnly/>
                <Subsub type="text" name = "album" value={this.props.album || ''} readOnly/>
                <Memo ref = "Memo" type="text" name = "memo" onChange = {this.props.getMemo} placeholder ="write your memo here"/>
                <div><PostButton onClick={this.props.handleSubmit} className="add">Post</PostButton></div>
            </form>
            
                
        </div>
        )
    }
}
