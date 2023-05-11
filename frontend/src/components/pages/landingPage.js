import React, {} from 'react'
import './landingPageStyle.css';
//import Card from 'react-bootstrap/Card';
window.addEventListener('load', function() {
  const elements = document.querySelectorAll('.connecting.lineUp');

  elements.forEach(function(element) {
    element.addEventListener('connectingend', function() {
      element.classList.remove('lineUp');
    });
  });
});

const Landingpage = () => {
    
    return (
  <>
      <div style={{ 
        backgroundImage:`url(/Mbtrain.png)`,
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'center',
        backgroundSize:'cover', 
        height:'100vh',
        width:'100vw'
    }}>
      
     
      <div class="intro-text">
        <h1>
          <span class="hear"> MBTA Scheduler: </span> <br />
          <span class="connecting"> Simplify Your Commute!</span>
          
       
        </h1>
        <p>
        Welcome to the MBTA Scheduling App!  <br />
        Take control of your daily commute with our powerful scheduling tool.
        
        </p>
        <div class="button-container">
        <button class="btn learn-more">Learn More</button>
         <a href="/login" class="btn subscribe">Get started</a>

        
        </div>
       
        </div>
       
      </div>
      
  </>
    )
}

export default Landingpage