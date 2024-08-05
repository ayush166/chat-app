import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './utils/firebase';
import Signup from './components/Signup';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom'; // Updated component name to `ChatRoom`
import NavBar from './components/SideNavbar';
import './App.css'
import SideNavbar from './components/SideNavbar';


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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={user ? <ChatRoom user={user} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
