import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Stage, Layer } from 'react-konva';
import { setStageDimensions } from '../../actions';
import { BACKGROUND_COLOR } from '../../config/constants';

const styles = () => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: BACKGROUND_COLOR,
  },
  stage: {
    position: 'absolute',
  },
});

class Lab extends Component {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      stage: PropTypes.string.isRequired,
    }).isRequired,
    dispatchSetStageDimensions: PropTypes.func.isRequired,
    stageDimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.checkSize();
    const ro = new ResizeObserver(() => {
      this.checkSize();
    });
    ro.observe(document.querySelector(`#container`));
  }

  checkSize = () => {
    const { dispatchSetStageDimensions } = this.props;
    const stageWidth = this.container?.offsetWidth;
    const stageHeight = this.container?.offsetHeight;
    dispatchSetStageDimensions({
      width: stageWidth,
      height: stageHeight,
    });
  };

  render() {
    const { classes, stageDimensions } = this.props;
    return (
      <div
        className={classes.container}
        id="container"
        ref={(node) => {
          this.container = node;
        }}
      >
        <Stage
          className={classes.stage}
          width={stageDimensions.width}
          height={stageDimensions.height}
        >
          <Layer />
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = ({ layout }) => ({
  stageDimensions: layout.lab.stageDimensions,
});

const mapDispatchToProps = {
  dispatchSetStageDimensions: setStageDimensions,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
