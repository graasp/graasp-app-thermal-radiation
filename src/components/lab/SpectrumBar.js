import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Group, Text, Rect } from 'react-konva';
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

const SpectrumBar = ({ stageHeight }) => {
  const { t } = useTranslation();

  // centers spectrum bar horizontally
  const spectrumBarInitialXPosition = SPECTRUM_BAR_PADDING;
  const spectrumBarInitialYPosition = 0.77 * stageHeight;

  return (
    <Group>
      {/* three rectangles, one for each portion of the spectrum bar */}
      <Rect
        x={spectrumBarInitialXPosition}
        y={spectrumBarInitialYPosition}
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
        x={spectrumBarInitialXPosition + INFRARED_BAR_WIDTH}
        y={spectrumBarInitialYPosition}
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
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH
        }
        y={spectrumBarInitialYPosition}
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
      {/* two text labels for labels inside the spectrum bar */}
      <Text
        text={t('Infrared')}
        fontSize={SPECTRUM_BAR_LABELS_FONT_SIZE}
        // on x-axis, place text slightly to the right of the start of the spectrum bar
        x={spectrumBarInitialXPosition + 10}
        // on y-axis, center vertically, given spectrum bar height and this text element's fontSize
        y={
          spectrumBarInitialYPosition +
          (SPECTRUM_BAR_HEIGHT - SPECTRUM_BAR_LABELS_FONT_SIZE) / 2
        }
        fill={INFRARED_BAR_LABEL_COLOR}
      />
      <Text
        text={t('Ultraviolet')}
        // on x-axis, place text slightly to the left of the end of the spectrum bar
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH +
          ULTRAVIOLET_BAR_WIDTH -
          65
        }
        // on y-axis, center vertically, given spectrum bar height and this text element's fontSize
        y={
          spectrumBarInitialYPosition +
          (SPECTRUM_BAR_HEIGHT - SPECTRUM_BAR_LABELS_FONT_SIZE) / 2
        }
        fill={ULTRAVIOLET_BAR_LABEL_COLOR}
      />
      {/* wavelength labels */}
      <Text
        text={t('Wavelength (nm)')}
        // this one has to be positioned manually
        x={spectrumBarInitialXPosition + TOTAL_SPECTRUM_BAR_WIDTH / 2 - 45}
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR +
          SPECTRUM_BAR_LABELS_FONT_SIZE
        }
      />
      <Text
        text="1000"
        x={
          spectrumBarInitialXPosition -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
      <Text
        text="700"
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
      <Text
        text="400"
        x={
          spectrumBarInitialXPosition +
          INFRARED_BAR_WIDTH +
          VISIBLE_LIGHT_BAR_WIDTH -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
      <Text
        text="100"
        x={
          spectrumBarInitialXPosition +
          TOTAL_SPECTRUM_BAR_WIDTH -
          WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR
        }
        y={
          spectrumBarInitialYPosition +
          SPECTRUM_BAR_HEIGHT +
          WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR
        }
      />
    </Group>
  );
};

SpectrumBar.propTypes = {
  stageHeight: PropTypes.number.isRequired,
};

export default SpectrumBar;
