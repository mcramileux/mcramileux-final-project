const mongoose = require('mongoose');
const { Schema } = mongoose ;

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 5,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    albumId: {
      type: Schema.Types.ObjectId,
      ref: 'Album',
      required: true,
    },
  },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
