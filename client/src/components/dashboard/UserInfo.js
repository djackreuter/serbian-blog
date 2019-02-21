import React, { Component } from 'react';
import PropTypes from 'prop-types';
import avatar from '../common/empty-avatar.png';

class UserInfo extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="col-md-6">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {user.image ? (<img style={{width: '15rem'}} src={user.image} className="rounded-circle" alt={user.name} />) : (<img style={{width: '15rem'}} className="rounded-circle" src={avatar} alt='' />)}
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
