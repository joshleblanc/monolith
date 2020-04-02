import React from 'react';
import Layout from 'meteor/ui/components/Layout';
import {Routes} from "../components/Routes";
import DrawerItems from "../components/nav/DrawerItems";

export default () => {
  return(
    <Layout
      basename={"/gnashblade"}
      Routes={Routes}
      DrawerItems={DrawerItems}
    />
  )
}
