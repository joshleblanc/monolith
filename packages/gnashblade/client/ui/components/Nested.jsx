import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  listItem: {
    "& > *": {
      paddingLeft: ({level = 1}) => theme.spacing(2 + (2 * level))
    }
  }
}));

export default (props) => {
  const { children } = props;
  const classes = useStyles(props);
  return(
    <div className={classes.listItem}>
      {children}
    </div>
  )
}