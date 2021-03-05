import React from 'react';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Group, Text, Rect, Line } from 'react-konva';
import {
  WAVELENGTH_DISTRIBUTION_HEIGHT,
  WAVELENGTH_DISTRIBUTION_WIDTH,
  WAVELENGTH_DISTRIBUTION_STROKE_COLOR,
  WAVELENGTH_DISTRIBUTION_STROKE_WIDTH,
  WAVELENGTH_DISTRIBUTION_LABELS_FONT_SIZE,
  WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR,
  WAVELENGTH_DISTRIBUTION_PADDING,
  WAVELENGTH_DISTRIBUTION_DISTRIBUTION_POINTS_NUMBER,
  WAVELENGTH_DISTRIBUTION_MIN_WAVELENGTH,
  WAVELENGTH_DISTRIBUTION_MAX_WAVELENGTH,
  WAVELENGTH_DISTRIBUTION_MARGIN,
  WAVELENGTH_DISTRIBUTION_AXIS_FONT_SIZE,
  WAVELENGTH_DISTRIBUTION_AXIS_HEIGHT,
  WAVELENGTH_DISTRIBUTION_PADDING_TOP,
  WAVELENGTH_DISTRIBUTION_PEAK_WAVELENGTH_COLOR,
  WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR,
  WAVELENGTH_DISTRIBUTION_AXIS_NB_TICKS,
  WAVELENGTH_DISTRIBUTION_BACKGROUND_COLOR,
  WAVELENGTH_DISTRIBUTION_LABELS_PADDING_TOP,
  SPEED_OF_LIGHT_CONSTANT,
  PLANCK_CONSTANT,
  HEADER_HEIGHT,
  WAVELENGTH_DISTRIBUTION_TICK_LINE_LENGTH,
} from '../../config/constants';

// source: https://github.com/phetsims/blackbody-spectrum/blob/master/js/blackbody-spectrum/model/BlackbodyBodyModel.js
const getSpectralPowerDensityAt = ({ wavelength, temperature }) => {
  // Avoiding division by 0
  if (wavelength === 0) {
    return 0;
  }

  // Normalized Planck's Law https://www.physics-in-a-nutshell.com/article/24/different-formulations-of-plancks-law
  const B = 1.43877e7; // is hc/k in units of nanometer-kelvin
  const c = SPEED_OF_LIGHT_CONSTANT;
  const h = PLANCK_CONSTANT;
  return (
    (2 * h * c * c) /
    wavelength ** 5 /
    (Math.exp(B / (wavelength * temperature)) - 1)
  );
};

const WavelengthDistribution = ({
  stageDimensions,
  temperature,
  headerVisible,
}) => {
  const { t } = useTranslation();
  const { stageWidth } = stageDimensions;
  const wavelengthDistance =
    WAVELENGTH_DISTRIBUTION_MAX_WAVELENGTH -
    WAVELENGTH_DISTRIBUTION_MIN_WAVELENGTH;

  // centers spectrum bar horizontally
  const wavelengthDistributionInitialXPosition =
    stageWidth -
    WAVELENGTH_DISTRIBUTION_WIDTH -
    WAVELENGTH_DISTRIBUTION_MARGIN -
    2 * WAVELENGTH_DISTRIBUTION_PADDING;
  const wavelengthDistributionInitialYPosition =
    (headerVisible ? HEADER_HEIGHT : 0) + WAVELENGTH_DISTRIBUTION_MARGIN;

  const wavelengthStep =
    wavelengthDistance / WAVELENGTH_DISTRIBUTION_DISTRIBUTION_POINTS_NUMBER;

  let distributionPoints = [
    ...new Array(WAVELENGTH_DISTRIBUTION_DISTRIBUTION_POINTS_NUMBER).keys(),
  ].map((i) => {
    const wavelength =
      WAVELENGTH_DISTRIBUTION_MIN_WAVELENGTH + i * wavelengthStep;
    return getSpectralPowerDensityAt({
      wavelength,
      temperature,
    });
  });

  const distancePerWavelength =
    WAVELENGTH_DISTRIBUTION_WIDTH / wavelengthDistance;

  // compute max wavelength
  const max = Math.max(...distributionPoints);
  const maxIndex = distributionPoints.indexOf(max);
  const maxIndexXPosition = maxIndex * wavelengthStep * distancePerWavelength;

  // normalize distribution points
  distributionPoints = distributionPoints
    .map((y, i) => {
      const v = (y / max) * WAVELENGTH_DISTRIBUTION_HEIGHT;
      return [i * wavelengthStep * distancePerWavelength, -v];
    })
    .flat();

  const ticks = [
    ...new Array(WAVELENGTH_DISTRIBUTION_AXIS_NB_TICKS + 1).keys(),
  ];
  const tickStep = wavelengthDistance / WAVELENGTH_DISTRIBUTION_AXIS_NB_TICKS;
  const tickDistance =
    WAVELENGTH_DISTRIBUTION_WIDTH / WAVELENGTH_DISTRIBUTION_AXIS_NB_TICKS;

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
      x={wavelengthDistributionInitialXPosition}
      y={wavelengthDistributionInitialYPosition}
      draggable
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* three rectangles, one for each portion of the spectrum bar */}
      <Rect
        x={0}
        y={0}
        width={
          WAVELENGTH_DISTRIBUTION_WIDTH + 2 * WAVELENGTH_DISTRIBUTION_PADDING
        }
        height={
          WAVELENGTH_DISTRIBUTION_HEIGHT +
          WAVELENGTH_DISTRIBUTION_PADDING_TOP +
          WAVELENGTH_DISTRIBUTION_AXIS_HEIGHT
        }
        stroke={WAVELENGTH_DISTRIBUTION_STROKE_COLOR}
        strokeWidth={WAVELENGTH_DISTRIBUTION_STROKE_WIDTH}
        fill={WAVELENGTH_DISTRIBUTION_BACKGROUND_COLOR}
      />
      <Line
        x={WAVELENGTH_DISTRIBUTION_PADDING}
        y={WAVELENGTH_DISTRIBUTION_HEIGHT + WAVELENGTH_DISTRIBUTION_PADDING_TOP}
        points={distributionPoints}
        tension={0.5}
        stroke={WAVELENGTH_DISTRIBUTION_STROKE_COLOR}
      />

      {/* max peak wavelength */}
      <Line
        x={WAVELENGTH_DISTRIBUTION_PADDING}
        y={WAVELENGTH_DISTRIBUTION_PADDING_TOP}
        stroke={WAVELENGTH_DISTRIBUTION_PEAK_WAVELENGTH_COLOR}
        points={[
          maxIndexXPosition,
          0,
          maxIndexXPosition,
          WAVELENGTH_DISTRIBUTION_HEIGHT,
        ]}
      />
      <Text
        text={t('Most Frequent')}
        rotation={-90}
        fill={WAVELENGTH_DISTRIBUTION_PEAK_WAVELENGTH_COLOR}
        fontSize={WAVELENGTH_DISTRIBUTION_AXIS_FONT_SIZE}
        // this one has to be positioned manually
        x={maxIndexXPosition + WAVELENGTH_DISTRIBUTION_PADDING + 5}
        y={WAVELENGTH_DISTRIBUTION_HEIGHT}
      />

      <Group
        x={WAVELENGTH_DISTRIBUTION_PADDING}
        y={
          WAVELENGTH_DISTRIBUTION_HEIGHT +
          WAVELENGTH_DISTRIBUTION_PADDING_TOP +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      >
        <Line
          stroke={WAVELENGTH_DISTRIBUTION_STROKE_COLOR}
          points={[0, 0, WAVELENGTH_DISTRIBUTION_WIDTH, 0]}
          strokeWidth={1}
        />
        {/* wavelength labels */}
        <Text
          text={t('Wavelength (nm)')}
          fontSize={WAVELENGTH_DISTRIBUTION_AXIS_FONT_SIZE}
          // this one has to be positioned manually
          x={WAVELENGTH_DISTRIBUTION_WIDTH / 2 - 45}
          y={
            WAVELENGTH_DISTRIBUTION_LABELS_FONT_SIZE +
            WAVELENGTH_DISTRIBUTION_LABELS_PADDING_TOP * 2
          }
        />
        {/* ticks */}
        {ticks.map((i) => {
          const x = i * tickDistance;
          const v = i * tickStep + WAVELENGTH_DISTRIBUTION_MIN_WAVELENGTH;
          return (
            <Group x={x}>
              <Line
                points={[0, 0, 0, WAVELENGTH_DISTRIBUTION_TICK_LINE_LENGTH]}
                stroke="black"
                strokeWidth={1}
                y={-WAVELENGTH_DISTRIBUTION_TICK_LINE_LENGTH / 2}
              />
              <Text
                key={-WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR}
                text={v}
                y={WAVELENGTH_DISTRIBUTION_LABELS_PADDING_TOP}
                x={-WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR}
                fontSize={WAVELENGTH_DISTRIBUTION_AXIS_FONT_SIZE}
              />
            </Group>
          );
        })}
      </Group>
    </Group>
  );
};

WavelengthDistribution.propTypes = {
  stageDimensions: PropTypes.shape({
    stageHeight: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
  }).isRequired,
  temperature: PropTypes.number.isRequired,
  headerVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ lab, appInstance }) => ({
  temperature: lab.temperature,
  headerVisible: appInstance.content.settings.headerVisible,
});

const ConnectedComponent = connect(mapStateToProps)(WavelengthDistribution);

export default ConnectedComponent;
