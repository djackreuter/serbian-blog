import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <PostItem post={post} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      )
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts" className="btn btn-light mt-3 mb-3">
                Back To Posts
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
});

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getPost })(Post);
