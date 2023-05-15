import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import "./styles.css";
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
const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate();
    function handleSignup() {
        navigate("/signup")
    }
    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState }
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <AnimatePresence mode='wait'>
            <motion.main
                layout
                className="square"
                variants={main}
                initial="initial"
                animate="animate"
                exit="exit">
                <section className="min-h-screen flex items-stretch text-black ">
                    <div className="lg:flex w-1/2 hidden bg-[#ffeccc] relative items-center">
                        <div className="w-full px-24 z-20 grid">
                            <h1 className="text-[12rem] font-spring text-center tracking-widest -mb-[5rem]">Swap</h1> <h1 className="text-[13rem] font-spring text-center tracking-wide -mb-[5rem]">&</h1> <h1 className="text-[12rem] font-spring text-center tracking-widest -mb-6">Sow</h1>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-black">
                        <div className="absolute lg:hidden z-10 inset-0 bg-no-repeat bg-cover items-center">

                        </div>
                        <div className="w-full py-6 z-20">

                            <p className="text-white font-lofi text-[4rem]">
                                Login
                            </p>
                            <form onSubmit={handleFormSubmit} action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                                <div className="pb-2 pt-4">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="email"
                                        className="block w-full p-4 text-lg rounded-sm"
                                        value={formState.email}
                                        onChange={handleChange} />
                                </div>
                                <div className="pb-2 pt-4">
                                    <input
                                        className="block w-full p-4 text-lg rounded-sm"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="font-lofi text-right text-gray-400 hover:underline hover:text-gray-100 hover:cursor-pointer">
                                    <div onClick={handleSignup}>Need to Signup???</div>
                                </div>
                                <div className="px-4 pb-2 pt-4">
                                    <button
                                        className="uppercase font-lofi block w-full p-4 text-[3rem] rounded-full bg-[#ffeccc] hover:bg-indigo-600 focus:outline-none"
                                        type='submit'>Login</button>
                                </div>
                            </form>
                            {error && <div className='font-lofi text-white'>Login Failed</div>}
                        </div>
                    </div>
                </section>
            </motion.main>
        </AnimatePresence>
    )
};

export default Login;


