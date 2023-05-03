// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs

const typeDefs = gql`
scalar Upload

type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    posts: [Post]
    friends: [User]
  }
  type Image {
    id: ID!
    filename: String!
    mimetype: String!
    size: Int!
    url: String!
  }
type Post {
    _id: ID!
    postTitle: String!
    postText: String!
    createdAt: String!
    username: String!
    reactionCount: Int!
    images: [Image]!
  }
  input ImageInput {
    file: Upload!
  }

  input PostInput {
    title: String!
    body: String!
    images: [ImageInput!]!
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
    user(username: String!): User
    posts(username: String): [Post]
    post(_id: ID!): Post
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReaction(postId: ID!, reactionBody: String!): Post
    addFriend(friendId: ID!): User
    createPost(post: PostInput!): Post!
  }
  `;
 
// export the typeDefs
module.exports = typeDefs;