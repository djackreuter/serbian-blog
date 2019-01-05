import React from 'react';
import { Link } from 'react-router-dom';

const UserActions = () => {
  return (
    <div>
      <Link to="/add-post" className="btn btn-light col-md-4 ml-2" >
        <i className="fas fa-pencil-alt text-info mr-1"></i>
        Add Post
      </Link>
      <Link to="/manage-posts" className="btn btn-light col-md-4 mr-2" >
        <i className="fas fa-edit text-info mr-1"></i>
          Manage Posts
      </Link>
      <Link to="/edit-user" className="btn btn-light col-md-4 ml-2" >
        <i className="fas fa-user-circle text-info mr-1"></i>
          Edit Profile
      </Link>
    </div>
  )
}

export default UserActions;