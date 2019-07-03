import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'; 
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Details from './components/Details';
import Default from './components/Default';
import Modal from './components/Modal';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* import all the components */}
        <Navbar></Navbar> {/* Navbar should display on all the pages */}
        <Switch> {/* from Switch component, we start to group our routes */}
          <Route exact path="/" component={ProductList}></Route>
          <Route path="/details" component={Details}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route component={Default}></Route>
        </Switch>
        <Modal></Modal>
      </React.Fragment>
    );
  }
}

export default App;
