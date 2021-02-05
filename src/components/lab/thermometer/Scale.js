import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Group, Text, Rect } from 'react-konva';
import {
  THERMOMETER_HEIGHT,
  THERMOMETER_WIDTH,
  THERMOMETER_POSITION_X,
  SCALE_HEIGHT,
  SCALE_FONT_SIZE,
  SCALE_PADDING_LEFT,
  SCALE_WIDTH,
  SCALE_LINE_HEIGHT,
  THERMOMETER_COLOR,
  THERMOMETER_STROKE_COLOR,
  SCALE_MAX_NUMBER_TICKS,
} from '../../../config/constants';
import Slider from './Slider';

const temperatureToHeight = ({
  currentTemperature,
  heightBetweenTicks,
  tickStep,
  minTemperature,
  maxTemperature,
}) => {
  let value = currentTemperature;
  if (value < minTemperature) {
    value = minTemperature;
  } else if (value > maxTemperature) {
    value = maxTemperature;
  }
  return ((-minTemperature + value) * heightBetweenTicks) / tickStep;
};

const Scale = ({
  currentTemperature,
  scales: { from, to },
  thermometerHeight,
  offsetY,
}) => {
  const thermometerXPosition = THERMOMETER_POSITION_X + THERMOMETER_WIDTH;

  // compute ideal step distance between ticks
  const tickStep = Math.ceil(
    (Math.abs(to) + Math.abs(from)) / SCALE_MAX_NUMBER_TICKS,
  );

  // round min and max to closest scale steps
  const roundFrom = tickStep * Math.floor(from / tickStep);
  const roundTo = tickStep * Math.ceil(to / tickStep) || tickStep;

  // compute scale array at every step
  const nbScale = (roundTo - roundFrom) / tickStep + 1; // +1 to include max
  let scaleArray = Array.from(
    { length: nbScale },
    (key, value) => value * tickStep + roundFrom,
  );

  // select marks at most number of scale we can display
  const maxNbScale = Math.floor(thermometerHeight / SCALE_HEIGHT);
  const prop = Math.ceil(scaleArray.length / maxNbScale);
  if (prop > 1) {
    scaleArray = scaleArray.filter((_, i) => i % prop === 0);
  }

  const heightBetweenTicks = thermometerHeight / scaleArray.length;

  // compute fill height given current temperature value
  const fillValue = temperatureToHeight({
    heightBetweenTicks,
    currentTemperature,
    tickStep,
    minTemperature: roundFrom,
    maxTemperature: roundTo,
  });

  // draw scale ticks
  const scaleComponents = scaleArray.map((text, idx) => {
    const thermometerYPosition =
      offsetY + thermometerHeight - idx * heightBetweenTicks;

    return (
      <Group key={text}>
        <Text
          x={thermometerXPosition + SCALE_PADDING_LEFT}
          y={thermometerYPosition - SCALE_FONT_SIZE / 3}
          text={text}
          fontSize={SCALE_FONT_SIZE}
        />
        <Rect
          x={THERMOMETER_POSITION_X + THERMOMETER_WIDTH - SCALE_WIDTH}
          y={thermometerYPosition}
          width={SCALE_WIDTH}
          height={SCALE_LINE_HEIGHT}
          fill={THERMOMETER_STROKE_COLOR}
        />
      </Group>
    );
  });

  const currentTemperatureY = offsetY + thermometerHeight - fillValue;
  return (
    <>
      {/* current temperature fill */}
      <Rect
        fill={THERMOMETER_COLOR}
        x={THERMOMETER_POSITION_X}
        y={currentTemperatureY}
        width={THERMOMETER_WIDTH}
        height={fillValue}
      />

      {/* scales */}
      {scaleComponents}

      {/* triangle slider */}
      <Slider
        heightBetweenTicks={heightBetweenTicks}
        y={currentTemperatureY}
        offsetY={offsetY}
        thermometerHeight={thermometerHeight}
        minTemperature={roundFrom}
        maxTemperature={roundTo}
        tickStep={tickStep}
      />
    </>
  );
};

Scale.propTypes = {
  currentTemperature: PropTypes.number.isRequired,
  scales: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }).isRequired,
  thermometerHeight: PropTypes.number,
  offsetY: PropTypes.number.isRequired,
};

Scale.defaultProps = {
  thermometerHeight: THERMOMETER_HEIGHT,
};

const mapStateToProps = ({ lab }) => ({
  currentTemperature: lab.temperature,
  scales: lab.scales,
});

export default connect(mapStateToProps)(Scale);
