import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import "../PostForm/UploadButton.css";

const iconVariants = {
  hovered: {
    y: [0, -2, 0, 2, 0],
    transition: { duration: .5, ease: 'easeInOut' }
  }
}
const SubmitButton = ({ text, error }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const uploadControls = useAnimation();
  const loadingControls = useAnimation();
  const doneControls = useAnimation();

  const animate = async () => {
    uploadControls.start({
        zIndex: 1
      });
      
      await doneControls.start({ 
        top: 0,
        transition: { duration: .5 }
      });
      loadingControls.start({
        top: '-100%',
        transition: { duration: 0 }
      });
      await uploadControls.start({ 
        top: 0,
        zIndex: 4,
        transition: { delay: 1.8, duration: .3 }
      });
      doneControls.start({
        top: '-100%',
        transition: { duration: .6 }
      });
      setIsAnimating(false);
    };
  return (
    <div className="upload-button ">
      <div className="wrapper relative h-[4rem] w-[9rem] cursor-pointer overflow-hidden" onClick={() => !isAnimating && animate()}>
        <motion.div 
          className="container upload absolute text-center justify-center flex items-center overflow-hidden text-[1.3rem] h-[100%] w-[100%] rounded-[8px] bg-[#ffd6a3] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-[#00b4d8]"
          animate={uploadControls}
          whileHover="hovered"
        >
          <motion.div variants={iconVariants}>{text}</motion.div>
        </motion.div>
       
        <motion.div  
        
          className={error ? "container done absolute flex font-bold justify-center items-center overflow-hidden text-[1.3rem] h-[100%] w-[100%] rounded-[8px] text-black z-30 -top-[100%] bg-[red]" : "container done absolute flex font-bold justify-center items-center overflow-hidden text-[1.3rem] h-[100%] w-[100%] rounded-[8px] text-black z-30 -top-[100%] bg-[#55a630]"}
          animate={doneControls}
        >
            <div>{error ? "error" : 'done'}</div>
       
        </motion.div>
      </div>
    </div>
  )
};

export default SubmitButton;