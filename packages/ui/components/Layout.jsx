import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Providers} from "./Providers";
import {Root} from "./base/Root";
import {Content} from "./base/Content";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar";
import Nav from "./Nav";

export default props => {
  const {basename, Routes, DrawerItems} = props;
  console.log(Routes, DrawerItems);
  return (
    <>
      <Navbar/>
      <BrowserRouter basename={basename}>
        <Nav><DrawerItems/></Nav>
        <Content>
          <Routes/>
        </Content>
      </BrowserRouter>
    </>

  )
};
