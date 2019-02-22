import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { addLike } from '../../actions/postActions';
import ReactTooltip from 'react-tooltip';

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    }
  }

  componentDidMount() {
    this.setState({ disabled: !this.props.auth.isAuthenticated });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth !== this.props.auth) {
      this.setState({ disabled: !this.props.auth.isAuthenticated });
    }
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post } = this.props;
    const postDate = new Date(post.date);
    return (
      <div className="card card-body mt-4">
        <div className="row">
          <div className="col-md-12">
            <p className="text-left">{postDate.toDateString()}</p>
            <h2 className="display-4">{post.title}</h2>
          </div>
        </div>
        <div className="row">
          {post.image ? (<img src={post.image} className="img-fluid my-4 mx-auto" style={{height: '50vh'}} alt="" />) : null}
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="text-left">{post.body}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mt-4">
            <span>
              {this.state.disabled ? (
                <span data-tip="Login with Google to like">
                  <button className="btn btn-light mr-1" type="button" disabled>
                    <i className='fas fa-thumbs-up'></i>
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <ReactTooltip />
                </span>
              ) : (
                <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                  <i className={classnames('fas fa-thumbs-up', {
                    'text-info': this.findUserLike(post.likes)
                  })}></i>
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike })(PostItem);