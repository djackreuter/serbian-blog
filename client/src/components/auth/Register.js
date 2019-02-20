import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      accessCode: '',
      bio: '',
      location: '',
      image: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      }
    }
    return null;
  }

  onChange = (e) => {
    return this.setState({ [e.target.name]: e.target.value });
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      accessCode: this.state.accessCode,
      bio: this.state.bio,
      location: this.state.location,
      image: this.state.image
    }
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
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
                <TextFieldGroup 
                type="text"
                error={errors.accessCode}
                placeholder="Access Code"
                name="accessCode"
                value={this.state.accessCode}
                onChange={this.onChange}
              />
                <TextAreaFieldGroup 
                  rows="3"
                  cols="33"
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  error={errors.bio}
                  onChange={this.onChange}
                />
                <TextFieldGroup 
                  type="text"
                  name="location"
                  placeholder="Location"
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));