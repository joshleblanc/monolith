import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMount } from '@material-ui/core/test-utils';
import { ThemeProvider } from "@material-ui/styles";
import theme from '../ui/theme'

configure({ adapter: new Adapter() });

export function mountWithTheme(Component) {
  mount = createMount();
  return mount(
    <ThemeProvider theme={theme}>
      {Component}
    </ThemeProvider>
  )
}