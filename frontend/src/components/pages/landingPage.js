import React, {} from 'react'
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
    
    return (
  <>
      <div style={{ backgroundImage:`url(/Mbtrain.png)`,backgroundRepeat:"no-repeat",backgroundSize:"contain", 
    height:1600,width:1600
    }}>
      <div style={{ position: 'relative' }}></div>
      <Card style={{
        fontFamily: 'sans-serif',
        backgroundColor: '#f8f9fa', 
        color: '#212529',
        border: '1px solid #dee2e6',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)', 
        position: 'absolute', top: '100px', left: '500px', 
        width: '25rem' }} className="mx-2 my-2">
        <Card.Body>
          <Card.Title>MetroMotion</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">MBTA Scheduling App</Card.Subtitle>
          <Card.Text>
          </Card.Text>
          <Card.Link href="/signup"><button>Sign Up</button></Card.Link>
          <Card.Link href="/login"><button>Login</button></Card.Link>
          <Card.Link href="/login"><button>Continue as Guest</button></Card.Link>
        </Card.Body>
      </Card>

      </div>
  </>
    )
}

export default Landingpage