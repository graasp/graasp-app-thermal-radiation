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
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { green, yellow, orange } from '@material-ui/core/colors';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  toggleSideMenu,
  toggleElectrons,
  toggleWavelengthDistribution,
  setIsPaused,
  setIsMicroscopic,
  setShowGrid,
  setShowEmittedLines,
  resetSettings,
  setScaleUnit,
  postAction,
} from '../../actions';
import SwitchWithLabel from './SwitchWithLabel';
import {
  DRAWER_WIDTH,
  DEFAULT_THEME_DIRECTION,
  GRID_UNIT_SQUARE_LENGTH,
  BACKGROUND_COLOR,
  GRID_AXES_COLOR,
  GRID_AXES_STROKE_WIDTH,
  SCALE_UNITS,
  MICROSCOPIC_STRING,
  MACROSCOPIC_STRING,
  KELVIN_STRING,
  CELSIUS_STRING,
  PAUSED_STRING,
  PLAYING_STRING,
} from '../../config/constants';
import SwitchWithTwoLabels from './SwitchWithTwoLabels';
import {
  CLICKED_PAUSE,
  CLICKED_PLAY,
  CLICKED_RESET,
  TOGGLED_ELECTRONS_OFF,
  TOGGLED_ELECTRONS_ON,
  TOGGLED_GRID_OFF,
  TOGGLED_GRID_ON,
  TOGGLED_RADIATION_OFF,
  TOGGLED_RADIATION_ON,
  TOGGLED_TEMPERATURE_SCALE,
  TOGGLED_VIEW,
  TOGGLED_WAVELENGTH_DISTRIBUTION_OFF,
  TOGGLED_WAVELENGTH_DISTRIBUTION_ON,
} from '../../config/verbs';

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
  resetButton: { color: orange[800] },
  legendDivider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  legend: {
    fontStyle: 'italic',
  },
  gridUnitSquare: {
    height: GRID_UNIT_SQUARE_LENGTH,
    width: GRID_UNIT_SQUARE_LENGTH,
    backgroundColor: BACKGROUND_COLOR,
    display: 'inline-block',
    borderColor: GRID_AXES_COLOR,
    borderWidth: GRID_AXES_STROKE_WIDTH,
    borderStyle: 'solid',
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
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
      legend: PropTypes.string.isRequired,
      legendDivider: PropTypes.string.isRequired,
      resetButton: PropTypes.string.isRequired,
      gridUnitSquare: PropTypes.string.isRequired,
    }).isRequired,
    theme: PropTypes.shape({
      direction: PropTypes.string.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    electrons: PropTypes.bool.isRequired,
    dispatchToggleElectrons: PropTypes.func.isRequired,
    dispatchToggleWavelengthDistribution: PropTypes.func.isRequired,
    wavelengthDistribution: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired,
    dispatchSetIsPaused: PropTypes.func.isRequired,
    isMicroscopic: PropTypes.bool.isRequired,
    dispatchSetIsMicroscopic: PropTypes.func.isRequired,
    showGrid: PropTypes.bool.isRequired,
    dispatchSetShowEmittedLines: PropTypes.func.isRequired,
    showEmittedLines: PropTypes.bool.isRequired,
    dispatchSetShowGrid: PropTypes.func.isRequired,
    dispatchResetSettings: PropTypes.func.isRequired,
    currentlyShowingKelvinScale: PropTypes.bool.isRequired,
    dispatchSetScaleUnit: PropTypes.func.isRequired,
    dispatchPostAction: PropTypes.func.isRequired,
  };

  handleToggleSideMenu = (open) => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  onClickPauseOrPlay = () => {
    const {
      dispatchSetIsPaused,
      dispatchPostAction,
      isPaused,
      isMicroscopic,
      electrons,
      currentlyShowingKelvinScale,
      showGrid,
      showEmittedLines,
      wavelengthDistribution,
    } = this.props;
    const appSettings = {
      view: isMicroscopic ? MICROSCOPIC_STRING : MACROSCOPIC_STRING,
      electrons,
      scale: currentlyShowingKelvinScale ? KELVIN_STRING : CELSIUS_STRING,
      grid: showGrid,
      radiation: showEmittedLines,
      wavelengthDistribution,
    };
    if (isPaused) {
      dispatchPostAction({ verb: CLICKED_PLAY, data: { ...appSettings } });
    } else {
      dispatchPostAction({ verb: CLICKED_PAUSE, data: { ...appSettings } });
    }
    dispatchSetIsPaused(!isPaused);
  };

  reset = () => {
    const { dispatchResetSettings, dispatchPostAction } = this.props;
    dispatchResetSettings();
    dispatchPostAction({ verb: CLICKED_RESET });
  };

  onToggleScaleUnit = () => {
    const {
      dispatchSetScaleUnit,
      currentlyShowingKelvinScale,
      dispatchPostAction,
      isPaused,
    } = this.props;
    const applicationState = isPaused ? PAUSED_STRING : PLAYING_STRING;
    if (currentlyShowingKelvinScale) {
      dispatchSetScaleUnit(SCALE_UNITS.CELSIUS);
      dispatchPostAction({
        verb: TOGGLED_TEMPERATURE_SCALE,
        data: { newScale: CELSIUS_STRING, applicationState },
      });
    } else {
      dispatchSetScaleUnit(SCALE_UNITS.KELVIN);
      dispatchPostAction({
        verb: TOGGLED_TEMPERATURE_SCALE,
        data: { newScale: KELVIN_STRING, applicationState },
      });
    }
  };

  renderPlayAndPauseButtons = () => {
    const { isPaused, classes, t } = this.props;
    return (
      <div className={classes.buttons}>
        {isPaused ? (
          <Tooltip title={t('Play')}>
            <span>
              <IconButton
                onClick={this.onClickPauseOrPlay}
                disabled={!isPaused}
              >
                <PlayCircleOutlineIcon
                  className={clsx(classes.button, {
                    [classes.playButton]: isPaused,
                  })}
                />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
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
        )}
        <Tooltip title={t('Reset')}>
          <span>
            <IconButton onClick={this.reset}>
              <RotateLeftIcon
                className={clsx(classes.button, classes.resetButton)}
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

  handleRadiationToggle = () => {
    const {
      dispatchSetShowEmittedLines,
      showEmittedLines,
      dispatchToggleWavelengthDistribution,
    } = this.props;
    dispatchSetShowEmittedLines(!showEmittedLines);
    dispatchToggleWavelengthDistribution(false);
  };

  render() {
    const {
      classes,
      showSideMenu,
      electrons,
      dispatchToggleElectrons,
      t,
      wavelengthDistribution,
      dispatchToggleWavelengthDistribution,
      isMicroscopic,
      dispatchSetIsMicroscopic,
      showGrid,
      showEmittedLines,
      dispatchSetShowGrid,
      currentlyShowingKelvinScale,
      dispatchPostAction,
      isPaused,
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
              <SwitchWithTwoLabels
                leftLabel={t('Macroscopic View')}
                rightLabel={t('Microscopic View')}
                isChecked={isMicroscopic}
                onSwitchToggle={() => {
                  const applicationState = isPaused
                    ? PAUSED_STRING
                    : PLAYING_STRING;
                  dispatchPostAction({
                    verb: TOGGLED_VIEW,
                    data: {
                      applicationState,
                      newView: isMicroscopic
                        ? MACROSCOPIC_STRING
                        : MICROSCOPIC_STRING,
                    },
                  });
                  dispatchSetIsMicroscopic(!isMicroscopic);
                }}
              />
            </div>
            <div className={classes.switchContainer}>
              <SwitchWithLabel
                switchLabel={t('Electrons')}
                isChecked={electrons}
                onToggle={dispatchToggleElectrons}
                disabled={!isMicroscopic}
                toggleOffAction={TOGGLED_ELECTRONS_OFF}
                toggleOnAction={TOGGLED_ELECTRONS_ON}
              />
            </div>
            <div className={classes.switchContainer}>
              <SwitchWithTwoLabels
                leftLabel={t('Celsius')}
                rightLabel={t('Kelvin')}
                isChecked={currentlyShowingKelvinScale}
                onSwitchToggle={this.onToggleScaleUnit}
              />
            </div>
            <div className={classes.switchContainer}>
              <SwitchWithLabel
                switchLabel={t('Grid')}
                isChecked={showGrid}
                onToggle={dispatchSetShowGrid}
                toggleOffAction={TOGGLED_GRID_OFF}
                toggleOnAction={TOGGLED_GRID_ON}
              />
            </div>
            <div className={classes.switchContainer}>
              <SwitchWithLabel
                switchLabel={t('Radiation')}
                isChecked={showEmittedLines}
                onToggle={this.handleRadiationToggle}
                toggleOffAction={TOGGLED_RADIATION_OFF}
                toggleOnAction={TOGGLED_RADIATION_ON}
              />
            </div>
            <div className={classes.switchContainer}>
              <SwitchWithLabel
                switchLabel={t('Wavelength Distribution')}
                isChecked={wavelengthDistribution}
                onToggle={dispatchToggleWavelengthDistribution}
                disabled={!showEmittedLines}
                toggleOffAction={TOGGLED_WAVELENGTH_DISTRIBUTION_OFF}
                toggleOnAction={TOGGLED_WAVELENGTH_DISTRIBUTION_ON}
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
  electrons: lab.electrons,
  wavelengthDistribution: lab.wavelengthDistribution,
  isPaused: lab.isPaused,
  isMicroscopic: lab.isMicroscopic,
  showGrid: lab.showGrid,
  showEmittedLines: lab.showEmittedLines,
  currentlyShowingKelvinScale: lab.scaleUnit === SCALE_UNITS.KELVIN,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  dispatchToggleElectrons: toggleElectrons,
  dispatchToggleWavelengthDistribution: toggleWavelengthDistribution,
  dispatchSetIsPaused: setIsPaused,
  dispatchSetIsMicroscopic: setIsMicroscopic,
  dispatchSetShowGrid: setShowGrid,
  dispatchSetShowEmittedLines: setShowEmittedLines,
  dispatchResetSettings: resetSettings,
  dispatchSetScaleUnit: setScaleUnit,
  dispatchPostAction: postAction,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default withTranslation()(StyledComponent);
