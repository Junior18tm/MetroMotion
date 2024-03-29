import React, { useState, useEffect } from "react";
import { Link }from 'react-router-dom';
import './trainLines.css'

const TrainLines = () => {
   
     return(
       <div id ="body">
    <div className="train-schedule-container">
     <Link to="/trainSchedule/red-line" className="train-schedule-box red-line-box">
        Red Line
      </Link>
      <Link to="/trainSchedule/orange-line" className="train-schedule-box orange-line-box">
        Orange Line
      </Link>
      <Link to="/trainSchedule/green-line" className="train-schedule-box green-line-box">
        Green Line
      </Link>
      <Link to="/trainSchedule/blue-line" className="train-schedule-box blue-line-box">
        Blue Line
      </Link>
      <Link to="/trainSchedule/mattapan-trolley" className="train-schedule-box mattapan-trolley-box">
        Mattapan Trolley
      </Link>
    </div>
    </div>
     )

}
export default TrainLines