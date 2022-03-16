import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentView from './StudentView';
import { DEFAULT_VIEW, FEEDBACK_VIEW } from '../../../config/views';
import Loader from '../../common/Loader';

// eslint-disable-next-line react/prefer-stateless-function
class StudentMode extends Component {
  static propTypes = {
    view: PropTypes.string,
    activity: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    view: DEFAULT_VIEW,
  };

  render() {
    const { view, activity } = this.props;
    if (activity) {
      return <Loader />;
    }
    switch (view) {
      case FEEDBACK_VIEW:
      case DEFAULT_VIEW:
      default:
        return <StudentView />;
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

const ConnectedComponent = connect(mapStateToProps)(StudentMode);

export default ConnectedComponent;
