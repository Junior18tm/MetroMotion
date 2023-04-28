import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './addCommentPage.css';

function CommentForm() {
  const [username, setUsername] = useState('');
  const [stationName, setStationName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()
  const handleClick = (e) => {
    return navigate(e)
}

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8081/comment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, stationName, comment })
    })
      .then(response => {
        if (response.ok) {
          setSubmitted(true);
        } else {
          alert('Error adding comment');
        }
      })
      .catch(error => {
        alert('Error adding comment');
        console.error(error);
      });
  }

  if (submitted) {
    return (
      <div className="comment-submitted">
        <h2>Comment Submitted, Thank you!!.</h2>
        <button className="btn btn-primary" onClick={() => handleClick('/home')}>Go Back Home</button>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input className="form-control" type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="stationName">Station Name:</label>
        <input className="form-control" type="text" id="stationName" value={stationName} onChange={event => setStationName(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea className="form-control" id="comment" value={comment} onChange={event => setComment(event.target.value)} />
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;

