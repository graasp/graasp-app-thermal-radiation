/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Shape, Group, Text, Rect, RegularPolygon } from 'react-konva';
import {
  THERMOMETER_RADIUS,
  THERMOMETER_HEIGHT,
  THERMOMETER_WIDTH,
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
  SLIDER_FILL_COLOR,
} from '../../config/constants';
import { setTemperature } from '../../actions';

const ThermometerShape = ({
  stroke,
  strokeWidth,
  fill,
  thermometerHeight = THERMOMETER_HEIGHT,
  height = THERMOMETER_HEIGHT,
  offsetY,
}) => {
  // use trigonometry to get the exact angle matching
  // the circle and the rectangle
  const angle = Math.asin(THERMOMETER_WIDTH / 2 / THERMOMETER_RADIUS);

  const drawThermometerShape = (context, shape) => {
    const totalOffset = offsetY + thermometerHeight - height;

    context.beginPath();
    context.lineTo(THERMOMETER_POSITION_X, totalOffset);
    context.lineTo(THERMOMETER_POSITION_X + THERMOMETER_WIDTH, totalOffset);
    context.lineTo(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH,
      totalOffset + height,
    );
    context.arc(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH / 2,
      totalOffset + height + THERMOMETER_RADIUS,
      THERMOMETER_RADIUS,
      -Math.PI / 2 + angle,
      -angle + (3 / 2) * Math.PI,
    );
    context.lineTo(THERMOMETER_POSITION_X, totalOffset + height);
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

const temperatureToHeight = ({ temperature, deltaHeight, step, from, to }) => {
  let value = temperature;
  if (value < from) {
    value = from;
  } else if (value > to) {
    value = to;
  }
  return ((-from + value) * deltaHeight) / step;
};

const heightToTemperature = ({
  height,
  deltaHeight,
  step,
  from,
  to,
  offsetY,
  thermometerHeight,
}) => {
  const newTemperature =
    ((thermometerHeight + offsetY - height) * step) / deltaHeight + from;

  // clamp value
  let value = newTemperature;
  if (value < from) {
    value = from;
  } else if (value > to) {
    value = to;
  }

  return newTemperature;
};

const GraduationBase = ({
  temperature,
  dispatchSetTemperature,
  thermometer: { from, to },
  height = THERMOMETER_HEIGHT,
  offsetY,
}) => {
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
  const maxNbGraduation = Math.floor(height / GRADUATION_HEIGHT);
  const prop = Math.ceil(range.length / maxNbGraduation);
  if (prop > 1) {
    range = range.filter((_, i) => i % prop === 0);
  }

  // height between each tick
  const deltaHeight = height / range.length;

  // compute fill height given current temperature value
  const fillValue = temperatureToHeight({
    deltaHeight,
    temperature,
    step,
    from: roundFrom,
    to: roundTo,
  });

  // draw graduation ticks
  const graduationComponents = range.map((text, idx) => {
    const y = offsetY + height - idx * deltaHeight;

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

  const sliderPositionX =
    THERMOMETER_POSITION_X +
    THERMOMETER_WIDTH +
    GRADUATION_WIDTH +
    GRADUATION_PADDING_LEFT +
    GRADUATION_FONT_SIZE * 2;

  const minThermometerHeight = offsetY + height;
  const maxThermomerterHeight =
    minThermometerHeight - (range.length - 1) * deltaHeight;
  return (
    <>
      <Rect
        fill={THERMOMETER_COLOR}
        x={THERMOMETER_POSITION_X}
        y={offsetY + height - fillValue}
        width={THERMOMETER_WIDTH}
        height={fillValue}
      />
      {graduationComponents}
      <RegularPolygon
        draggable
        dragBoundFunc={(pos) => {
          // clamp y position
          let newPositionY = pos.y;
          if (newPositionY > minThermometerHeight) {
            newPositionY = minThermometerHeight;
          } else if (newPositionY < maxThermomerterHeight) {
            newPositionY = maxThermomerterHeight;
          }
          // compute temperature from slider y position
          const newTemperature = heightToTemperature({
            deltaHeight,
            height: newPositionY,
            step,
            from: roundFrom,
            to: roundTo,
            offsetY,
            thermometerHeight: height,
          });

          dispatchSetTemperature(newTemperature);

          return {
            x: sliderPositionX,
            y: newPositionY,
          };
        }}
        x={sliderPositionX}
        y={offsetY + height - fillValue}
        sides={3}
        radius={8}
        rotation={30}
        fill={SLIDER_FILL_COLOR}
      />
    </>
  );
};

GraduationBase.propTypes = {
  dispatchSetTemperature: PropTypes.func.isRequired,
  temperature: PropTypes.number.isRequired,
  thermometer: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ lab }) => ({
  temperature: lab.temperature,
  thermometer: lab.thermometer,
});

const mapDispatchToProps = {
  dispatchSetTemperature: setTemperature,
};

const Graduation = connect(mapStateToProps, mapDispatchToProps)(GraduationBase);

// eslint-disable-next-line react/prefer-stateless-function
class Thermometer extends Component {
  static propTypes = {
    stageWidth: PropTypes.number.isRequired,
    stageHeight: PropTypes.number.isRequired,
  };

  render() {
    const { stageWidth, stageHeight } = this.props;

    const thermometerHeight = stageHeight * 0.5;
    const offsetY = stageHeight * 0.15;
    // 1 - thermometer fill color
    // 2 - graduation and current value fill
    // 3 - thermometer stroke
    return (
      <Group>
        <ThermometerShape
          stageWidth={stageWidth}
          stageHeight={stageHeight}
          height={0}
          fill={THERMOMETER_COLOR}
          thermometerHeight={thermometerHeight}
          offsetY={offsetY}
        />
        <Graduation height={thermometerHeight} offsetY={offsetY} />
        <ThermometerShape
          thermometerHeight={thermometerHeight}
          stroke={THERMOMETER_STROKE_COLOR}
          strokeWidth={THERMOMETER_STROKE_WIDTH}
          offsetY={offsetY}
        />
      </Group>
    );
  }
}

export default Thermometer;
