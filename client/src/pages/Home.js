import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import PostList from "../components/PostList";
// import PostInputBar from "../components/PostInputBar";
import FriendList from "../components/FriendList";
import Auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { GET_POSTS, QUERY_ME_BASIC } from '../utils/queries';

const main = {
    initial: {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        transition: { duration: .4 }
    },
    animate: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        transition: { duration: .4, staggerChildren: .1 }
    },
    exit: {
        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        transition: { duration: .4 }
    }
};
const Home = () => {
    const { loading , data } = useQuery(GET_POSTS);
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const posts = data?.posts || [];
     const loggedIn = Auth.loggedIn();
    // Responsive breakpoint
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 1250;

    return (
        <AnimatePresence mode='wait'>
            <motion.main
                layout
                className="square"
                variants={main}
                initial="initial"
                animate="animate"
                exit="exit">
                    <section className='px-[11rem] py-[10rem] min-h-[59rem]'>
                <div className='flex-col'>
                    {/* <PostInputBar /> */}
                </div>
                <div className="">
                    {loading ? (
                        <div className='font-lofi text-[2rem]'>...Loading</div>
                    ) : (
                        <PostList
                        posts={posts}
                        title="Our Garden.."
                    />
                    )}
                </div>
                {loggedIn && userData ? (
          <div className="">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : <div className='font-lofi text-[2rem]'>Add some neighbors!</div>}
        </section>
            </motion.main>
        </AnimatePresence>

    )
};

export default Home;