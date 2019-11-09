import React, {Component} from 'react';
import './App.css';
import AddButton from './components/AddButton';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import New from './components/New'
import Header from './components/Header';
import axios from 'axios';
import Main from './components/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom';
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";



export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        isOpen: false,
        searchWord: '',
    }
}





  render() {
    return (
   
     
    <Router>
       <Header/>
     <div>
    <Route exact path = "/" component = {Main}/>
    <Route exact path = "/home" component = {Main}/>
    <Route path = "/new" component = {New}/>

   
    </div>
    </Router>
   
   
    )
  }
}

