import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const StopInfo = () => {
    const { stopId } = useParams();
    const [stopData, setStopData] = useState({});
    const [predictions, setPredictions] = useState({arrivalTimes: [], trainIds: [], directionIds: []});
    
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchData() {
        const result = await axios(
          `https://api-v3.mbta.com/stops/${stopId}`
        );
  
        setStopData(result.data.data.attributes);
  
        const predictionsResult = await axios(
          `https://api-v3.mbta.com/predictions?filter[stop]=${stopId}&include=route,trip`
        );
  
        const validPredictions = predictionsResult.data.data.filter(
          (prediction) => prediction.attributes.arrival_time !== null
        );
  
        validPredictions.forEach((prediction) => {
          setPredictions(prevPredictions => ({
            ...prevPredictions,
            arrivalTimes: [...prevPredictions.arrivalTimes, prediction.attributes.arrival_time],
            trainIds: [...prevPredictions.trainIds, prediction.relationships.trip.data.id],
            directionIds: [...prevPredictions.directionIds, prediction.attributes.direction_id],
          }));
        });
      }
  
      fetchData();
    }, [stopId]);
  
    const formatTime = (timeStr) => {
      return new Date(timeStr).toLocaleTimeString();
    };
  
    return (
      <div>
        <h1>{stopData.name} Station</h1>
        <p>Address: {stopData.address}</p>
        <h2>Upcoming trains:</h2>
        {predictions.arrivalTimes.map((arrivalTime, index) => (
          <Card key={index} style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Body>
              <Card.Title>Train ID: {predictions.trainIds[index]}</Card.Title>
              <Card.Text>Arrival Time: {formatTime(arrivalTime)}</Card.Text>
              <Card.Text>
                Direction: {predictions.directionIds[index] === 0 ? 'Southbound/Inbound' : 'Northbound/Outbound'}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  };
  
  export default StopInfo;
