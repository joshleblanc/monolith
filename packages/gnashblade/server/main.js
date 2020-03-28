import {Meteor} from 'meteor/meteor';
import '../imports/api';
import React from 'react';
import Configs from '../imports/api/config';
import Items from "../imports/api/items";
import { schema as userSchema } from '../imports/api/users';
import './migrations';
import './tasks';
import { createRegister } from './metrics';
import express from 'express';

Meteor.startup(() => {
  if(Configs.find({}).count() === 0) {
    Configs.insert({});
  }
  Migrations.migrateTo('latest');
  SyncedCron.start();
});

Meteor.methods({
  async menuItems() {
    const result = {};
    const types = await Items.rawCollection().distinct('type', {});
    console.log(types);
    const promises = types.map(async type => {
      result[type] = await Items.rawCollection().distinct('details.type', {type});
    });
    await Promise.all(promises);
    return result;
  }
});

Meteor.users.allow({
  update: function(userId, doc, fields, modifier) {
    console.log(userId, doc, fields, modifier);
    console.log(userSchema.validateSync(modifier['$set']));
    // A user can update their own apiKey
    return userId === doc._id && fields.includes('apiKey');
  }
});

const register = createRegister();

const app = express();
app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
})

WebApp.rawConnectHandlers.use(app);