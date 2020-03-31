import React from 'react';
import Items from '../../../../imports/api/items';
import { Meteor } from 'meteor/meteor';
import CurrencyCell from '../CurrencyCell';
import ItemIcon from '../ItemIcon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import LoadingOverlay from '../LoadingOverlay';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ItemsTableSearch from './ItemsTableSearch';
import { autorun } from 'meteor/cereal:reactive-render';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  paper: {
    position: 'relative',
    overflowX: 'auto',
  },
  grow: {
    flexGrow: 1
  }
});



@withStyles(styles)
@autorun
export default class extends React.Component {
  handle = null;

  state = {
    count: 1000
  };

  constructor(props) {
    super(props);
    this.updateCount();
  }

  createSortHandler = id => () => {
    const { TableConfig } = this.props;
    let dir;
    const sort = TableConfig.get('sort');
    if (sort[id]) {
      dir = -sort[id];
    } else {
      dir = 1;
    }
    TableConfig.set('sort', { [id]: dir });
  };

  SortableTableHeader = ({id, label}) => {
    const { TableConfig } = this.props;
    return (
      <TableCell>
        <TableSortLabel
          active={TableConfig.get('sort')[id] !== undefined}
          direction={TableConfig.get('sort')[id] === 1 ? 'asc' : 'desc'}
          onClick={this.createSortHandler(id)}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    )
  };

  componentWillUnmount() {
    if(this.handle) {
      this.handle.stop();
    }
  }

  updateCount = () => {
    const { TableConfig } = this.props;
    Meteor.call('items.count', TableConfig.get('search'), this.props.filter, (_, res) => {
      this.setState({ count: res });
    });
  };

  componentDidUpdate(prevProps) {
    const typeChanged = (prevProps.filter && prevProps.filter.type) !== (this.props.filter && this.props.filter.type);
    const detailTypeChanged = (prevProps.filter && prevProps.filter["details.type"]) !== (this.props.filter && this.props.filter["details.type"]);
    if(typeChanged || detailTypeChanged) {
      this.updateCount();
    }
  }

  handlePageChange = (e, page) => {
    const { TableConfig } = this.props;
    TableConfig.set('page', page);
  };

  render() {
    const { classes, TableConfig } = this.props;
    const { count } = this.state;
    let data;
    this.handle = Meteor.subscribe('gnashblade.items.paginated', TableConfig.get('search'), {
      limit: TableConfig.get('pageSize'),
      offset: TableConfig.get('pageSize') * TableConfig.get('page'),
      sort: TableConfig.get('sort')
    }, this.props.filter);
    let loading = !this.handle.ready();
    data = Items.find({}, {
      sort: TableConfig.get('sort')
    }).fetch() || [];
    console.log(data);
    return (
      <Paper className={classes.paper}>
        <Toolbar>
          <Typography variant="h4">{this.props.title}</Typography>
          <div className={classes.grow} />
          <ItemsTableSearch search={TableConfig.get('search')} onChange={v => TableConfig.set('search', v)}/>
        </Toolbar>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <this.SortableTableHeader id="name" label="Name" />
              <this.SortableTableHeader id="profit" label="Profit" />
              <this.SortableTableHeader id="percentReturn" label="Percent Return" />
              <this.SortableTableHeader id="buyOrders" label="Buy Orders" />
              <this.SortableTableHeader id="buyPrice" label="Buy Price" />
              <this.SortableTableHeader id="sellOrders" label="Sell Orders" />
              <this.SortableTableHeader id="sellPrice" label="Sell Price" />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.slice(-TableConfig.get('pageSize')).map(d => {
                return (
                  <TableRow key={d._id.toHexString()}>
                    <TableCell>
                      <ItemIcon item={d} />
                    </TableCell>
                    <TableCell>
                      <Link to={`items/${d.id}`}>
                        {d.name}
                      </Link>
                    </TableCell>
                    <TableCell><CurrencyCell amount={d.profit} /></TableCell>
                    <TableCell>{d.percentReturn}%</TableCell>
                    <TableCell>{d.buyOrders}</TableCell>
                    <TableCell><CurrencyCell amount={d.buyPrice} /></TableCell>
                    <TableCell>{d.sellOrders}</TableCell>
                    <TableCell><CurrencyCell amount={d.sellPrice} /></TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={count}
          rowsPerPage={TableConfig.get('pageSize')}
          page={TableConfig.get('page')}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}-${to} of ${count === 1000 ? "1000+" : count}`
          }}
          onChangePage={this.handlePageChange}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
        />
        {loading && <LoadingOverlay />}
      </Paper>
    )
  }
}
