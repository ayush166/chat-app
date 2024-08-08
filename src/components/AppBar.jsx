import React from 'react'
import { useUser } from '../context/UserContext';
const AppBar = () => {
    const { user, loading } = useUser();

    if (loading) return <div>Loading...</div>;
  return (
    
        <header className="bg-blue-600 text-white p-4 shadow-md w-full p-4">
        <h1 className="text-xl font-semibold">Chat Room</h1>
        <p className="text-sm">Logged in as: {user.displayName}</p>
      </header>
    
  )
}

export default AppBar