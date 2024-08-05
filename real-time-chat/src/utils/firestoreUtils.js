import { collection, query, where, onSnapshot, setDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';

// Fetch users except the current user
export const fetchUsers = async (currentUserEmail) => {
  try {
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where('email', '!=', currentUserEmail));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch messages between the current user and the selected user
export const fetchMessages = (currentUserEmail, selectedUserEmail, setMessages) => {
  const messagesRef = collection(firestore, 'messages');
  const q = query(
    messagesRef,
    where('recipient', 'in', [currentUserEmail, selectedUserEmail]),
    where('sender', 'in', [currentUserEmail, selectedUserEmail])
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const fetchedMessages = querySnapshot.docs.map((doc) => doc.data());
    // Sort messages by timestamp
    fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setMessages(fetchedMessages);
  });

  return unsubscribe;
};

// Send a message to Firestore
export const sendMessageToFirestore = async (msg) => {
  try {
    const messageId = `${msg.sender}_${msg.recipient}_${msg.timestamp}`;
    await setDoc(doc(firestore, 'messages', messageId), msg);
  } catch (error) {
    console.error('Error saving message to Firestore:', error);
    throw error;
  }
};
