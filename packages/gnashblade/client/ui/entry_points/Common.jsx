import React from 'react';
import { ThemeProvider, StylesProvider, createGenerateClassName } from "@material-ui/styles";
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';

export default ({children}) => {
  return(
    <StylesProvider
      generateClassName={createGenerateClassName()}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StylesProvider>
  )
}
