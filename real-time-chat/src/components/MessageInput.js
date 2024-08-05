import React from 'react';

const MessageInput = ({ message, setMessage, sendMessage, selectedUser }) => {
  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="text-field"
      />
      <button
        onClick={sendMessage}
        className="button"
        disabled={!selectedUser}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
