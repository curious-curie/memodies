import React, {Component} from 'react';
import AddButton from './AddButton';
import { Link } from 'react-router-dom';
import Home from './Home';
import New from './New'
import Header from './Header';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";



export default class Main extends Component {

  constructor(props){
    super(props);
}





  render() {
    return (
      
    <div>
      
        <Home/>
       <Link to = "/new"><AddButton/></Link>

  
    </div>
   
   
    )
  }
}

