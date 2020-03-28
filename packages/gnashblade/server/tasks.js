import {syncItems, syncListings, syncRecipes, syncUsers} from "../imports/lib/gw2";

SyncedCron.add({
  name: 'sync users',
  schedule: parser => {
    return parser.text("every 5 minutes");
  },
  job: async () => {
    await syncUsers();
  }
});

SyncedCron.add({
  name: 'sync items',
  schedule: parser => {
    return parser.text('every 6 hours');
  },
  job: async () => {
    await syncItems();
    await syncRecipes();
  }
});

SyncedCron.add({
  name: 'sync listings',
  schedule: parser => {
    return parser.text('every 30 minutes');
  },
  job: async () => {
    await syncListings()
  }
});