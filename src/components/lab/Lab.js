import React, { Component } from 'react';
import { ReactReduxContext, Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Stage, Layer } from 'react-konva';
import Lattice from './Lattice';
import { setStageDimensions } from '../../actions';
import Thermometer from './thermometer/Thermometer';
import {
  NUMBER_OF_LINES,
  LINE_AMPLITUDE,
  BACKGROUND_COLOR,
  THERMOMETER_POSITION_X,
  THERMOMETER_WIDTH,
  LATTICE_HEIGHT,
  SCALE_WIDTH,
  VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS,
} from '../../config/constants';
import SpectrumBar from './SpectrumBar';
import EmittedLine from './EmittedLine';
import Ground from './Ground';

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
      stageWidth: PropTypes.number.isRequired,
      stageHeight: PropTypes.number.isRequired,
    }).isRequired,
    spectrumBar: PropTypes.bool.isRequired,
    isMicroscopic: PropTypes.string.isRequired,
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
      stageWidth,
      stageHeight,
    });
  };

  render() {
    const { classes, stageDimensions, spectrumBar, isMicroscopic } = this.props;
    const { stageWidth, stageHeight } = stageDimensions;

    // space between lines
    const linePadding =
      (stageDimensions.stageWidth -
        (THERMOMETER_WIDTH + THERMOMETER_POSITION_X) -
        NUMBER_OF_LINES * LINE_AMPLITUDE) /
      NUMBER_OF_LINES;

    const linesXOffset =
      THERMOMETER_POSITION_X +
      THERMOMETER_WIDTH +
      SCALE_WIDTH +
      LINE_AMPLITUDE +
      linePadding / 2;

    return (
      <div
        className={classes.container}
        id="container"
        ref={(node) => {
          this.container = node;
        }}
      >
        {/* below is necessary for redux store to be accessible by konva children */}
        {/* see https://github.com/konvajs/react-konva/issues/311 */}
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Stage
              className={classes.stage}
              width={stageWidth}
              height={stageHeight}
            >
              <Provider store={store}>
                <Layer>
                  <Thermometer
                    stageWidth={stageWidth}
                    stageHeight={stageHeight}
                  />
                  {/* display either ground or ions */}
                  {isMicroscopic ? (
                    <Lattice stageDimensions={stageDimensions} />
                  ) : (
                    <Ground stageDimensions={stageDimensions} />
                  )}

                  {spectrumBar && (
                    <SpectrumBar stageDimensions={stageDimensions} />
                  )}

                  {[...new Array(NUMBER_OF_LINES).keys()].map((i) => (
                    <EmittedLine
                      stageDimensions={stageDimensions}
                      chargeOscillation={{ x: 0, y: 0 }}
                      x={linesXOffset + i * (LINE_AMPLITUDE + linePadding)}
                      y={
                        stageHeight -
                        LATTICE_HEIGHT -
                        VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS / 2
                      }
                    />
                  ))}
                </Layer>
              </Provider>
            </Stage>
          )}
        </ReactReduxContext.Consumer>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, lab }) => ({
  stageDimensions: layout.lab.stageDimensions,
  spectrumBar: layout.lab.spectrumBar,
  isMicroscopic: lab.isMicroscopic,
});

const mapDispatchToProps = {
  dispatchSetStageDimensions: setStageDimensions,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Lab);

const StyledComponent = withStyles(styles, { withTheme: true })(
  ConnectedComponent,
);

export default StyledComponent;
