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

const LatticeRow = ({ rowIndex, stageDimensions }) => {
  const electrons = useSelector(({ layout }) => layout.lab.electrons);
  const { stageWidth, stageHeight } = stageDimensions;

  const positiveIonsXPositions = findXPositionsOfPositiveIons(
    stageWidth,
    POSITIVE_ION_RADIUS,
    HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  );

  const currentRowYPosition =
    stageHeight -
    ((rowIndex + 1) * VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS +
      rowIndex * POSITIVE_ION_RADIUS);

  return positiveIonsXPositions.map((xPosition, index, array) => {
    // since electrons sit in between positive ions, there will be one fewer electron than positive ions
    if (index === array.length - 1) {
      return (
        <PositiveIon
          yPosition={currentRowYPosition}
          xPosition={xPosition}
          key={xPosition}
        />
      );
    }
    return (
      <Group key={xPosition}>
        <PositiveIon yPosition={currentRowYPosition} xPosition={xPosition} />
        {electrons && (
          <Electron
            yPosition={currentRowYPosition}
            // distance between center of positive ion and center of electron: positive ion radius + half the distance between two positive ions
            xPosition={
              xPosition +
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
