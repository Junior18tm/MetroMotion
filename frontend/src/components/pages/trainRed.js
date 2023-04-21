import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function RedLine() {
  const [schedule, setSchedules] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/schedules?filter[route]=1&include=stop',
      );
      setSchedules(result.data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {schedule.map(schedule => (
          <Card
          body
          outline
          color="success"
          className="mx-1 my-2"
          style={{ width: "31rem" }}
        >
          <Card.Body>
          <Card.Title>Depature Time</Card.Title>
          <Card.Text>{schedule.attributes.departure_time}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
export default RedLine