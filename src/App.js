
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom'; // Updated component name to `ChatRoom`

import './App.css'
import SideNavbar from './components/SideNavbar';
import { useUser } from './context/UserContext';

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
  const { user, loading } = useUser();


  if (loading) {
    return <div>Loading...</div>; // Optionally, add a loading spinner here
  }

  return (
   <div className='flex h-100vh '>
   <Router>
      <SideNavbar />
      <Routes>
      
      <Route
            path="/signup"
            element={user ? <Navigate to="/chat" /> : <Signup />}
          />
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
