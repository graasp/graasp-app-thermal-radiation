import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  DEFAULT_TENSION,
  MAX_POINTS_FOR_LINES,
  SET_INTERVAL_TIME,
  LINE_STROKE_COLOR,
  LINE_AMPLITUDE,
  LINE_STEP,
  LINE_STARTING_POSITION_Y,
  LINE_ANGLE,
} from '../../config/constants';

class EmittedLine extends Component {
  static propTypes = {
    chargeOscillation: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    x: PropTypes.number.isRequired,
    temperature: PropTypes.number.isRequired,
  };

  state = {
    points: [0, 0],
    t: 0,
  };

  componentDidMount() {
    this.beginLineInterval();
  }

  beginLineInterval = () => {
    this.emittedLineInterval = setInterval(() => {
      const { points, t } = this.state;
      const {
        chargeOscillation: { y },
        temperature,
      } = this.props;

      const x = Math.sin(t) * LINE_AMPLITUDE;

      // add points in respective direction
      let newPoints = points
        .slice(2)
        .map((value, i) =>
          i % 2 === 0
            ? value + Math.cos(-LINE_ANGLE) * LINE_STEP
            : value + Math.sin(-LINE_ANGLE) * LINE_STEP,
        );

      // the first point is where the charge is
      // add second point where the new point should be
      // keeps only MAX_POINTS_FOR_LINES first points
      // needs at least two points x,y to create a line
      newPoints = [x, y, x, y, ...newPoints].slice(0, MAX_POINTS_FOR_LINES);
      this.setState({
        points: newPoints,
        t: t + temperature / 1500,
      });
    }, SET_INTERVAL_TIME);
  };

  render() {
    const { x } = this.props;
    const { points } = this.state;
    return (
      <Line
        x={x}
        y={LINE_STARTING_POSITION_Y}
        points={points}
        tension={DEFAULT_TENSION}
        stroke={LINE_STROKE_COLOR}
      />
    );
  }
}

const mapStateToProps = ({ lab }) => ({
  temperature: lab.temperature,
});
const ConnectedComponent = connect(mapStateToProps)(EmittedLine);
export default ConnectedComponent;
