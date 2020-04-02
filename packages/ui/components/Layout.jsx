import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Content} from "./base/Content";
import Navbar from "./Navbar";
import Nav from "./Nav";
import {Providers} from "./Providers";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Root} from "./base/Root";

export default props => {
  const {basename, Routes, DrawerItems} = props;
  console.log(Routes, DrawerItems);
  return (
    <>
      <Providers>
        <BrowserRouter basename={basename}>
          <CssBaseline/>
          <Root>
            <Navbar/>
            <Nav><DrawerItems/></Nav>
            <Content>
              <Routes/>
            </Content>
          </Root>
        </BrowserRouter>
      </Providers>

    </>

)
};
