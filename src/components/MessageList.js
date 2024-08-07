import React from 'react';
 // Import the CSS for styling

const MessageList = ({ messages, currentUserEmail, userList }) => {
  // Helper function to get display name
  const getDisplayName = (email) => {
    if (email === currentUserEmail) return 'You';
    const user = userList.find((user) => user.email === email);
    return user ? user.displayName || email : email;
  };

  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-item ${msg.isNew ? 'new-message' : ''}`} // Add class for new messages
        >
          <strong>{getDisplayName(msg.sender)}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
