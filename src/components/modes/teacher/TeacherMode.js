import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TeacherView from './TeacherView';
import { DEFAULT_VIEW, DASHBOARD_VIEW } from '../../../config/views';
import Loader from '../../common/Loader';
import { getActions, getAppInstanceResources } from '../../../actions';

// eslint-disable-next-line react/prefer-stateless-function
class TeacherMode extends Component {
  static propTypes = {
    appInstanceId: PropTypes.string,
    view: PropTypes.string,
    activity: PropTypes.bool,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    dispatchGetActions: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = {
    view: DEFAULT_VIEW,
    appInstanceId: null,
    activity: false,
    userId: null,
  };

  componentDidMount() {
    const {
      userId,
      dispatchGetAppInstanceResources,
      dispatchGetActions,
    } = this.props;

    // by default get the resources for this user
    dispatchGetAppInstanceResources({ userId });
    // by default get all actions for this user
    dispatchGetActions({ userId: [userId] });
  }

  componentDidUpdate({ appInstanceId: prevAppInstanceId }) {
    const {
      appInstanceId,
      dispatchGetAppInstanceResources,
      userId,
    } = this.props;
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      dispatchGetAppInstanceResources({ userId });
    }
  }

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

const mapStateToProps = ({ context, appInstanceResources }) => {
  const { userId, appInstanceId } = context;
  return {
    userId,
    appInstanceId,
    activity: Boolean(appInstanceResources.activity.length),
  };
};

const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
  dispatchGetActions: getActions,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherMode);

export default ConnectedComponent;
