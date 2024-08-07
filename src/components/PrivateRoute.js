import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Optionally, add a loading spinner here
  }

  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
