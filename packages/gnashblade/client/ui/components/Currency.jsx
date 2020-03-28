import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
  img: {
    display: 'inline-block',
    verticalAlign: 'middle',
    height: 15,
    width: 15
  },
  wrapper: {
    paddingRight: theme.spacing(1),
  }
}));

export default ({ image, amount }) => {
  const classes = useStyles();
  if(isNaN(amount)) {
    return null;
  }
  return(
    <Typography component={'span'} variant="body2" className={classes.wrapper}>
      {amount}
      &nbsp;<img className={classes.img} src={image} />
    </Typography>
  )
}
