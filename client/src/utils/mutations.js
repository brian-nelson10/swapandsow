import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $profileImage: String!) {
    addUser(username: $username, email: $email, password: $password, profileImage: $profileImage) {
      token
      user {
        _id
        email
        username
        profileImage
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
    createdAt
  }
}
`;
export const ADD_REACTION = gql`
  mutation addReaction($postId: ID!, $reactionBody: String!) {
    addReaction(postId: $postId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      friends {
        _id
        username
      }
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