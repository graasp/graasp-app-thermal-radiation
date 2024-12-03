import Qs from 'qs';

// todo: remove when more items are exported
export const addQueryParamsToUrl = (obj) => {
  const params = {
    ...Qs.parse(window.location.search, { ignoreQueryPrefix: true }),
    ...obj,
  };
  return `?${Qs.stringify(params)}`;
};
