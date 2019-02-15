import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img 
              src={comment.image} 
              className="rounded-circle mb-1" 
              alt={comment.name}
              style={{width: '5rem'}} 
            />
            <p className="text-center mb-1">{comment.name}</p>
          </div>
          <div className="col-md-9">
            <p className="lead text-left">{comment.text}</p>
          </div>
          <div className="col-md-1">
            {auth.user.admin ? (
              <button onClick={this.onDeleteClick.bind(this, postId, comment._id)} type="button" className="btn btn-danger mr-1" >
              <i className="fa fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { deleteComment })(CommentItem);