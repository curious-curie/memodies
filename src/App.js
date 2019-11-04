import React, {Component} from 'react';
import './App.css';
import AddButton from './components/AddButton';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import New from './components/New'
import Header from './components/Header';
import axios from 'axios';
import Search from './components/Search'
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
   
    <Route path = "/home" component = {App}/>
    <Route path = "/new" component = {New}/>

    <Header/>
    <div>
      
        <Home searchWord= {this.state.searchWord}/>
       <Link to = "/new"><AddButton/></Link>

  
    </div>
    </Router>
   
    )
  }
}

