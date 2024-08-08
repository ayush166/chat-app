import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { fetchUsers, fetchMessages, sendMessageToFirestore } from '../utils/firestoreUtils';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const socket = io('http://localhost:3001'); // Connect to the server

const ChatRoom = ({ user = {} }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!user.email) {
      console.error('User email is not defined');
      return;
    }

    const initializeChat = async () => {
      try {
        // Fetch users from Firestore
        const users = await fetchUsers(user.email);
        setUserList(users);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();

    // Listen for incoming messages
    socket.on('message', (msg) => {
      if (
        (msg.sender === user.email && msg.recipient === selectedUser?.email) ||
        (msg.sender === selectedUser?.email && msg.recipient === user.email)
      ) {
        setMessages((prevMessages) => [...prevMessages, { ...msg, isNew: true }]);
        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.map((m) => (m.timestamp === msg.timestamp ? { ...m, isNew: false } : m))
          );
        }, 3000);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [user.email, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      const unsubscribe = fetchMessages(user.email, selectedUser.email, setMessages);
      return () => unsubscribe();
    }
  }, [selectedUser, user.email]);

  const sendMessage = async () => {
    if (message.trim() && selectedUser) {
      const msg = {
        text: message,
        sender: user.email,
        recipient: selectedUser.email,
        timestamp: new Date().toISOString(),
      };
      socket.emit('message', msg);

      try {
        await sendMessageToFirestore(msg);
      } catch (error) {
        console.error('Error saving message to Firestore:', error);
      }

      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-semibold">Chat Room</h1>
        <p className="text-sm">Logged in as: {user.displayName}</p>
      </header>
      <div className="flex flex-grow">
        <aside className="px-2 bg-white border-r border-gray-300 pt-2
         w-1/3">
          
          <UserList users={userList} onSelectUser={setSelectedUser} />
        </aside>
        <main className="flex flex-col w-3/4 p-4 bg-white w-full  flex-5">
          <h2 className="text-lg font-semibold mb-4">
            Chat with {selectedUser ? selectedUser.displayName || selectedUser.email : 'No user selected'}
          </h2>
          <MessageList messages={messages} currentUserEmail={user.email} userList={userList} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            selectedUser={selectedUser}
          />
        </main>
      </div>
    </div>
  );
};

export default ChatRoom;
