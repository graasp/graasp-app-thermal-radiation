import React from 'react';
import PropTypes from 'prop-types';
import { Group, Circle } from 'react-konva';
import { ELECTRON_RADIUS, ELECTRON_COLOR } from '../../config/constants';
import NegativeChargeSymbol from './NegativeChargeSymbol';

const Electron = ({ xPosition, yPosition }) => {
  return (
    <Group>
      <Circle
        x={xPosition}
        y={yPosition}
        radius={ELECTRON_RADIUS}
        fill={ELECTRON_COLOR}
      />
      <NegativeChargeSymbol x={xPosition} y={yPosition} />
    </Group>
  );
};

Electron.propTypes = {
  xPosition: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
};

export default Electron;
