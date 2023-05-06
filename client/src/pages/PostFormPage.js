import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PostForm from '../components/PostForm';
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
const PostFormPage = () => {
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
                        <div className='font-lofi text-center text-[1.5rem]'> Post a plant clipping for a swap!</div>
                       
                    <PostForm/>
                    </section>
                    </motion.main>
                    </AnimatePresence>
                    )
};
export default PostFormPage;