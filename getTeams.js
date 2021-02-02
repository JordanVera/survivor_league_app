const axios = require('axios');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();

const NflGame = require('./models/NflGame');

function get_teams() {
  axios
    .all([
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/1?key=${process.env.API_KEY}`),
    ])
    .then((responseArr) => {
      let weeks = [];
      responseArr[0].data.forEach((element) => {
        // console.log(element.HomeTeamName);
        // console.log(element.AwayTeamName);
        // console.log('----------------------------')
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          week: element.Week,
          dateTime: element.DateTime
        });

        newNflGame.save();
        console.log(newNflGame);

      });
    })
    .catch((err) => console.log(err));
}

get_teams();