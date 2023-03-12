import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout action here
    // ...
    // Navigate to signing page
    navigate('/signin');
  };

  return (
    <div>
      <h1>Welcome to Dash</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dash;