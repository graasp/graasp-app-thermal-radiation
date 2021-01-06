/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Shape, Group, Text, Rect } from 'react-konva';
import {
  THERMOMETER_RADIUS,
  THERMOMETER_HEIGHT,
  THERMOMETER_WIDTH,
  THERMOMETER_POSITION_Y,
  THERMOMETER_POSITION_X,
  GRADUATION_HEIGHT,
  GRADUATION_FONT_SIZE,
  GRADUATION_PADDING_LEFT,
  GRADUATION_WIDTH,
  GRADUATION_LINE_HEIGHT,
  THERMOMETER_COLOR,
  THERMOMETER_STROKE_WIDTH,
  THERMOMETER_STROKE_COLOR,
  GRADUATION_MAX_NUMBER_TICKS,
} from '../../config/constants';

const ThermometerShape = ({
  stroke,
  strokeWidth,
  fill,
  height = THERMOMETER_HEIGHT,
}) => {
  // use trigonometry to get the exact angle matching
  // the circle and the rectangle
  const angle = Math.asin(THERMOMETER_WIDTH / 2 / THERMOMETER_RADIUS);

  const drawThermometerShape = (context, shape) => {
    const yOffset = THERMOMETER_POSITION_Y + THERMOMETER_HEIGHT - height;

    context.beginPath();
    context.lineTo(THERMOMETER_POSITION_X, yOffset);
    context.lineTo(THERMOMETER_POSITION_X + THERMOMETER_WIDTH, yOffset);
    context.lineTo(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH,
      yOffset + height,
    );
    context.arc(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH / 2,
      yOffset + height + THERMOMETER_RADIUS,
      THERMOMETER_RADIUS,
      -Math.PI / 2 + angle,
      -angle + (3 / 2) * Math.PI,
    );
    context.lineTo(THERMOMETER_POSITION_X, yOffset + height);
    context.closePath();
    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
  };

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          drawThermometerShape(context, shape, height);
        }}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </>
  );
};

const Graduation = ({ from, to, currentTemperature }) => {
  const x = THERMOMETER_POSITION_X + THERMOMETER_WIDTH;

  // compute ideal step distance between ticks
  const step = Math.ceil(
    (Math.abs(to) + Math.abs(from)) / GRADUATION_MAX_NUMBER_TICKS,
  );

  // round min and max to closest graduation steps
  const roundFrom = step * Math.floor(from / step);
  const roundTo = step * Math.ceil(to / step) || step;

  // compute graduation array at every step
  const nbGraduation = (roundTo - roundFrom) / step + 1; // +1 to include max
  let range = Array.from(
    { length: nbGraduation },
    (v, k) => k * step + roundFrom,
  );

  // select marks at most number of graduation we can display
  const maxNbGraduation = Math.floor(THERMOMETER_HEIGHT / GRADUATION_HEIGHT);
  const prop = Math.ceil(range.length / maxNbGraduation);
  if (prop > 1) {
    range = range.filter((_, i) => i % prop === 0);
  }

  // height between each tick
  const deltaHeight = THERMOMETER_HEIGHT / range.length;

  // compute fill height given current temperature value
  let value = currentTemperature;
  if (value < roundFrom) {
    value = roundFrom;
  } else if (value > roundTo) {
    value = roundTo;
  }
  const fillValue = ((Math.abs(from) + value) * deltaHeight) / step;

  const graduationComponents = range.map((text, idx) => {
    const y = THERMOMETER_POSITION_Y + THERMOMETER_HEIGHT - idx * deltaHeight;

    return (
      <Group key={text}>
        <Text
          x={x + GRADUATION_PADDING_LEFT}
          y={y - GRADUATION_FONT_SIZE / 3}
          text={text}
          fontSize={GRADUATION_FONT_SIZE}
        />
        <Rect
          x={THERMOMETER_POSITION_X + THERMOMETER_WIDTH - GRADUATION_WIDTH}
          y={y}
          width={GRADUATION_WIDTH}
          height={GRADUATION_LINE_HEIGHT}
          fill={THERMOMETER_STROKE_COLOR}
        />
      </Group>
    );
  });

  return (
    <>
      <Rect
        fill={THERMOMETER_COLOR}
        x={THERMOMETER_POSITION_X}
        y={THERMOMETER_POSITION_Y + THERMOMETER_HEIGHT - fillValue}
        width={THERMOMETER_WIDTH}
        height={fillValue}
      />
      {graduationComponents}
    </>
  );
};

Graduation.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  currentTemperature: PropTypes.number.isRequired,
};

class Thermometer extends Component {
  static propTypes = {
    to: PropTypes.number,
    from: PropTypes.number,
  };

  // todo: change these values to use predefined ranges
  static defaultProps = {
    to: 10,
    from: -4,
  };

  state = {
    currentTemperature: 3.5, // todo: add slider to change this value
  };

  render() {
    const { from, to } = this.props;
    const { currentTemperature } = this.state;

    // 1 - thermometer fill color
    // 2 - graduation and current value fill
    // 3 - thermometer stroke
    return (
      <Group>
        <ThermometerShape height={0} fill={THERMOMETER_COLOR} />
        <Graduation
          from={from}
          to={to}
          currentTemperature={currentTemperature}
        />
        <ThermometerShape
          stroke={THERMOMETER_STROKE_COLOR}
          strokeWidth={THERMOMETER_STROKE_WIDTH}
        />
      </Group>
    );
  }
}

export default Thermometer;
