const mongoose = require('mongoose');

const NflGameSchema = new mongoose.Schema({
  awayTeamName: {
    type: String,
    required: true
  },
  homeTeamName: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  season: {
    type: Number,
    required: true
  },
  seasonType:  {
    type: Number,
    required: true
  },
  week: {
    type: Number,
    required: true
  }
});

const NflGame = mongoose.model('NflGame', NflGameSchema);

module.exports = NflGame;