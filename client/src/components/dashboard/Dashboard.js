import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../actions/userActions';
import Spinner from '../common/spinner';
import UserActions from './UserActions';
import UserInfo from './UserInfo';

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
          <UserActions />
          <UserInfo user={user} />
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-4">
            Dashboard
          </h1>
            {dashboardContent}
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
