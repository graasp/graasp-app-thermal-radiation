import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  const props = {
    i18n: {
      defaultNS: '',
      changeLanguage: jest.fn(),
    },
    t: jest.fn(),
    dispatchGetContext: jest.fn(),
    dispatchGetAppInstance: jest.fn(),
    dispatchGetAppInstanceResources: jest.fn(),
    standalone: true,
    ready: true,
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  const component = shallow(<App {...props} />);
  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
