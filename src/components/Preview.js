import React, { Component } from 'react'
import styled from 'styled-components';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayButton = styled.button`
    opacity: 0.5;
    margin: 40px;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    position: absolute;
    top: -170px;
    right: 97px;
    z-index: 999;
    outline: none;
    :hover {
        opacity: 0.9
    }
`;

const PauseButton = styled.button`
    opacity: 0.5;
    margin: 40px;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    position: absolute;
    top: -170px;
    right: 98px;
    z-index: 999;
    outline: none;
    :hover {
        opacity: 0.9
    }
`;


const PlayWrapper = styled.div`
position: relative;
`;
export default class Preview extends Component {

    constructor(props){
        super(props);
        this.state = {
            play: false,
        }
        this.url = this.props.url;
        this.audio = new Audio(this.url);
    }
    
    play = () => {
    this.setState({ play: !this.state.play }, () => {
        if(this.state.play === true) {
            this.audio.play();
            setTimeout(() => {
                this.setState({play: false});
                this.audio.pause();
            }, 2000);
            
        }
        else this.audio.pause();
    })
}
    
    render() {
        return (
            <PlayWrapper>
            { !this.state.play && <PlayButton onClick={this.play}><FontAwesomeIcon icon={faPlay} size="2x" /></PlayButton>}
            { this.state.play && <PauseButton onClick={this.play}><FontAwesomeIcon icon={faPause} size="2x" /></PauseButton>}
            </PlayWrapper>
            );
        }
    }
          
          