import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


const SideNavbar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    
      <nav className="side-navbar">
      <div className="logo">VChat</div>
      <ul className="nav-list">
        {user ? (
          <>
            <li><Link to="/chat">Chats</Link></li>
            <li><Link to="/work">Work</Link></li>
            <li><Link to="/meet">Meet</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/saved">Saved</Link></li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
    
  );
};

export default SideNavbar;
