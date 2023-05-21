import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';

const SinglePost = (props) => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId },
    });

    const post = data?.post || {};

    if (loading) {
        return <div className='font-spring text-[5rem]'>Loading...</div>;
    }

    return (
        <div className='flex items-center justify-center rounded-xl h-screen grid py-[8rem] px-[5rem] '>
            <div className="card mb-3 p-8 shadow-xl bg-gray-200 rounded-lg grid items-center justify-center">
                <p className="card-header text-black font-bebas tracking-wide">
                    <span className="block text-[2rem]">
                        {post.username}
                    </span>{' '}
                    Posted on {post.createdAt}
                </p>
                <div className="card-body leading-snug font-lofi text-start font-bold md:leading-normal text-[2rem]">
                    <p>{post.postText}</p>
                    <div className=''>
                        <img src={post.imageUrl} alt="Post" />
                    </div>
                </div>
            </div>

            {post.reactionCount > 0 && (
                <ReactionList reactions={post.reactions} />
            )}

            {Auth.loggedIn() && <ReactionForm postId={post._id} />}
        </div>
    );
};

export default SinglePost;
