import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MomentUtils from "@date-io/moment";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import SnackbarProvider from "notistack/build/SnackbarProvider";
import Layout from "meteor/cereal:ui/components/Layout";
import getTheme from './lib/theme';
import {AppStoreContext} from './stores/AppStore';
import { autorun } from 'meteor/cereal:reactive-render';
import Routes from "./Routes";
import DrawerItems from "./components/drawer/DrawerItems";

@autorun
export default class App extends React.Component {
  static contextType = AppStoreContext;
  state = {};

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Layout
          Routes={Routes}
          DrawerItems={DrawerItems}
          basename={"/secret-santa"}
        />
      </MuiPickersUtilsProvider>
    );
  }
}
