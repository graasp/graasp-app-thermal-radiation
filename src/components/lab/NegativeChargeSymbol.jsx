import React from 'react';
import PropTypes from 'prop-types';
import { Group, Line } from 'react-konva';
import {
  CANVAS_ATOM_CHARGE_STROKE_COLOR,
  CANVAS_ATOM_NEGATIVE_CHARGE_LENGTH,
  CANVAS_ATOM_CHARGE_STROKE_WIDTH,
} from '../../config/constants';

const NegativeChargeSymbol = ({ x, y }) => {
  // note: a '-' sign is 2 lines going left and right from the center point of the -
  // using konva lines (versus a konva text node) results in accurate centering
  return (
    <Group>
      <Line
        x={x}
        y={y}
        stroke={CANVAS_ATOM_CHARGE_STROKE_COLOR}
        points={[0, 0, CANVAS_ATOM_NEGATIVE_CHARGE_LENGTH, 0]}
        strokeWidth={CANVAS_ATOM_CHARGE_STROKE_WIDTH}
      />
      <Line
        x={x}
        y={y}
        stroke={CANVAS_ATOM_CHARGE_STROKE_COLOR}
        points={[0, 0, -CANVAS_ATOM_NEGATIVE_CHARGE_LENGTH, 0]}
        strokeWidth={CANVAS_ATOM_CHARGE_STROKE_WIDTH}
      />
    </Group>
  );
};

NegativeChargeSymbol.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default NegativeChargeSymbol;
