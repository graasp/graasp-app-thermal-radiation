import React from 'react';
import PropTypes from 'prop-types';
import { Group, Circle, Text } from 'react-konva';
import {
  ELECTRON_RADIUS,
  ELECTRON_COLOR,
  ELECTRON_SYMBOL,
  ELECTRON_SYMBOL_COLOR,
  ELECTRON_SYMBOL_FONT_SIZE,
} from '../../config/constants';

const Electron = ({ xPosition, yPosition }) => {
  return (
    <Group>
      <Circle
        x={xPosition}
        y={yPosition}
        radius={ELECTRON_RADIUS}
        fill={ELECTRON_COLOR}
      />
      <Text
        x={xPosition - ELECTRON_RADIUS}
        y={yPosition - ELECTRON_RADIUS}
        text={ELECTRON_SYMBOL}
        fontSize={ELECTRON_SYMBOL_FONT_SIZE}
        fill={ELECTRON_SYMBOL_COLOR}
        height={ELECTRON_RADIUS * 1.5}
        width={ELECTRON_RADIUS * 2}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

Electron.propTypes = {
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
};

export default Electron;
