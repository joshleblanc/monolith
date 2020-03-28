import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/styles';
import { drawerWidth } from '../lib/constants';
import MenuIcon from '@material-ui/icons/Menu';
import { State } from '../lib/state';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { autorun } from 'meteor/cereal:reactive-render';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import AccountButtons from './AccountButtons';
const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1
  }
});

@withStyles(styles)
@autorun
export default class extends React.Component {
  render() {
    const { classes } = this.props;
    return(
      <AppBar position={"fixed"} className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => State.set('drawerOpen', !State.get('drawerOpen'))}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Gnashblade
          </Typography>
          <div className={classes.grow} />
          <AccountButtons />
        </Toolbar>
      </AppBar>
    )
  }
};
