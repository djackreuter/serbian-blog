import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../actions/userActions';
import Spinner from '../common/spinner';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    const { user, loading } = this.props.user;
    let dashboardContent;
    if (user === null || loading) {
      dashboardContent = <Spinner />
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
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
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4">
            {dashboardContent}
          </h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user
})

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getCurrentUser })(Dashboard);
