import React from 'react';
import Paper from '@material-ui/core/Paper';
import CurrencyCell from '../components/CurrencyCell';
import VirtualizedTable from '../components/VirtualizedTable';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Items from '../../../imports/api/items';
import moment from 'moment';
import { autorun } from 'meteor/cereal:reactive-render';
import LoadingOverlay from './LoadingOverlay';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/styles';
import TablePagination from '@material-ui/core/TablePagination';
import ItemIcon from './ItemIcon';
import { Link } from 'react-router-dom';

const styles = theme => {
  return {
    table: {
      height: 343
    },
    skeletonTable: {
      height: 343,
      overflowY: 'hidden'
    },
    title: {
      padding: theme.spacing(1)
    },
    paper: {
      position: 'relative',
      overflowX: 'auto',
    }
  }
};


@withStyles(styles)
class OrdersTableSkeleton extends React.Component {
  render() {
    const { title, classes, pageSize } = this.props;
    const data = [];
    for(let i = 0; i < pageSize; i++) {
      data.push(0);
    }
    console.log(data);
    return(
      <Paper size="small" className={classes.paper}>
        <Toolbar>
          <Typography variant="h4">{this.props.title}</Typography>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ordered On</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Potential Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((_,i) => {
                return(
                  <TableRow key={i}>
                    <TableCell colSpan={3}><Skeleton variant="rect" height={6}/></TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }

}

@withStyles(styles)
@autorun
export default class extends React.Component {

  state = {
    page: 0,
    pageSize: 25,
    sort: {},
    search: ""
  }

  handlePageChange = (_, page) => {
    this.setState({ page });
  }

  render() {
    const { loading, classes, orders, title } = this.props;
    const { page, pageSize, sort } = this.state;
    if(loading || !orders) {
      return <OrdersTableSkeleton title={title} pageSize={pageSize} />
    }
    const offset = this.state.page * this.state.pageSize;
    const limit = this.state.pageSize;

    const visibleOrders = orders.slice(offset, offset + limit);
    const itemIds = visibleOrders.map(order => order.item_id);
    const itemsLoading = !Meteor.subscribe('gnashblade.items', itemIds).ready();
    return(
      <Paper className={classes.paper}>
        <Toolbar>
          <Typography variant="h4">{this.props.title}</Typography>
        </Toolbar>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Ordered On</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Potential Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              visibleOrders.map(d => {
                const item = Items.findOne({ id: d.item_id });
                if(!item) {
                  return <TableRow key={d.id} />
                }
                const pricePaid = d.price * d.quantity;
                const potentialReturn = item.sellPrice * d.quantity;
                const tradingPostCut = potentialReturn * 0.15;
                const ret = potentialReturn - tradingPostCut;
                const potentialProfit = Math.floor(ret - pricePaid);
                const amount = item ? potentialProfit : 0;
                return (
                  <TableRow key={d.id}>
                    <TableCell>
                      <ItemIcon item={item} />
                    </TableCell>
                    <TableCell>
                      {d.created}
                    </TableCell>
                    <TableCell>
                      <Link to={`/items/${item.id}`}>
                        {item.name}
                      </Link>
                    </TableCell>
                    <TableCell><CurrencyCell amount={d.price} /></TableCell>
                    <TableCell>{d.quantity}</TableCell>
                    <TableCell><CurrencyCell amount={d.price * d.quantity} /></TableCell>
                    <TableCell><CurrencyCell amount={amount} /></TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={orders.length}
          rowsPerPage={this.state.pageSize}
          page={this.state.page}
          onChangePage={this.handlePageChange}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
        />
        {itemsLoading && <LoadingOverlay />}
      </Paper>
    );
    return (
      <Paper className={classes.table}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <VirtualizedTable
          rowCount={orders.length}
          rowGetter={({ index }) => orders[index]}
          columns={[
            {
              width: 300,
              label: "Ordered On",
              dataKey: "created",
              render: cellData => moment(cellData).format('YYYY-MM-DD HH:mm:ss'),
              flexGrow: 1
            },
            {
              width: 300,
              label: "Name",
              dataKey: 'name',
              render: (_, { item_id }) => {
                const item = Items.findOne({ id: item_id });
                return item ? item.name : "";
              }
            },
            {
              width: 250,
              label: "Price",
              dataKey: "price",
              render: cellData => <CurrencyCell amount={cellData} />,
              flexGrow: 1
            },
            {
              width: 50,
              label: "Quantity",
              dataKey: "quantity",
              flexGrow: 1
            },
            {
              width: 250,
              label: "Cost",
              dataKey: 'cost',
              render: (_, { price, quantity}) => <CurrencyCell amount={price * quantity} />
            },
            {
              width: 250,
              label: "Potential Profit",
              dataKey: 'potential_profit',
              render: (_, { item_id, price, quantity }) => {
                const item = Items.findOne({ id: item_id });
                const pricePaid = price * quantity;
                const potentialReturn = item.sellPrice * quantity;
                const tradingPostCut = potentialReturn * 0.15;
                const ret = potentialReturn - tradingPostCut;
                const potentialProfit = Math.floor(ret - pricePaid);
                const amount = item ? potentialProfit : 0;
                return <CurrencyCell amount={amount} />
              }
            }
          ]}
        />
      </Paper>
    )
  }

}