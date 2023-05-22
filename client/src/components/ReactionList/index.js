import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
    const reversedReactions = [...reactions].reverse();
  return (
<div className="card mb-3 bg-gray-100 rounded-xl p-8">
  <div className="card-header font-lofi">
    <span className="text-[2rem]">Newest</span>
  </div>
  <div className="card-body font-lofi">
  {reversedReactions &&
        reversedReactions.map((reaction) => (
          <><p className="-mb-1 bg-white p-4 rounded-xl shadow-xl" key={reaction._id}>

                <Link to={`/profile/${reaction.username}`}>
                    <div className="font-bold text-[1.9rem] -mb-2">{reaction.username}</div>

                </Link>
                <div className='text-[1.5rem]'>{reaction.reactionBody}</div>
            </p><div className="text-[1.1rem] leading-snug mb-8 text-end mr-2 mt-2">{reaction.createdAt}</div></>
        ))}
  </div>
</div>
  );
};

export default ReactionList;