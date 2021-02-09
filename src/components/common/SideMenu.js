import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { green, yellow } from '@material-ui/core/colors';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  toggleSideMenu,
  toggleElectrons,
  toggleSpectrumBar,
  setIsPaused,
} from '../../actions';
import SwitchWithLabel from './SwitchWithLabel';
import { DRAWER_WIDTH, DEFAULT_THEME_DIRECTION } from '../../config/constants';

const styles = (theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  contentWrapper: {
    margin: theme.spacing(2),
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: { textAlign: 'center' },
  button: { fontSize: '2em' },
  playButton: { color: green[800] },
  pauseButton: { color: yellow[800] },
});

class SideMenu extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      drawerHeader: PropTypes.string.isRequired,
      drawerPaper: PropTypes.string.isRequired,
      contentWrapper: PropTypes.string.isRequired,
      switchContainer: PropTypes.string.isRequired,
      playButton: PropTypes.string.isRequired,
      pauseButton: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
      buttons: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.shape({
      direction: PropTypes.string.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    electrons: PropTypes.bool.isRequired,
    dispatchToggleElectrons: PropTypes.func.isRequired,
    dispatchToggleSpectrumBar: PropTypes.func.isRequired,
    spectrumBar: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    dispatchSetIsPause: PropTypes.func.isRequired,
  };

  handleToggleSideMenu = (open) => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  onClickPauseOrPlay = () => {
    const { dispatchSetIsPause, isPaused } = this.props;
    dispatchSetIsPause(!isPaused);
  };

  renderPlayAndPauseButtons = () => {
    const { isPaused, classes, t } = this.props;
    return (
      <div className={classes.buttons}>
        <Tooltip title={t('Pause')}>
          <span>
            <IconButton onClick={this.onClickPauseOrPlay} disabled={isPaused}>
              <PauseCircleOutlineIcon
                className={clsx(classes.button, {
                  [classes.pauseButton]: !isPaused,
                })}
              />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={t('Play')}>
          <span>
            <IconButton onClick={this.onClickPauseOrPlay} disabled={!isPaused}>
              <PlayCircleOutlineIcon
                className={clsx(classes.button, {
                  [classes.playButton]: isPaused,
                })}
              />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    );
  };

  renderDrawerHeader = () => {
    const { classes, theme, t } = this.props;
    return (
      <>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleToggleSideMenu(false)}>
            {theme.direction === DEFAULT_THEME_DIRECTION ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h5">{t('Observe')}</Typography>
        </div>
        <Divider />
      </>
    );
  };

  render() {
    const {
      classes,
      showSideMenu,
      electrons,
      dispatchToggleElectrons,
      t,
      spectrumBar,
      dispatchToggleSpectrumBar,
    } = this.props;

    return (
      <>
        <CssBaseline />
        <Drawer
          variant="persistent"
          anchor="right"
          open={showSideMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {this.renderDrawerHeader()}
          <div className={classes.contentWrapper}>
            {this.renderPlayAndPauseButtons()}
            <div className={classes.switchContainer}>
              <SwitchWithLabel
                switchLabel={t('Electrons')}
                isChecked={electrons}
                onToggle={dispatchToggleElectrons}
              />
            </div>

            <div className={classes.switchContainer}>
              <SwitchWithLabel
                switchLabel={t('Spectrum Bar')}
                isChecked={spectrumBar}
                onToggle={dispatchToggleSpectrumBar}
              />
            </div>
          </div>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = ({ layout, lab }) => ({
  showSideMenu: layout.showSideMenu,
  electrons: layout.lab.electrons,
  spectrumBar: layout.lab.spectrumBar,
  isPaused: lab.isPaused,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  dispatchToggleElectrons: toggleElectrons,
  dispatchToggleSpectrumBar: toggleSpectrumBar,
  dispatchSetIsPause: setIsPaused,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
