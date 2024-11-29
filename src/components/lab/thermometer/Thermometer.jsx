import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  THERMOMETER_COLOR,
  THERMOMETER_STROKE_WIDTH,
  THERMOMETER_STROKE_COLOR,
  THERMOMETER_HEIGHT_FACTOR,
  THERMOMETER_POSITION_Y_FACTOR,
  THERMOMETER_POSITION_X,
  SCALE_LEGEND_PADDING_BOTTOM,
  THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE,
} from '../../../config/constants';
import ThermometerShape from './ThermometerShape';
import Scale from './Scale';
import CurrentTemperature from './CurrentTemperature';

const Thermometer = ({ stageWidth, stageHeight }) => {
  const thermometerHeight = stageHeight * THERMOMETER_HEIGHT_FACTOR;
  const offsetY = stageHeight * THERMOMETER_POSITION_Y_FACTOR;
  return (
    <Group>
      <Scale thermometerHeight={thermometerHeight} offsetY={offsetY} />
      <ThermometerShape
        stageWidth={stageWidth}
        stageHeight={stageHeight}
        fillColor={THERMOMETER_COLOR}
        thermometerHeight={thermometerHeight}
        offsetY={offsetY}
        stroke={THERMOMETER_STROKE_COLOR}
        strokeWidth={THERMOMETER_STROKE_WIDTH}
      />
      <CurrentTemperature
        x={THERMOMETER_POSITION_X}
        y={
          offsetY -
          SCALE_LEGEND_PADDING_BOTTOM -
          THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE / 2
        }
      />
    </Group>
  );
};

Thermometer.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
};

export default Thermometer;
