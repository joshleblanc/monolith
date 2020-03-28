import React from 'react';
import { Meteor } from 'meteor/meteor';
import { autorun } from 'meteor/cereal:reactive-render';
import PaddedPaper from '../components/PaddedPaper';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { schema as userSchema } from '../../../imports/api/users';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';

@withSnackbar
@autorun
export default class extends React.Component {
  render() {
    const { enqueueSnackbar } = this.props;
    const sub = Meteor.subscribe('gnashblade.users.apiKey');
    if(!Meteor.user() || !sub.ready()) {
      return null;
    }

    return(
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
          <PaddedPaper>
            <Typography variant="h4">
              Profile
            </Typography>
            <Formik
              initialValues={{
                apiKey: Meteor.user().apiKey,
              }}
              validationSchema={userSchema}
              onSubmit={(values, { setSubmitting }) => {
                Meteor.call("currentUser.updateProfile", values.apiKey, (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    enqueueSnackbar("Updated Api Key", {variant: "success"});
                  }
                  setSubmitting(false);
                });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="apiKey"
                    type="apiKey"
                    component={TextField}
                    fullWidth
                    margin="normal"
                    label="GW2 Api Key"
                    helperText={errors.apiKey && touched.apiKey ? errors.apiKey : null}
                  />
                  <Button type="submit">Submit</Button>
                </Form>
              )}
            </Formik>
          </PaddedPaper>
        </Grid>
      </Grid>
    )
  }
}