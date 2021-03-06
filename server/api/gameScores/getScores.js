/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
const axios = require('axios');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const chalk = require('chalk');
const util = require('util');

dotenv.config();

const scoresRepo = require('./scoresController.js');

function getSchedule() {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    axios
      .all([
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/1?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/2?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/3?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/4?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/5?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/6?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/7?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/8?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/9?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/10?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/11?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/12?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/13?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/14?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/15?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/16?key=${process.env.API_KEY}`),
        axios.get(`https://api.sportsdata.io/api/nfl/odds/json/ScoresByWeek/${process.env.SEASON}/17?key=${process.env.API_KEY}`)
      ])
      .then((responseArr) => {
        const winners = {
          week1: [],
          week2: [],
          week3: [],
          week4: [],
          week5: [],
          week6: [],
          week7: [],
          week8: [],
          week9: [],
          week10: [],
          week11: [],
          week12: [],
          week13: [],
          week14: [],
          week15: [],
          week16: [],
          week17: [],
        };

        const losers = {
          week1: [],
          week2: [],
          week3: [],
          week4: [],
          week5: [],
          week6: [],
          week7: [],
          week8: [],
          week9: [],
          week10: [],
          week11: [],
          week12: [],
          week13: [],
          week14: [],
          week15: [],
          week16: [],
          week17: [],
        };

        for (let i = 0; i < 17; i++) {
          const weekN = `week${i + 1}`;
          const winnerWeek = winners[weekN];
          const loserWeek = losers[weekN];

          responseArr[i].data.forEach((element) => {
            if (element.AwayScore > element.HomeScore) {
              console.log(chalk.red('Away team won'));
              winnerWeek.push(element.AwayTeam);
              loserWeek.push(element.HomeTeam);
            } else if (element.AwayScore === element.HomeScore) {
              console.log(chalk.blue('Game was a tie, both teams lost'));
              loserWeek.push(element.HomeTeam);
              loserWeek.push(element.AwayTeam);
            } else {
              console.log(chalk.green('Home Team won'));
              winnerWeek.push(element.HomeTeam);
              loserWeek.push(element.AwayTeam);
            }
          });
        }

        console.log(util.inspect(winners, { showHidden: false, depth: null }));
        console.log(util.inspect(losers, { showHidden: false, depth: null }));

        async function seedDbWinners() {
          const client = new MongoClient(process.env.MongoURI);
          await client.connect();

          const results = await scoresRepo.loadWinners(winners);
          client.close();
        }

        async function seedDbLosers() {
          const client = new MongoClient(process.env.MongoURI);
          await client.connect();

          const results = await scoresRepo.loadLosers(losers);
          client.close();
        }

        seedDbWinners();
        seedDbLosers();

        resolve({ winners, losers });
      })
      .catch((err) => console.log(err));
  });
}

module.exports = getSchedule;
