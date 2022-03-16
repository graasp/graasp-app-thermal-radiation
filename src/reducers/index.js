import { combineReducers } from 'redux';
import context from './context';
import layout from './layout';
import lab from './lab';

export default combineReducers({
  // keys should always be lowercase
  context,
  layout,
  lab,
});
