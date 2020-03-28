import { ReactiveDict } from 'meteor/reactive-dict';

export const State = new ReactiveDict({
  drawerOpen: false,
  itemsOpen: false,
  menuItems: {}
});

if(Meteor.isServer) {
  const menuItems = Meteor.call('menuItems');
  State.set('menuItems', menuItems);
} else {
  Meteor.call('menuItems', (err, result) => {
    State.set('menuItems', result);
  });
}
