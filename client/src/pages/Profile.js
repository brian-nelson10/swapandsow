import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import FriendList from '../components/FriendList';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import FriendButton from '../components/PostForm/FriendButton';

const Profile = (props) => {
    const { username: userParam } = useParams();
    const [addFriend] = useMutation(ADD_FRIEND);
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile:username" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    const handleClick = async () => {
        try {
            await addFriend({
                variables: { id: user._id },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <section className='h-max min-h-[100rem] p-10 xl:p-[6rem] grid grid-cols-3 gap-4'>

            <div className="flex flex-col mt-10 p-4 xl:py-10 xl:px-[6rem]">
                <h2 className="p-4 font-lofi text-[2rem] ml-2">
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>
                <div className='flex flex-row gap-6 bg-gray-200 rounded-xl shadow-xl p-8 w-fit mb-[5rem]'>
                    <div className='w-[8rem] h-[8rem] bg-gray-100 rounded-full border border-black border-2 p-1'>
                        <img src={user.profileImage} />
                    </div>
                    <div className=''>
                       <div className='font-bebas text-[2rem]'>{user.username}</div>
                        {/* {userParam && ( */}
                        <div className="" onClick={handleClick}>
                            <FriendButton text="add friend" />
                        </div>
                        {/* // )} */}
                    </div>
                </div>

                <div className="mb-3">
                    <FriendList
                        username={user.username}
                        friendCount={user.friendCount}
                        friends={user.friends}
                    />
                </div>
            </div>

            <div className="col-span-2 py-[10rem] mt-8 mb-3">
                <div className="text-center justify-center">
                    <PostList
                        posts={user.posts}
                        title={`${user.username}'s posts...`}
                        postsPerPage={5}
                    />
                </div>
            </div>
            <div className="mb-3">{!userParam && <PostForm />}</div>
        </section>
    );
};

export default Profile;