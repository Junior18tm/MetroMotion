import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';

const TrainCard = ({ stopName, line, stopId, arrivalTime, lineColor, lineName, destination }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const user = getUserInfo();
    const userId = user?.id; // Access the user ID
  
    const toggleFavorite = () => {
      if (userId) {
        // Save or remove the favorite stop for the user using the API
        setIsFavorited(!isFavorited);
      } else {
        console.log('Please log in to use this feature');
      }
    };
      
  
    return (
      <Card
        style={{
          width: '25rem',
          marginBottom: '1rem',
          borderColor: lineColor,
          borderWidth: '2px',
          position: 'relative',
        }}
      >
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            position: 'absolute',
            top: '0px',
            right: '5px',
            fontSize: '35px',
            cursor: 'pointer',
          }}
          onClick={toggleFavorite}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? '★' : '☆'}
        </button>
        <Card.Body>
          <Card.Title>{stopName} Station</Card.Title>
          <Card.Text>
            <strong>Next train arrives at:</strong>{' '}
            {arrivalTime || 'Information not available at the moment!'}
          </Card.Text>
          <Card.Text>
            <strong>Destination:</strong> {destination || 'Information not available at the moment!'}
          </Card.Text>
          <Link to={`/trainSchedule/${line}/${stopId}`} className="btn btn-sm" style={{
            backgroundColor: lineColor,
            color: 'black',
          }}>
            More Info
          </Link>
        </Card.Body>
      </Card>
    );
  };
  
  export default TrainCard;
