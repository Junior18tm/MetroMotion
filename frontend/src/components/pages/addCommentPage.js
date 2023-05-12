import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import './addCommentPage.css';


function CommentForm() {
  const user = getUserInfo();
  const [username, setUsername] = useState(user?.username || '');
  const [line, setLine] = useState('Red'); 
  const [stations, setStations] = useState([]);
  const [stationName, setStationName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    return navigate(e);
  }

  useEffect(() => {
    setUsername(user?.username || '');
  }, [user]);

  useEffect(() => {
    axios.get(`https://api-v3.mbta.com/stops?filter[route]=${line}`)
      .then(response => {
        const stopsData = response.data.data;
        setStations(stopsData);
        if (stopsData.length > 0) {
          setStationName(stopsData[0].attributes.name);
        }
      })
      .catch(error => console.error('Error fetching stations:', error));
  }, [line]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8081/comment/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, line, stationName, comment })
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
        <h2>Comment Submitted, Thank you!.</h2>
        <button className="btn btn-primary" onClick={() => handleClick('/viewComments')}>Check other comments</button>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input className="form-control" type="text" id="username" value={username} onChange={event => setUsername(event.target.value)} disabled />
      </div>
      <div className="form-group">
        <label htmlFor="line">Line:</label>
        <select className="form-control" id="line" value={line} onChange={event => setLine(event.target.value)}>
          <option value="Red">Red Line</option>
          <option value="Blue">Blue Line</option>
          <option value="Orange">Orange Line</option>
          <option value="Green-B,Green-C,Green-D,Green-E">Green Line</option>
          <option value="Mattapan">Mattapan Trolley</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="stationName">Station Name:</label>
        <select className="form-control" id="stationName" value={stationName} onChange={event => setStationName(event.target.value)}>
          {stations.map(station => (
            <option key={station.id} value={station.attributes.name}>{station.attributes.name}</option>
          ))}
        </select>
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

