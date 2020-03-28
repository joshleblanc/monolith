import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import PaddedPaper from '../PaddedPaper';
import Box from '@material-ui/core/Box';
import ItemIcon from '../ItemIcon';

const useStyles = makeStyles(theme => ({
  headerRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    flex: '0 0 auto',
    paddingRight: 16
  },
  title: {
    flex: '1 1 auto'
  }
}));

const ItemDetailHeaderSkeleton = () => {
  const classes = useStyles();
  return(
    <PaddedPaper>
      <div className={classes.headerRoot}>
        <div className={classes.avatar}>
          <ItemIcon big loading />
        </div>
        <div className={classes.title}>
          <Typography paragraph variant="h3" component="div">
            <Skeleton height={40} variant="rect"/>
          </Typography>
        </div>
      </div>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2">
          <Skeleton height={6} width={250} />
        </Typography>
        <Typography variant="subtitle2">
          <Skeleton height={6} width={250} />
        </Typography>
      </Box>
    </PaddedPaper>
  );
}

const ItemDetailHeader = ({ item }) => {
  const classes = useStyles();
  return(
    <PaddedPaper>
      <div className={classes.headerRoot}>
        <div className={classes.avatar}>
          <ItemIcon big item={item} />
        </div>
        <div className={classes.title}>
          <Typography variant="h4" component="div">
            {item.name}
          </Typography>
        </div>
      </div>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle2">
          Level {item.level} - {item.rarity}
        </Typography>
        <Typography variant="subtitle2">
          {item.history && item.history[0] && `Last Updated - ${item.history[0].date.toLocaleString()}`}
        </Typography>
      </Box>
    </PaddedPaper>
  )
};


export default ({ item, loading }) => {
  if(loading) {
    return <ItemDetailHeaderSkeleton />;
  } else {
    return <ItemDetailHeader item={item} />
  }
}
