import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  THERMOMETER_COLOR,
  THERMOMETER_STROKE_WIDTH,
  THERMOMETER_STROKE_COLOR,
  THERMOMETER_HEIGHT_FACTOR,
  THERMOMETER_POSITION_Y_FACTOR,
} from '../../../config/constants';
import ThermometerShape from './ThermometerShape';
import Scale from './Scale';

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
    </Group>
  );
};

Thermometer.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
};

export default Thermometer;
