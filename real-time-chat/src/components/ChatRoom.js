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
      // Check if the message is between the current user and the selected user
      if (
        (msg.sender === user.email && msg.recipient === selectedUser?.email) ||
        (msg.sender === selectedUser?.email && msg.recipient === user.email)
      ) {
        setMessages((prevMessages) => [...prevMessages, { ...msg, isNew: true }]);
        // Remove new highlight after 3 seconds
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
      // Fetch messages from Firestore for the selected user
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

      // Save the message to Firestore
      try {
        await sendMessageToFirestore(msg);
      } catch (error) {
        console.error('Error saving message to Firestore:', error);
      }

      setMessage('');
    }
  };

  return (
    <div className="container">
      <h1>Chat Room</h1>
      <h3>Logged in as: {user.displayName}</h3>
      <div className="chat-room">
        <div className="user-list">
          <h2>Select User</h2>
          <UserList users={userList} onSelectUser={setSelectedUser} />
        </div>
        <div className="chat-area">
          <h2>Chat with {selectedUser ? selectedUser.displayName || selectedUser.email : 'No user selected'}</h2>
          <MessageList messages={messages} currentUserEmail={user.email} userList={userList} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            selectedUser={selectedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
