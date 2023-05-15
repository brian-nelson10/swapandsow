const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');
const cloudinary = require('cloudinary').v2;
      cloudinary.config({
        cloud_name: "dlseow4te",
        api_key: "233834848735683",
        api_secret: "2ovGrJ6usJdSXwC8lE9krRXlBTQ"
      });
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
          .populate('friends');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('posts')
        .populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('posts');
    },
    posts: async (parent, { _id }) => {
     return Post.find({ _id })
        .populate('posts');
      },
    post: async (parent, { _id }) => {
      return Post.findOne({ _id });
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    createPost: async (_, { post }) => {
      try {
        // Destructure the post object to access its fields
        const { username, postTitle, postText, imageUrl } = post;

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(imageUrl, {
          folder: 'posts',
        });

        // Create a new post document in the database
        const newPost = new Post({
          username,
          postTitle,
          postText,
          imageUrl: uploadResult.secure_url,
        });

        // Save the new post document
        const createdPost = await newPost.save();

        return createdPost;
        
      } catch (error) {
        console.error(error);
        
        throw new Error('Failed to create a post');
        
      }
    },
    addReaction: async (parent, { postId, reactionBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { reactions: { reactionBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );
        return updatedPost;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};
module.exports = resolvers;