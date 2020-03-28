import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import {State} from "../../lib/state";
import Collapse from "@material-ui/core/Collapse";
import { withStyles } from '@material-ui/styles';
import { autorun } from 'meteor/cereal:reactive-render';
import List from "@material-ui/core/List";
import Items from "../../../../imports/api/items";
import ItemTypeListItem from "./ItemTypeListItem";
import ExpandIcon from "./ExpandIcon";
import AuthenticatedDrawerItems from './AuthenticatedDrawerItems';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

@withStyles(styles)
@autorun
export default class extends React.Component {
  render() {
    const { classes } = this.props;
    const menuItems = State.get('menuItems');
    return(
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button component={Link} to="/items/flippable">
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary={"Flippable Items"} />
          </ListItem>
          <ListItem button component={Link} to="/items/latest">
            <ListItemIcon>
              <NewReleasesIcon />
            </ListItemIcon>
            <ListItemText primary={"Latest Items"} />
          </ListItem>
        </List>
        <Divider />
        <ListItem button onClick={() => State.set('itemsOpen', !State.get('itemsOpen'))}>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary={"Items"}/>
          <ExpandIcon open={State.get('itemsOpen')}/>
        </ListItem>
        <Collapse in={State.get('itemsOpen')} timeout="auto" unmountOnExit>
          <List component={"div"} disablePadding>
            {
              Object.keys(menuItems).map(mi => (
                <ItemTypeListItem key={mi} text={mi} subItems={menuItems[mi]} />
              ))
            }
          </List>
        </Collapse>
        <AuthenticatedDrawerItems />
      </div>
    )
  }
}