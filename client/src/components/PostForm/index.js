import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';
import x from '../../assets/images/x.svg';
import { Link } from 'react-router-dom';
const wordVariants = {
    hovered: {
      y: [0, -2, 0, 2, 0],
      transition: { duration: .5, ease: 'easeInOut' }
    }
  }
const PostForm = () => {
    const [postTitle, setTitle] = useState('');
    const [postText, setText] = useState('')
    const [image, setImage] = useState(null);

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {

            // could potentially not exist yet, so wrap in a try/catch
            try {
                // update me array's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, posts: [...me.posts, addPost] } },
                });
            } catch (e) {
                console.warn("First post insertion by user!")
            }

            // update post array's cache
            const { posts } = cache.readQuery({ query: QUERY_POSTS });
            cache.writeQuery({
                query: QUERY_POSTS,
                data: { posts: [addPost, ...posts] },
            });
        }
    });
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addPost({
                variables: { postText, postTitle, image },
            });

            // clear form value
            setText('');
        } catch (e) {
            console.error(e);

        }
    }

    return (
        <section>
            <form className="max-w-lg mx-auto mt-8 p-6 bg-gray-100 shadow-md font-lofi" onSubmit={handleSubmit}>
                <div className='grid grid-cols-2'>
                   <div className='justify-start grid'><h2 className="text-2xl font-bold mb-4">Create Post</h2></div>
                    <motion.div 
                        variants={wordVariants}
                        whileHover="hovered"
                        className='justify-end grid'><Link to="/"><img src={x} className=""/></Link></motion.div>
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
                        onChange={handleTitleChange}
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
                        onChange={handleTextChange}
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
                        onChange={handleImageChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#ffd6a3] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-[#55a630]"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default PostForm;
