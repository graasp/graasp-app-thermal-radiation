import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Divider, makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  toggleElectrons,
  toggleWavelengthDistribution,
  setIsMicroscopic,
  setShowGrid,
  setShowEmittedLines,
  setScaleUnit,
} from '../../actions';
import SwitchWithLabel from './SwitchWithLabel';
import { DRAWER_WIDTH, SCALE_UNITS } from '../../config/constants';
import SwitchWithTwoLabels from './SwitchWithTwoLabels';
import {
  TOGGLED_ELECTRONS_OFF,
  TOGGLED_ELECTRONS_ON,
  TOGGLED_GRID_OFF,
  TOGGLED_GRID_ON,
  TOGGLED_RADIATION_OFF,
  TOGGLED_RADIATION_ON,
  TOGGLED_WAVELENGTH_DISTRIBUTION_OFF,
  TOGGLED_WAVELENGTH_DISTRIBUTION_ON,
} from '../../config/verbs';
import AnimationControls from './AnimationControls';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  contentWrapper: {
    margin: theme.spacing(1.5, 2),
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legend: {
    fontStyle: 'italic',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
}));

const SideMenu = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    scaleUnit,
    showEmittedLines,
    wavelengthDistribution,
    showGrid,
    isMicroscopic,
    electrons,
  } = useSelector(({ lab }) => lab);
  const { showSideMenu } = useSelector(({ layout }) => layout);
  const currentlyShowingKelvinScale = scaleUnit === SCALE_UNITS.KELVIN;

  const onToggleScaleUnit = () => {
    if (currentlyShowingKelvinScale) {
      dispatch(setScaleUnit(SCALE_UNITS.CELSIUS));
    } else {
      dispatch(setScaleUnit(SCALE_UNITS.KELVIN));
    }
  };

  const handleRadiationToggle = () => {
    dispatch(setShowEmittedLines(!showEmittedLines));
    dispatch(toggleWavelengthDistribution(false));
  };

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
        <div className={classes.contentWrapper}>
          <AnimationControls />
          <Divider className={classes.divider} />
          <div className={classes.switchContainer}>
            <SwitchWithTwoLabels
              leftLabel={t('Macroscopic View')}
              rightLabel={t('Microscopic View')}
              isChecked={isMicroscopic}
              onSwitchToggle={() => {
                dispatch(setIsMicroscopic(!isMicroscopic));
              }}
            />
          </div>
          <div className={classes.switchContainer}>
            <SwitchWithLabel
              switchLabel={t('Electrons')}
              isChecked={electrons}
              onToggle={(show) => dispatch(toggleElectrons(show))}
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
              onSwitchToggle={onToggleScaleUnit}
            />
          </div>
          <div className={classes.switchContainer}>
            <SwitchWithLabel
              switchLabel={t('Grid')}
              isChecked={showGrid}
              onToggle={(show) => dispatch(setShowGrid(show))}
              toggleOffAction={TOGGLED_GRID_OFF}
              toggleOnAction={TOGGLED_GRID_ON}
            />
          </div>
          <div className={classes.switchContainer}>
            <SwitchWithLabel
              switchLabel={t('Radiation')}
              isChecked={showEmittedLines}
              onToggle={handleRadiationToggle}
              toggleOffAction={TOGGLED_RADIATION_OFF}
              toggleOnAction={TOGGLED_RADIATION_ON}
            />
          </div>
          <div className={classes.switchContainer}>
            <SwitchWithLabel
              switchLabel={t('Wavelength Distribution')}
              isChecked={wavelengthDistribution}
              onToggle={(show) => dispatch(toggleWavelengthDistribution(show))}
              disabled={!showEmittedLines}
              toggleOffAction={TOGGLED_WAVELENGTH_DISTRIBUTION_OFF}
              toggleOnAction={TOGGLED_WAVELENGTH_DISTRIBUTION_ON}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
