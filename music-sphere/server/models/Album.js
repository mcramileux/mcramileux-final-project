const mongoose = require('mongoose');
const { Schema } = mongoose ;

const albumSchema = new Schema({
  artists: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // favorite album id from Spotify
  albumId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;