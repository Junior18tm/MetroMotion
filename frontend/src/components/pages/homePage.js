import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import './homePage.css';
const HomePage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        return navigate(e)
    }

    useEffect(() => {
        setUser(getUserInfo())
    }, [])


    if (!user) return (
        <div><h4>Log in to view this page.</h4></div>)
    const { username } = user
    return (
        <>
            <div>
                <h3>
                    Welcome
                    <span className='username'> {username}</span>
                </h3>
            </div>
            
            <div className="schedule-windows-container">
     
                <div className="schedule-window" onClick={() => handleClick('/trainSchedule')}>
                <h2>Train Schedules</h2>
                </div>

                <div className="schedule-window" onClick={() => handleClick('/mbtaAlerts')}>
                <h2>Bus Schedules</h2>
                </div>
    
            </div>
    
        </>
    )
}

export default HomePage