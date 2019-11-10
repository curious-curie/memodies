import React, {Component} from 'react';
import AddButton from './AddButton';
import { Link } from 'react-router-dom';
import Home from './Home';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


const Main = () => {
  return (
    <div>
     
      
      <Home/>
     <Link to = "/new"><AddButton/></Link>


  
    </div>
  );
};

export default Main;