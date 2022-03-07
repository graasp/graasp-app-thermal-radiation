import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TeacherView from './TeacherView';
import { DEFAULT_VIEW, DASHBOARD_VIEW } from '../../../config/views';
import Loader from '../../common/Loader';

// eslint-disable-next-line react/prefer-stateless-function
class TeacherMode extends Component {
  static propTypes = {
    view: PropTypes.string,
    activity: PropTypes.bool,
  };

  static defaultProps = {
    view: DEFAULT_VIEW,
    activity: false,
  };

  render() {
    const { view, activity } = this.props;
    if (activity) {
      return <Loader />;
    }
    switch (view) {
      case DASHBOARD_VIEW:
      case DEFAULT_VIEW:
      default:
        return <TeacherView />;
    }
  }
}

const mapStateToProps = ({ context }) => {
  const { userId, appInstanceId } = context;
  return {
    userId,
    appInstanceId,
  };
};

const ConnectedComponent = connect(mapStateToProps)(TeacherMode);

export default ConnectedComponent;
