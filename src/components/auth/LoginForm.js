import React, {Component} from 'react'
import {connect} from "react-redux";
import styled from 'styled-components';
import { Link , Redirect } from "react-router-dom";
import { login } from "../../action/auth"


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
        this.props.login(this.state.username, this.state.password);
    }
    

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
          }

        return (
            <div>
                
                
         <AuthForm onSubmit = {this.onSubmit}>
            <Title>SIGN IN</Title>
            <InputName
            
            >Username</InputName>
            <AuthInput type="text" id="username"
            onChange={e => this.setState({username: e.target.value})}/>
            <InputName>Password</InputName>
            <AuthInput type = "password" id="password"
            onChange={e => this.setState({password: e.target.value})}/>
            
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
    login: (username, password) => {
      return dispatch(login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);