import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
const NoMatch = () => {
    return(
    <AnimatePresence mode='wait'>
            <motion.main
                layout
                className="square"
                variants={main}
                initial="initial"
                animate="animate"
                exit="exit">
                    <section className='font-lofi'>
                    NO MATCH!
                    </section>
                    </motion.main>
                    </AnimatePresence>
    )
};
export default NoMatch;