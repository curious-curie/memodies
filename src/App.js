import React from 'react';
import './App.css';
import AddButton from './components/AddButton';
import { Link } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search'
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
      
    <Router>
      <Header/>
    <Route exact path = "/" component = {Home}/>
    <Route path = "/new" component = {Search}/>
    <div>
      
  
       <Link to = "/new"><AddButton/></Link>

  
    </div>
    </Router>
  

  );
}

export default App;
