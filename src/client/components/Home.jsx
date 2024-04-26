// Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
// Make an HTTP GET request to fetch stadiums data from the backend
fetch('/api/stadiums')
  .then(response => response.json())
  .then(data => {
    const stadiums = data.stadiums;
    
    stadiums.forEach(stadium => {
      const stadiumCard = document.createElement('div');
      stadiumCard.classList.add('stadium-card');

      stadiumCard.innerHTML = `
        <h2>${stadium.name}</h2>
        <p>Location: ${stadium.location}</p>
        <p>Team: ${stadium.team}</p>
      `;

      document.getElementById('stadiums-container').appendChild(stadiumCard);
    });
  })
  .catch(error => {
    console.error('Error fetching stadiums:', error);
  });



  return (
    <div>
      <h1>Welcome to our website!</h1>
      <p>Please log in or register to continue.</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
      <div id="stadiums-container">

      </div>
    </div>
  );
}

export default Home;
