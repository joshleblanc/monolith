import * as React from 'react';
import Items from '../../../imports/api/items';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CurrencyCell from '../components/CurrencyCell';
import Paper from '@material-ui/core/Paper';
import OrdersTable from '../components/OrdersTable';
import CraftingTable from '../components/CraftingTable';
import OverflowPaper from '../components/OverflowPaper';
import ProfitGraph from '../components/ProfitGraph';
import QuantityGraph from '../components/QuantityGraph';
import ItemDetailHeader from '../components/ItemDetail/ItemDetailHeader';
import { autorun } from 'meteor/cereal:reactive-render';
import { withStyles } from '@material-ui/styles';
import LoadableTableCell from '../components/ItemDetail/LoadableTableCell';

const styles = theme => ({
  graph: {
    height: 400
  }
});

@withStyles(styles)
@autorun
export default class extends React.Component {
  handle = null;

  componentWillUnmount() {
    if(this.handle) {
      this.handle.stop();
    }
  }

  render() {
    const { match, classes } = this.props;
    this.handle = Meteor.subscribe('gnashblade.item.details', match.params.id);
    const loading = !this.handle.ready();
    const item = Items.findOne({ id: parseInt(match.params.id, 10) }) || {};
    return (

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ItemDetailHeader item={item} loading={loading} />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Paper>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Chat Link</TableCell>
                  <LoadableTableCell loading={loading}>
                    {item.chat_link}
                  </LoadableTableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sell Price</TableCell>
                  <LoadableTableCell loading={loading}>
                    <CurrencyCell amount={item.sellPrice} />
                  </LoadableTableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sell Count</TableCell>
                  <LoadableTableCell loading={loading}>{item.sellOrders}</LoadableTableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Buy Price</TableCell>
                  <LoadableTableCell loading={loading}>
                    <CurrencyCell amount={item.buyPrice} />
                  </LoadableTableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Buy Count</TableCell>
                  <LoadableTableCell loading={loading}>{item.buyOrders}</LoadableTableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Flip Profit</TableCell>
                  <LoadableTableCell loading={loading}>
                    <CurrencyCell amount={item.profit} />
                  </LoadableTableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Flip Percent</TableCell>
                  <LoadableTableCell loading={loading}>{item.percentReturn}%</LoadableTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersTable title="Buy Orders" orders={item.buys} loading={loading}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersTable title="Sell Orders" orders={item.sells} loading={loading}/>
        </Grid>
        <Grid item xs={12}>
          <OverflowPaper>
            {
              item.recipe && <CraftingTable ingredients={item.recipe.ingredients} />
            }
          </OverflowPaper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.graph}>
            <ProfitGraph data={item.history} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.graph}>
            <QuantityGraph data={item.history} />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
