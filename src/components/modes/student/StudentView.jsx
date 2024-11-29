import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Main from '../../common/Main';
import Lab from '../../lab/Lab';

const styles = (theme) => ({
  main: {
    textAlign: 'center',
    margin: theme.spacing(),
  },
  message: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: theme.status.danger.background[500],
    color: theme.status.danger.color,
  },
});

export const StudentView = () => (
  <Main>
    <Lab />
  </Main>
);

StudentView.propTypes = {
  classes: PropTypes.shape({
    main: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(StudentView);

export default withTranslation()(StyledComponent);
