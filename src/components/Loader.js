import React, { Component } from 'react'
import { ScaleLoader } from 'react-spinners'
import styled from 'styled-components';

const LoaderWrapper = styled.div`
margin: 20px
`;
export default class Loader extends Component {

   
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <LoaderWrapper>
                <ScaleLoader 
                      sizeUnit={"px"}
                      size={150}
                      color={'hotpink'}
                      loading={this.state.loading}
                 />
            </LoaderWrapper>
        )
    }
}
