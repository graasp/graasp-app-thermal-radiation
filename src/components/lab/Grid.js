import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-konva';
import {
  GRID_AXES_COLOR,
  GRID_AXES_STROKE_WIDTH,
  GRID_SQUARE_WIDTH_AND_HEIGHT,
  THERMOMETER_TOTAL_WIDTH,
  LATTICE_HEIGHT,
} from '../../config/constants';

// eslint-disable-next-line no-console
console.log('ewf');
const Grid = ({ gridWidth, gridHeight }) => {
  // in return statement below, a VERTICAL line is drawn at each of the points in xTicksArray
  // for alignment purposes, ensure xTicksArray includes the point startingXTick
  // this ensures that the vertical radiation line emitted by the charge is in line with the grid
  const centralXTick = gridWidth / 2;
  const totalNumberOfXTicks = Math.ceil(
    gridWidth / GRID_SQUARE_WIDTH_AND_HEIGHT,
  );
  const startingXTick =
    centralXTick -
    Math.floor(totalNumberOfXTicks / 2) * GRID_SQUARE_WIDTH_AND_HEIGHT;
  const xTicksArray = new Array(totalNumberOfXTicks)
    .fill()
    .map(
      (emptyElement, index) =>
        startingXTick + index * GRID_SQUARE_WIDTH_AND_HEIGHT,
    );

  // in return statement below, a HORIZONTAL line is drawn at each of the points in yTicksArray
  // for alignment purposes, ensure yTicksArray includes the point startingYTick
  // this ensures that the horizontal radiation line emitted by the charge is in line with the grid
  const totalNumberOfYTicks =
    Math.ceil((gridHeight - LATTICE_HEIGHT) / GRID_SQUARE_WIDTH_AND_HEIGHT) ||
    0;
  const yTicksArray = new Array(totalNumberOfYTicks)
    .fill()
    .map((emptyElement, index) => index * GRID_SQUARE_WIDTH_AND_HEIGHT);

  return (
    <>
      {xTicksArray.map((tick) => (
        <Line
          key={tick}
          x={tick}
          y={0}
          points={[
            THERMOMETER_TOTAL_WIDTH,
            0,
            THERMOMETER_TOTAL_WIDTH,
            gridHeight - LATTICE_HEIGHT,
          ]}
          stroke={GRID_AXES_COLOR}
          strokeWidth={GRID_AXES_STROKE_WIDTH}
        />
      ))}

      {yTicksArray.map((tick) => (
        <Line
          key={tick}
          x={0}
          y={tick}
          points={[THERMOMETER_TOTAL_WIDTH, 0, gridWidth, 0]}
          stroke={GRID_AXES_COLOR}
          strokeWidth={GRID_AXES_STROKE_WIDTH}
        />
      ))}
    </>
  );
};

Grid.propTypes = {
  gridWidth: PropTypes.number,
  gridHeight: PropTypes.number,
};

Grid.defaultProps = {
  gridWidth: 0,
  gridHeight: 0,
};

export default Grid;
