import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { editPost } from '../../actions/postActions';
import { getPost } from '../../actions/postActions';
import _ from 'lodash';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      image: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
    if (prevProps.post.post) {
      const post = this.props.post.post;
      post.title = !_.isEmpty(post.title) ? post.title : '';
      post.body = !_.isEmpty(post.body) ? post.body : '';
      post.image = '';

      if (prevProps.post.post !== this.props.post.post) {
        this.setState({
          title: post.title,
          body: post.body,
          image: post.image
        });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  addImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      return this.setState({ image: event.target.result });
    }
    reader.readAsDataURL(file);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const postData = {
      id: this.props.post.post._id,
      title: this.state.title,
      body: this.state.body,
      image: this.state.image
    }
    this.props.editPost(postData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Edit Post
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
              <button type="submit" className="btn btn-dark">Update</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

EditPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(mapStateToProps, { editPost, getPost })(withRouter(EditPost));