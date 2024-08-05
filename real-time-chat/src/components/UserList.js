// components/UserList.js
import React from 'react';
// Import the styles

const UserList = ({ users, onSelectUser }) => {
  return (
    <div>
      {users.map((user) => (
        <div
          key={user.email}
          className="user-item"
          onClick={() => onSelectUser(user)}
        >
          {user.displayName || user.email}
        </div>
      ))}
    </div>
  );
};

export default UserList;
