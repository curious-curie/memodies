import React, {Component} from 'react'
import styled from 'styled-components';
import Preview from './Preview'
import {DeleteBin} from 'styled-icons/remix-fill/DeleteBin';
import {Edit} from 'styled-icons/boxicons-solid/Edit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Wrapper = styled.div`
    min-width: 300px;
    margin: 50px;
    padding-top: 10px;
    width: 300px;
    border-radius: 10px;
    overflow: hidden;
    color: darkgray;
    border: 1px solid whitesmoke;
   

`;

const Title = styled.div`
  margin: 10px;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  color: gray;
`;

const CD = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    
 `;

const TrackImage = styled.img`
    border: 1px solid whitesmoke;
    width: 220px;
    border-radius: 50%;
    box-shadow: 0 4px 4px rgba(110, 110, 110, 0.1), 0 4px 4px rgba(98, 98, 98, 0.1);
 `;
const Circle = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    background: white;
    border-radius: 50%;
    opacity: 0.;
    z-index: 2;
    top: 95px;
    left: 130px;
    box-shadow: inset 0 2px 2px rgba(110, 110, 110, 0.25), 0 4px 4px rgba(98, 98, 98, 0.22);
`;

const Artist = styled.div`
    text-align: center;
    color: gray;
    font-size: 1.2rem;
    margin: 5px;
`;

const Album = styled.div`
    text-align: center;
`;

const MemoBox = styled.div`
    color: gray;
    text-indent: 1em;
    text-align: justified;
    margin: 15px;
    background: whitesmoke;
    padding: 25px;
    border-radius: 5px;
    line-height: 1.4;
`;

const MemoInput = styled.input`
    font-size: 12px;
    color: black;
    text-indent: 1em;
    text-align: justified;
    margin: 15px;
    background: whitesmoke;
    border-radius: 5px;
    line-height: 1.4;
    outline: none;
    border: none;
    width: 260px;
    padding-right: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    overflow-wrap: break-word
    white-space: initial;
`;

const PostFooterWrapper = styled.div`
margin-bottom: 10px;
text-align: left;
margin-right: 15px;

`;

const HoverEdit = styled(Edit)`
    opacity: 0.5;
    :hover {
        opacity: 1;
    }
    margin-right: 10px;
    margin-left: 10px;
`;

const HoverDeleteBin = styled(DeleteBin)`
    opacity: 0.5;
    :hover {
        opacity: 1;
    }
`;

const EditButton = styled.button`
    border: none;
    background: whitesmoke;
    border-radius: 20px; 
    width: 50px;
    height: 20px;
`;

export default class Post extends Component {


    render(){ 
    
console.log(this.props.onClick)
    const {id,track, preview, artist, album, artwork,memo} = this.props;
    
    return (
        <Wrapper>
            <CD>
        
                <TrackImage src = {artwork} alt={id}/>
                
                <Circle/>
                
            </CD>
        
        <Preview url = {preview}/>
            <Title>{track}</Title>
            
            <Artist>{artist} </Artist>
            <Album>{album}</Album>
        
            { !(this.props.editing === id) && <MemoBox>{memo}</MemoBox>}
            { (this.props.editing === id) && <><MemoInput onChange = {this.props.handleEditText} type="text" placeholder = {memo}/>
            <EditButton onClick = {this.props.submitEdit}>Edit</EditButton></>}

            <PostFooterWrapper>
           
           <HoverEdit size = "25" title="edit post" onClick = {this.props.onEdit}/>
          
           <HoverDeleteBin size="25" title="delete post" onClick= {this.props.onRemove}/>
            </PostFooterWrapper>
        </Wrapper>
       
    )};
}
