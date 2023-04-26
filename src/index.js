import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { mockApi, withContext } from '@graasp/apps-query-client';
import {
  hooks,
  QueryClientProvider,
  queryClient,
  ReactQueryDevtools,
} from './config/queryClient';
import Root from './components/Root';
import configureStore from './store/configureStore';
import './index.css';
import { showErrorToast } from './utils/toasts';
import ProgressScreen from './components/common/LoadingScreen';

const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

if (process.env.REACT_APP_ENABLE_MOCK_API === 'true' || !inIframe()) {
  mockApi();
}

const root = document.getElementById('root');

const renderApp = (RootComponent, store) => {
  const App = inIframe()
    ? withContext(RootComponent, {
        LoadingComponent: <ProgressScreen />,
        useGetLocalContext: hooks.useGetLocalContext,
        useAutoResize: hooks.useAutoResize,
        onError: () => {
          showErrorToast('An error occured while fetching the context.');
        },
      })
    : RootComponent;

  render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>,
    root,
  );
};

// render app to the dom
const { store, history } = configureStore();

renderApp(Root, store, history);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./components/Root').default;
    renderApp(NextRoot, store, history);
  });
}
