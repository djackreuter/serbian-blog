import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAdminInfo } from '../../actions/userActions';
import avatar from '../common/empty-avatar.png';
import Spinner from '../common/spinner';

class About extends Component {
  componentDidMount() {
    this.props.getAdminInfo();
  }

  render() {
    const { admin, loading } = this.props.user;
    let aboutContent;
    if (admin === null || loading) {
      aboutContent = <Spinner />
    } else {
      aboutContent = (
        <div>
          {admin.image ? (<img src={admin.image} alt={admin.name} className="rounded-circle my-4" style={{width: '15rem'}} />) : (
            <img src={avatar} alt="" className="rounded-circle" style={{width: '15rem'}} />
          )}
          <p className="lead"><strong>{admin.name}</strong></p>
          <div className="row">
            <div className="col-md-10">
              <p>{admin.bio}</p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="row">
        <div className="col-md-12">
          {aboutContent}  
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
});

About.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getAdminInfo })(About);
