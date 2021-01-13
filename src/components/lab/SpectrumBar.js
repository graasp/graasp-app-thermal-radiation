import React from 'react';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Group, Text, Rect, Line } from 'react-konva';
import {
  SPECTRUM_BAR_HEIGHT,
  INFRARED_BAR_WIDTH,
  VISIBLE_LIGHT_BAR_WIDTH,
  ULTRAVIOLET_BAR_WIDTH,
  TOTAL_SPECTRUM_BAR_WIDTH,
  SPECTRUM_BAR_STROKE_COLOR,
  SPECTRUM_BAR_STROKE_WIDTH,
  INFRARED_COLOR_RANGE,
  VISIBLE_LIGHT_COLOR_RANGE,
  ULTRAVIOLET_COLOR_RANGE,
  SPECTRUM_BAR_LABELS_FONT_SIZE,
  INFRARED_BAR_LABEL_COLOR,
  ULTRAVIOLET_BAR_LABEL_COLOR,
  WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR,
  WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR,
  SPECTRUM_BAR_PADDING,
} from '../../config/constants';

// const BOLTZMANN_CONSTANT = 1.38 * 10e-23;
// const PLANCK_CONSTANT = 6.63 * 10e-34;
// // const WIEN_DISPLACEMENT_CONSTANT = 2.9 * 10e-3;
// const SPEED_OF_LIGHT_CONSTANT = 299792458; // m/s

/**
 * Function that returns the peak wavelength (in nanometers) of the blackbody
 * Equation in use is Wien's displacement Law: Peak wavelength = b / T
 * b is Wien's displacement constant, T is the temperature
 * @public
 * @returns {number}
 */
// const getPeakWavelength = () => {
//   const WIEN_CONSTANT = 2.897773e-3; // is equal to b in units of meters-kelvin
//   return (1e9 * WIEN_CONSTANT) / this.temperatureProperty.value;
// };

const linear = (a1, a2, b1, b2, a3) => {
  return ((b2 - b1) / (a2 - a1)) * (a3 - a1) + b1;
};

/**
 * Function that returns the spectral power density at a given wavelength (in nm)
 * The units of spectral power density are in megaWatts per meter^2 per micrometer
 * Equation in use is Planck's Law which returns a spectral radiance of a Blackbody given a temperature and wavelength
 * Planck's law is that spectral radiance = 2hc^2 / ( l^5 * ( e^( hc / lkt ) - 1 ) )
 * This spectral radiance is multiplied by pi to retrieve the spectral power density
 * h is Planck's constant, c is the speed of light, l is wavelength, k is the Boltzmann constant, and t is the temperature
 * @public
 * @param {number} wavelength
 * @returns {number}
 */
// source: https://github.com/phetsims/blackbody-spectrum/blob/master/js/blackbody-spectrum/model/BlackbodyBodyModel.js

const getSpectralPowerDensityAt = ({ wavelength, temperature }) => {
  // Avoiding division by 0
  if (wavelength === 0) {
    return 0;
  }

  const A = 3.74192e-16; // is 2πhc^2 in units of watts*m^2
  const B = 1.43877e7; // is hc/k in units of nanometer-kelvin
  return (
    A /
    // eslint-disable-next-line no-restricted-properties
    (Math.pow(wavelength, 5) * (Math.exp(B / (wavelength * temperature)) - 1))
  );
};

const SpectrumBar = ({ stageHeight }) => {
  const { t } = useTranslation();

  // centers spectrum bar horizontally
  const spectrumBarInitialXPosition = SPECTRUM_BAR_PADDING;
  const spectrumBarInitialYPosition = 0.77 * stageHeight;

  // const TRD = ({ wavelength }) => {
  //   const c = SPEED_OF_LIGHT_CONSTANT;
  //   const k = BOLTZMANN_CONSTANT;
  //   const h = PLANCK_CONSTANT;
  //   const d = Math.exp((h * c) / (wavelength * k * temperature));
  //   return 1 / (d - 1);
  // };

  const distributionPoints = [...new Array(30).keys()]
    .map((i) => {
      const wavelength = 3000 - i * 100;
      const v = getSpectralPowerDensityAt({
        wavelength,
        temperature: 5800,
      });
      const y = -1e33 * linear(0, 100, 0, 400, v);
      const dd = [i * 10, y < -405 ? -405 : y];
      return dd;
    })
    .flat();

  return (
    <Group x={spectrumBarInitialXPosition} y={spectrumBarInitialYPosition}>
      {/* three rectangles, one for each portion of the spectrum bar */}
      <Rect
        x={0}
        y={0}
        width={INFRARED_BAR_WIDTH}
        height={SPECTRUM_BAR_HEIGHT}
        stroke={SPECTRUM_BAR_STROKE_COLOR}
        strokeWidth={SPECTRUM_BAR_STROKE_WIDTH}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: INFRARED_BAR_WIDTH,
          y: 0,
        }}
        fillLinearGradientColorStops={INFRARED_COLOR_RANGE}
      />
      <Rect
        x={INFRARED_BAR_WIDTH}
        y={0}
        width={VISIBLE_LIGHT_BAR_WIDTH}
        height={SPECTRUM_BAR_HEIGHT}
        stroke={SPECTRUM_BAR_STROKE_COLOR}
        strokeWidth={SPECTRUM_BAR_STROKE_WIDTH}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: VISIBLE_LIGHT_BAR_WIDTH,
          y: 0,
        }}
        fillLinearGradientColorStops={VISIBLE_LIGHT_COLOR_RANGE}
      />
      <Rect
        x={INFRARED_BAR_WIDTH + VISIBLE_LIGHT_BAR_WIDTH}
        y={0}
        width={ULTRAVIOLET_BAR_WIDTH}
        height={SPECTRUM_BAR_HEIGHT}
        stroke={SPECTRUM_BAR_STROKE_COLOR}
        strokeWidth={SPECTRUM_BAR_STROKE_WIDTH}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{
          x: ULTRAVIOLET_BAR_WIDTH,
          y: 0,
        }}
        fillLinearGradientColorStops={ULTRAVIOLET_COLOR_RANGE}
      />
      <Line
        x={0}
        y={SPECTRUM_BAR_HEIGHT}
        points={distributionPoints}
        tension={0.5}
        stroke="black"
      />
      {/* two text labels for labels inside the spectrum bar */}
      <Text
        text={t('Infrared')}
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        // on x-axis, place text slightly to the right of the start of the spectrum bar
        x={10}
        // on y-axis, center vertically, given spectrum bar height and this text element's fontSize
        y={(SPECTRUM_BAR_HEIGHT - SPECTRUM_BAR_LABELS_FONT_SIZE) / 2}
        fill={INFRARED_BAR_LABEL_COLOR}
      />
      <Text
        text={t('Ultraviolet')}
        // on x-axis, place text slightly to the left of the end of the spectrum bar
        x={
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH +
          ULTRAVIOLET_BAR_WIDTH -
          65
        }
        // on y-axis, center vertically, given spectrum bar height and this text element's fontSize
        y={(SPECTRUM_BAR_HEIGHT - SPECTRUM_BAR_LABELS_FONT_SIZE) / 2}
        fill={ULTRAVIOLET_BAR_LABEL_COLOR}
      />
      {/* wavelength labels */}
      <Text
        text={t('Wavelength (nm)')}
        // this one has to be positioned manually
        x={TOTAL_SPECTRUM_BAR_WIDTH / 2 - 45}
        y={
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR +
          SPECTRUM_BAR_LABELS_FONT_SIZE
        }
      />
      <Text
        text="1000"
        x={WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR}
        y={SPECTRUM_BAR_HEIGHT + WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR}
      />
      <Text
        text="700"
        x={INFRARED_BAR_WIDTH - WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR}
        y={SPECTRUM_BAR_HEIGHT + WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR}
      />
      <Text
        text="400"
        x={
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={SPECTRUM_BAR_HEIGHT + WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR}
      />
      <Text
        text="100"
        x={
          TOTAL_SPECTRUM_BAR_WIDTH - WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={SPECTRUM_BAR_HEIGHT + WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR}
      />
    </Group>
  );
};

SpectrumBar.propTypes = {
  stageHeight: PropTypes.number.isRequired,
  // temperature: PropTypes.number.isRequired,
};

const mapStateToProps = ({ lab }) => ({
  temperature: lab.temperature,
});

const ConnectedComponent = connect(mapStateToProps)(SpectrumBar);

export default ConnectedComponent;
