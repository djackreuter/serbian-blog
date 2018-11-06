import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      bio: '',
      location: '',
      image: ''
    }
  }

  onChange = (e) => {
    return this.setState({ [e.target.name]: e.target.value });
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
    axios.post('/api/users/register', newUser).then((res) => {
      console.log(res);
    }).catch((err) => console.log(err, newUser));
  }

  render() {
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
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg" placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg" placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="3"
                    cols="33"
                    className="form-control form-control-lg" placeholder="Bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.onChange}
                  ></textarea>
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
                    value={this.state.image}
                    onChange={this.onChange}
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
