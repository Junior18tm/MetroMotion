import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TrainStops = () => {
  const { line } = useParams();
  const [lineSchedule, setLineSchedule] = useState([]);

  const routes = {
    'red-line': 'Red',
    'orange-line': 'Orange',
    'blue-line': 'Blue',
    'green-line': 'Green-B',
    'mattapan-trolley': 'Mattapan',
  };

  useEffect(() => {
    async function fetchLineSchedule() {
      const result = await axios(
        `https://api-v3.mbta.com/predictions?filter[route]=${routes[line]}&include=stop`
       
      );
      setLineSchedule(result.data.data);
    }
    fetchLineSchedule();
  }, [line]);
  

  
  return (
    <div>
      <h1>MBTA Schedules</h1>
      <h2>Line - {line}</h2>
      {lineSchedule.map((schedule) => (
      
        <Card>
          <Card.Body>
            <Card.Title>{schedule.attributes.type}</Card.Title>
            
            <Card.Text> Destination: {schedule.attributes.direction_destinations}</Card.Text>

            <Card.Text> Departure Time: {schedule.attributes.departure_time}</Card.Text>
            <Card.Text> Arrival Time: {schedule.attributes.arrival_time}</Card.Text>
            <Card.Text> {schedule.relationships.route.data.long_name}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TrainStops;

