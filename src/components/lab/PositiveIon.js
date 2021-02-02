import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Text, Group } from 'react-konva';
import { connect } from 'react-redux';
import {
  POSITIVE_ION_RADIUS,
  POSITIVE_ION_COLOR,
  POSITIVE_ION_SYMBOL,
  POSITIVE_ION_SYMBOL_COLOR,
  POSITIVE_ION_SYMBOL_FONT_SIZE,
  SET_INTERVAL_TIME,
} from '../../config/constants';

const IONS_OSCILLATION_SPEED_FACTOR = 0.005;
const IONS_OSCILLATION_RADIUS = 5;
class PositiveIon extends Component {
  static propTypes = {
    yPosition: PropTypes.number.isRequired,
    xPosition: PropTypes.number.isRequired,
    currentTemperature: PropTypes.number.isRequired,
    scales: PropTypes.shape({
      from: PropTypes.number.isRequired,
    }).isRequired,
  };

  state = {
    oscillation: {
      x: 0,
      y: 0,
    },
    angle: 0,
    xOscillation: Math.random() < 0.5,
  };

  componentDidMount() {
    const { xOscillation } = this.state;
    this.oscillationInterval = setInterval(() => {
      const {
        currentTemperature,
        scales: { from },
      } = this.props;
      const { angle } = this.state;
      const oscillationDistance = IONS_OSCILLATION_RADIUS * Math.sin(angle);
      const oscillation = { x: 0, y: 0 };
      if (xOscillation) {
        oscillation.x = oscillationDistance;
      } else {
        oscillation.y = oscillationDistance;
      }

      this.setState({
        oscillation,
        angle:
          angle + (currentTemperature - from) * IONS_OSCILLATION_SPEED_FACTOR,
      });
    }, SET_INTERVAL_TIME);
  }

  render() {
    const { xPosition, yPosition } = this.props;
    const { oscillation } = this.state;
    const x = xPosition + oscillation.x;
    const y = yPosition + oscillation.y;
    return (
      <Group>
        <Circle
          x={x}
          y={y}
          radius={POSITIVE_ION_RADIUS}
          fill={POSITIVE_ION_COLOR}
        />
        <Text
          x={x - POSITIVE_ION_RADIUS}
          y={y - POSITIVE_ION_RADIUS}
          text={POSITIVE_ION_SYMBOL}
          fontSize={POSITIVE_ION_SYMBOL_FONT_SIZE}
          fill={POSITIVE_ION_SYMBOL_COLOR}
          height={POSITIVE_ION_RADIUS * 2}
          width={POSITIVE_ION_RADIUS * 2}
          align="center"
          verticalAlign="middle"
        />
      </Group>
    );
  }
}

const mapStateToProps = ({ lab }) => ({
  currentTemperature: lab.temperature,
  scales: lab.scales,
});

const ConnectedComponent = connect(mapStateToProps)(PositiveIon);

export default ConnectedComponent;
