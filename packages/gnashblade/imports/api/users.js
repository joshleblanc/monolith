import * as yup from 'yup';

export const schema = yup.object().shape({
  apiKey: yup.string().matches(/[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{20}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}/, "Not a valid api key")
});

if(Meteor.isServer) {
  Meteor.publish('gnashblade.users.apiKey',function() {
    const userId = this.userId;

    return Meteor.users.find({ _id: userId }, { fields: { apiKey: 1 } });
  });

  Meteor.publish('gnashblade.users.currentTransactions', userId => {
    return Meteor.users.find({ _id: userId }, { fields: { buys: 1, sells: 1 } });
  });

  Meteor.publish('gnashblade.users.currentBuyTransactions', userId => {
    return Meteor.users.find({ _id: userId }, { fields: { buys: 1 } });
  });

  Meteor.publish('gnashblade.users.currentSellTransactions', userId => {
    return Meteor.users.find({ _id: userId }, { fields: { sells: 1 } });
  });

  Meteor.methods({
    "currentUser.updateProfile"(apiKey) {
      const user = Meteor.user();
      if(!user) {
        throw new Meteor.Error("Not Authorized");
      }
      Meteor.users.update({
        _id: user._id
      }, {
        $set: {
          apiKey
        }
      })
    }
  })
}