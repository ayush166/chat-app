// src/components/ChatRoom.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { fetchUsers, fetchMessages, sendMessageToFirestore } from '../utils/firestoreUtils';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../context/ChatContext';
import AppBar from './AppBar';
import About from './About';
import { ScrollArea } from './ui/scroll-area';
import clsx from 'clsx';

const socket = io('http://localhost:3001'); // Connect to the server

const ChatRoom = ({ user = {} }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const { selectedUser, setSelectedUser } = useChat();

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
    <div className="flex flex-col h-screen bg-gray-100 w-full ">
      <AppBar />
      <div className="flex relative">
        <aside className="px-2 bg-white border-r border-gray-300 pt-2 w-1/3">
          <UserList users={userList} onSelectUser={setSelectedUser} />
        </aside>
       
        <div className='w-full'>
        <ScrollArea className="flex flex-col w-full bg-white ">
          <div className={clsx("flex-grow  p-4 ")}>
            
            {selectedUser ? (
             <div className='max-h-[29rem]'>
               <MessageList messages={messages} currentUserEmail={user.email} userList={userList} />
              </div>
            ) : (
              <div className='max-h-[30rem]'>
                <About/>
                </div>
            )}
          </div>
          
        </ScrollArea>
     {selectedUser?(
      <MessageInput 
      message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              selectedUser={selectedUser}
/>):null
}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
