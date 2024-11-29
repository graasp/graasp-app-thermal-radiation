import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Root from './components/Root';
import configureStore from './store/configureStore';
import './index.css';

// render app to the dom
const { store, history } = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
