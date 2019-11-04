import React from 'react';
import './App.css';
import AddButton from './components/AddButton';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import New from './components/New'
import Header from './components/Header';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {


  
  return (

      
    <Router>
      <Header/>
    <Route exact path = "/" component = {Home}/>
    <Route path = "/new" component = {New}/>
    <div>
      
  
       <Link to = "/new"><AddButton/></Link>

  
    </div>
    </Router>
  

  );
}

export default App;
