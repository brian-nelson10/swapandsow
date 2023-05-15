import React from 'react';
import { Link } from 'react-router-dom';
const PostList = ({ posts, title }) => {

  if (!posts.length) {
    return <><h3 className='font-lofi text-[3rem]'>{title}</h3><h3 className='font-spring text-[8rem]'>No plants yet...</h3></>
    ;
  }
  return (
    <div>
      <h3 className='font-lofi text-[3rem]'>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="card mb-3">
            <p className="card-header font-lofi">
            <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-black"
            >
              {post.username}
              </Link>{' '}
              Posted on {post.createdAt}
            </p>
            <div className="card-body">
            <Link to={`/post/${post._id}`}>
            <p>{post.postTitle}</p>
                <p>{post.postText}</p>
                <img src={post.imageUrl} alt="Post" />
                <p className="mb-0 font-lofi">
                    Comments: {post.reactionCount} || Click to{' '}
                    {post.reactionCount ? 'see' : 'start'} the discussion!
                </p>
            </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;