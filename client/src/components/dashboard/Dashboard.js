import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../actions/userActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired
}

export default connect(null, { getCurrentUser })(Dashboard);
