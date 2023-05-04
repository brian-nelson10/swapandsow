import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "../Image";
import plantWeb from "../../assets/images/planticon.png";
import plant from "../../assets/images/planticon.png";
import { useNavigate } from "react-router-dom";
const wordVariants = {
    hovered: {
      y: [0, -5, 0, 5, 0],
      transition: { duration: .5, ease: 'easeInOut' }
    }
  }
  const popover = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: [0, .2, .4, .6, .8, 1],
        transition: {
            duration: .25,
            delay: .5
        }
    },
    exit: {
        opacity: [.8, .5, .3, .1, 0]
    }
  }
export default function PlantButton() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    const navigate = useNavigate();
    function handlePost() {
        navigate("/postform")
    }
    return (
        <AnimatePresence mode="wait">
        <motion.div
        variants={wordVariants}
        whileHover="hovered"
        className=""
        onClick={toggleMenu}
        onMouseEnter={toggleMenu}
        onMouseLeave={toggleMenu}>
        <Image
            srcSet={plantWeb}
            fallback={plant}
            className=" w-[30%] h-[30%] order hover:cursor-pointer"/>
             {isMenuOpen && (
        <motion.div 
            variants={popover}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute bottom-0 top-full -mt-8 w-48 bg-white rounded-lg shadow-xl z-10">
          <ul className="py-2">
            <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer font-lofi text-center" onClick={handlePost}>Add Plant Clipping</li>
            <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer font-lofi text-center" onClick={handlePost}>Ask For Advice</li>
            
          </ul>
        </motion.div>
      )}
              </motion.div>
              </AnimatePresence>
    );
};
