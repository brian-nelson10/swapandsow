import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '../../utils/mutations';
import { GET_POSTS, QUERY_ME, QUERY_ME_BASIC } from '../../utils/queries';
import x from '../../assets/images/x.svg';
import { Link } from 'react-router-dom';
import UploadButton from "../../components/PostForm/UploadButton";
const wordVariants = {
    hovered: {
        y: [0, -2, 0, 2, 0],
        transition: { duration: .5, ease: 'easeInOut' }
    }
}
const PostForm = () => {
    // const [username, setUsername] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [image, setImage] = useState(null);
    const { data: userData } = useQuery(QUERY_ME_BASIC);
    const [createPost, { loading, error }] = useMutation(CREATE_POST, {
        update(cache, { data: { createPost }}) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, posts: [me.posts, createPost]}},
                });
            } catch (e) {
                console.warn("First Post by user!")
            }
            const { posts } = cache.readQuery({ query: GET_POSTS });
            cache.writeQuery({
                query: GET_POSTS,
                data: { posts: [createPost, ...posts]},
            });
        }
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', image);
        formData.append("upload_preset", 'rxjqvmf7'); // Replace with your Cloudinary upload preset
    
        try {
          const response = await fetch('https://api.cloudinary.com/v1_1/dlseow4te/image/upload', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            const data = await response.json();
    
            // Perform further processing or save the Cloudinary public URL in your post data
            const imageUrl = data.secure_url;
    
            // Create the post on the server
            await createPost({
                variables: {
                    input: {
                    // username,
                    postTitle,
                    postText,
                    imageUrl,

                    },
                },
            });
    
            // Clear form fields
            // setUsername('');
            setPostTitle('');
            setPostText('');
            setImage(null);
          } else {
            console.error('Failed to upload image to Cloudinary.');
          }
        } catch (error) {
          console.error('An error occurred while uploading the image.', error);
        }
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);

      };
    
    return (
        <section>
            <form className="max-w-lg mx-auto mt-8 p-6 bg-gray-100 shadow-md font-lofi" onSubmit={handleSubmit}>
                <div className='grid grid-cols-2'>
                    <div className='justify-start grid'><h2 className="text-2xl font-bold mb-4">Create Post</h2></div>
                    <motion.div
                        variants={wordVariants}
                        whileHover="hovered"
                        className='justify-end grid'><Link to="/"><img src={x} className="" alt='upload' /></Link></motion.div>
                </div>
                <div className='mb-4 flex-row flex gap-4'>
                <p className="font-bold" htmlFor="username">Username:</p> <p className='font-bebas tracking-wide'>{userData.me.username}</p>

          {/* <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
                        Text
                    </label>
                    <textarea
                        id="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
                        rows="4"
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="submit"
                    className=""
                    disabled={loading}
                >
                    <UploadButton
                        text="Upload"/>
                </button>
            </form>
        </section>
    );
};

export default PostForm;
