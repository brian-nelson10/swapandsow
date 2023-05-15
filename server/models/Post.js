const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const mongoose = require('mongoose');
const postSchema = new Schema(
  {
    postTitle: {
      type: String,
      required: 'You need to leave a plant!',
      minlength: 1,
      maxlength: 300
    },
    postText: {
      type: String,
      required: 'You need to leave a plant!',
      minlength: 1,
      maxlength: 800
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: false
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

postSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
