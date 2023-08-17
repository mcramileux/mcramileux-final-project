// const { Schema } = require('mongoose');

// // This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `favoriteAlbums` array in User.js
// const albumSchema = new Schema({
//   artists: [
//     {
//       type: String,
//     },
//   ],
//   description: {
//     type: String,
//     required: true,
//   },
//   // favorite album id from Spotify
//   alumId: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = albumSchema;