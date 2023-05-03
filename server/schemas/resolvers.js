const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');
const multer = require('multer');
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
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
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
      async createPost(parent, { post }, context) {
        const { postTitle, postText, images } = post;
        if (context.user) {
        
        // Create a new post instance
        const newPost = new Post({
          postTitle,
          postText,
          images: [],
          username: context.user.username
        });
        await User.findByIdAndUpdate(
            { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        )
        // Iterate over each uploaded image
        for (let i = 0; i < images.length; i++) {
          const { createReadStream, filename, mimetype, encoding } = await images[i].file;
  
          // Create a new image instance
          const newImage = new Image({
            filename,
            mimetype,
            size: 0,
            url: '',
          });
  
          // Add the image to the post
          newPost.images.push(newImage);
  
          // Store the image in the database
          await newImage.save();
  
          // Create a new stream for the file data
          const stream = createReadStream();
  
          // Create a new write stream to store the file data in MongoDB
          const upload = new Promise((resolve, reject) => {
            stream.pipe(
              multer({
                storage: new GridFsStorage({
                  url: process.env.MONGO_URI,
                  file: () => ({
                    filename: newImage._id.toString(),
                    bucketName: 'uploads',
                  }),
                }),
              }).single('file')
            );
  
            stream.on('end', () => {
              resolve();
            });
  
            stream.on('error', (error) => {
              reject(error);
            });
          });
  
          // Wait for the upload to complete
          await upload;
  
          // Update the image instance with the file size and URL
          newImage.size = stream.bytesRead;
          newImage.url = `/uploads/${newImage._id}`;
        }
  
        // Save the updated post instance in the database
        await newPost.save();
  
        // Return the new post instance
        return newPost;
      }
      throw new AuthenticationError('You need to be logged in!');
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