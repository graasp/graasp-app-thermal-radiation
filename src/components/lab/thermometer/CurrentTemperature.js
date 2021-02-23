import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';
import { useSelector } from 'react-redux';
import {
  SCALE_UNITS,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
} from '../../../config/constants';
import { kelvinToCelsius } from '../../../utils/utils';

const CurrentTemperature = ({ x, y }) => {
  const temperature = useSelector(({ lab }) => lab.temperature);

  const scaleUnit = useSelector(({ lab }) => lab.scaleUnit);

  let text;
  switch (scaleUnit) {
    case SCALE_UNITS.CELSIUS:
      text = Math.round(kelvinToCelsius(temperature)) + scaleUnit.unit;
      break;
    case SCALE_UNITS.KELVIN:
    default:
      text = Math.round(temperature) + scaleUnit.unit;
      break;
  }

  return (
    <Text
      x={x}
      y={y}
      text={text}
      fontSize={THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE}
    />
  );
};

CurrentTemperature.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default CurrentTemperature;
