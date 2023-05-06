import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
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
const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login")
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

  // use try/catch instead of promises to handle errors
  try {
    // execute addUser mutation and pass in variable data from form
    const { data } = await addUser({
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
        <section className="min-h-screen flex items-stretch text-black">
            <div className="lg:flex w-1/2 hidden bg-[#ffeccc] bg-no-repeat bg-cover relative items-center signup-bg">
                {/* <div className="absolute bg-black opacity-60 inset-0 z-0"></div> */}
                <div className="w-full px-24 z-10">
                <h1 className="text-[12rem] font-spring text-center tracking-widest -mb-[5rem]">Swap</h1> <h1 className="text-[13rem] font-spring text-center tracking-wide -mb-[5rem]">&</h1> <h1 className="text-[12rem] font-spring text-center tracking-widest -mb-6">Sow</h1>
                   
                </div>
                {/* <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
                <span>
                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </span>
                <span>
                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </span>
                <span>
                    <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </span>
            </div> */}
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-black">
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center signup-bg">
                   
                </div>
                <div className="w-full py-6 z-20">
                    
                    <p className="text-white font-lofi text-[4rem]">
                        Signup
                    </p>
                    <form onSubmit={handleFormSubmit} action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                    <div className="pb-2 pt-4">
                            <input
                                type="username"
                                name="username"
                                id="username"
                                placeholder="Your Username"
                                className="block w-full p-4 text-lg rounded-sm"
                                value={formState.username}
                                onChange={handleChange} />
                        </div>
                        <div className="pb-2 pt-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
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
                            <div className="" onClick={handleLogin}>Have an account???</div>
                        </div>
                        <div className="px-4 pb-2 pt-4">
                            <button 
                                className="uppercase font-lofi block w-full p-4 text-[3rem] rounded-full bg-[#ffeccc] hover:bg-indigo-600 focus:outline-none"
                                type='submit'>Signup</button>
                        </div>
                    </form>
                    {error && <div>Signup Failed</div>}
                </div>
            </div>
        </section>
        </motion.main>
        </AnimatePresence>
  );
};

export default Signup;
