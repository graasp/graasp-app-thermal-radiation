import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { green, yellow, orange } from '@material-ui/core/colors';
import { resetSettings, setIsPaused, toggleSideMenu } from '../../actions';
import { DEFAULT_THEME_DIRECTION } from '../../config/constants';

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  sideContainer: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
  },
  centerContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: { fontSize: '1.75em' },
  playButton: { color: green[800] },
  pauseButton: { color: yellow[800] },
  resetButton: { color: orange[800] },
}));

const AnimationControls = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isPaused } = useSelector(({ lab }) => lab);
  const theme = useTheme();

  const onClickPauseOrPlay = () => {
    dispatch(setIsPaused(!isPaused));
  };

  const reset = () => {
    dispatch(resetSettings());
  };

  const handleToggleSideMenu = (open) => {
    dispatch(toggleSideMenu(open));
  };

  return (
    <div className={classes.buttonContainer}>
      <div className={classes.sideContainer}>
        <Tooltip title={t('Close side menu')} placement="right">
          <IconButton onClick={() => handleToggleSideMenu(false)}>
            {theme.direction === DEFAULT_THEME_DIRECTION ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.centerContainer}>
        {isPaused ? (
          <Tooltip title={t('Play')} placement="left">
            <IconButton onClick={onClickPauseOrPlay} disabled={!isPaused}>
              <PlayCircleOutlineIcon
                className={clsx(classes.button, {
                  [classes.playButton]: isPaused,
                })}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={t('Pause')} placement="left">
            <IconButton onClick={onClickPauseOrPlay} disabled={isPaused}>
              <PauseCircleOutlineIcon
                className={clsx(classes.button, {
                  [classes.pauseButton]: !isPaused,
                })}
              />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={t('Reset')} placement="right">
          <IconButton onClick={reset}>
            <RotateLeftIcon
              className={clsx(classes.button, classes.resetButton)}
            />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.sideContainer} />
    </div>
  );
};

export default AnimationControls;
