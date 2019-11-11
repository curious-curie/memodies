import React, {Component} from 'react'
import {connect} from "react-redux";
import styled from 'styled-components';
import { Link , Redirect } from "react-router-dom";
import { login } from "../../action/auth"


const AuthForm = styled.form`
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
            {/* <Title>SIGN IN</Title> */}
            <InputName
            
            >Username</InputName>
            <AuthInput type="text" id="username"
            onChange={e => this.setState({username: e.target.value})}/>
            <InputName>Password</InputName>
           <div> <AuthInput type = "password" id="password"
            onChange={e => this.setState({password: e.target.value})}/> </div>
            
           <div> <AuthButton type="submit">SIGN IN</AuthButton></div>
      
            <Sub to={`/signup`}>
              if you don't have an account...
            </Sub>
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