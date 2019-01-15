import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfo extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="col-md-6">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <img style={{width: '10rem'}} src={user.image} alt={user.name} />
          </li>
          <li className="list-group-item">
            <i className="fas fa-user text-info mr-1"></i>
            {user.name}
          </li>
          <li className="list-group-item">
            <i className="mr-1 text-info far fa-envelope"></i>
            {user.email}
          </li>
          <li className="list-group-item">
            <i className="mr-1 text-info fas fa-book-open"></i>
            {user.bio}
          </li>
          <li className="list-group-item">
            <i className="mr-1 fas fa-map-marker-alt text-info"></i>
            {user.location}
          </li>
        </ul>
      </div>
    )
  }
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserInfo;
