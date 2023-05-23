import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <div className='bg-gray-200 opacity-90 text-black rounded-xl shadow-xl'><p className=" font-bebas tracking-wide p-3">{username},</p> <p className='font-lofi text-[2rem]'>make some friends!</p></div>;
  }

  return (
    <div className=' bg-gray-200 rounded-xl shadow-xl p-8'>
      <h5 className='font-bebas text-[2rem]'>
        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
      </h5>
      {friends.map(friend => (
        <button className="bg-gray-100 hover:bg-[#00b4d8] text-[1.5rem] rounded-xl shadow-xl p-2 font-lofi w-fit mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;