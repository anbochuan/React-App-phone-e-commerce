import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProductProvider} from './context';

ReactDOM.render(
  <ProductProvider>
    {/* the application has access to all the routers that we created */}
    <Router>
      <App />
    </Router>
  </ProductProvider>,
  document.getElementById('root')
);
