import React, {Component} from 'react'
import {connect} from "react-redux";
import styled from 'styled-components';
import { Link } from "react-router-dom";


const AuthForm = styled.form``;
const Title = styled.div``;
const InputName = styled.div``;
const AuthInput = styled.input``;
const AuthButton = styled.button``;


class LoginForm extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();

    }
    render() {
        return (
            <div>
                
         <AuthForm onSubmit = {this.onSubmit}>
            <Title>SIGN IN</Title>
            <InputName
            type="text" id="username"
            onChange={e => this.setState({username: e.target.value})}
            >Username</InputName>
            <AuthInput/>
            <InputName 
            type = "password" id="password"
            onChange={e => this.setState({password: e.target.value})}
            >Password</InputName>
            <AuthInput/>
            
            <AuthButton type="submit">SIGN IN</AuthButton>
      
            <Link to={`/signup`}>
              if you don't have an account...
            </Link>
         </AuthForm>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {};
  }
  
  const mapDispatchToProps = dispatch => {
    return {};
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);