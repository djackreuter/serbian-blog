import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';
import GoogleLogin from 'react-google-login';
import { setGoogleUser } from '../../actions/authActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      disabled: true,
      errors: {}
    }

  }

  componentDidMount() {
    this.setState({ disabled: !this.props.auth.isAuthenticated });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
    if (prevProps.auth !== this.props.auth) {
      this.setState({ disabled: !this.props.auth.isAuthenticated })
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { user: { name, image } } = this.props.auth;
    const newComment = {
      text: this.state.text,
      name,
      image
    }
    this.props.addComment(newComment, this.props.postId, this.props.history);
    this.setState({ text: '', errors: '' });
  }

  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    this.props.setGoogleUser(response.profileObj);
  }

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    let googleContent;
    if (isAuthenticated) {
      googleContent = null;
    } else {
      googleContent = (
        <GoogleLogin
          clientId="72757539553-0le8q21b54ga1v1pt1mv7jcsq6omff0f.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        >
        <span> Login with Google to comment</span>
        </GoogleLogin>
      )
    }
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
                  disabled={this.state.disabled}
                />
              </div>
              {googleContent}
              {isAuthenticated ? (<button type="submit" className="btn btn-dark">Comment</button>) : null}
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
  addComment: PropTypes.func.isRequired,
  setGoogleUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment, setGoogleUser })(withRouter(CommentForm));