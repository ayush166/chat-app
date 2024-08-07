import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logo from './Logo';


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
    
      <nav className=" w-[10rem] h-screen  text-white bg-[rgba(8,8,7,0.9)] shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] backdrop-blur-[2px] rounded-[10px]">
     <div className=""> <Logo /></div>
      <ul className="">
        {user ? (
          <>
            <li className="py-2 text-center text-xl border-t"><Link to="/chat">Chats</Link></li>
            <li className="py-2 text-center  text-xl border-t"><Link to="/work">Work</Link></li>
            <li className="py-2 text-center text-xl border-t"><Link to="/meet">Meet</Link></li>
            <li className="py-2 text-center  text-xl border-t"><Link to="/calendar">Calendar</Link></li>
            <li className="py-2 text-center  text-xl border-t"><Link to="/saved">Saved</Link></li>
            <li className='py-2 text-center border'>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <ul className="px-6  text-xl">
            <li><Link to="/signup ">Signup</Link></li>
            <li className='pt-3'><Link to="/login ">Login</Link></li>
            </ul> 
          </>
        )}
      </ul>
    </nav>
    
  );
};

export default SideNavbar;
