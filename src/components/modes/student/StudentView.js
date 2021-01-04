import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { addQueryParamsToUrl } from '../../../utils/url';
import Main from '../../common/Main';
import { MODES } from '../../../config/settings';

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

export const StudentView = ({ t, classes }) => (
  <Main>
    <Paper className={classes.message}>
      {t(
        'This is the student view. Switch to the teacher view by clicking on the URL below.',
      )}
      <a href={addQueryParamsToUrl({ mode: MODES.TEACHER })}>
        <pre>
          {`${window.location.host}/${addQueryParamsToUrl({
            mode: MODES.TEACHER,
          })}`}
        </pre>
      </a>
    </Paper>
  </Main>
);

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    main: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(StudentView);

export default withTranslation()(StyledComponent);
