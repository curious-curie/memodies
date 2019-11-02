import React from 'react'
import styled from 'styled-components';


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

// const Preview = styled.audio`
//     color: white;
// `;

const Post = ({track, artist, album, artwork,memo}) => {

    
    return (
        <Wrapper>
            <CD>
        
                <TrackImage src = {artwork} alt="album artwork"/>
                
                <Circle/>
                
            </CD>
        
        {/* <Preview controls = "controls" src = {post.preview}/> */}
            <Title>{track}</Title>
            
            <Artist>{artist} </Artist>
            <Album>{album}</Album>
        
            <MemoBox>{memo}</MemoBox>

        </Wrapper>
       
    );
};

export default Post;