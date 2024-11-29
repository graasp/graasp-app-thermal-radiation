import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Group } from 'react-konva';
import {
  POSITIVE_ION_RADIUS,
  POSITIVE_ION_COLOR,
} from '../../config/constants';
import PositiveChargeSymbol from './PositiveChargeSymbol';

const PositiveIon = ({ xPosition, yPosition, oscillation, index }) => {
  const xOscillation = index % 2 === 0;
  const x = xPosition + (xOscillation ? oscillation : 0);
  const y = yPosition + (!xOscillation ? oscillation : 0);
  return (
    <Group x={x} y={y}>
      <Circle
        x={0}
        y={0}
        radius={POSITIVE_ION_RADIUS}
        fill={POSITIVE_ION_COLOR}
      />
      <PositiveChargeSymbol x={0} y={0} />
    </Group>
  );
};

PositiveIon.propTypes = {
  yPosition: PropTypes.number.isRequired,
  xPosition: PropTypes.number.isRequired,
  oscillation: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default PositiveIon;
