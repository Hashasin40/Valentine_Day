import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'valentine_messages';

// Get all messages from localStorage
export const getAllMessages = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

// Get a specific message by ID
export const getMessageById = (id) => {
  try {
    const messages = getAllMessages();
    return messages.find(msg => msg.id === id) || null;
  } catch (error) {
    console.error('Error getting message:', error);
    return null;
  }
};

// Save a new message
export const saveMessage = (messageData) => {
  try {
    const newMessage = {
      id: uuidv4(),
      ...messageData,
      createdAt: new Date().toISOString(),
    };
    
    const messages = getAllMessages();
    messages.push(newMessage);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    
    return newMessage;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
};

// Delete a message by ID
export const deleteMessage = (id) => {
  try {
    const messages = getAllMessages();
    const filtered = messages.filter(msg => msg.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    return false;
  }
};

// Clear all messages
export const clearAllMessages = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing messages:', error);
    return false;
  }
};

// Convert file to base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Theme configurations
export const themes = {
  pink: {
    name: 'Pink Romance',
    gradient: 'from-pink-300 via-pink-200 to-rose-300',
    cardBg: 'bg-white/80',
    cardBorder: 'border-pink-300',
    textColor: 'text-pink-800',
    accentColor: 'text-pink-600',
    buttonBg: 'bg-pink-500 hover:bg-pink-600',
    shadow: 'shadow-pink-200/50',
  },
  purple: {
    name: 'Purple Dream',
    gradient: 'from-purple-300 via-violet-200 to-fuchsia-300',
    cardBg: 'bg-white/80',
    cardBorder: 'border-purple-300',
    textColor: 'text-purple-800',
    accentColor: 'text-purple-600',
    buttonBg: 'bg-purple-500 hover:bg-purple-600',
    shadow: 'shadow-purple-200/50',
  },
  red: {
    name: 'Red Passion',
    gradient: 'from-red-300 via-rose-300 to-pink-300',
    cardBg: 'bg-white/80',
    cardBorder: 'border-red-300',
    textColor: 'text-red-800',
    accentColor: 'text-red-600',
    buttonBg: 'bg-red-500 hover:bg-red-600',
    shadow: 'shadow-red-200/50',
  },
  pastel: {
    name: 'Pastel Love',
    gradient: 'from-rose-100 via-teal-100 to-blue-100',
    cardBg: 'bg-white/90',
    cardBorder: 'border-teal-200',
    textColor: 'text-gray-800',
    accentColor: 'text-teal-600',
    buttonBg: 'bg-teal-500 hover:bg-teal-600',
    shadow: 'shadow-teal-200/50',
  },
};
