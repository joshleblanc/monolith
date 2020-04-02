import React from 'react';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

export const Toolbar = () => {
  const classes = useStyles();
  return(
    <div className={classes.toolbar} />
  )
}