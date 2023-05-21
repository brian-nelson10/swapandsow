import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';
import UploadButton from '../PostForm/UploadButton';

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
    <div className='bg-gray-100 rounded-xl shadow-xl'>
      <p
        className={`font-lofi flex-row flex${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: <p className='font-bebas'>{characterCount}/280</p>
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this post..."
          value={reactionBody}
          className="form-input w-full"
          onChange={handleChange}
        ></textarea>
        <div className='justify-center grid p-8'>
        <button className="font-lofi" type="submit">
          <UploadButton
            text="Submit"/>
        </button>
        </div>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ReactionForm;
