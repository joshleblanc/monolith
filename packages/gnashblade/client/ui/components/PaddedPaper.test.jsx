if (Meteor.isClient) {
  import React from 'react';
  import { mountWithTheme } from '/imports/lib/test_helpers.jsx';
  import chai from 'chai';
  import PaddedPaper from './PaddedPaper.jsx';
  import Adapter from 'enzyme-adapter-react-16';
  import { createMount } from '@material-ui/core/test-utils';
  import { ThemeProvider } from "@material-ui/styles";
  import Paper from '@material-ui/core/Paper';
  import theme from '../theme'

  describe('PaddedPaper', () => {
    it('should render', () => {
      const item = mountWithTheme(<PaddedPaper />);
      chai.expect(item.find(Paper)).to.have.lengthOf(1);

      const node = item.find('div').at(0).getDOMNode();
      const styles = getComputedStyle(node);
      const padding = styles.getPropertyValue('padding');
      chai.expect(padding).to.equal(theme.spacing(2) + "px");
    });
  });
}
