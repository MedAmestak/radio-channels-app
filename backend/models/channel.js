const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true
  },
  Frequence: {
    type: Number,
    required: true
  },
  Nbre_user: {
    type: Number,
    required: true
  },
  Logo: String
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
