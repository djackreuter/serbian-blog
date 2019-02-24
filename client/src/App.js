import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/common/PrivateRoute';

import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentUser } from './actions/userActions';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import EditUser from './components/edit-user/EditUser';
import PostForm from './components/posts/PostForm';
import NotFound from './components/not-found/NotFound';
import About from './components/about/About';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  console.log('call in App.js');
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(clearCurrentUser())
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={ Posts } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/add-post" component={ PostForm } />
              <Route exact path="/posts" component={ Posts } />
              <Route exact path="/about" component={ About } /> 
              <Route exact path="/post/:id" component={ Post } />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-user" component={ EditUser } />
              </Switch>
              <Route exact path="/not-found" component={ NotFound } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
