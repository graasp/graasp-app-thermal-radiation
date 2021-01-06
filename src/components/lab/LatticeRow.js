/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import PositiveIon from './PositiveIon';
import {
  POSITIVE_ION_RADIUS,
  HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS,
} from '../../config/constants';

const LatticeRow = ({ rowIndex, stageDimensions }) => {
  const { stageWidth, stageHeight } = stageDimensions;
  const widthOfPositiveIonWithPadding =
    2 * POSITIVE_ION_RADIUS + HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS;

  const numberOfPositiveIons = Math.floor(
    stageWidth / widthOfPositiveIonWithPadding,
  );

  const totalWidthOfPositiveIons =
    numberOfPositiveIons * widthOfPositiveIonWithPadding -
    HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS;

  const excessWidth = stageWidth - totalWidthOfPositiveIons;
  const leftIndent = excessWidth / 2;

  const positiveIonsXPositions = [...Array(numberOfPositiveIons)].map(
    (emptyElement, index) =>
      leftIndent + POSITIVE_ION_RADIUS + widthOfPositiveIonWithPadding * index,
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
