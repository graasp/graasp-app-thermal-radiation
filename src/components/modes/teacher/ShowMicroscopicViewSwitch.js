import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { FORM_CONTROL_MIN_WIDTH } from '../../../config/constants';
import { setShowMicroscopicView } from '../../../actions';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: FORM_CONTROL_MIN_WIDTH,
    width: '100%',
  },
}));

function ShowMicroscopicViewSwitch() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const showMicroscopicView = useSelector(
    ({ appInstance }) => appInstance.content.settings?.showMicroscopicView,
  );

  const onSwitchToggle = () => {
    dispatch(setShowMicroscopicView(!showMicroscopicView));
  };

  const control = (
    <Switch
      checked={showMicroscopicView}
      onChange={onSwitchToggle}
      name="show microscopic view"
      color="primary"
    />
  );

  return (
    <FormControlLabel
      label={t('Show Microscopic View by default')}
      className={classes.formControl}
      control={control}
    />
  );
}

export default ShowMicroscopicViewSwitch;
