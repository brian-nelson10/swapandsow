// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs

const typeDefs = gql`
scalar Upload

type User {
    _id: ID
    username: String
    email: String
    profileImage: String
    friendCount: Int
    posts: [Post]
    friends: [User]
  }
type Post {
    _id: ID
    postTitle: String
    postText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
    imageUrl: String
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(username: String): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }
  input CreatePostInput {
    username: String!
    postTitle: String!
    postText: String!
    imageUrl: String!
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, profileImage: String!): Auth
    addReaction(postId: ID!, reactionBody: String!): Post
    addFriend(friendId: ID!): User
      createPost(post: CreatePostInput!): Post!
  }
  `;
 
// export the typeDefs
module.exports = typeDefs;