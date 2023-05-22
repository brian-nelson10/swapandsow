import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';
import SubmitButton from './SubmitButton';

const ReactionForm = ({ postId }) => {
    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addReaction, { error }] = useMutation(ADD_REACTION);
    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };
    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addReaction({
                variables: { reactionBody, postId },
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
        <div className='font-bebas text-[3rem] font-bold justify-center text-center mb-2'>Comments</div>
        <div className='bg-gray-100 rounded-xl shadow-xl mb-6 p-4'>
            <p
                className={`font-lofi flex-row flex${characterCount === 280}`}
            >
                Character Count: <p className='font-bebas'>{characterCount}/280</p>
                {/* {error && <span className="ml-2">Something went wrong...</span>} */}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a comment on this post..."
                    value={reactionBody}
                    className="form-input w-full font-lofi text-[2rem]"
                    onChange={handleChange}
                ></textarea>
                <div className='justify-center grid p-8'>
                    <button className="font-lofi" type="submit">
                        <SubmitButton
                            error={error}
                            text="Submit" />
                    </button>
                </div>
            </form>

            {/* {error && <div>Something went wrong...</div>} */}
        </div></>
    );
};

export default ReactionForm;
