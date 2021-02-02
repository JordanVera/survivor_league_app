const axios = require('axios');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();

const client = new MongoClient(process.env.MongoURI);

const NflGame = require('./models/NflGame');

function get_teams() {
  axios
    .all([
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/1?key=${process.env.API_KEY}`),
    ])
    .then((responseArr) => {
      const db = client.db('nfl_games');

      let weeks = [];
      responseArr[0].data.forEach((element) => {
        
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          week: element.Week,
          dateTime: element.DateTime
        });

        const collection = db.collection('week1')

        collection.insertOne(newNflGame);
        console.log(newNflGame);

      });
    })
    .catch((err) => console.log(err));
}

get_teams();
