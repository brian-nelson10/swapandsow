import { gql } from '@apollo/client';

// export const GET_POSTS = gql`
//   query GetPosts ($username: String) {
//     posts(username: $username) {
//       _id
//       postText
//       postTitle
//       imageUrl
//       createdAt
//       username

//     }
//   }
// `;
export const GET_POSTS = gql`
  query GetPosts($username: String) {
    posts(username: $username) {
      _id
      username
      postTitle
      postText
      imageUrl
      createdAt
    }
  }
`;

export const QUERY_POST = gql `
    query post($id: ID!) {
        post(_id: $id) {
            _id
            postText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
            images {
                _id 
                filename
                mimetype
                size
            }
        }
    }`;

    export const QUERY_USER = gql`
    query user($username: String!) {
      user(username: $username) {
        _id
        username
        email
        friendCount
        profileImage
        friends {
          _id
          username
        }
        posts {
          _id
          postText
          createdAt
          reactionCount
        }
      }
    }
  `;

  export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      profileImage
      friendCount
      posts {
        _id
        postText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      profileImage
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;