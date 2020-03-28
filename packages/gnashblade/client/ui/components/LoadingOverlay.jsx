import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 110,
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: fade(theme.palette.background.paper, 0.7)
  },
  progressContainer: {
    margin: 'auto'
  }
}));

export default () => {
  const classes = useStyles();
  return(
    <div className={classes.overlay}>
      <div className={classes.progressContainer}>
        <CircularProgress />
      </div>
    </div>
  )
};