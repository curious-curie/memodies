import React, { Component } from 'react'
import styled from 'styled-components';

const PostsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 800px) {
        flex-direction: row;
      }
`
const Wrapper = styled.div`
    min-width: 300px;
    margin: 50px;
    padding-top: 10px;
    width: 300px;
    
    border-radius: 10px;
    overflow: hidden;
    color: darkgray;
`;

const Title = styled.div`
  margin: 5px;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
`;

const CD = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
 `;

const TrackImage = styled.img`
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

const Preview = styled.audio`
    color: white;
`;



export default class Home extends Component {

    
    render() {

        const posts  = [
            {'artist' :'Taylor Swift', 'track': 'All Too Well', 'album': 'Red', 
            'artwork': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Taylor_Swift_-_Red.png/220px-Taylor_Swift_-_Red.png', 
            'preview': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview128/v4/70/d3/b2/70d3b24c-c1a0-58f5-9701-c593e424da00/mzaf_3987167571246207975.plus.aac.p.m4a',
            'memo': 'My all-time favorite song.'},

            {'artist' :'Taylor Swift', 'track': 'Daylight', 'album': 'Lover', 'artwork': 'https://www.udiscovermusic.com/wp-content/uploads/2019/08/Taylor-Swift-Lover-album-cover-820.jpg',
            'preview': 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/f8/cf/70/f8cf706f-8c33-9f99-46d6-30574d03ea80/mzaf_12060394202627098724.plus.aac.p.m4a',
            'memo': 'I wanna be defined by the things that I love. Not the things I hate, not the things Im afraid of. The things that haunt me in the middle of the night, I just think that you are what you love.'},
        ]

        return (
            <PostsWrapper>
                {posts.map((post) => {
              return (
                <Wrapper>
                    <CD>
              
                        <TrackImage src = {post.artwork} alt="album artwork"/>
                      
                        <Circle/>
                     
                    </CD>
                
                {/* <Preview controls = "controls" src = {post.preview}/> */}
                  <Title>{post.track}</Title>
                 
                  <Artist>{post.artist}</Artist>
                  <Artist>{post.album}</Artist>
                
                  <MemoBox>{post.memo}</MemoBox>
    
                </Wrapper>
                  )})}
            </PostsWrapper>
        
            
        )
    }
}
