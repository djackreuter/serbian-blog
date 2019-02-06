import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    }

  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newComment = {
      text: this.state.text,
      name: user.name
    }
    this.props.addComment(newComment, this.props.postId, this.props.history);
    this.setState({ text: '', errors: '' });
  }  

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Leave a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup 
                  placeholder="Reply to post..."
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <a href="/auth/google" className="button">
                <div>
                  <span className="svgIcon t-popup-svg">
                    <svg
                      className="svgIcon-use"
                      width="25"
                      height="37"
                      viewBox="0 0 25 25"
                    >
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                          fill="#34A853"
                        />
                        <path
                          d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                          fill="#EA4335"
                        />
                      </g>
                    </svg>
                  </span>
                  <span className="button-label">Sign in with Google</span>
                </div>
              </a>
              <button type="submit" className="btn btn-dark">Comment</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(withRouter(CommentForm));