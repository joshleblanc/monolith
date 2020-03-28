import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: "auto"
  }
}));

export default ({children}) => {
  const classes = useStyles();
  return <Paper classes={classes}>{children}</Paper>
}