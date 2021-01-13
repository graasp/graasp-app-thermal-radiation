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

// constants used in the electrons between positive ions
export const ELECTRON_RADIUS = 6;
export const ELECTRON_COLOR = '#0000AF';
export const ELECTRON_SYMBOL = '-';
export const ELECTRON_SYMBOL_FONT_SIZE = 15;
export const ELECTRON_SYMBOL_COLOR = 'white';

export const THERMOMETER_COLOR = 'red';
export const THERMOMETER_WIDTH = 20;
export const THERMOMETER_HEIGHT = 350;
export const THERMOMETER_RADIUS = 20;
export const THERMOMETER_POSITION_X = 40;
export const THERMOMETER_POSITION_Y = 150;
export const THERMOMETER_STROKE_WIDTH = 3;
export const THERMOMETER_STROKE_COLOR = 'black';

export const GRADUATION_WIDTH = 10;
export const GRADUATION_FONT_SIZE = 13;
export const GRADUATION_PADDING_LEFT = 7;
export const GRADUATION_LINE_HEIGHT = 1.5;
export const GRADUATION_HEIGHT = 17;
// the actual number of displayed ticks might vary
export const GRADUATION_MAX_NUMBER_TICKS = 10;

export const SLIDER_FILL_COLOR = 'black';
export const SET_INTERVAL_TIME = 10;

// spectrum bar constants
// note: infrared range: 1000-700nm; visible light: 700-400nm; ultraviolet: 400-100nm
export const INFRARED_BAR_WIDTH = 200;
export const VISIBLE_LIGHT_BAR_WIDTH = 80;
export const ULTRAVIOLET_BAR_WIDTH = 80;
export const TOTAL_SPECTRUM_BAR_WIDTH =
  INFRARED_BAR_WIDTH + VISIBLE_LIGHT_BAR_WIDTH + ULTRAVIOLET_BAR_WIDTH;
export const SPECTRUM_BAR_HEIGHT = 120;
export const SPECTRUM_BAR_STROKE_COLOR = 'black';
export const SPECTRUM_BAR_STROKE_WIDTH = 0.5;
export const SPECTRUM_BAR_PADDING = 30;
// css gradient, values from 0 to 1
export const INFRARED_COLOR_RANGE = [0, 'darkred', 1, 'red'];
export const VISIBLE_LIGHT_COLOR_RANGE = [
  0,
  'red',
  1 / 6,
  'orange',
  2 / 6,
  'yellow',
  3 / 6,
  'green',
  4 / 6,
  'blue',
  5 / 6,
  'indigo',
  1,
  'violet',
];
export const ULTRAVIOLET_COLOR_RANGE = [0, 'violet', 1, 'white'];
export const SPECTRUM_BAR_LABELS_FONT_SIZE = 12;
export const INFRARED_BAR_LABEL_COLOR = 'white';
export const ULTRAVIOLET_BAR_LABEL_COLOR = 'black';
export const WAVELENGTH_LABELS_X_AXIS_ADJUSTMENT_FACTOR = 10;
export const WAVELENGTH_LABELS_Y_AXIS_ADJUSTMENT_FACTOR = 5;
