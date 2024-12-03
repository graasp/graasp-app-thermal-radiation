import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ReactComponent as GraaspLogo } from '../../resources/logo.svg';
import { toggleLoadingScreen } from '../../actions';

const styles = (theme) => ({
  loader: {
    position: 'fixed',
    background: theme.palette.primary.main,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  logo: {
    display: 'block',
    height: '10rem',
    marginBottom: theme.spacing(4),
    alignSelf: 'center',
  },
  progressBar: {
    width: '50%',
    minWidth: 200,
    margin: '0 auto',
    height: 10,
    borderRadius: 2,
  },
  bar: {
    backgroundColor: '#fff',
  },
});

class LoadingScreen extends Component {
  static propTypes = {
    dispatchToggleLoader: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      loader: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      progressBar: PropTypes.string.isRequired,
      bar: PropTypes.string.isRequired,
    }).isRequired,
  };

  // interval to refresh loader in ms
  static loadingInterval = 10;

  // time to show loading screen in ms
  static loadingTime = 2000;

  // how much to advance the progress bar every loading interval
  static progressStepSize = 1;

  state = {
    progress: 0,
  };

  componentDidMount() {
    const { dispatchToggleLoader } = this.props;

    // show loading screen
    setTimeout(() => {
      dispatchToggleLoader(false);
    }, LoadingScreen.loadingTime);

    this.loading = setInterval(() => {
      this.setState((state) => ({
        progress: state.progress + LoadingScreen.progressStepSize,
      }));
    }, LoadingScreen.loadingInterval);
  }

  componentDidUpdate() {
    const { progress } = this.state;
    // clear loading function
    if (progress >= 100) {
      clearInterval(this.loading);
    }
  }

  render() {
    const { progress } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.loader}>
        <GraaspLogo className={classes.logo} />
        <LinearProgress
          classes={{ root: classes.progressBar, bar: classes.bar }}
          variant="determinate"
          value={progress}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  dispatchToggleLoader: toggleLoadingScreen,
};

const ConnectedApp = connect(null, mapDispatchToProps)(LoadingScreen);

const StyledComponent = withStyles(styles, { withTheme: true })(ConnectedApp);

export default StyledComponent;
