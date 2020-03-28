import React from 'react';
import ItemIcon from './ItemIcon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import CurrencyCell from './CurrencyCell';
import TableFooter from '@material-ui/core/TableFooter';
import Items from '../../../imports/api/items';

export default ({ ingredients }) => {
  const items = ingredients.map(i => ({...i, item: Items.findOne({ id: parseInt(i.item_id, 10)})}));
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Ingredient</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Unit Cost</TableCell>
          <TableCell>Total Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          items.map(i => {
            return (
              <TableRow key={i.item_id}>
                <TableCell>
                  <ItemIcon item={i.item} />
                </TableCell>
                <TableCell>{i.item ? i.item.name : "Unknown Item"}</TableCell>
                <TableCell>{i.count}</TableCell>
                <TableCell>
                  <CurrencyCell amount={i.item ? i.item.buyPrice : 0} />
                </TableCell>
                <TableCell>
                  <CurrencyCell amount={(i.item ? i.item.buyPrice || 0 : 0) * i.count} />
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Total Cost</TableCell>
          <TableCell colSpan={3}>
            <CurrencyCell amount={items.reduce((sum, i) => {
              if(i.item) {
                return sum + (i.item.buyPrice || 0) * i.count;
              } else {
                return sum;
              }

            }, 0)}/>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
