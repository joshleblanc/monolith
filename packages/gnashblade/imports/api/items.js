import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const Items = new Mongo.Collection('items', {
  idGeneration: 'MONGO'
});

export default Items;

Items.findFlippableItems = function(search = "", opts = {}, filter) {
  let query = {};
  if(search.length) {
    query.name = new RegExp(`^${search}`, "i");
  }
  if(filter) {
    query = filter;
  } else {
    query = {
      ...query,
      flags: {
        $not: {
          $elemMatch: {
            $in: ["SoulbindOnAcquire", "AccountBound"]
          }
        }
      },
    };
    if(!search.length) {
      query = {
        ...query,
        sellOrders: {
          $gt: 750
        },
        buyOrders: {
          $gt: 750
        }
      }
    }
  }
  return Items.find(query, opts);
};

Items.findPage = function(search, limit, skip, sort, filter) {
  return Items.findFlippableItems(search, {
    limit,
    skip,
    sort,
    fields: {
      id: 1,
      icon: 1,
      buyPrice: 1,
      buyOrders: 1,
      name: 1,
      sellPrice: 1,
      sellOrders: 1,
      profit: 1,
      percentReturn: 1,
      createdAt: 1
    }
  }, filter)
};

if(Meteor.isServer) {
  Meteor.publish('gnashblade.items', ids => {
    return Items.find({
      id: {
        $in: ids
      }
    }, {
      fields: {
        buys: 0,
        sells: 0,
        history: 0
      }
    });
  });

  Meteor.publish('gnashblade.items.paginated', (search = "", opts = {}, filter) => {
    return Items.findPage(search, opts.limit, opts.offset, opts.sort, filter);
  });

  Meteor.publish('gnashblade.item.details', id => {
    const intId = parseInt(id, 10);
    const item =  Items.findOne({ id: intId });
    const ids = [intId];
    if(item.recipe) {
      const ingredientIds = item.recipe.ingredients.map(i => parseInt(i.item_id, 10));
      ids.push(...ingredientIds);
    }
    return Items.find({
      id: {
        $in: ids
      }
    });
  });

  Meteor.methods({
    'items.count'(search, filter) {
      this.unblock();
      return Items.findFlippableItems(search, {fields: {}}, filter).count();
    }
  });
}
