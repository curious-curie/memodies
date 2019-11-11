
import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import { register } from "../../action/auth"


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
            this.props.register(this.state.username, this.state.password);
        }
      }

      
    render() {
        return (
            <div>
    
            <RegistForm onSubmit = {this.onSubmit}>
            <Title>SIGN UP</Title>
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
            <Link to={`/login`}>
            if you already have account...
            </Link>
    
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