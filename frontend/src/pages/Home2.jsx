import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser ] = useState(null); // State to hold user data

  const fetchUser  = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/auth/home', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      // Check if the response is successful
      if (response.status === 200) {
        setUser (response.data.user); // Set user data in state
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUser ();
  }, []);

  // Main Home
  return (
    <div className='text-3xl text-blue-500'>
      {user ? (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <p>Your email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;