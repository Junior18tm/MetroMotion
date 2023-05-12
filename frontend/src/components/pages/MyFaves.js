import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from './TrainCard';
import getUserInfo from '../../utilities/decodeJwt';

const MyFaves = () => {
    const [favorites, setFavorites] = useState([]);
    const user = getUserInfo();
    const userId = user?.id;

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8081/users/${userId}/favorites`)
                .then((response) => {
                    setFavorites(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching favorites:', error);
                });
        }
    }, [userId]);

    return (
      <div>
          <h1 style={{ textAlign: 'center' }}>My Favorites</h1>
          {user ? (
              <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around'
              }}>
                  {favorites.map((favorite, index) => (
                      <div style={{flex: '1 0 30%', margin: '1rem'}} key={index}>
                          <TrainCard
                              stopName={favorite.stopName}
                              line={favorite.line}
                              stopId={favorite.stopId}
                              arrivalTime={favorite.arrivalTime}
                              lineColor={favorite.lineColor}
                              lineName={favorite.lineName}
                              destination={favorite.destination}
                          />
                      </div>
                  ))}
              </div>
          ) : (
              <p>Please log in to see your favorite train stops.</p>
          )}
      </div>
  );
  
};

export default MyFaves;
