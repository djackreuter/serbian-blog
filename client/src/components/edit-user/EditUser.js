import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { editUser } from '../../actions/userActions';
import { getCurrentUser } from '../../actions/userActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import _ from 'lodash';

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      bio: '',
      location: '',
      image: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
    if (prevProps.user.user) {
      const user = this.props.user.user;
      user.name = !_.isEmpty(user.name) ? user.name : '';
      user.email = !_.isEmpty(user.email) ? user.email : '';
      user.password = '';
      user.password2 = '';
      user.bio = !_.isEmpty(user.bio) ? user.bio : '';
      user.location = !_.isEmpty(user.location) ? user.location : '';
      user.image = '';

      if (prevProps.user !== this.props.user) {
        this.setState({
          name: user.name,
          email: user.email,
          password: user.password,
          password2: user.password2,
          bio: user.bio,
          location: user.location,
          image: user.image
        })
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
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      bio: this.state.bio,
      location: this.state.location,
      image: this.state.image
    }
    this.props.editUser(userData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Info</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  type="text"
                  error={errors.name}
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup 
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <TextFieldGroup 
                  type="password"
                  error={errors.password}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <TextFieldGroup 
                  type="password"
                  error={errors.password2}
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup 
                  rows="3"
                  cols="33"
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                />
                <TextFieldGroup 
                  type="text"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control-file"
                    name="image"
                    onChange={this.addImage}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditUser.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { editUser, getCurrentUser })(withRouter(EditUser));