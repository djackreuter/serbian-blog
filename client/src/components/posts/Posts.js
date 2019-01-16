import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner';
import PostForm from './PostForm';

class Posts extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
          </div>
        </div> 
      </div>
    )
  }
}

export default Posts;