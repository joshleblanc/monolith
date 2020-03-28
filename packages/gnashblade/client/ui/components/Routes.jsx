import React from 'react';
import Navbar from './Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import ItemDetail from '../pages/ItemDetail';
import LatestItems from '../pages/LatestItems';
import Nav from './nav/Nav';
import FlippableItems from '../pages/FlippableItems';
import FilteredItems from '../pages/FilteredItems';
import Register from '../pages/Register';
import { SnackbarProvider } from 'notistack';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import CurrentTransactions from '../pages/CurrentTransactions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%'
  },
  toolbar: theme.mixins.toolbar,
}));

export default () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Navbar />
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SnackbarProvider>
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
        </SnackbarProvider>
      </main>
    </div>
  )
};
