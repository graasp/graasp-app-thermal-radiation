import { FormControlLabel, makeStyles, Switch } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  DEFAULT_SHOW_THERMOMETER_LABELS,
  FORM_CONTROL_MIN_WIDTH,
} from '../../../config/constants';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: FORM_CONTROL_MIN_WIDTH,
    width: '100%',
  },
}));

const ShowThermometerLabelsSwitch = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const showThermometerLabels = useSelector(
    () => DEFAULT_SHOW_THERMOMETER_LABELS,
  );

  const onToggle = () => {
    // dispatch(setShowThermometerLabels(!showThermometerLabels));
  };

  const control = (
    <Switch
      checked={showThermometerLabels}
      onChange={onToggle}
      name="show thermometer labels"
      color="primary"
    />
  );

  return (
    <FormControlLabel
      label={t('Show Thermometer Labels')}
      className={classes.formControl}
      control={control}
    />
  );
};

export default ShowThermometerLabelsSwitch;
