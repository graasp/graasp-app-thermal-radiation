import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { toggleSettings } from '../../../actions';
import Settings from './Settings';
import Main from '../../common/Main';
import { MAXIMUM_Z_INDEX } from '../../../config/constants';
import Lab from '../../lab/Lab';

const styles = (theme) => ({
  message: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: theme.status.danger.background[500],
    color: theme.status.danger.color,
  },
  fab: {
    zIndex: MAXIMUM_Z_INDEX,
    margin: theme.spacing(),
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

// eslint-disable-next-line react/prefer-stateless-function
export class TeacherView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchToggleSettings: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      message: PropTypes.string.isRequired,
      fab: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    // extract properties from the props object
    const { classes, t, dispatchToggleSettings } = this.props;
    return (
      <Main>
        <Settings />
        <Fab
          color="primary"
          aria-label={t('Settings')}
          className={classes.fab}
          onClick={() => {
            dispatchToggleSettings(true);
          }}
        >
          <SettingsIcon />
        </Fab>

        <Lab />
      </Main>
    );
  }
}

const mapDispatchToProps = {
  dispatchToggleSettings: toggleSettings,
};

const ConnectedComponent = connect(null, mapDispatchToProps)(TeacherView);

const StyledComponent = withStyles(styles)(ConnectedComponent);

export default withTranslation()(StyledComponent);
