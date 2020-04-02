import React from 'react';
import {Toolbar} from "./Toolbar";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%'
  }
}))

export const Content = ({ children }) => {
  const classes = useStyles();
  return(
    <main className={classes.content}>
      <Toolbar />
      {children}
    </main>
  )
}