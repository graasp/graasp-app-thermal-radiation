import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  DEFAULT_TENSION,
  SET_INTERVAL_TIME,
  LINE_STROKE_COLOR,
  LINE_AMPLITUDE,
  LINE_STEP,
  LATTICE_HEIGHT,
  LINE_ANGLE,
} from '../../config/constants';

class EmittedLine extends Component {
  static propTypes = {
    chargeOscillation: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    temperature: PropTypes.number.isRequired,
    stageDimensions: PropTypes.shape({
      stageHeight: PropTypes.number.isRequired,
    }).isRequired,
    isPaused: PropTypes.bool.isRequired,
    showEmittedLines: PropTypes.bool.isRequired,
  };

  state = {
    points: [0, 0],
    t: 0,
  };

  componentDidUpdate({ isPaused: prevIsPaused }) {
    const { isPaused } = this.props;
    if (isPaused !== prevIsPaused && isPaused) {
      clearInterval(this.emittedLineInterval);
    } else if (isPaused !== prevIsPaused && !isPaused) {
      this.beginLineInterval();
    }
  }

  beginLineInterval = () => {
    this.emittedLineInterval = setInterval(() => {
      const { points, t } = this.state;
      const {
        chargeOscillation: { y },
        temperature,
        stageDimensions: { stageHeight },
      } = this.props;

      const x = Math.sin(t) * LINE_AMPLITUDE;

      // add points in respective direction
      const newPoints = points
        .slice(2)
        .map((value, i) =>
          i % 2 === 0
            ? value + Math.cos(-LINE_ANGLE) * LINE_STEP
            : value + Math.sin(-LINE_ANGLE) * LINE_STEP,
        );

      // needs approximatively a bit less than the screen height fill of points
      let maxPointsForLine = Math.ceil((stageHeight - LATTICE_HEIGHT) * 0.9);
      // always keep even number of points
      maxPointsForLine =
        maxPointsForLine % 2 === 0 ? maxPointsForLine : maxPointsForLine + 1;

      this.setState({
        points: [x, y, x, y, ...newPoints].slice(0, maxPointsForLine),
        t: t + temperature / 1500,
      });
    }, SET_INTERVAL_TIME);
  };

  render() {
    const { x, y, showEmittedLines } = this.props;
    const { points } = this.state;

    if (!showEmittedLines) {
      return null;
    }

    return (
      <Line
        x={x}
        y={y}
        points={points}
        tension={DEFAULT_TENSION}
        stroke={LINE_STROKE_COLOR}
      />
    );
  }
}

const mapStateToProps = ({ lab }) => ({
  temperature: lab.temperature,
  isPaused: lab.isPaused,
  showEmittedLines: lab.showEmittedLines,
});
const ConnectedComponent = connect(mapStateToProps)(EmittedLine);
export default ConnectedComponent;
