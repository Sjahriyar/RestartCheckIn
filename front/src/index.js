import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/currentTime'
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render((
  <Router>
      <div>
        <Route exact path='/' component={Home} />
      </div>
  </Router>),
  document.getElementById('root')
);
