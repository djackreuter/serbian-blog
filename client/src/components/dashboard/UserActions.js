import React from 'react';
import { Link } from 'react-router-dom';
import ManagePostsModal from './ManagePostsModal';

const UserActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/add-post" className="btn btn-light" >
        <i className="fas fa-pencil-alt text-info mr-1"></i>
        Add Post
      </Link>
      <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal" >
        <i className="fas fa-edit text-info mr-1"></i>
          Manage Posts
      </button>
      <Link to="/edit-user" className="btn btn-light" >
        <i className="fas fa-user-circle text-info mr-1"></i>
          Edit Profile
      </Link>
      <ManagePostsModal />
    </div>
  )
}

export default UserActions;