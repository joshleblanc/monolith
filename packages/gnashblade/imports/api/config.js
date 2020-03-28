import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export default Configs = new Mongo.Collection('configs', { idGeneration: 'MONGO' });

if(Meteor.isServer) {
  Meteor.publish('gnashblade.configs', () => {
    return Configs.find({});
  });
}