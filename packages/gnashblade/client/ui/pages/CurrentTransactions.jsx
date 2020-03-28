import React from 'react';
import { autorun } from 'meteor/cereal:reactive-render';
import { Meteor } from 'meteor/meteor';
import TransactionTable from '../components/TransactionTable';
import Grid from '@material-ui/core/Grid';
import PaddedPaper from "../components/PaddedPaper";
import Typography from "@material-ui/core/Typography";

@autorun
export default class extends React.Component {
  render() {
    const handle = Meteor.subscribe('gnashblade.users.currentTransactions', Meteor.userId());
    const loading = !handle.ready();
    const user = Meteor.user();
    if(!user.buys && !user.sells) {
      return(
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PaddedPaper>
              <Typography variant={"body2"}>We're still loading your transactions. Check back in a few minutes</Typography>
            </PaddedPaper>
          </Grid>
        </Grid>
      )
    }
    return(
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TransactionTable orders={user.buys} title="Buy Orders" loading={loading} />
        </Grid>
        <Grid item xs={12}>
          <TransactionTable orders={user.sells} title="Sell Orders" loading={loading} />
        </Grid>
      </Grid>
    )
  }
}