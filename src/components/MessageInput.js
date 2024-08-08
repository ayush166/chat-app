import React from 'react';

const MessageInput = ({ message, setMessage, sendMessage, selectedUser }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center p-2  bg-white absolute bottom-0 w-[900px]">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
        className="flex-grow p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:mone"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!selectedUser || !message.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
