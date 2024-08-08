// src/UserContext.js
import  { createContext, useContext,  } from 'react';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
