import {ThemeProvider} from "@material-ui/styles";
import theme from "../lib/theme";
import React from "react";
import {SnackbarProvider} from "notistack";

export const Providers = ({ children }) => {
  return(
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  )
}