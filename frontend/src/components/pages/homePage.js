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
                    Transportation Methods:
                </h3>
            </div>
            
            <div className="m-tabbed-nav__content">
     
                <div className="m-homepage__shortcuts">
                <a class="m-homepage__shortcut" href="/schedules/commuter-rail"><span class="notranslate c-svg__icon-mode-commuter-rail-default"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 48 48">    <title>        commuter rail    </title>    <path fill="#80276c" d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"></path>    <path fill="#fff" d="m33.39 14.48a1.35829 1.35829 0 0 1 -.61-1.15v-3.59a2.26665 2.26665 0 0 0 -1.78-2.16 57.59524 57.59524 0 0 0 -6.52-1.5 2.38727 2.38727 0 0 0 -1.03.01c-1.95.43-3.91.81-5.84 1.35-1.14.31-2.34.94-2.34 2.3v3.56a1.33683 1.33683 0 0 1 -.62 1.16 2.35679 2.35679 0 0 0 -1.12 2.01v15.14a2.37064 2.37064 0 0 0 .88 1.82l3.83 2.8-3.09 5.74h2.52l.44-.79h11.83l.45.79h2.5l-3.07-5.74h.01l3.75-2.77a2.37807 2.37807 0 0 0 .89-1.85v-15.14a2.37165 2.37165 0 0 0 -1.08-1.99zm-7.55-5.6a.74769.74769 0 0 1 .91-.73l3.7.78a.7302.7302 0 0 1 .59.72v2.2a.752.752 0 0 1 -.89.74l-3.7-.72a.75966.75966 0 0 1 -.61-.74zm2.07 28.65h-7.79l.66-1.2h6.46zm-3.91-20.89a2.705 2.705 0 1 1 -2.7 2.71 2.70364 2.70364 0 0 1 2.7-2.71zm-6.81-6.99a.7201.7201 0 0 1 .6-.72l3.69-.78a.73962.73962 0 0 1 .9.73v2.25a.75086.75086 0 0 1 -.6.74l-3.7.72a.75207.75207 0 0 1 -.89-.74zm.8 23.91a2.015 2.015 0 1 1 2.01-2.01 2.01015 2.01015 0 0 1 -2.01 2.01zm.78 6.41.69-1.24h9.12l.69 1.24zm11.22-6.41a2.015 2.015 0 1 1 2.01-2.01 2.01015 2.01015 0 0 1 -2.01 2.01z"></path></svg></span><div class="m-homepage__shortcut-text"><span>Commuter Rail</span></div></a>
                </div>

                <div className="m-homepage__shortcuts">
                <a class="m-homepage__shortcut" href="/trainSchedule"><span class="notranslate c-svg__icon-mode-subway-default"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 48 48">    <title>        subway    </title>    <path fill="#494f5b" d="m24 0a24 24 0 1 0 24 24 24 24 0 0 0 -24-24"></path>    <g fill="#fff">        <path d="m25.8889 5.8222a1.4111 1.4111 0 1 0 -1.4111-1.4111 1.411 1.411 0 0 0 1.4111 1.4111z"></path>        <path d="m31.4555 34.2111a4.9779 4.9779 0 0 0 3.889-4.8222v-18.1445a5.0112 5.0112 0 0 0 -5.0778-4.9111h-12.5333a5.0112 5.0112 0 0 0 -5.1 4.9v18.1556a4.9779 4.9779 0 0 0 3.8889 4.8222l-5.8556 8.7889h3.4l4.1889-6.1445h11.5555l4.1889 6.1445h3.3333zm-10.7555-25.9889a.8445.8445 0 0 1 .8445-.8111h4.9555a.8444.8444 0 0 1 .8333.8111v1.4445l-.0006.0339a.8334.8334 0 0 1 -.866.7994l-4.9222-.0111a.8333.8333 0 0 1 -.8445-.8222zm-3.1111 23.3334a2.2223 2.2223 0 1 1 2.2222-2.2223 2.2223 2.2223 0 0 1 -2.2222 2.2223zm.2889-11.8112c-.0758.0036-.1518.0036-.2276 0a2.4221 2.4221 0 0 1 -2.3057-2.5333v-3.2667a2.4109 2.4109 0 0 1 2.5333-2.5444h12.2222a2.4113 2.4113 0 0 1 2.5333 2.5444v3.2667q.0054.1137 0 .2276a2.4221 2.4221 0 0 1 -2.5333 2.3057zm12.4333 11.8112a2.2334 2.2334 0 1 1 .0223 0z"></path>        <path d="m22.1445 5.8222h-.0334.0337a1.4113 1.4113 0 1 0 -1.4115-1.4115 1.4111 1.4111 0 0 0 1.4115 1.4119z"></path>    </g></svg></span><div class="m-homepage__shortcut-text">Subway</div></a>
                </div>
               
                <div className="schedule-window" onClick={() => handleClick('/myfavorites')}>
                <h2>My Favorites</h2>
                </div>
            
               
               
    
            </div>
    
        </>
    )
}

export default HomePage

