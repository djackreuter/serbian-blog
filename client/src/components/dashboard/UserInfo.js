import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfo extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="card" style={{width: '18rem'}}>
        <img src={user.image} alt={user.name} className="card-img-top"/>
        <div className="card-body">
          <p className="card-text">
            <i className="fas fa-user text-info mr-1"></i>
            {user.name}
          </p>
          <p className="card-text">
            <i className="mr-1 text-info far fa-envelope"></i>
            {user.email}
          </p>
          <p className="card-text">
            <i className="mr-1 text-info fas fa-book-open"></i>
            {user.bio}
          </p>
          <p className="card-text">
            <i className="mr-1 fas fa-map-marker-alt text-info"></i>
            {user.location}
          </p>
        </div>
      </div>
    )
  }
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserInfo;
