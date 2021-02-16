import React from 'react';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Group, Text, Rect, Line } from 'react-konva';
import {
  SPECTRUM_BAR_HEIGHT,
  SPECTRUM_BAR_WIDTH,
  SPECTRUM_BAR_STROKE_COLOR,
  SPECTRUM_BAR_STROKE_WIDTH,
  SPECTRUM_BAR_LABELS_FONT_SIZE,
  WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR,
  SPECTRUM_BAR_PADDING,
  SPECTRUM_BAR_DISTRIBUTION_POINTS_NUMBER,
  SPECTRUM_BAR_MIN_WAVELENGTH,
  SPECTRUM_BAR_MAX_WAVELENGTH,
  SPECTRUM_BAR_MARGIN,
  SPECTRUM_BAR_AXIS_FONT_SIZE,
  SPECTRUM_BAR_AXIS_HEIGHT,
  SPECTRUM_BAR_PADDING_TOP,
  SPECTRUM_BAR_PEAK_WAVELENGTH_COLOR,
  WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR,
  SPECTRUM_BAR_AXIS_NB_TICKS,
  SPECTRUM_BAR_BACKGROUND_COLOR,
  SPECTRUM_BAR_LABELS_PADDING_TOP,
  SPEED_OF_LIGHT_CONSTANT,
  PLANCK_CONSTANT,
} from '../../config/constants';

// source: https://github.com/phetsims/blackbody-spectrum/blob/master/js/blackbody-spectrum/model/BlackbodyBodyModel.js
const getSpectralPowerDensityAt = ({ wavelength, temperature }) => {
  // Avoiding division by 0
  if (wavelength === 0) {
    return 0;
  }

  const B = 1.43877e7; // is hc/k in units of nanometer-kelvin
  const c = SPEED_OF_LIGHT_CONSTANT;
  const h = PLANCK_CONSTANT;
  return (
    (2 * h * c * c) /
    wavelength ** 5 /
    (Math.exp(B / (wavelength * temperature)) - 1)
  );
};

const SpectrumBar = ({ stageDimensions, temperature }) => {
  const { t } = useTranslation();
  const { stageHeight, stageWidth } = stageDimensions;
  const wavelengthDistance =
    SPECTRUM_BAR_MAX_WAVELENGTH - SPECTRUM_BAR_MIN_WAVELENGTH;

  // centers spectrum bar horizontally
  const spectrumBarInitialXPosition =
    stageWidth -
    SPECTRUM_BAR_WIDTH -
    SPECTRUM_BAR_MARGIN -
    2 * SPECTRUM_BAR_PADDING;
  const spectrumBarInitialYPosition = 0.12 * stageHeight;

  const wavelengthStep =
    wavelengthDistance / SPECTRUM_BAR_DISTRIBUTION_POINTS_NUMBER;

  let distributionPoints = [
    ...new Array(SPECTRUM_BAR_DISTRIBUTION_POINTS_NUMBER).keys(),
  ].map((i) => {
    const wavelength = SPECTRUM_BAR_MIN_WAVELENGTH + i * wavelengthStep;
    return getSpectralPowerDensityAt({
      wavelength,
      temperature,
    });
  });

  const distancePerWavelength = SPECTRUM_BAR_WIDTH / wavelengthDistance;

  // compute max wavelength
  const max = Math.max(...distributionPoints);
  const maxIndex = distributionPoints.indexOf(max);
  const maxIndexXPosition = maxIndex * wavelengthStep * distancePerWavelength;

  // normalize distribution points
  distributionPoints = distributionPoints
    .map((y, i) => {
      const v = (y / max) * SPECTRUM_BAR_HEIGHT;
      return [i * wavelengthStep * distancePerWavelength, -v];
    })
    .flat();

  const ticks = [...new Array(SPECTRUM_BAR_AXIS_NB_TICKS + 1).keys()];
  const tickStep = wavelengthDistance / SPECTRUM_BAR_AXIS_NB_TICKS;
  const tickDistance = SPECTRUM_BAR_WIDTH / SPECTRUM_BAR_AXIS_NB_TICKS;

  const onMouseEnter = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'grab';
  };

  const onMouseLeave = (event) => {
    const container = event.target.getStage().container();
    container.style.cursor = 'default';
  };

  return (
    <Group
      x={spectrumBarInitialXPosition}
      y={spectrumBarInitialYPosition}
      draggable
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* three rectangles, one for each portion of the spectrum bar */}
      <Rect
        x={0}
        y={0}
        width={SPECTRUM_BAR_WIDTH + 2 * SPECTRUM_BAR_PADDING}
        height={
          SPECTRUM_BAR_HEIGHT +
          SPECTRUM_BAR_PADDING_TOP +
          SPECTRUM_BAR_AXIS_HEIGHT
        }
        stroke={SPECTRUM_BAR_STROKE_COLOR}
        strokeWidth={SPECTRUM_BAR_STROKE_WIDTH}
        fill={SPECTRUM_BAR_BACKGROUND_COLOR}
      />
      <Line
        x={SPECTRUM_BAR_PADDING}
        y={SPECTRUM_BAR_HEIGHT + SPECTRUM_BAR_PADDING_TOP}
        points={distributionPoints}
        tension={0.5}
        stroke={SPECTRUM_BAR_STROKE_COLOR}
      />
      <Line
        x={SPECTRUM_BAR_PADDING}
        y={SPECTRUM_BAR_PADDING_TOP}
        stroke={SPECTRUM_BAR_PEAK_WAVELENGTH_COLOR}
        points={[maxIndexXPosition, 0, maxIndexXPosition, SPECTRUM_BAR_HEIGHT]}
      />
      <Group
        x={SPECTRUM_BAR_PADDING}
        y={
          SPECTRUM_BAR_HEIGHT +
          SPECTRUM_BAR_PADDING_TOP +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      >
        <Line
          stroke={SPECTRUM_BAR_STROKE_COLOR}
          points={[0, 0, SPECTRUM_BAR_WIDTH, 0]}
          strokeWidth={1}
        />
        {/* wavelength labels */}
        <Text
          text={t('Wavelength (nm)')}
          fontSize={SPECTRUM_BAR_AXIS_FONT_SIZE}
          // this one has to be positioned manually
          x={SPECTRUM_BAR_WIDTH / 2 - 45}
          y={
            SPECTRUM_BAR_LABELS_FONT_SIZE + SPECTRUM_BAR_LABELS_PADDING_TOP * 2
          }
        />
        {/* ticks */}
        {ticks.map((i) => {
          const x =
            i * tickDistance - WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR;
          const v = i * tickStep + SPECTRUM_BAR_MIN_WAVELENGTH;
          return (
            <Text
              text={v}
              x={x}
              y={SPECTRUM_BAR_LABELS_PADDING_TOP}
              fontSize={SPECTRUM_BAR_AXIS_FONT_SIZE}
            />
          );
        })}
      </Group>
    </Group>
  );
};

SpectrumBar.propTypes = {
  stageDimensions: PropTypes.shape({
    stageHeight: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
  }).isRequired,
  temperature: PropTypes.number.isRequired,
};

const mapStateToProps = ({ lab }) => ({
  temperature: lab.temperature,
});

const ConnectedComponent = connect(mapStateToProps)(SpectrumBar);

export default ConnectedComponent;
