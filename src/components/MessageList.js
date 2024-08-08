import React from 'react';
import { formatTimestamp } from '../utils/dateUtils';

const MessageList = ({ messages, currentUserEmail, userList }) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message) => (
        <div
          key={message.timestamp}
          className={`flex ${message.sender === currentUserEmail ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`relative max-w-xs py-2 px-4 rounded-lg shadow-lg ${
              message.sender === currentUserEmail
                ? 'bg-green-400 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <div className="flex flex-col">
              <p className="text-md font-medium mb-2 pr-20">{message.text}</p>
              <span className="text-xs text-gray-500 mt-auto self-end">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
