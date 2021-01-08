import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Text, Group } from 'react-konva';
import {
  POSITIVE_ION_RADIUS,
  POSITIVE_ION_COLOR,
  POSITIVE_ION_SYMBOL,
  POSITIVE_ION_SYMBOL_COLOR,
  POSITIVE_ION_SYMBOL_FONT_SIZE,
} from '../../config/constants';

const PositiveIon = ({ xPosition, yPosition }) => {
  return (
    <Group>
      <Circle
        x={xPosition}
        y={yPosition}
        radius={POSITIVE_ION_RADIUS}
        fill={POSITIVE_ION_COLOR}
      />
      <Text
        x={xPosition - POSITIVE_ION_RADIUS}
        y={yPosition - POSITIVE_ION_RADIUS}
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
};

PositiveIon.propTypes = {
  yPosition: PropTypes.number.isRequired,
  xPosition: PropTypes.number.isRequired,
};

export default PositiveIon;
