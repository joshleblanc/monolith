import React from 'react';
import ItemsTable from '../components/ItemsTable/ItemsTable';
import Grid from '@material-ui/core/Grid';

const TableConfig = new ReactiveDict({
  search: "",
  page: 0,
  pageSize: 25,
  sort: {
    profit: -1
  }
});

export default () => {
  return(
    <Grid container>
      <Grid item xs={12}>
        <ItemsTable TableConfig={TableConfig} title="Flippable Items" />
      </Grid>
    </Grid>

  )
}