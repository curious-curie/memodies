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

export default class Post extends Component {

    // componentDidMount(){
    //     if(!this.state.updated){
    //     this.setState({
    //         updated: !this.state.updated,
    //     });
    //     console.log("cdm:" , this.state.updated)
    // }
       
    // }

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         updated: false,
    //     }
    // }

    
    handleRemove = ()  => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
        const id = this.props.id;
        const url = `http://localhost:8000/api/posts/${id}/`;
        
        console.log(id);
        axios.delete(url).then(res => 
             console.log(res) )

        .catch(err => console.log(err));}
    }

    // updatePost() {
    //     alert("UPDATE");
    //     this.setState({
    //         updated: !this.state.updated,
    //     })
    // }

    render(){

    const {id,track, preview, artist, album, artwork,memo, onClick, handleEdit} = this.props;
    
    return (
        <Wrapper>
            <CD>
        
                <TrackImage onClick ={onClick} src = {artwork} alt={id}/>
                
                <Circle/>
                
            </CD>
        
        <Preview url = {preview}/>
            <Title>{track}</Title>
            
            <Artist>{artist} </Artist>
            <Album>{album}</Album>
        
            <MemoBox>{memo}</MemoBox>


            <PostFooterWrapper>
           
           <HoverEdit size = "25" title="edit post" onClick = {handleEdit}/>
           <HoverDeleteBin size="25" title="delete post" onClick = {this.handleRemove}/>
            </PostFooterWrapper>
        </Wrapper>
       
    )};
}
