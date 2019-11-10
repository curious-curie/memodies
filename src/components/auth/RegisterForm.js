
import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {connect} from "react-redux";


const RegistForm = styled.form``;
const Title = styled.div``;
const InputName = styled.div``;
const AuthInput = styled.input``;
const AuthButton = styled.button``;

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

        }
      }

      
    render() {
        return (
            <div>
    
            <RegistForm onSubmit = {this.onSubmit}>
            <Title>SIGN UP</Title>
            <InputName type="text" id="username"
            onChange={e => this.setState({username: e.target.value})}>
                Username</InputName>
            <AuthInput/>
            <InputName  
            type="password" id="password"
            onChange={e => this.setState({password: e.target.value})}>
                Password</InputName>
            <AuthInput/>
           
            <InputName
            type="password"
            onChange={e => this.setState({confirmPW: e.target.value})}
            >Confirm Password</InputName>
            <AuthInput/>
    
            <AuthButton type="submit">SIGN UP</AuthButton>
            <Link to={`/auth/login`}>
            if you already have account...
            </Link>
    
        </RegistForm>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);