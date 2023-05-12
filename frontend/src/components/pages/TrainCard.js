import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';

const TrainCard = ({ stopName, line, stopId, arrivalTime, lineColor, lineName, destination }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const user = getUserInfo();
    const userId = user?.id; // Access the user ID
  
    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8081/users/${userId}/favorites`)
                .then((response) => {
                    const favorites = response.data;
                    
                    console.log(`Favorites for user ${userId}:`, favorites);
                    const isThisStopFavorited = favorites.some(favorite => favorite.stopId === stopId);
                    console.log(`Is stop ${stopId} favorited?`, isThisStopFavorited);

                    setIsFavorited(isThisStopFavorited);
                })
                .catch((error) => {
                    console.error('Error fetching favorites:', error);
                });
        }
    }, [userId, stopId]);

    const toggleFavorite = () => {
        if (userId) {
            if (!isFavorited) {
                // Save the favorite stop for the user using the API
                axios.post(`http://localhost:8081/users/${userId}/favorites`, {
                    stopName: stopName,
                    line: line,
                    stopId: stopId,
                    arrivalTime: arrivalTime,
                    lineColor: lineColor,
                    lineName: lineName,
                    destination: destination
                })
                .then((response) => {
                    console.log('Successfully added favorite:', response.data);
                    setIsFavorited(true);
                })
                .catch((error) => {
                    console.error('Error adding favorite:', error);
                });
            } else {
                // Remove the favorite stop for the user using the API
                axios.delete(`http://localhost:8081/users/${userId}/favorites/${stopId}`)
                .then((response) => {
                    console.log('Successfully removed favorite:', response.data);
                    setIsFavorited(false);
                })
                .catch((error) => {
                    console.error('Error removing favorite:', error);
                });
            }
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
            color: 'white',
          }}>
            More Info
          </Link>
        </Card.Body>
      </Card>
    );
  };
  
  export default TrainCard;
