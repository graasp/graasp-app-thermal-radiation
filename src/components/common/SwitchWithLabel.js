import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'space-between',
    width: '55%',
  },
  label: {
    display: 'block',
  },
}));

const SwitchWithLabel = ({ isChecked, onToggle, switchLabel }) => {
  const classes = useStyles();

  const onSwitchToggle = () => {
    onToggle(!isChecked);
  };

  const Control = (
    <Switch
      checked={isChecked}
      onChange={onSwitchToggle}
      name={switchLabel}
      color="primary"
    />
  );

  const Label = (
    <Typography variant="body2" className={classes.label}>
      {switchLabel}
    </Typography>
  );

  return (
    <FormControlLabel
      className={classes.wrapper}
      control={Control}
      label={Label}
      labelPlacement="start"
    />
  );
};

SwitchWithLabel.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  switchLabel: PropTypes.string.isRequired,
};

export default SwitchWithLabel;
