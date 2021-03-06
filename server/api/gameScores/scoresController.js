/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
const { MongoClient } = require('mongodb');

function scoresRepo() {
  const dbName = 'gameResults';

  function loadWinners(winners) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MongoURI);

      try {
        await client.connect();
        const db = client.db(dbName);

        winnersArr = await db.collection('winners').insertOne(winners);
        resolve(winnersArr);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  function loadLosers(losers) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MongoURI);

      try {
        await client.connect();
        const db = client.db(dbName);

        winnersArr = await db.collection('losers').insertOne(losers);
        resolve(winnersArr);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }

  return { loadWinners, loadLosers };
}

module.exports = scoresRepo();
