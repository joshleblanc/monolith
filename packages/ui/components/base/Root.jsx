import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  }
}))

export const Root = ({ children }) => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      {children}
    </div>
  )
}