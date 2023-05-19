import React, {useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "../Image";
import plantWeb from "../../assets/images/planticon.png";
import plant from "../../assets/images/planticon.png";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
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
        className="bg-transparent "
        onClick={toggleMenu}
        onMouseEnter={toggleMenu}
        onMouseLeave={toggleMenu}>
        <Image
            srcSet={plantWeb}
            fallback={plant}
            className=" w-[25%] h-[20%] order hover:cursor-pointer"/>
             {isMenuOpen && (
        <motion.div 
            variants={popover}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute -ml-2 top-full -mt-2 w-45 bg-transparent rounded-lg z-10">
          <ul className="py-2 -ml-6 bg-transparent">
            <li className="px-4 py-4 mb-1 bg-gray-100 hover:bg-gray-300 rounded-lg cursor-pointer font-lofi text-center" onClick={handlePost}>Add Plant Clipping</li>
            <li className="px-4 py-4 bg-gray-100 hover:bg-gray-300 cursor-pointer rounded-lg font-lofi text-center"><Link to="/postform">Ask For Advice</Link></li>
            
          </ul>
        </motion.div>
      )}
              </motion.div>
              </AnimatePresence>
    );
};
