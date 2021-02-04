const { MongoClient } = require('mongodb');

function scheduleRepo() {
  const dbName = 'schedule';

  function loadSchedule(data) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(process.env.MongoURI);

      try {
        await client.connect();
        const db = client.db(dbName);

        results = await db.collection('schedule').insertMany(data);
        resolve(results);
        client.close();
      } catch (error) {
        reject(error)
      }

    });
  };

  return { loadSchedule }
}



module.exports = scheduleRepo();