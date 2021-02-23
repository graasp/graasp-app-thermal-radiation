export const DRAWER_WIDTH = 430;
export const DEFAULT_THEME_DIRECTION = 'rtl';
export const FORM_CONTROL_MIN_WIDTH = 120;
export const LOGO_SIZE = '48px';
export const DEFAULT_HEADER_VISIBLE = true;
export const MAXIMUM_Z_INDEX = 999999;

export const BACKGROUND_COLOR = 'lightgrey';

// constants used in the lattice of positive ions
export const POSITIVE_ION_RADIUS = 15;
export const POSITIVE_ION_COLOR = 'darkred';
export const POSITIVE_ION_SYMBOL = '+';
export const POSITIVE_ION_SYMBOL_FONT_SIZE = 20;
export const POSITIVE_ION_SYMBOL_COLOR = 'white';
export const NUMBER_OF_ROWS_IN_LATTICE = 3;
export const VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS = 30;
export const HORIZONTAL_DISTANCE_BETWEEN_POSITIVE_IONS = 20;
export const IONS_OSCILLATION_SPEED_FACTOR = 0.5;
export const IONS_OSCILLATION_OFFSET = 10.1;
export const IONS_OSCILLATION_RADIUS = 5;
export const LATTICE_HEIGHT =
  NUMBER_OF_ROWS_IN_LATTICE *
  (POSITIVE_ION_RADIUS + VERTICAL_DISTANCE_BETWEEN_POSITIVE_IONS);

// constants used in the electrons between positive ions
export const ELECTRON_RADIUS = 6;
export const ELECTRON_COLOR = '#0000AF';
export const ELECTRON_SYMBOL = '-';
export const ELECTRON_SYMBOL_FONT_SIZE = 15;
export const ELECTRON_SYMBOL_COLOR = 'white';

export const THERMOMETER_COLOR = 'red';
export const THERMOMETER_WIDTH = 20;
export const THERMOMETER_RADIUS = 20;
export const THERMOMETER_POSITION_X = 50;
export const THERMOMETER_STROKE_WIDTH = 3;
export const THERMOMETER_STROKE_COLOR = 'black';
// these factors are used as percentage depending on stage dimensions
export const THERMOMETER_POSITION_Y_FACTOR = 0.2;
export const THERMOMETER_HEIGHT_FACTOR = 0.5;
export const SCALE_UNITS = {
  KELVIN: { name: 'kelvin', unit: 'K' },
  CELSIUS: { name: 'celsius', unit: '°C' },
};
export const THERMOMETER_CURRENT_TEMPERATURE_FONT_SIZE = 20;

export const SCALE_WIDTH = 7;
export const SCALE_FONT_SIZE = 13;
export const SCALE_PADDING_LEFT = 7;
export const SCALE_PADDING_RIGHT = 20;
export const SCALE_LINE_HEIGHT = 1.5;
export const SCALE_HEIGHT = 17;
// approximatively the width of the scale text
export const SCALE_TEXT_WIDTH_FACTOR = SCALE_FONT_SIZE;
// the actual number of displayed ticks might vary due to number rounding
export const SCALE_MAX_NUMBER_TICKS = 10;
export const SCALE_LEGEND_PADDING_BOTTOM = 30;
export const SCALE_LEGEND_FONT_SIZE = 16;
export const SCALE_TICKS_STROKE_COLOR = 'black';
export const SCALE_LABEL_NOTES = [
  { name: 'Mars', t: 210 },
  { name: 'Earth', t: 289 },
  { name: 'Venus', t: 733 },
];
export const INITIAL_TEMPERATURE = 289;
export const SCALE_LABEL_NOTES_STROKE_WIDTH = 3;

export const SLIDER_FILL_COLOR = 'black';
export const SLIDER_RADIUS = 8;
export const SET_INTERVAL_TIME = 30;

export const THERMOMETER_TOTAL_WIDTH =
  THERMOMETER_WIDTH +
  THERMOMETER_POSITION_X +
  SCALE_TEXT_WIDTH_FACTOR * 2 + // approximatively left scale text width
  SCALE_PADDING_LEFT +
  SLIDER_RADIUS +
  SCALE_TEXT_WIDTH_FACTOR * 2;

// spectrum bar constants
export const WAVELENGTH_DISTRIBUTION_WIDTH = 350;
export const WAVELENGTH_DISTRIBUTION_HEIGHT = 120;
export const WAVELENGTH_DISTRIBUTION_STROKE_COLOR = 'black';
export const WAVELENGTH_DISTRIBUTION_STROKE_WIDTH = 0.5;
export const WAVELENGTH_DISTRIBUTION_PADDING = 30;
export const WAVELENGTH_DISTRIBUTION_PADDING_TOP = 10;
export const WAVELENGTH_DISTRIBUTION_AXIS_HEIGHT = 50;
export const WAVELENGTH_DISTRIBUTION_AXIS_NB_TICKS = 4; // will actually display one more
export const WAVELENGTH_DISTRIBUTION_MARGIN = 20;
export const WAVELENGTH_DISTRIBUTION_LABELS_FONT_SIZE = 12;
export const WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR = 5;
export const WAVELENGTH_DISTRIBUTION_DISTRIBUTION_POINTS_NUMBER = 50;
export const WAVELENGTH_DISTRIBUTION_MAX_WAVELENGTH = 15000;
export const WAVELENGTH_DISTRIBUTION_MIN_WAVELENGTH = 3000;
export const WAVELENGTH_DISTRIBUTION_BACKGROUND_COLOR = 'white';
export const WAVELENGTH_DISTRIBUTION_LABELS_PADDING_TOP = 7;
export const WAVELENGTH_DISTRIBUTION_PEAK_WAVELENGTH_COLOR = 'red';
export const WAVELENGTH_DISTRIBUTION_AXIS_FONT_SIZE = 15;
export const WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR = 20;
export const WAVELENGTH_DISTRIBUTION_TICK_LINE_LENGTH = 7;

export const PLANCK_CONSTANT = 6.63 * 10e-34;
export const SPEED_OF_LIGHT_CONSTANT = 299792458; // m/s
export const LINE_STROKE_COLOR = 'black';
export const DEFAULT_TENSION = 0.1;

export const NUMBER_OF_LINES = 5;
export const LINE_STEP = 3;
export const LINE_AMPLITUDE = 30;
export const LINE_ANGLE = Math.PI / 2;
export const LINE_STARTING_POSITION_Y = 550;

export const GROUND_FILL_DARK_COLOR = '#ad7e4e';
export const GROUND_FILL_LIGHT_COLOR = '#cfae67';
export const GROUND_GRASS_HEIGHT = 20;
export const GROUND_GRASS_LINE_TENSION = 0.3;
export const GROUND_GRASS_BACKGROUND = '#a14e06';

// grid constants
export const GRID_AXES_COLOR = '#000';
export const GRID_AXES_STROKE_WIDTH = 0.5;
export const GRID_SQUARE_WIDTH_AND_HEIGHT = 47.5;
export const GRID_LEGEND_LABEL_TEXT = '5000nm';
export const GRID_UNIT_SQUARE_LENGTH = 45;
