import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Group } from 'react-konva';
import PositiveIon from './PositiveIon';
import Electron from './Electron';
import {
  POSITIVE_ION_RADIUS,
  HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  TOTAL_SPECTRUM_BAR_WIDTH,
  SPECTRUM_BAR_PADDING,
} from '../../config/constants';
import { findXPositionsOfPositiveIons } from '../../utils/utils';

const LatticeRow = ({ rowIndex, stageDimensions }) => {
  const electrons = useSelector(({ layout }) => layout.lab.electrons);
  const { stageWidth, stageHeight } = stageDimensions;

  // horizontal distance to fill of ions, minus the spectrum bar width
  const width = stageWidth - TOTAL_SPECTRUM_BAR_WIDTH - SPECTRUM_BAR_PADDING;

  const positiveIonsXPositions = findXPositionsOfPositiveIons(
    width,
    POSITIVE_ION_RADIUS,
    HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  );

  const currentRowYPosition =
    stageHeight -
    ((rowIndex + 1) * VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS +
      rowIndex * POSITIVE_ION_RADIUS);

  return positiveIonsXPositions.map((xPosition, index, array) => {
    const x = xPosition + TOTAL_SPECTRUM_BAR_WIDTH + SPECTRUM_BAR_PADDING;

    // since electrons sit in between positive ions, there will be one fewer electron than positive ions
    if (index === array.length - 1) {
      return (
        <PositiveIon yPosition={currentRowYPosition} xPosition={x} key={x} />
      );
    }
    return (
      <Group key={x}>
        <PositiveIon yPosition={currentRowYPosition} xPosition={x} />
        {electrons && (
          <Electron
            yPosition={currentRowYPosition}
            // distance between center of positive ion and center of electron: positive ion radius + half the distance between two positive ions
            xPosition={
              x +
              POSITIVE_ION_RADIUS +
              HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS / 2
            }
          />
        )}
      </Group>
    );
  });
};

LatticeRow.propTypes = {
  stageDimensions: PropTypes.shape({
    stageWidth: PropTypes.number.isRequired,
    stageHeight: PropTypes.number.isRequired,
  }).isRequired,
};

export default LatticeRow;
