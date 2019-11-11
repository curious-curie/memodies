import React, {Component} from 'react';
import './App.css';

import { connect } from "react-redux";
import axios from 'axios';
import Main from './components/Main'
import New from './components/New'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import Header from './components/Header';
import { loadUser, logout } from "./action/auth"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Redirect, Switch} from 'react-router-dom';
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";




class App extends Component {

  componentDidMount() {
      this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
      return <Route {...rest} render={props => {
          if (this.props.auth.isLoading) {
              return <em>Loading...</em>;
          } else if (!this.props.auth.isAuthenticated) {
              return <Redirect to="/login" />;
          } else {
              return <ChildComponent {...props} />
          }
      }} />
  }

  render() {
    let {PrivateRoute} = this;
    return (
        <Router>
          <Header logout = {this.props.logout} user = {this.props.auth.isAuthenticated? this.props.auth.user.username : ''} />
            <Switch>
                <PrivateRoute exact path="/" component={Main} />
                <PrivateRoute exact path="/home" component={Main} />
                <Route exact path = "/new" component = {New}/>
                <Route exact path="/signup" component={RegisterForm} />
                <Route exact path="/login" component={LoginForm} />
            </Switch>
        </Router>
    );
}
}

const mapStateToProps = state => {
  return {
      auth: state.auth,
      user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      loadUser: () => {
          return dispatch(loadUser());
      },
      logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

