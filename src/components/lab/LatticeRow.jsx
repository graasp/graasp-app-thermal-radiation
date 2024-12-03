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
} from '../../config/constants';
import { findXPositionsOfPositiveIons } from '../../utils/utils';

const LatticeRow = ({ rowIndex, stageDimensions, oscillation }) => {
  const electrons = useSelector(({ lab }) => lab.electrons);
  const { stageWidth, stageHeight } = stageDimensions;

  // horizontal distance to fill of ions, minus the spectrum bar width
  const width = stageWidth;

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
    const x = xPosition;
    const idx = rowIndex + index;

    // since electrons sit in between positive ions, there will be one fewer electron than positive ions
    if (index === array.length - 1) {
      return (
        <PositiveIon
          index={idx}
          oscillation={oscillation}
          yPosition={currentRowYPosition}
          xPosition={xPosition}
          key={xPosition}
        />
      );
    }
    return (
      <Group key={xPosition}>
        <PositiveIon
          index={idx}
          yPosition={currentRowYPosition}
          xPosition={xPosition}
          oscillation={oscillation}
        />
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
