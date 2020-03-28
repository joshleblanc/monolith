import React from 'react';
import Paper from '@material-ui/core/Paper';
import CurrencyCell from '../components/CurrencyCell';
import { makeStyles } from '@material-ui/styles';
import VirtualizedTable from '../components/VirtualizedTable';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => {
  return {
    table: {
      height: 343
    },
    skeletonTable: {
      height: 343,
      overflowY: 'hidden'
    }
  }
});

const OrdersTableSkeleton = ({ title }) => {
  const classes = useStyles();
  const data = [0,0,0,0,0,0,0,0,0,0];
  console.log(data);
  return(
    <Paper className={classes.skeletonTable} size="small">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
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


export default ({ orders, title, loading }) => {
  const classes = useStyles();
  if(loading || !orders) {
    return <OrdersTableSkeleton title={title} />
  }
  return (
    <Paper className={classes.table}>
      <VirtualizedTable
        rowCount={orders.length}
        rowGetter={({ index }) => orders[index]}
        columns={[
          {
            width: 100,
            label: title,
            dataKey: "listings",
            flexGrow: 1
          },
          {
            width: 200,
            label: "Price",
            dataKey: "unit_price",
            render: cellData => <CurrencyCell amount={cellData} />,
            flexGrow: 1
          },
          {
            width: 100,
            label: "Quantity",
            dataKey: "quantity",
            flexGrow: 1
          }
        ]}
      />
    </Paper>
  )
}