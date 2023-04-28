import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function ScheduleDisplay() {
  const [redLineSchedule, setRedLineSchedule] = useState([]);
  const [orangeLineSchedule, setOrangeLineSchedule] = useState([]);
  const [greenLineSchedule, setGreenLineSchedule] = useState([]);
  const [blueLineSchedule, setBlueLineSchedule] = useState([]);
  const [silverLineSchedule, setSilverLineSchedule] = useState([]);
  const [purpleLineSchedule, setPurpleLineSchedule] = useState([]);

  useEffect(() => {
    async function fetchRedLineSchedule() {
      const result = await axios(
        'https://api-v3.mbta.com/schedules?filter[route]=1&include=stop',
      );
      setRedLineSchedule(result.data.data);
    }
    fetchRedLineSchedule();
  }, []);

  // Similar useEffect calls for other lines

  return (
    <div>
      <h1>MBTA Schedules</h1>
      <h2>Red Line</h2>
      {redLineSchedule.map((schedule) => (
        <Card>
          <Card.Body>
            <Card.Title>{schedule.attributes.stop_headsign}</Card.Title>
            <Card.Text>
              Departing from {schedule.attributes.stop_headsign} at{' '}
              {schedule.attributes.departure_time}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
</div>
);
      }
export default ScheduleDisplay