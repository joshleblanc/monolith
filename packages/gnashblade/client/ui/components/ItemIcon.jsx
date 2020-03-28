import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 0,
    height: 30,
    width: 30
  },
  bigAvatar: {
    margin: 0,
    height: 40,
    width: 40,
    display: 'inline-block'
  }
}));

const ItemIconSkeleton = ({ className }) => {
  return <Skeleton variant="circle" className={className} />
};

const ItemIcon = ({ item, className }) => {
  if(item) {
    return <Avatar alt={item.name} src={item.icon} className={className} />
  } else {
    return <Avatar alt={"Unknown Item"} className={className} />
  }
};

export default ({ item, big, loading}) => {
  const classes = useStyles();
  const className = big ? classes.bigAvatar : classes.avatar;

  if(loading) {
    return <ItemIconSkeleton className={className} />
  } else {
    return <ItemIcon item={item} className={className} />
  }
}
