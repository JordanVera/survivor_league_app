const mongoose = require('mongoose');

const NflGameSchema = new mongoose.Schema({
  awayTeam: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  awayScore: {
    type: Number,
    required: true,
  },
  homeScore: {
    type: Number,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
});

const NflGame = mongoose.model('NflGame', NflGameSchema);

module.exports = NflGame;
