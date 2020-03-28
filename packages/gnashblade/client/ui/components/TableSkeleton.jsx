import React from 'react';
import Skeleton from 'react-table'
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}));

export default ({loading}) => {
  const classes = useStyles();
  const skeletons = [];
  for(let i = 0; i < 10; i++) {
    skeletons.push(<Skeleton className={classes.root} height={6} width="80%" key={i} />);
  }

  if(loading) {
    return(
      <div className='-loading -active'>
        <div className='-loading-inner'>
          <CircularProgress />
        </div>
      </div>
    )
  } else {
    return null;
  }
}
