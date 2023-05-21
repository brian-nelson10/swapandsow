import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC } from '../../utils/queries';
import defaultImg from "../../assets/images/hp-1.png"
import { Link, useNavigate } from 'react-router-dom';
const PostInputBar = () => {
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const navigate = useNavigate();
    const handlePhotoSelect = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass the selectedPhoto to the form on a different page
        // using your preferred method of navigation, such as React Router
        // For simplicity, we'll just log the selected photo here
        console.log(selectedPhoto);
    };
    const handlePostForm = (e) => {
        navigate("/postform");
    }
    return (
        
        <form onSubmit={handleSubmit}>
            <div className="input-bar grid grid-cols-3 gap-2 bg-white shadow-xl rounded-lg opacity-99 items-center">
            {userData ? (
                <div className="profile-image h-[20%] w-[20%] ml-[18rem] mb-[3.5rem]">
                    <img src={userData.me.profileImage} alt="Profile" />
                    <div className='font-bebas tracking-wide justify-center text-center'>{userData.me.username}</div>
                </div>
            ) :  <div className="profile-image h-[20%] w-[20%] ml-[18rem] mb-[3.5rem]">
                <Link
                    to={`/login`}>
            <img src={defaultImg} alt="Profile" />
            <div className='font-bebas justify-center text-center font-bold'>Login or Signup!</div>
            </Link>
        </div>}
                <div>
                    <input
                        placeholder='Start a Swap Post..'
                        className='peer block w-full rounded h-[5rem] font-lofi font-bold text-[2rem] shadow-xl' 
                        onClick={handlePostForm}/>

                </div>
                <div className="">
                    <input
                        type="file"
                        id="photoInput"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="photoInput">
                        <div className=''>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#31572c" className="w-20 h-20 hover:cursor-pointer ml-[4rem]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>

                        </div>
                    </label>
                </div>
            </div>
            {/* <button type="submit">Submit</button> */}
        </form>
    );
};

export default PostInputBar;
