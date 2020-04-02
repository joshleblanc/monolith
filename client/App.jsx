import {BrowserRouter, Route} from "react-router-dom";
import { Providers } from 'meteor/cereal:ui/components/Providers';
import React from "react";
import Login from "./pages/Login";
import { Root } from 'meteor/cereal:ui/components/base/Root';
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "meteor/cereal:ui/components/Navbar";

class Component extends React.Component {
  state = {
    Component: null
  }

  async componentDidMount() {
    const {App: Tmp} = await this.props.import();
    this.setState({Component: Tmp});
  }

  render() {
    const {Component} = this.state;
    if (Component === null) {
      return null;
    } else {
      return <Component/>;
    }
  }
}

export default App = () => {
  return (
    <Providers>
      <CssBaseline/>
      <Root>
        <CssBaseline/>
        <BrowserRouter>
          <Navbar/>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/gnashblade"}>
            <Component import={() => import("meteor/gnashblade/client/main.jsx")}/>
          </Route>
          <Route path={"/secret-santa"}>
            <Component import={() => import("meteor/secret-santa/client/main.js")}/>
          </Route>
        </BrowserRouter>
      </Root>
    </Providers>

  )
}