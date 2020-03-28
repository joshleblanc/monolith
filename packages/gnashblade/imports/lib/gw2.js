import { HTTP } from 'meteor/http';
import Items from '../api/items';
import Configs from '../api/config';

const RETRY_DELAYS = [
    1000,
    5000,
    10000
];

function groupArray(arr, size) {
  const newArr = [];
  arr.forEach(e => {
    let subArr = newArr[newArr.length - 1];
    if (!subArr || subArr.length === size) {
      subArr = [];
      newArr.push(subArr);
    }
    subArr.push(e);
  });
  return newArr;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function get(url, query, retry = 0) {
  try {
    const string = query.join(',');
    const detailsResponse = HTTP.get(`${url}?ids=${string}`);
    let details = detailsResponse.data;
    if(!details) {
      if(retry >= 3) {
        console.log("Too many retries, giving up");
        return [];
      } else {
        console.log(`Connection closed, retrying in ${RETRY_DELAYS[retry]}`);
        await sleep(RETRY_DELAYS[retry]);
        details = await get(url, query, retry + 1);
      }
    }
    return details;
  } catch(e) {
    console.log(e);
    return [];
  }

}

async function sync(url, callback = null, groupSize = 200) {
  const response = HTTP.get(url);
  const ids = response.data;
  const queryStrings = groupArray(ids, groupSize);

  for(let i = 0; i < queryStrings.length; i++) {
    const details = await get(url, queryStrings[i]);
    callback(details);
  }
}

async function getTransactions(user, firstTier, secondTier, page = 0, retry = 0) {
  try {
    const url = `https://api.guildwars2.com/v2/commerce/transactions/${firstTier}/${secondTier}`;
    console.log(url);
    let response = HTTP.get(url, {
      headers: {
        Authorization: `Bearer ${user.apiKey}`
      },
      params: { page }
    });
    if(!response.data) {
      if(retry >= 3) {
        console.log("Too many retries, giving up");
        return [];
      } else {
        console.log(`Connection closed, retrying in ${RETRY_DELAYS[retry]}`);
        await sleep(RETRY_DELAYS[retry]);
        response = await getTransactions(user, firstTier, secondTier, page, retry + 1);
      }
    }
    return response;
  } catch(e) {
    console.log(e);
    return {
      data: [],
      headers: {}
    };
  }
}

async function getUserTransactions(user, firstTier, secondTier) {
  const response = await getTransactions(user, firstTier, secondTier);
  const numPages = parseInt(response.headers['x-page-total'], 10);
  let data = response.data;
  if(numPages > 1) {
    for(let i = 1; i < numPages; i++) {
      data = [
        ...data,
        getTransactions(user, firstTier, secondTier, i).data
      ]
    }
  }
  return data;
}


export async function syncUsers() {
  console.log("Syncing users");
  const promises = Meteor.users.find({}).fetch().map(async user => {
    if(user.apiKey) {
      const currentBuys = await getUserTransactions(user, 'current', 'buys');
      const currentSells = await getUserTransactions(user, 'current', 'sells');
      const historyBuys = await getUserTransactions(user, 'history', 'buys');
      const historySells = await getUserTransactions(user, 'history', 'sells');
      Meteor.users.update({
        _id: user._id
      }, {
        $set: {
          buys: currentBuys,
          sells: currentSells,
          sellHistory: historySells,
          buyHistory: historyBuys
        }
      });
    }
  });
  await Promise.all(promises);
  console.log("Done syncing users");
}

export async function syncRecipes() {
  console.log("Syncing recpies");
  try {
    const bulk = Items.rawCollection().initializeUnorderedBulkOp();
    await sync("https://api.guildwars2.com/v2/recipes", details => {
      details.forEach(detail => {
        bulk.find({ id: detail.output_item_id }).upsert().updateOne({
          $set: {
            recipe: detail,
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        })
      })
    });
    Meteor.wrapAsync(bulk.execute, bulk)();
  } catch(e) {
    console.log("Error syncing recipes", e);
  }
  Configs.update({}, {
    $set: {
      lastRecipeSync: new Date()
    }
  });
  console.log("Done syncing recipes");
}

export async function syncListings() {
  console.log("Syncing listings");
  try {
    const bulk = Items.rawCollection().initializeUnorderedBulkOp();
    await sync("https://api.guildwars2.com/v2/commerce/listings", details => {
      details.forEach(detail => {
        const date = new Date();
        const newData = detail;
        newData.buys = detail.buys || [];
        newData.sells = detail.sells || [];
        newData.buyOrders = detail.buys.reduce((acc, curr) => acc + curr.quantity, 0);
        newData.sellOrders = detail.sells.reduce((acc, curr) => acc + curr.quantity, 0);
        newData.buyPrice = detail.buys[0] ? detail.buys[0].unit_price : 0;
        newData.sellPrice = detail.sells[0] ? detail.sells[0].unit_price : 0;
        newData.profit = Math.floor((newData.sellPrice - (newData.sellPrice * 0.15)) - newData.buyPrice);
        newData.percentReturn = newData.buyPrice ? Math.round((newData.profit / newData.buyPrice) * 100) : 0;
        bulk.find({ id: detail.id }).upsert().updateOne({
          $set: {
            ...newData,
            updatedAt: date
          },
          $setOnInsert: {
            createdAt: date
          },
          $push: {
            "history": {
              buyPrice: newData.buyPrice,
              sellPrice: newData.sellPrice,
              profit: newData.profit,
              buyOrders: newData.buyOrders,
              sellOrders: newData.sellOrders,
              date: date,
              timestamp: date.getTime()
            }
          }
        });
      });
    });
    Meteor.wrapAsync(bulk.execute, bulk)();
  } catch (e) {
    console.log("Error syncing listings: ", e);
  }
  Configs.update({}, {
    $set: {
      lastListingSync: new Date()
    }
  });
  console.log("Done syncing listings");
}

export async function syncItems() {
  console.log("Syncing items");
  try {
    await sync("https://api.guildwars2.com/v2/items", details => {
      const bulk = Items.rawCollection().initializeUnorderedBulkOp();
      details.forEach(detail => {
        bulk.find({ id: detail.id }).upsert().updateOne({
          $set: {
            ...detail,
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        })
      });
      Meteor.wrapAsync(bulk.execute, bulk)();
    });
  } catch (e) {
    console.log("Error syncing items: ", e);
  }
  Configs.update({}, {
    $set: {
      lastItemSync: new Date()
    }
  });
  console.log("Done syncing items");
}
