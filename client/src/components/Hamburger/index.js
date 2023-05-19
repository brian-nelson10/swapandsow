import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img from "../../assets/images/hp-1.png";
import img1 from "../../assets/images/hp-7.png";
import img2 from "../../assets/images/hp-3.png";
import img3 from "../../assets/images/hp-4.png";
import img4 from "../../assets/images/hp-5.png";
import img5 from "../../assets/images/hp-6.png";

import Auth from "../../utils/auth";
export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredDiv, setHoveredDiv] = useState(null);
    const loggedIn = Auth.loggedIn();
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    const handleDivHover = (index) => {
        setHoveredDiv(index);
    };

    const handleDivLeave = () => {
        setHoveredDiv(null);
    };
    const navigate = useNavigate();
    function handleHome() {
        navigate('/');
        setIsOpen(false);
    };
    function handleLogin() {
        navigate('/login');
        setIsOpen(false);
    };
    function handleSignup() {
        navigate('/signup');
        setIsOpen(false);
    };
    function handleProfile() {
        navigate('/profile');
        setIsOpen(false);
    };
    function handleAdvice() {
        navigate('/advice');
        setIsOpen(false);
    };
    function handleContact() {
        navigate('/contact');
        setIsOpen(false);
    };
    const child1 = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: 2.5,
                duration: 2,
            },
        },
        hidden: {
            opacity: 0,
            x: -60,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 2,
                timing: [2, 1, 1, 1]
            },
        },
    };
    const child2 = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: 2.75,
                duration: 2,
            },
        },
        hidden: {
            opacity: 0,
            x: -60,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 2,
                timing: [2, 1, 1, 1]
            },
        },
    };
    const child3 = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: 3,
                duration: 2,
            },
        },
        hidden: {
            opacity: 0,
            x: -60,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 2,
                timing: [2, 1, 1, 1]
            },
        },
    };
    const menuVariants = {
        opened: {
            top: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.5,
                type: "spring",
                damping: 12,
                stiffness: 100,

            },
        },
        closed: {
            top: "-190vh",
        },
    };
    const linkVariants = {
        opened: {
            opacity: 1,
            y: 1,
        },
        closed: {
            opacity: 0,
            y: 0,
        },
    };
    const lineTop = {
        opened: {
            rotate: 405,
            translateY: 10
        },
        closed: {
            rotate: 0,
            translateY: 0
        },
    }
    const lineMiddle = {
        opened: {
            opacity: 0
        },
        closed: {
            opacity: 1
        },
    }
    const lineBottom = {
        opened: {
            rotate: -405,
            translateY: -8,
            backgroundColor: "white"
        },
        closed: {
            rotate: 0,
            translateY: 0
        },
    }
    
    return (
        <>
            <nav className="fixed ml-6 mt-8 lg:mt-8 lg:ml-[8rem] z-50">
                <motion.div
                    layout
                    className="xl:container-fluid xl:pr-6 hover:cursor-pointer"
                    animate={isOpen ? "opened" : "closed"}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <motion.svg
                        className="w-14 h-15 sm:w-20 h-20 z-50"
                        viewBox="0 0 90 90" id="emoji" xmlns="http://www.w3.org/2000/svg">
                        <g id="color" />
                        <g id="hair" />
                        <g id="skin" />
                        <g id="skin-shadow" />
                        <motion.g
                            animate={isOpen ? "opened" : "closed"}
                            initial={false}
                            id="line">
                            <motion.g
                                variants={child3}
                                initial="hidden"
                                animate="visible">
                                <motion.line className="line top" animate={isOpen ? "opened" : "closed"}
                                    initial={false} variants={lineTop} transition={{ type: "spring", stiffness: 260, damping: 20 }} x1="16" x2="75" y1="26" y2="26" fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" />
                            </motion.g>
                            <motion.g
                                variants={child2}
                                initial="hidden"
                                animate="visible">
                                <motion.line className="line middle" animate={isOpen ? "opened" : "closed"}
                                    initial={false} variants={lineMiddle} transition={{ type: "spring", stiffness: 260, damping: 20 }} x1="16" x2="75" y1="36" y2="36" fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" />
                            </motion.g>
                            <motion.g
                                variants={child1}
                                initial="hidden"
                                animate="visible">
                                <motion.line className="line bottom" animate={isOpen ? "opened" : "closed"}
                                    initial={false} variants={lineBottom} transition={{ type: "spring", stiffness: 260, damping: 20 }} x1="16" x2="75" y1="46" y2="46" fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="5" />
                            </motion.g>
                        </motion.g>
                    </motion.svg>
                </motion.div>
            </nav>
            <motion.nav
                className="h-full w-screen fixed flex flex-col items-center justify-center align-center bg-[#ffd6a3] z-40 inset-0"
                initial={false}
                variants={menuVariants}
                animate={isOpen ? "opened" : "closed"}
            >
                <div className="grid xl:grid-cols-2 xl:gap-20 z-50">
                    {/* Left section */}
                    <motion.div
                        className="w-[20rem] h-[20rem] mt-[15rem] xl:mt-[5rem]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {hoveredDiv === null && (
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={img}
                                className="xl:mt-0 -mt-[23rem] ml-10 xl:ml-0" />
                        )}
                        {hoveredDiv === 0 && (
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={img1}
                                className="" />
                        )}
                        {hoveredDiv === 1 && (
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={img2}
                                className="" />
                        )}
                        {hoveredDiv === 2 && (
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={img3}
                                className="" />
                        )}
                        {hoveredDiv === 3 && (
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={img4}
                                className="" />
                        )}
                        {hoveredDiv === 4 && (
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={img5}
                                className="" />
                        )}
                    </motion.div>
                    {/* Right section */}
                    <div className="flex-shrink-0 w-full p-4 -mt-[34rem] xl:mt-0">
                        <div className="text-center">
                            <ul className="div-list">
                                <motion.li
                                    whileHover={{ scale: 1.1 }}
                                    onMouseEnter={() => handleDivHover(0)}
                                    onMouseLeave={handleDivLeave}
                                    onClick={handleHome}
                                    className="text-black font-lofi xl:mb-2 text-[3.5rem] xl:text-[3rem] list-none tracking-wide hover:cursor-pointer" variants={linkVariants}
                                >Home
                                </motion.li>
                                {Auth.loggedIn() ? (
                                    <motion.li
                                        className="text-black font-lofi xl:mb-2 text-[3.5rem] xl:text-[3rem] list-none tracking-wide hover:cursor-pointer" variants={linkVariants}
                                        whileHover={{ scale: 1.1 }}
                                        onMouseEnter={() => handleDivHover(2)}
                                        onMouseLeave={handleDivLeave}
                                        onClick={logout}
                                    >Logout
                                    </motion.li>
                                ) : (
                                    <><motion.li
                                        className="text-black font-lofi xl:mb-2 text-[3.5rem] xl:text-[3rem] list-none tracking-wide hover:cursor-pointer" variants={linkVariants}
                                        whileHover={{ scale: 1.1 }}
                                        onMouseEnter={() => handleDivHover(2)}
                                        onMouseLeave={handleDivLeave}
                                        onClick={handleSignup}
                                    >Sign Up
                                    </motion.li><motion.li
                                        className="text-black font-lofi xl:mb-2 text-[3.5rem] xl:text-[3rem] list-none tracking-wide hover:cursor-pointer" variants={linkVariants}
                                        whileHover={{ scale: 1.1 }}
                                        onMouseEnter={() => handleDivHover(4)}
                                        onMouseLeave={handleDivLeave}
                                        onClick={handleLogin}
                                    >Login
                                        </motion.li></>
                                )}
                                <motion.li
                                    className="text-black font-lofi xl:mb-2 text-[3.4rem] xl:text-[3rem] list-none tracking-wide hover:cursor-pointer" variants={linkVariants}
                                    whileHover={{ scale: 1.1 }}
                                    onMouseEnter={() => handleDivHover(1)}
                                    onMouseLeave={handleDivLeave}
                                    onClick={handleAdvice}
                                >Plant Advice
                                </motion.li>
                                <motion.li
                                    className="text-black font-lofi xl:mb-2 text-[3.5rem] xl:text-[3rem] list-none tracking-wide hover:cursor-pointer" variants={linkVariants}
                                    whileHover={{ scale: 1.1 }}
                                    onMouseEnter={() => handleDivHover(3)}
                                    onMouseLeave={handleDivLeave}
                                    onClick={handleContact}
                                >Suggestions
                                </motion.li>
                                <motion.li
                                    className="text-black font-lofi xl:mb-2 text-[3.4rem] xl:text-[3rem] list-none tracking-wide hover:cursor-pointer" variants={linkVariants}
                                    whileHover={{ scale: 1.1 }}
                                    onMouseEnter={() => handleDivHover(4)}
                                    onMouseLeave={handleDivLeave}
                                    onClick={handleProfile}
                                >My Profile
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.nav>

        </>
    );
};