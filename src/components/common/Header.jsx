import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { toggleSideMenu } from '../../actions';
import { DRAWER_WIDTH, HEADER_HEIGHT, LOGO_SIZE } from '../../config/constants';

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    height: LOGO_SIZE,
    marginRight: theme.spacing(2),
  },
  appBar: {
    height: HEADER_HEIGHT,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginRight: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  link: {
    color: 'white',
    marginLeft: theme.spacing(1),
  },
});

class Header extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      logo: PropTypes.string,
      grow: PropTypes.string,
      appBar: PropTypes.string.isRequired,
      appBarShift: PropTypes.string.isRequired,
      menuButton: PropTypes.string.isRequired,
      hide: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired,
    dispatchToggleSideMenu: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
  };

  handleToggleSideMenu = (open) => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  render() {
    const { t, classes, showSideMenu } = this.props;
    return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: showSideMenu,
        })}
      >
        <Toolbar>
          {/* <Logo className={classes.logo} /> */}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {t('Thermal Radiation App')}
          </Typography>

          {!showSideMenu && (
            <IconButton
              color="inherit"
              aria-label={t('Open Drawer')}
              onClick={this.handleToggleSideMenu(true)}
              className={clsx(classes.menuButton, showSideMenu && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ layout, context }) => ({
  showSideMenu: layout.showSideMenu,
  appInstanceId: context.appInstanceId,
  spaceId: context.spaceId,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Header);
const TranslatedComponent = withTranslation()(ConnectedComponent);

export default withStyles(styles, { withTheme: true })(TranslatedComponent);
