import React from 'react';
import { Provider } from 'react-redux';
import Root from './components/Root';
import configureStore from './store/configureStore';
import './index.css';

const root = document.getElementById('root');

const renderApp = (RootComponent, store) => {
  const App = RootComponent;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
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
