import React from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/styles";
import {autorun} from "meteor/cereal:reactive-render";
import ListItem from "@material-ui/core/ListItem";
import Collapse from '@material-ui/core/Collapse';
import { State } from '../../lib/state';
import ExpandIcon from "./ExpandIcon";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import Nested from "../Nested";

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

@withStyles(styles)
@autorun
export default class ItemTypeListItem extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render() {
    const { text, classes, subItems } = this.props;
    const { open } = this.state;
    const hasItems = subItems.length > 0;
    const component = hasItems ? 'div' : Link;
    const to = hasItems ? undefined : `/items/${text}`;

    return(
      <React.Fragment>
        <Nested>
          <ListItem button
                    onClick={this.handleClick}
                    component={component}
                    to={to}
          >
            <ListItemText primary={text} />
            { hasItems && <ExpandIcon open={open}/> }
          </ListItem>
        </Nested>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component={"div"} disablePadding>
            {
              subItems.map(si => (
                <Nested level={2}>
                  <ListItem key={si}
                            button
                            component={Link}
                            to={`/items/${text}/${si}`}
                  >
                    <ListItemText primary={si} />
                  </ListItem>
                </Nested>

              ))
            }
          </List>
        </Collapse>
      </React.Fragment>
    )
  }
}