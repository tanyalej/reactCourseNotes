import { useEffect, useRef } from 'react';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment, false)

  const { onAddedComment } = props

  useEffect(() => {
    if(status === 'completed' && !error) {
      onAddedComment()
    }
  }, [status, error, onAddedComment])
  
  

  const submitFormHandler = (event) => {
    event.preventDefault();
    
    // optional: Could validate here

    if (commentTextRef.current.value.trim().length === 0) {
      return
    }

    // send comment to server

    const enteredText = commentTextRef.current.value
    sendRequest({quoteId: props.quoteId, commentData: {text: enteredText}})   

  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>        
      )}
      <div className={classes.control}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
