import {
  configureQueryClient,
  buildMockLocalContext,
  buildMockParentWindow,
} from '@graasp/apps-query-client';

// eslint-disable-next-line import/prefer-default-export
export const {
  hooks,
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} = configureQueryClient({
  GRAASP_APP_ID: process.env.REACT_APP_GRAASP_APP_ID,
  // build mock parent window given cypress (app) context or mock data
  targetWindow:
    process.env.REACT_APP_ENABLE_MOCK_API === 'true'
      ? buildMockParentWindow(buildMockLocalContext(window.appContext))
      : window.parent,
});
