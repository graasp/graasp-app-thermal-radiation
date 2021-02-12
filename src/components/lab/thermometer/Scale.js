import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Group, Text, Rect } from 'react-konva';
import {
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
  SCALE_PADDING_RIGHT,
  SCALE_LEGEND_PADDING_BOTTOM,
  BACKGROUND_COLOR,
  SCALE_LEGEND_FONT_SIZE,
  SCALE_LABEL_NOTES,
  SCALE_TEXT_WIDTH_FACTOR,
  SCALE_LABEL_NOTES_STROKE_WIDTH,
} from '../../../config/constants';
import Slider from './Slider';
import { celsiusToKelvin, kelvinToCelsius } from '../../../utils/utils';

// compute the corresponding height in px given the temperature
const temperatureToHeight = ({
  currentTemperature,
  deltaTemperatureHeight,
  minTemperature,
  maxTemperature,
}) => {
  let value = currentTemperature;
  if (value < minTemperature) {
    value = minTemperature;
  } else if (value > maxTemperature) {
    value = maxTemperature;
  }
  return (-minTemperature + value) * deltaTemperatureHeight;
};

const renderScales = ({
  scales,
  x: offsetX,
  offsetY,
  scaleXOffset,
  textXOffset,
  labelYOffset,
  label,
}) => (
  <>
    {/* legend */}
    <Text
      fontStyle="bold"
      x={offsetX + textXOffset}
      y={labelYOffset}
      text={label}
      fontSize={SCALE_LEGEND_FONT_SIZE}
    />
    {scales.map(({ text, y }) => {
      const thermometerYPosition = offsetY - y;

      return (
        <Group key={text} y={thermometerYPosition} x={offsetX}>
          <Text
            x={textXOffset}
            y={-SCALE_FONT_SIZE / 3}
            text={text}
            fontSize={SCALE_FONT_SIZE}
          />
          <Rect
            x={scaleXOffset}
            width={SCALE_WIDTH}
            height={SCALE_LINE_HEIGHT}
            fill={THERMOMETER_STROKE_COLOR}
          />
        </Group>
      );
    })}
  </>
);

const buildKelvinScales = ({
  to,
  from,
  tickStep,
  thermometerHeight,
  offsetY,
  thermometerXPosition,
  labelYOffset,
  deltaHeight,
}) => {
  // compute text and y position for kelvin scales
  let scales = Array.from(
    {
      length: (to - from) / tickStep + 1, // +1 to include max
    },
    (key, idx) => {
      const value = idx * tickStep + from;
      return { text: value, y: (value - from) * deltaHeight };
    },
  );

  // select marks at most number of scale we can display
  const maxNbScale = Math.floor(thermometerHeight / SCALE_HEIGHT);
  const prop = Math.ceil(scales.length / maxNbScale);
  if (prop > 1) {
    scales = scales.filter((_, i) => i % prop === 0);
  }

  // draw scale ticks
  const ScaleComponents = renderScales({
    offsetY: offsetY + thermometerHeight - SCALE_LINE_HEIGHT,
    x: thermometerXPosition,
    scales,
    scaleXOffset: -SCALE_WIDTH,
    textXOffset: SCALE_PADDING_LEFT,
    labelYOffset,
    label: '°K',
  });

  return ScaleComponents;
};

const buildCelsiusScales = ({
  from,
  to,
  roundFromKelvin,
  deltaKelvinHeight,
  offsetY,
  offsetX,
  labelYOffset,
}) => {
  // get celsium degree from kelvin thermometer boundaries
  const celsiusFrom = kelvinToCelsius(from);
  const celsiusTo = kelvinToCelsius(to);

  // compute ideal step between ticks
  const celsiusTickStep = Math.ceil(
    (Math.abs(celsiusTo) + Math.abs(celsiusFrom)) / SCALE_MAX_NUMBER_TICKS,
  );

  // round min and max to closest scale steps
  // these bounds might not include from and to values
  const celsiusRoundFrom =
    celsiusTickStep * Math.ceil(celsiusFrom / celsiusTickStep);
  const celsiusRoundTo =
    celsiusTickStep * Math.floor(celsiusTo / celsiusTickStep);

  // compute scales text and y position based on kelvin scales
  const celsiusScales = Array.from(
    {
      length: (celsiusRoundTo - celsiusRoundFrom) / celsiusTickStep + 1, // +1 to include max
    },
    (key, idx) => {
      const value = idx * celsiusTickStep + celsiusRoundFrom;
      return {
        text: value,
        y:
          (celsiusToKelvin(value) - Math.abs(roundFromKelvin)) *
          deltaKelvinHeight,
      };
    },
  );

  // draw scale ticks
  const CelsiusScaleComponents = renderScales({
    offsetY,
    x: offsetX,
    scales: celsiusScales,
    scaleXOffset: 0,
    textXOffset: -SCALE_PADDING_RIGHT - SCALE_WIDTH,
    labelYOffset,
    label: '°C',
  });

  return CelsiusScaleComponents;
};

const Scale = ({
  currentTemperature,
  scales: { from, to },
  thermometerHeight,
  offsetY,
  showThermometerLabels,
}) => {
  const { t } = useTranslation();
  const thermometerXPosition = THERMOMETER_POSITION_X + THERMOMETER_WIDTH;

  // compute ideal step distance between ticks
  const tickStep = Math.ceil(
    (Math.abs(to) + Math.abs(from)) / SCALE_MAX_NUMBER_TICKS,
  );

  // round min and max to closest scale steps
  const roundFrom = tickStep * Math.floor(from / tickStep);
  const roundTo = tickStep * Math.ceil(to / tickStep) || tickStep;

  // height in pixel for one degree kelvin
  const deltaKelvinHeight = thermometerHeight / (roundTo - roundFrom);

  const labelYOffset = offsetY - SCALE_LEGEND_PADDING_BOTTOM;

  // build kelvin scales
  const KelvinScaleComponents = buildKelvinScales({
    from: roundFrom,
    to: roundTo,
    offsetY,
    thermometerXPosition,
    tickStep,
    thermometerHeight,
    deltaHeight: deltaKelvinHeight,
    labelYOffset,
  });

  // build celsius scales
  const CelsiusScaleComponents = buildCelsiusScales({
    from,
    to,
    offsetY: offsetY + thermometerHeight - SCALE_LINE_HEIGHT,
    offsetX: thermometerXPosition - THERMOMETER_WIDTH,
    roundFromKelvin: roundFrom,
    deltaKelvinHeight,
    thermometerHeight,
    labelYOffset,
  });

  const LabelNoteComponents = SCALE_LABEL_NOTES.map(
    ({ name, t: temperature }) => (
      <Text
        fontStyle="italic"
        stroke={BACKGROUND_COLOR}
        strokeWidth={SCALE_LABEL_NOTES_STROKE_WIDTH}
        fillAfterStrokeEnabled
        x={thermometerXPosition + SCALE_TEXT_WIDTH_FACTOR + SCALE_PADDING_LEFT}
        y={
          -(SCALE_FONT_SIZE / 3) +
          offsetY +
          thermometerHeight -
          (temperature - roundFrom) * deltaKelvinHeight
        }
        text={t(name)}
        fontSize={SCALE_FONT_SIZE}
      />
    ),
  );

  // compute fill height given current temperature value
  const fillValue = temperatureToHeight({
    deltaTemperatureHeight: deltaKelvinHeight,
    currentTemperature,

    minTemperature: roundFrom,
    maxTemperature: roundTo,
  });

  // absolute y position for given temperature
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
      {KelvinScaleComponents}
      {CelsiusScaleComponents}

      {/* label notes: planets, etc */}
      {showThermometerLabels && LabelNoteComponents}

      {/* triangle slider */}
      <Slider
        deltaTemperatureHeight={deltaKelvinHeight}
        y={currentTemperatureY}
        offsetY={offsetY}
        thermometerHeight={thermometerHeight}
        minTemperature={roundFrom}
        maxTemperature={roundTo}
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
  thermometerHeight: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  showThermometerLabels: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ lab }) => ({
  currentTemperature: lab.temperature,
  scales: lab.scales,
  showThermometerLabels: lab.showThermometerLabels,
});

export default connect(mapStateToProps)(Scale);
