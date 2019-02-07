import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/spinner';
import PostForm from './PostForm';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />
    } else if (posts.length === 0) {
      postContent = 'There are no posts to show...'
    } else {
      postContent = <PostFeed posts={posts} />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {postContent}
          </div>
        </div> 
      </div>
    )
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);