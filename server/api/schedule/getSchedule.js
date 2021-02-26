const axios = require('axios');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const chalk = require('chalk');
dotenv.config();

const scheduleRepo = require('./scheduleController.js');
const NflGame = require('./scheduleModel');

function getSchedule() {
  axios
    .all([
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/1?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/2?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/3?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/4?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/5?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/6?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/7?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/8?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/9?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/10?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/11?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/12?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/13?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/14?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/15?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/16?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}/17?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}POST/1?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}POST/2?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}POST/3?key=${process.env.API_KEY}`),
      axios.get(`https://api.sportsdata.io/api/nfl/odds/json/GameOddsByWeek/${process.env.SEASON}POST/4?key=${process.env.API_KEY}`)
    ])
    .then((responseArr) => {
      let weeks = [];

      responseArr[0].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[1].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[2].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[3].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[4].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[5].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[6].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[7].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[8].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[9].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[10].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[11].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[12].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[13].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[14].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[15].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[16].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[17].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[18].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[19].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });

      responseArr[20].data.forEach((element) => {
        const week = {};
        const newNflGame = new NflGame({
          homeTeamName: element.HomeTeamName,
          awayTeamName: element.AwayTeamName,
          season: element.Season,
          seasonType: element.SeasonType,
          week: element.Week,
          dateTime: element.DateTime
        });

        weeks.push(newNflGame);
      });
      
      async function seedDbWinners() {
        const client = new MongoClient(process.env.MongoURI);
        await client.connect();

        const results = await scheduleRepo.loadSchedule(weeks);
        
        client.close();
      }

      async function seedDbLosers() {
        const client = new MongoClient(process.env.MongoURI);
        await client.connect();

        const results = await scheduleRepo.loadSchedule(weeks);
        
        client.close();
      }

      seedDbWinners();
      seedDbLosers();

      console.log(chalk.cyanBright.bold(`Winners and losers object successfully seeded into MongoDB with data from the ${process.env.SEASON} season.`));

    })
    .catch((err) => console.log(err));
}

getSchedule();