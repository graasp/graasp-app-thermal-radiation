import React, { useEffect, useState } from 'react';
import { Group, Rect, Line } from 'react-konva';
import PropTypes from 'prop-types';
import {
  GROUND_FILL_DARK_COLOR,
  GROUND_FILL_LIGHT_COLOR,
  GROUND_GRASS_BACKGROUND,
  GROUND_GRASS_HEIGHT,
  GROUND_GRASS_LINE_TENSION,
  HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS,
  LATTICE_HEIGHT,
  VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS,
} from '../../config/constants';

const Ground = ({ stageDimensions }) => {
  const [points, setPoints] = useState([]);

  const y = stageDimensions.stageHeight - LATTICE_HEIGHT;
  const groundWidth =
    stageDimensions.stageWidth - HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS * 2;
  const groundHeight =
    LATTICE_HEIGHT -
    VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS / 2 -
    GROUND_GRASS_HEIGHT;
  const GROUND_POINTS_NUMBER = 5;

  useEffect(() => {
    const randomPoints = Array.from(
      { length: GROUND_POINTS_NUMBER },
      (v, i) => [
        (groundWidth / (GROUND_POINTS_NUMBER + 1)) * (i + 1),
        Math.random() * GROUND_GRASS_HEIGHT,
      ],
    ).flat();

    setPoints([
      0,
      GROUND_GRASS_HEIGHT,
      0,
      0,
      ...randomPoints,
      groundWidth,
      0,
      groundWidth,
      GROUND_GRASS_HEIGHT,
    ]);
  }, []);

  return (
    <Group y={y} x={HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS}>
      <Rect
        x={0}
        y={GROUND_GRASS_HEIGHT}
        width={groundWidth}
        height={groundHeight}
        fillLinearGradientStartPoint={{ x: 0, y: groundHeight }}
        fillLinearGradientEndPoint={{ x: 0, y: 0 }}
        fillLinearGradientColorStops={[
          0,
          GROUND_FILL_DARK_COLOR,
          1,
          GROUND_FILL_LIGHT_COLOR,
        ]}
      />
      <Line
        x={0}
        y={0}
        points={points}
        tension={GROUND_GRASS_LINE_TENSION}
        closed
        fill={GROUND_GRASS_BACKGROUND}
      />
    </Group>
  );
};

Ground.propTypes = {
  stageDimensions: PropTypes.shape({
    stageHeight: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
  }).isRequired,
};

export default Ground;
