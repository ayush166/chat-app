import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';
import Signup from './components/Signup';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom'; // Updated component name to `ChatRoom`

import './App.css'
import SideNavbar from './components/SideNavbar';


import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material'; // Assuming you're using Material-UI

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
    >
      <Box>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};


const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Optionally, add a loading spinner here
  }

  return (
   <div className='main'>
   <Router>
      <SideNavbar />
      <Routes>
      <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={user ? <ChatRoom user={user} /> : <Navigate to="/login" />}
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
