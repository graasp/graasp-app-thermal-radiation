import { combineReducers } from 'redux';
import context from './context';
import appInstanceResources from './appInstanceResources';
import users from './users';
import appInstance from './appInstance';
import layout from './layout';
import action from './action';

export default combineReducers({
  // keys should always be lowercase
  context,
  appInstanceResources,
  users,
  appInstance,
  layout,
  action,
});
