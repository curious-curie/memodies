
import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import { register } from "../../action/auth"

const RegistForm = styled.form`
margin: 40px;
text-align: center;`;

const InputName = styled.div``;
const AuthInput = styled.input`
margin-bottom: 15px;
border: 1px solid whitesmoke;
border-radius: 15px;
font-size: 15px;
outline: none;
padding: 10px;

`;
const AuthButton = styled.button`
width: 180px;
border-radius: 15px;
background-color: #999999;
border: none;
color: white;
font-weight: 600;
font-size: 15px;
padding: 10px;
opacity: 0.5;
margin-bottom: 20px;

:hover {
  background-color: hotpink;
  opacity: 1;
}
`;

const Sub = styled(Link)`
  font-size: 15px;
  text-decoration: none;
  color: gray;
  :hover {
    color: hotpink;
  }
`;

class RegisterForm extends Component {

    state = {
        username: "",
        password: "",
        confirmPW: "",
      }
    
      onSubmit = e => {
        e.preventDefault();
        if(this.state.password !== this.state.confirmPW)
        alert("PASSWORD DOES NOT MATCH!");
        else{
            this.props.register(this.state.username, this.state.password);
        }
      }

      
    render() {
        return (
            <div>
    
            <RegistForm onSubmit = {this.onSubmit}>
            {/* <Title>SIGN UP</Title> */}
            <InputName>
                Username</InputName>
            <AuthInput  type="text" id="username"
            onChange={e => this.setState({username: e.target.value})}/>
            <InputName  >
                Password</InputName>
            <AuthInput type="password" id="password"
            onChange={e => this.setState({password: e.target.value})}/>
           
            <InputName>Confirm Password</InputName>
            <AuthInput  type="password"
            onChange={e => this.setState({confirmPW: e.target.value})}/>
    
            <AuthButton type="submit">SIGN UP</AuthButton>
            <div><Sub to={`/login`}>
            if you already have an account...
            </Sub></div>
    
        </RegistForm>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
      errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
      });
    }
    return {
      errors,
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      register: (username, password) => dispatch(register(username, password)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);