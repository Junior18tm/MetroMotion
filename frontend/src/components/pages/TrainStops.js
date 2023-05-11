import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TrainCard from './TrainCard';

const TrainStops = () => {
  const { line } = useParams()
  const navigate = useNavigate();;
  const [lineSchedule, setLineSchedule] = useState([]);
  const [lineDetails, setLineDetails] = useState({});
  const [predictions, setPredictions] = useState({});
  

  const routes = {
    'red-line': 'Red',
    'orange-line': 'Orange',
    'blue-line': 'Blue',
    'green-line': 'Green-B,Green-C,Green-D,Green-E',
    'mattapan-trolley': 'Mattapan',
  };

  const fetchPredictions =  async (stopId, delay, retries = 2) => {
    
    setTimeout(async () => {
      try {
        const result = await axios(
          `https://api-v3.mbta.com/predictions?filter[stop]=${stopId}&include=trip`
        );
  
        const predictionData = result.data.data.filter(
          (prediction) => prediction.attributes.arrival_time !== null
        )[0];
  
        if (predictionData) {
          const includedTrip = result.data.included.find(
            (item) => item.type === "trip" && item.id === predictionData.relationships.trip.data.id
          );
  
          const headsign = includedTrip.attributes.headsign;
          const arrivalTime = predictionData.attributes.arrival_time;
  
          setPredictions((prevPredictions) => ({
            ...prevPredictions,
            [stopId]: { arrivalTime, headsign },
          }));
        }
      } catch (error) {
        if (error.response.status === 429 && retries > 0) {
          console.log(`Retrying predictions request for stop ${stopId} (${retries} retries left)`);
          fetchPredictions(stopId, delay, retries - 1);
        } else {
          console.error(`Failed to fetch predictions for stop ${stopId}: ${error.message}`);
        }
      }
    }, delay);
  };
  

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://api-v3.mbta.com/stops?filter[route]=${routes[line]}&include=route`
      ).catch((error) => console.error(error));

      const lineData = result.data.included.find(item => item.type === "route");
      setLineDetails(lineData);

      const scheduleData = result.data.data;
      setLineSchedule(scheduleData);

      const fetchDelay = 600; 
      scheduleData.forEach((stop, index) =>
        fetchPredictions(stop.id, index * fetchDelay)
      );
    }
    fetchData();
  }, [line]);

  
  return (
    <div>
      <h1>MBTA Schedules</h1>
      <h2>{lineDetails.attributes?.long_name}</h2>
      <button
       onClick={() => navigate(-1)}style={{ backgroundColor:`#${lineDetails.attributes?.color}`, color: 'white',position: 'absolute', width : '10rem',
      top: '120px', right: '50px',  border: 'black', padding: '10px',borderRadius: '5px', }}> ⇦ Previous Page</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}> 
        {lineSchedule.map((schedule) => (
          <div key={schedule.id} style={{ flex: '0 0 calc(33% - 1rem)', marginBottom: '1rem' }}>
            <TrainCard
              stopId={schedule.id}
              stopName={schedule.attributes.name}
              lineColor={`#${lineDetails.attributes?.color}`}
              arrivalTime={
                predictions[schedule.id]?.arrivalTime
                  ? new Date(predictions[schedule.id].arrivalTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : 'Information not available at the moment!'
              }
              destination={predictions[schedule.id]?.headsign}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainStops;


