import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const CREATE_POST = gql`
mutation CreatePost($input: CreatePostInput!) {
  createPost(post: $input) {
    _id
    username
    postTitle
    postText
    imageUrl
  }
}
`;
// export const ADD_POST = gql`
//   mutation addPost($postText: String!) {
//     addPost(postText: $postText) {
//       _id
//       postTitle
//       postText
//       createdAt
//       username
//       reactionCount
//       reactions {
//         _id
//       }
//       images {
//         id
//         filename
//         mimetype
//         size
//       }
//     }
//   }
// `;