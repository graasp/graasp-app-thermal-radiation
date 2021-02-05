import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RegularPolygon } from 'react-konva';
import {
  THERMOMETER_WIDTH,
  THERMOMETER_POSITION_X,
  SCALE_PADDING_LEFT,
  SCALE_WIDTH,
  SLIDER_FILL_COLOR,
  SCALE_TEXT_WIDTH_FACTOR,
  SLIDER_RADIUS,
} from '../../../config/constants';
import { setTemperature } from '../../../actions';

const heightToTemperature = ({
  height,
  heightBetweenTicks,
  tickStep,
  minTemperature,
  maxTemperature,
  offsetY,
  thermometerHeight,
}) => {
  const newTemperature =
    ((thermometerHeight + offsetY - height) * tickStep) / heightBetweenTicks +
    minTemperature;

  // clamp value
  let value = newTemperature;
  if (value < minTemperature) {
    value = minTemperature;
  } else if (value > maxTemperature) {
    value = maxTemperature;
  }

  return newTemperature;
};

const Slider = ({
  thermometerHeight,
  offsetY,
  y,
  heightBetweenTicks,
  nbScales,
  dispatchSetTemperature,
  minTemperature,
  maxTemperature,
  tickStep,
}) => {
  const onMouseEnter = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'grab';
  };

  const onMouseLeave = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'default';
  };

  const sliderPositionX =
    THERMOMETER_POSITION_X +
    THERMOMETER_WIDTH +
    SCALE_WIDTH +
    SCALE_PADDING_LEFT +
    SCALE_TEXT_WIDTH_FACTOR;

  const minThermometerHeight = offsetY + thermometerHeight;
  const maxThermomerterHeight =
    minThermometerHeight - (nbScales - 1) * heightBetweenTicks;

  return (
    <RegularPolygon
      draggable
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
          heightBetweenTicks,
          height: newPositionY,
          tickStep,
          minTemperature,
          maxTemperature,
          offsetY,
          thermometerHeight,
        });

        dispatchSetTemperature(newTemperature);

        return {
          x: sliderPositionX,
          y: newPositionY,
        };
      }}
      x={sliderPositionX}
      y={y}
      sides={3}
      radius={SLIDER_RADIUS}
      rotation={30}
      fill={SLIDER_FILL_COLOR}
    />
  );
};

Slider.propTypes = {
  thermometerHeight: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  nbScales: PropTypes.number.isRequired,
  dispatchSetTemperature: PropTypes.func.isRequired,
  heightBetweenTicks: PropTypes.number.isRequired,
  minTemperature: PropTypes.number.isRequired,
  maxTemperature: PropTypes.number.isRequired,
  tickStep: PropTypes.number.isRequired,
};

const mapStateToProps = ({ lab }) => ({
  currentTemperature: lab.temperature,
});

const mapDispatchToProps = {
  dispatchSetTemperature: setTemperature,
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
