import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deletePost, addLike } from '../../actions/postActions';

class PostPreview extends Component {

  render() {
    const { post, auth } = this.props;
    const postDate = new Date(post.date);
    return (
      <div className="card card-body mt-5">
        <div className="row">
          <div className="col-md-12">
            <p className="text-left">{postDate.toDateString()}</p>
            <p className="lead"><strong>{post.title}</strong></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="text-justify">{post.body.substring(0, 500)}...</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mt-4">
            <span>
              <i className='fas fa-thumbs-up'></i>
              <span className="mx-1">{post.likes.length}</span>
              <Link to={`/post/${post._id}`} className="btn btn-info ml-2">
                View Post
              </Link>
              {post.author._id === auth.user.id ? (
              <button onClick={this.onDeleteClick.bind(this, post._id)} type="button" className="btn btn-danger mr-1" >
                <i className="fa fa-times" />
              </button>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

PostPreview.defaultProps = {
  showActions: true
}

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike })(PostPreview);