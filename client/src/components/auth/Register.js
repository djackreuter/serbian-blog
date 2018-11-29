import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authAction';

class Register extends Component {
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
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                </div>
                <div className="form-group">
                  <textarea
                    rows="3"
                    cols="33"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.bio
                    })} 
                    placeholder="Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                  >
                  </textarea>
                  {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg" placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
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