import React from 'react';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import {
  THERMOMETER_COLOR,
  THERMOMETER_STROKE_WIDTH,
  THERMOMETER_STROKE_COLOR,
} from '../../../config/constants';
import ThermometerShape from './ThermometerShape';
import Scale from './Scale';

const Thermometer = ({ stageWidth, stageHeight }) => {
  const thermometerHeight = stageHeight * 0.5;
  const offsetY = stageHeight * 0.15;
  return (
    <Group>
      <ThermometerShape
        stageWidth={stageWidth}
        stageHeight={stageHeight}
        fillHeight={0}
        fillColor={THERMOMETER_COLOR}
        thermometerHeight={thermometerHeight}
        offsetY={offsetY}
      />
      <Scale thermometerHeight={thermometerHeight} offsetY={offsetY} />
      <ThermometerShape
        thermometerHeight={thermometerHeight}
        stroke={THERMOMETER_STROKE_COLOR}
        strokeWidth={THERMOMETER_STROKE_WIDTH}
        offsetY={offsetY}
      />
    </Group>
  );
};

Thermometer.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
};

export default Thermometer;
