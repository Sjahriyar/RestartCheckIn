import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';

import Admin from './components/admin';
// import Add from './components/add';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path = '/' component = {Admin} />

    </div>
  </Router>,
  document.getElementById('root'));
// registerServiceWorker();
