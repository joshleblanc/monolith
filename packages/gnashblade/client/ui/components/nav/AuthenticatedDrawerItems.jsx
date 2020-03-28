import React from 'react';
import {State} from "../../lib/state";
import { autorun } from 'meteor/cereal:reactive-render';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandIcon from './ExpandIcon';
import Collapse from '@material-ui/core/Collapse';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import Authenticated from '../Authenticated';
import Nested from "../Nested";

@Authenticated
@autorun
export default class extends React.Component {
  render() {
    const { classes } = this.props;
    return(
      <React.Fragment>
        <ListItem button onClick={() => State.set('myTransactionsOpen', !State.get('myTransactionsOpen'))}>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="My Transactions" />
          <ExpandIcon open={State.get('myTransactionsOpen')} />
        </ListItem>
        <Collapse in={State.get('myTransactionsOpen')} timeout="auto" unmountOnExit>
          <List component={"div"} disablePadding>
            <Nested>
              <ListItem button component={Link} to="/transactions/current">
                <ListItemText primary={"Current"} />
              </ListItem>
            </Nested>

          </List>
        </Collapse>
      </React.Fragment>
    )
  }
}