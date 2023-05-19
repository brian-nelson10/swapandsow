import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import "./UploadButton.css";
import { useNavigate } from 'react-router-dom';
const iconVariants = {
  hovered: {
    y: [0, -2, 0, 2, 0],
    transition: { duration: .5, ease: 'easeInOut' }
  }
}
const UploadButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const uploadControls = useAnimation();
  const loadingControls = useAnimation();
  const doneControls = useAnimation();
  const loaderControls = useAnimation();
  const loadingBarControls = useAnimation();
  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
       return null;
}
  const animate = async () => {
    setIsAnimating(true);
    uploadControls.start({
      zIndex: 1
    });
    await loadingControls.start({
      top: 0,
      transition: { duration: .3 }
    });
    loadingBarControls.start({
      width: '100%',
      transition: { duration: 1.7 }
    });
    uploadControls.start({
      top: '-100%',
      transition: { duration: 0 }
    });
    await doneControls.start({ 
      top: 0,
      transition: { delay: 1.6, duration: .3 }
    });
    loadingControls.start({
      top: '-100%',
      transition: { duration: 0 }
    });
    loadingBarControls.start({
      width: '0%'
    });
    await uploadControls.start({ 
      top: 0,
      zIndex: 4,
      transition: { delay: 2, duration: .3 }
    });
    routeChange();
    setIsAnimating(false);
  };
  return (
    <div className="upload-button ">
      <div className="wrapper relative h-[4rem] w-[9rem] cursor-pointer overflow-hidden" onClick={() => !isAnimating && animate()}>
        <motion.div 
          className="container upload absolute text-center justify-center flex items-center overflow-hidden text-[1.3rem] h-[100%] w-[100%] rounded-[8px] bg-[#ffd6a3] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-[#55a630]"
          animate={uploadControls}
          whileHover="hovered"
        >
          <motion.div variants={iconVariants}>upload</motion.div>
        </motion.div>
        <motion.div 
          className="container loading bg-[#f0759e] z-20 font-bold -top-[100%] justify-center text-black relative flex items-center overflow-hidden text-[1.3rem] h-[100%] w-[100%] rounded-[8px]"
          animate={loadingControls}
        >
          <motion.div className="loader" animate={loaderControls} />
          <div>loading..</div>
          <motion.div className="loading-bar " animate={loadingBarControls}/>
        </motion.div>
        
        <motion.div  
          className="container done absolute flex font-bold justify-center items-center overflow-hidden text-[1.3rem] h-[100%] w-[100%] rounded-[8px] text-black z-30 -top-[100%] bg-[#55a630]"
          animate={doneControls}
        >
          <div>done</div>
        </motion.div>
      </div>
    </div>
  )
};

export default UploadButton;