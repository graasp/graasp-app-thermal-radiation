import React from 'react';
import PropTypes from 'prop-types';
import { Shape } from 'react-konva';
import {
  THERMOMETER_RADIUS,
  THERMOMETER_HEIGHT,
  THERMOMETER_WIDTH,
  THERMOMETER_POSITION_X,
} from '../../../config/constants';

const ThermometerShape = ({
  stroke,
  strokeWidth,
  fillColor,
  thermometerHeight,
  fillHeight,
  offsetY,
}) => {
  // use trigonometry to get the exact angle matching the circle and the rectangle
  // the angle is used to draw the most perfect mercury bulb
  const angle = Math.asin(THERMOMETER_WIDTH / 2 / THERMOMETER_RADIUS);

  const drawThermometerShape = (context, shape) => {
    const totalOffset = offsetY + thermometerHeight - fillHeight;

    context.beginPath();
    // draw top and right straight lines
    context.lineTo(THERMOMETER_POSITION_X, totalOffset);
    context.lineTo(THERMOMETER_POSITION_X + THERMOMETER_WIDTH, totalOffset);
    context.lineTo(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH,
      totalOffset + fillHeight,
    );

    // draw bulb
    context.arc(
      THERMOMETER_POSITION_X + THERMOMETER_WIDTH / 2,
      totalOffset + fillHeight + THERMOMETER_RADIUS,
      THERMOMETER_RADIUS,
      -Math.PI / 2 + angle,
      -angle + (3 / 2) * Math.PI,
    );

    // draw left straight line
    context.lineTo(THERMOMETER_POSITION_X, totalOffset + fillHeight);
    context.closePath();
    // (!) Konva specific method, it is very important
    context.fillStrokeShape(shape);
  };

  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          drawThermometerShape(context, shape, fillHeight);
        }}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fillColor}
      />
    </>
  );
};

ThermometerShape.propTypes = {
  stroke: PropTypes.number,
  strokeWidth: PropTypes.number,
  thermometerHeight: PropTypes.number,
  fillHeight: PropTypes.number,
  fillColor: PropTypes.string,
  offsetY: PropTypes.number.isRequired,
};

ThermometerShape.defaultProps = {
  thermometerHeight: THERMOMETER_HEIGHT,
  fillHeight: THERMOMETER_HEIGHT,
  stroke: '',
  strokeWidth: 0,
  fillColor: '',
};

export default ThermometerShape;
