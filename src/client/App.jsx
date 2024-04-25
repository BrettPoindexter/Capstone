import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './auth/AuthForm'; // Assuming this is the authentication form component
import Login from './components/Login'; // Import the Login component
import Home from './components/Home'; // Import the Home component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<AuthForm />} />
    </Routes>
  );
}

export default App;
