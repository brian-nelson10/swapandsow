import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import image1 from "../assets/images/hp-6.png"
import image2 from "../assets/images/hp-7.png"
import image3 from "../assets/images/hp-5.png"

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
  const [formState, setFormState] = useState({ username: '', email: '', password: '', profileImage: '' });
  const [profileImage, setProfileImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(image1);

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
  const handleImageSelection = (imageURL) => {
    setSelectedImage(imageURL);
    setProfileImage(imageURL);
  };
  // submit form 
  const handleFormSubmit = async event => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState, profileImage }
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
                <p className='font-lofi text-white text-[2rem]'>Select Profile Image:</p>
                <div className='grid grid-cols-3'>
                  <label>
                    <input
                      type="radio"
                      value={image1}
                      checked={selectedImage === image1}
                      onChange={() => handleImageSelection(image1)}
                    />
                    <img className="" src={image1} alt="1" />
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={image2}
                      checked={selectedImage === image2}
                      onChange={() => handleImageSelection(image2)}
                    />
                    <img src={image2} alt="2" />
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={image3}
                      checked={selectedImage === image3}
                      onChange={() => handleImageSelection(image3)}
                    />
                    <img src={image3} alt="3" />
                  </label> 
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
      </motion.main >
    </AnimatePresence >
  );
};

export default Signup;