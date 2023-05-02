// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Post {
    _id: ID
    postText: String
    createdAt: String
    username: String
    reactionCount: Int
    img: Buffer, String
  }
type Query {
    posts: [Post]
  }`;

// export the typeDefs
module.exports = typeDefs;