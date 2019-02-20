import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import TextFieldGroup from '../common/TextFieldGroup';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      image: '',
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
    const postData = {
      name: user.name,
      title: this.state.title,
      body: this.state.body,
      image: this.state.image
    }
    this.props.addPost(postData, this.props.history);
    this.setState({ title: '', body: '', image: '', errors: '' })
  }

  addImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      return this.setState({ image: event.target.result });
    }
    reader.readAsDataURL(file);
  }
  

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            New Post
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup 
                  placeholder="Title"
                  name="title"
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                />
              </div>
              <div className="form-group">
                <TextAreaFieldGroup 
                  placeholder="Create A Post"
                  name="body"
                  value={this.state.body}
                  onChange={this.onChange}
                  error={errors.body}
                  id="postFormArea"
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
                  name="image"
                  onChange={this.addImage}
                />
              </div>
              <button type="submit" className="btn btn-dark">Post</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(withRouter(PostForm));