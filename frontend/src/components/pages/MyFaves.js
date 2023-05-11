import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from './TrainCard';
import getUserInfo from '../../utilities/decodeJwt';

const MyFaves = () => {
  const [favoriteStops, setFavoriteStops] = useState([]);
  const user = getUserInfo();
  const userId = user?.id; // Access the user ID

  useEffect(() => {
    if (userId) {
      // Fetch favorite stops for the user using the API
      axios
        .get(`/api/users/${userId}/favorites`)
        .then((response) => {
          setFavoriteStops(response.data);
        })
        .catch((error) => {
          console.error('Error fetching favorite stops:', error);
        });
    }
  }, [userId]);

  return (
    <div>
      <h1>My Favorite Stops</h1>
      {favoriteStops.map((stop) => (
        <TrainCard
          key={stop.id}
          stopName={stop.stopName}
          line={stop.line}
          stopId={stop.stopId}
          arrivalTime={stop.arrivalTime}
          lineColor={stop.lineColor}
          lineName={stop.lineName}
          destination={stop.destination}
        />
      ))}
    </div>
  );
};

export default MyFaves;
