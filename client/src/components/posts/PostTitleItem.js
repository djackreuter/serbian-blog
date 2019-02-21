import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';

class PostTitleItem extends Component {

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  closeModal() {
    document.getElementById('exampleModal').modal('hide');
  }

  render() {
    const { post, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-12">
            <br />
            <p className="lead">{post.title}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <span>
              <Link to={`/post/${post._id}`} onClick={this.closeModal.bind(this)} className="btn btn-info mr-1">
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

PostTitleItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostTitleItem);