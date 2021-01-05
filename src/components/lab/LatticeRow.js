import React from 'react';
import PropTypes from 'prop-types';
import PositiveIon from './PositiveIon';
import {
  POSITIVE_ION_RADIUS,
  HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS,
} from '../../config/constants';
import { calculateNumberOfPositiveIons } from '../../utils/utils';

const LatticeRow = ({ rowIndex, stageDimensions }) => {
  const { stageWidth, stageHeight } = stageDimensions;
  const { numberOfPositiveIons, excessWidth } = calculateNumberOfPositiveIons(
    stageWidth,
    POSITIVE_ION_RADIUS,
    HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  );
  const leftIndent = excessWidth / 2;

  // creates an array that will be mapped onto PositiveIon components
  // the x-position of each PositiveIon is incremented using .map()'s index
  // note that Konva Circle's x prop indicates the beginning of the *CENTER* of the circle
  const positiveIonsXPositions = new Array(numberOfPositiveIons)
    .fill()
    .map(
      (emptyElement, index) =>
        leftIndent +
        POSITIVE_ION_RADIUS +
        (2 * POSITIVE_ION_RADIUS + HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS) *
          index,
    );

  const currentRowYPosition =
    stageHeight -
    ((rowIndex + 1) * VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS +
      rowIndex * POSITIVE_ION_RADIUS);

  return positiveIonsXPositions.map((xPosition) => (
    <PositiveIon
      yPosition={currentRowYPosition}
      xPosition={xPosition}
      stageDimensions={stageDimensions}
    />
  ));
};

LatticeRow.propTypes = {
  stageDimensions: PropTypes.shape({
    stageWidth: PropTypes.number.isRequired,
    stageHeight: PropTypes.number.isRequired,
  }).isRequired,
};

export default LatticeRow;
