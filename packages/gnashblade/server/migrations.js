import Items from '../imports/api/items';

Migrations.add({
  version: 1,
  name: "Adds index to the items collection",
  up: function() {
    Items.rawCollection().createIndex({ id: 1 });
  },
  down: function() {
    Items.rawCollection().dropIndex({ id: 1 });
  }
});

Migrations.add({
  version: 2,
  name: "Adds index to the profit field",
  up: function() {
    Items.rawCollection().createIndex({profit: 1});
  },
  down: function() {
    Items.rawCollection.dropIndex({profit: 1});
  }
});
