import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import img from "../../assets/images/hp-6.png";
const PostList = ({ posts, title }) => {
  const { data } = useQuery(QUERY_USER);
  if (!posts.length) {
    return <><h3 className='font-lofi text-[3rem]'>{title}</h3><h3 className='font-spring text-[8rem]'>No plants yet...</h3></>
    ;
  }
  return (
    <div className='py-8 flex items-center justify-center rounded-xl h-vh grid'>
      <h3 className='font-spring text-[7rem] -mt-16 text-start justify-start bg-gray-100 bg-opacity-90 mb-8 rounded-xl shadow-xl'>{title}</h3>
      {posts &&
        posts.map(post => (
          <div key={post._id} className="card mb-3 p-8 shadow-xl bg-gray-200 rounded-lg grid items-center justify-center">
            <div className='mb-4'>
              <div className='flex-row flex gap-4'>
                {data ? (
                  <img className="w-12 h-12 rounded-full" src={data.user.profileImage} alt="profile"/>

                ): <img className='w-12 h-12 rounded-full' src={img} alt="profile"/>
                }
            
            <div className="card-header ml-2 -mt-1 font-bebas tracking-wide">
              <span className='block leading-snug'>
            <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-black block font-bebas tracking-wide text-[2rem]"
            >
              {post.username}
              </Link>{' '}
              </span>
              <span className='block leading-snug text-end'>
              Posted on {post.createdAt}
              </span>
            </div>
            </div>
            <div className="card-body leading-snug font-lofi text-start font-bold md:leading-normal">
            <Link to={`/post/${post._id}`}>
            <p className='text-[2rem] bg-gray-100 w-full mb-2'>{post.postTitle}</p>
                <p className='mb-8'>{post.postText}</p>
                <div className=''>
                <img src={post.imageUrl} alt="Post" />
                </div>
                </Link>
            </div>
            <hr className=''/>
            <div className='divide-y bg-gray-100'>
                <div className='w-full p-4 text-right border-black border-b-2 grid grid-cols-2 '>
                  <div> <p className="font-lofi justify-start text-start">Likes</p></div>
                  <div><p className="font-lofi">Comments:</p> <p>{post.reactionCount}</p></div>
                    {/* <p className='font-lofi'> Click to{' '}
                    {post.reactionCount ? 'see' : 'start'} the discussion!
                </p> */}
                </div>
                <div className='p-4 grid grid-cols-2 font-lofi text-[1.3rem]'>
                  <div className='flex-row flex gap-4 mt-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
</svg>Like
</div>
<div className='flex-row flex gap-4 mt-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>Comment</div>
</div>
                </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;