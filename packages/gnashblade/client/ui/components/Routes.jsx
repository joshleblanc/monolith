import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import FlippableItems from "../pages/FlippableItems";
import LatestItems from "../pages/LatestItems";
import FilteredItems from "../pages/FilteredItems";
import ItemDetail from "../pages/ItemDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import CurrentTransactions from "../pages/CurrentTransactions";

export const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={() => <Redirect to="/items/flippable" />} />
      <Route exact path="/items/flippable" component={FlippableItems} />
      <Route exact path="/items/latest" component={LatestItems} />
      <Route exact path="/items/:type([a-zA-Z]+)" component={FilteredItems} />
      <Route exact path="/items/:type([a-zA-Z]+)/:detailType([a-zA-Z]+)" component={FilteredItems} />
      <Route exact path="/items/:id" component={ItemDetail} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/transactions/current" component={CurrentTransactions} />
    </Switch>
  )
}